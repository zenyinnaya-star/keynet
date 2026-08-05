"""
Procedurally builds a simple over-ear headphone model in Blender.

How to run:
  1. Open Blender.
  2. Go to the "Scripting" workspace tab.
  3. Open this file (or paste its contents into a new text block).
  4. Click "Run Script" (the play button), or press Alt+P with the cursor
     in the text editor.

Or from the command line (renders a PNG next to this file):
  blender --background --python blender_headphones.py

Everything is driven by the constants below, so tweak those and re-run
to iterate on proportions without touching the rest of the script.
"""

import math
import os
import bpy


# ---------------------------------------------------------------------------
# Parameters
# ---------------------------------------------------------------------------
EAR_CUP_X = 1.35          # left/right offset of each ear cup from center
EAR_CUP_Z = 0.25          # height of ear cup centers
HEADBAND_TOP_Z = 1.55     # peak height of the headband arc
HEADBAND_THICKNESS = 0.07 # radius of the headband tube
HEADBAND_END_Z = EAR_CUP_Z + 0.55  # height where each headband end meets its yoke

CUP_RADIUS = 0.55         # outer ear-cup radius
CUP_DEPTH_SCALE = 0.45    # how flattened the cup is front-to-back
CUP_HEIGHT_SCALE = 1.15   # vertical stretch of the cup (oval vs. round)

CUSHION_MAJOR_RADIUS = 0.42
CUSHION_MINOR_RADIUS = 0.13

YOKE_RADIUS = 0.045

BODY_COLOR = (0.02, 0.02, 0.02, 1.0)      # near-black plastic
CUSHION_COLOR = (0.03, 0.03, 0.035, 1.0)  # slightly softer near-black
ACCENT_COLOR = (0.55, 0.55, 0.58, 1.0)    # brushed-metal accent (hinges)


# ---------------------------------------------------------------------------
# Scene setup
# ---------------------------------------------------------------------------
def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block_collection in (bpy.data.meshes, bpy.data.curves, bpy.data.materials):
        for block in list(block_collection):
            if block.users == 0:
                block_collection.remove(block)


def make_material(name, color, roughness=0.4, metallic=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


# ---------------------------------------------------------------------------
# Headband — a beveled Bezier arc from ear cup to ear cup
# ---------------------------------------------------------------------------
def build_headband():
    curve_data = bpy.data.curves.new("HeadbandCurve", type="CURVE")
    curve_data.dimensions = "3D"
    curve_data.resolution_u = 64
    curve_data.bevel_depth = HEADBAND_THICKNESS
    curve_data.bevel_resolution = 8
    curve_data.fill_mode = "FULL"

    spline = curve_data.splines.new("BEZIER")
    spline.bezier_points.add(2)  # 3 points total: left, top, right

    points = [
        (-EAR_CUP_X, 0.0, HEADBAND_END_Z),
        (0.0, 0.0, HEADBAND_TOP_Z),
        (EAR_CUP_X, 0.0, HEADBAND_END_Z),
    ]
    for point, co in zip(spline.bezier_points, points):
        point.co = co
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"

    headband_obj = bpy.data.objects.new("Headband", curve_data)
    bpy.context.collection.objects.link(headband_obj)
    headband_obj.data.materials.append(make_material("BodyPlastic", BODY_COLOR, roughness=0.35))
    return headband_obj


# ---------------------------------------------------------------------------
# One ear cup: outer shell + inner cushion + connecting yoke
# ---------------------------------------------------------------------------
def build_ear_cup(side, body_mat, cushion_mat, accent_mat):
    x = side * EAR_CUP_X

    # Outer shell
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=CUP_RADIUS, location=(x, 0.0, EAR_CUP_Z), segments=48, ring_count=24
    )
    cup = bpy.context.active_object
    cup.name = f"EarCup_{'L' if side < 0 else 'R'}"
    cup.scale = (CUP_DEPTH_SCALE, CUP_DEPTH_SCALE, CUP_HEIGHT_SCALE)
    bpy.ops.object.shade_smooth()
    cup.data.materials.append(body_mat)

    # Inner cushion (a torus rotated so its hole faces inward, toward center)
    inward_y = 0.0
    inner_x = x - side * (CUP_RADIUS * CUP_DEPTH_SCALE * 0.55)
    bpy.ops.mesh.primitive_torus_add(
        location=(inner_x, inward_y, EAR_CUP_Z),
        rotation=(0.0, math.radians(90.0), 0.0),
        major_radius=CUSHION_MAJOR_RADIUS,
        minor_radius=CUSHION_MINOR_RADIUS,
        major_segments=32,
        minor_segments=24,
    )
    cushion = bpy.context.active_object
    cushion.name = f"Cushion_{'L' if side < 0 else 'R'}"
    bpy.ops.object.shade_smooth()
    cushion.data.materials.append(cushion_mat)

    # Yoke connecting the headband end down to the cup (spans the gap exactly)
    yoke_top_z = HEADBAND_END_Z
    yoke_bottom_z = EAR_CUP_Z + CUP_RADIUS * CUP_HEIGHT_SCALE * 0.5
    yoke_length = yoke_top_z - yoke_bottom_z
    bpy.ops.mesh.primitive_cylinder_add(
        radius=YOKE_RADIUS,
        depth=yoke_length,
        location=(x, 0.0, (yoke_top_z + yoke_bottom_z) / 2),
    )
    yoke = bpy.context.active_object
    yoke.name = f"Yoke_{'L' if side < 0 else 'R'}"
    bpy.ops.object.shade_smooth()
    yoke.data.materials.append(accent_mat)

    return cup, cushion, yoke


