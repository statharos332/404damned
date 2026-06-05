"""
============================================================
 404 DAMNED — AMSTERDAM CANAL GENERATOR for Blender
============================================================
 Builds a complete canal scene (two rows of Dutch canal houses
 with step/bell/triangle gables, lit windows, water, a bridge
 and a boat) and exports it as a web-ready .glb with the mesh
 naming the website expects (window_lit / neon_red).

 HOW TO USE
 ----------
 1. Open Blender (free: blender.org). Version 3.6+ or 4.x.
 2. Go to the "Scripting" tab → New → paste this whole file.
 3. Press "Run Script" (▶) at the top of the text editor.
 4. It builds the scene AND writes:
       <your blend folder>/amsterdam_canal.glb
    (or /tmp if the file was never saved).
 5. Copy that .glb to:  your-project/public/models/amsterdam_canal.glb
 6. Reload the site — the hero auto-detects and loads it. Done.

 Re-run any time: it clears the scene first, so it's repeatable.
============================================================
"""

import bpy
import bmesh
import random
import math
import os

# ── CONFIG ──────────────────────────────────────────────────
SEED            = 404           # change for a different street layout
HOUSES_PER_SIDE = 14            # houses on each canal bank
DISTANT_HOUSES  = 18            # hazy background row
CANAL_WIDTH     = 14.0          # gap between the two banks
EXPORT_NAME     = "amsterdam_canal.glb"

random.seed(SEED)

# ── COLORS (404 DAMNED palette) ─────────────────────────────
BRICK_COLORS = [
    (0.10, 0.06, 0.05, 1),  # warm dark brick
    (0.06, 0.07, 0.09, 1),  # cool slate
    (0.09, 0.05, 0.04, 1),  # deep terracotta
    (0.05, 0.06, 0.08, 1),  # near-black blue
]
ROOF_COLOR   = (0.03, 0.035, 0.05, 1)
WIN_WARM     = (1.0, 0.72, 0.30, 1)   # lit window (warm)
WIN_COOL     = (1.0, 0.55, 0.18, 1)   # lit window (amber)
WIN_DARK     = (0.04, 0.07, 0.12, 1)  # unlit window
NEON_RED     = (0.84, 0.0, 0.11, 1)   # 404 DAMNED red


# ── CLEAN SCENE ─────────────────────────────────────────────
def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.meshes, bpy.data.materials):
        for b in list(block):
            if b.users == 0:
                block.remove(b)


# ── MATERIAL HELPERS ────────────────────────────────────────
_mat_cache = {}

def make_material(name, color, emissive=False, strength=4.0, rough=0.85, metal=0.0):
    key = (name, color, emissive, strength, rough, metal)
    if key in _mat_cache:
        return _mat_cache[key]
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    if emissive:
        emi = nt.nodes.new("ShaderNodeEmission")
        emi.inputs["Color"].default_value = color
        emi.inputs["Strength"].default_value = strength
        nt.links.new(emi.outputs["Emission"], out.inputs["Surface"])
    else:
        bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Roughness"].default_value = rough
        bsdf.inputs["Metallic"].default_value = metal
        nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    _mat_cache[key] = mat
    return mat


def add_box(name, size, location, material):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0] / 2, size[1] / 2, size[2] / 2)
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(material)
    return obj


def add_plane(name, w, h, location, rotation, material):
    bpy.ops.mesh.primitive_plane_add(size=1, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (w, h, 1)
    obj.rotation_euler = rotation
    bpy.ops.object.transform_apply(scale=True, rotation=True)
    obj.data.materials.append(material)
    return obj


# ── BUILD ONE CANAL HOUSE ───────────────────────────────────
def build_house(x, y, scale=1.0, idx=0):
    parts = []
    w = (2.4 + random.random() * 1.4) * scale
    h = 6.0 + random.random() * 9.0
    d = 3.0 + random.random() * 1.8

    brick = make_material(f"brick_{idx}", random.choice(BRICK_COLORS), rough=0.92)
    roofm = make_material("roof", ROOF_COLOR, rough=0.95)

    # body
    body = add_box(f"house_body_{idx}", (w, d, h), (x, y, h / 2), brick)
    parts.append(body)

    # ── roof: 3 Amsterdam gable styles
    style = random.randint(0, 2)
    if style == 0:  # triangular gable
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=w * 0.72, depth=h * 0.32,
                                        location=(x, y, h + h * 0.16))
        roof = bpy.context.active_object
        roof.name = f"roof_tri_{idx}"
        roof.rotation_euler = (0, 0, math.radians(45))
        bpy.ops.object.transform_apply(rotation=True)
        roof.data.materials.append(roofm)
        parts.append(roof)
    elif style == 1:  # step gable (iconic Amsterdam)
        for s in range(3):
            sw = w * (1 - s * 0.28)
            step = add_box(f"roof_step_{idx}_{s}", (sw, d * 0.96, h * 0.11),
                           (x, y, h + s * h * 0.10), roofm)
            parts.append(step)
        # little bell on top
        bpy.ops.mesh.primitive_uv_sphere_add(radius=w * 0.10,
                                             location=(x, y, h + 3 * h * 0.10))
        bell = bpy.context.active_object
        bell.name = f"roof_bell_{idx}"
        bell.data.materials.append(make_material("bell", (0.2, 0.22, 0.28, 1),
                                                 metal=0.7, rough=0.3))
        parts.append(bell)
    else:  # bell-curve gable
        top = add_box(f"roof_bell_box_{idx}", (w * 0.85, d * 0.92, h * 0.2),
                      (x, y, h + h * 0.1), roofm)
        parts.append(top)

    # ── windows grid (named so the website auto-glows them)
    cols = max(2, int(w / 1.0))
    rows = max(3, int(h / 2.2))
    front_y = y + d / 2 + 0.02
    back_y  = y - d / 2 - 0.02
    for r in range(rows):
        for c in range(cols):
            wx = x - w / 2 + (c + 1) * (w / (cols + 1))
            wz = 1.4 + r * (h - 2) / rows
            lit = random.random() > 0.42
            if lit:
                col = WIN_WARM if random.random() > 0.5 else WIN_COOL
                wmat = make_material("window_lit", col, emissive=True, strength=3.0)
                nm = "window_lit"
            else:
                wmat = make_material("window_dark", WIN_DARK, rough=0.25, metal=0.5)
                nm = "window_dark"
            # front + back panes
            add_plane(f"{nm}_{idx}_{r}_{c}_f", 0.30, 0.42,
                      (wx, front_y, wz), (math.radians(90), 0, 0), wmat)
            add_plane(f"{nm}_{idx}_{r}_{c}_b", 0.30, 0.42,
                      (wx, back_y, wz), (math.radians(90), 0, math.radians(180)), wmat)

    # door
    door_mat = make_material("door", (0.06, 0.03, 0.02, 1), emissive=True,
                             strength=0.4, rough=0.6)
    add_plane(f"door_{idx}", w * 0.11, 0.7,
              (x, front_y, 0.7), (math.radians(90), 0, 0), door_mat)

    return parts


# ── BRIDGE across the canal ─────────────────────────────────
def build_bridge(x):
    stone = make_material("bridge", (0.05, 0.06, 0.08, 1), rough=0.9)
    parts = [add_box("bridge_deck", (3, CANAL_WIDTH + 4, 0.5), (x, 0, 2.2), stone)]
    # lamp posts + glowing lamps
    for s in (-1, 1):
        post = add_box(f"bridge_post_{s}", (0.12, 0.12, 2.2),
                       (x + 0.9, s * (CANAL_WIDTH / 2 + 1), 3.2), stone)
        parts.append(post)
        lamp_mat = make_material("neon_red" if random.random() > 0.6 else "lamp",
                                 NEON_RED if random.random() > 0.6 else (1, 0.78, 0.4, 1),
                                 emissive=True, strength=6.0)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.22,
                                             location=(x + 0.9, s * (CANAL_WIDTH / 2 + 1), 4.4))
        lamp = bpy.context.active_object
        lamp.name = f"bridge_lamp_{s}"
        lamp.data.materials.append(lamp_mat)
        parts.append(lamp)
    return parts


# ── BOAT on the canal ───────────────────────────────────────
def build_boat(x):
    hull = make_material("boat", (0.04, 0.05, 0.08, 1), rough=0.8)
    parts = [add_box("boat_hull", (5, 1.6, 0.7), (x, 0, 0.35), hull)]
    lamp_mat = make_material("neon_red", NEON_RED, emissive=True, strength=5.0)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.14, location=(x + 2.2, 0, 0.9))
    lamp = bpy.context.active_object
    lamp.name = "boat_lamp"
    lamp.data.materials.append(lamp_mat)
    parts.append(lamp)
    return parts


# ── WATER plane ─────────────────────────────────────────────
def build_water():
    water_mat = make_material("water", (0.02, 0.04, 0.07, 1), rough=0.15, metal=0.9)
    return add_plane("canal_water", 120, 45, (0, 0, -0.18), (0, 0, 0), water_mat)


# ── ASSEMBLE EVERYTHING ─────────────────────────────────────
def build_city():
    clear_scene()
    idx = 0
    spacing = 3.3

    # two banks
    for i in range(HOUSES_PER_SIDE):
        bx = -HOUSES_PER_SIDE / 2 * spacing + i * spacing + random.uniform(-0.4, 0.4)
        build_house(bx, -CANAL_WIDTH / 2 - 2 - random.random() * 2, 1.0, idx); idx += 1
        build_house(bx + 1.4, CANAL_WIDTH / 2 + 2 + random.random() * 2, 1.0, idx); idx += 1

    # hazy distant row
    for i in range(DISTANT_HOUSES):
        dx = -DISTANT_HOUSES / 2 * spacing + i * spacing
        build_house(dx, -CANAL_WIDTH / 2 - 14 - random.random() * 8, 0.8, idx); idx += 1

    build_water()
    build_bridge(-HOUSES_PER_SIDE / 2 * spacing + 4)
    build_bridge(HOUSES_PER_SIDE / 2 * spacing - 4)
    build_boat(-10)

    print(f"[404 DAMNED] Built {idx} houses + water + bridges + boat.")


# ── EXPORT to GLB ───────────────────────────────────────────
def export_glb():
    blend_dir = bpy.path.abspath("//")
    if not blend_dir or not os.path.isdir(blend_dir):
        blend_dir = "/tmp"  # blend not saved yet
    out_path = os.path.join(blend_dir, EXPORT_NAME)

    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.export_scene.gltf(
        filepath=out_path,
        export_format='GLB',
        use_selection=True,
        export_apply=True,            # apply modifiers
        export_materials='EXPORT',
        export_yup=True,              # three.js expects +Y up
        export_draco_mesh_compression_enable=True,   # compress!
        export_draco_mesh_compression_level=6,
    )
    print(f"[404 DAMNED] ✅ Exported: {out_path}")
    print("[404 DAMNED] Copy it to: your-project/public/models/amsterdam_canal.glb")


# ── RUN ─────────────────────────────────────────────────────
if __name__ == "__main__":
    build_city()
    export_glb()