# ---------------------------------------------------------------------------
# Camera + lights for a quick studio-style preview render
# ---------------------------------------------------------------------------
def build_camera_and_lights():
    bpy.ops.object.camera_add(
        location=(3.2, -3.6, 1.4),
        rotation=(math.radians(78), 0.0, math.radians(42)),
    )
    camera = bpy.context.active_object
    bpy.context.scene.camera = camera

    bpy.ops.object.light_add(type="AREA", radius=1.5, location=(2.5, -2.0, 3.0))
    key_light = bpy.context.active_object
    key_light.data.energy = 900

    bpy.ops.object.light_add(type="AREA", radius=2.5, location=(-2.5, 1.5, 1.5))
    fill_light = bpy.context.active_object
    fill_light.data.energy = 250

    bpy.ops.object.light_add(type="AREA", radius=1.0, location=(0.0, 3.0, 1.2))
    rim_light = bpy.context.active_object
    rim_light.data.energy = 300
    rim_light.rotation_euler = (math.radians(90), 0.0, 0.0)

    # Subtle floor to catch a soft contact shadow beneath the headphones.
    bpy.ops.mesh.primitive_plane_add(size=12, location=(0.0, 0.0, -1.05))
    floor = bpy.context.active_object
    floor.name = "Floor"
    floor_mat = make_material("Floor", (0.015, 0.015, 0.015, 1.0), roughness=0.6)
    floor.data.materials.append(floor_mat)

    world = bpy.context.scene.world
    if world is None:
        world = bpy.data.worlds.new("World")
        bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0.015, 0.015, 0.015, 1.0)
        bg.inputs["Strength"].default_value = 1.0


def main():
    clear_scene()

    body_mat = make_material("BodyPlastic2", BODY_COLOR, roughness=0.35)
    cushion_mat = make_material("Cushion", CUSHION_COLOR, roughness=0.85)
    accent_mat = make_material("Accent", ACCENT_COLOR, roughness=0.25, metallic=0.6)

    build_headband()
    build_ear_cup(-1, body_mat, cushion_mat, accent_mat)
    build_ear_cup(1, body_mat, cushion_mat, accent_mat)
    build_camera_and_lights()

    bpy.context.view_layer.update()
    print("Headphone model built: Headband, EarCup_L/R, Cushion_L/R, Yoke_L/R")

    # When run standalone (not pasted into an already-open .blend), save the
    # result and render a quick preview so the output can be sanity-checked
    # without opening the Blender GUI.
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "blender_output")
    os.makedirs(out_dir, exist_ok=True)

    scene = bpy.context.scene
    scene.render.resolution_x = 1024
    scene.render.resolution_y = 1024
    scene.render.filepath = os.path.join(out_dir, "headphones_preview.png")
    bpy.ops.render.render(write_still=True)
    print(f"Preview render written to {scene.render.filepath}")

    blend_path = os.path.join(out_dir, "headphones_model.blend")
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    print(f".blend file saved to {blend_path}")


if __name__ == "__main__":
    main()
