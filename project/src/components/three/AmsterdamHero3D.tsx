"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  MeshReflectorMaterial,
  Sparkles,
  Cloud,
  AdaptiveDpr,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  ToneMapping,
  SMAA,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * ============================================================
 *  404 DAMNED — AMSTERDAM CANAL HOUSES HERO
 * ============================================================
 *  The procedural city now builds UNMISTAKABLE Dutch canal
 *  houses: narrow tall facades packed shoulder-to-shoulder
 *  along the water, each topped with an authentic Amsterdam
 *  gable (step / bell / neck / spout), white window frames in
 *  a grid, a stoep door, and the iconic hijsbalk hoist beam.
 *
 *  If /public/models/amsterdam_canal.glb exists it is loaded
 *  instead; otherwise this procedural street is used.
 * ============================================================
 */

const MODEL_URL = "/models/amsterdam_canal.glb";

// Authentic Amsterdam facade colours (dark, moody — matches the card)
const FACADE_COLORS = [
  "#3a2420", // warm brown brick
  "#2a1c1a", // dark chocolate brick
  "#1c2230", // slate blue-grey
  "#382a22", // sienna
  "#202428", // charcoal
  "#2e1e1c", // deep oxblood brick
  "#243018", // dark olive (painted)
];
const TRIM = "#e8e4dc"; // off-white window frames / cornices
const DOOR_COLORS = ["#14110e", "#3a0a0a", "#0a1a14", "#1a1410"];

type GableKind = "step" | "bell" | "neck" | "spout" | "flat";

interface House {
  x: number;
  z: number;
  facing: 1 | -1; // which way it faces the canal
  w: number;
  h: number;
  d: number;
  color: string;
  doorColor: string;
  gable: GableKind;
  cols: number;
  floors: number;
  windows: { x: number; y: number; lit: boolean; warm: boolean }[];
}

// ── REAL GLB MODEL (used only if the file actually exists) ──
function RealCity({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  useMemo(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const mat = obj.material as THREE.MeshStandardMaterial;
        if (mat && obj.name.toLowerCase().includes("window_lit")) {
          mat.emissive = new THREE.Color("#ffb347");
          mat.emissiveIntensity = 2.4;
          mat.toneMapped = false;
        }
        if (mat && obj.name.toLowerCase().includes("neon_red")) {
          mat.emissive = new THREE.Color("#D6001C");
          mat.emissiveIntensity = 4;
          mat.toneMapped = false;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} />;
}

// ── A SINGLE DUTCH CANAL HOUSE ──────────────────────────────
function CanalHouse({ house }: { house: House }) {
  const { w, h, d, color, doorColor, gable, facing } = house;
  const frontZ = (d / 2) * facing; // canal-facing wall
  const eps = 0.03 * facing;

  const facadeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.9, metalness: 0.04 }),
    [color]
  );
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(TRIM), roughness: 0.6, metalness: 0 }),
    []
  );
  const roofMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color("#0c0c10"), roughness: 0.85, metalness: 0.1 }),
    []
  );

  // Gable geometry built on top of the facade (in facade-local space, +Z = front)
  const gableParts = useMemo(() => {
    const parts: { pos: [number, number, number]; size: [number, number, number]; rot?: [number, number, number]; mat: "facade" | "trim" | "roof" }[] = [];
    const top = h;
    if (gable === "step") {
      // Trapstgevel — stacked shrinking blocks
      const steps = 4;
      for (let s = 0; s < steps; s++) {
        const sw = w * (1 - s * 0.2);
        const sh = h * 0.09;
        parts.push({ pos: [0, top + s * sh, 0], size: [sw, sh, d], mat: "facade" });
        // white step caps
        parts.push({ pos: [0, top + s * sh + sh / 2, 0], size: [sw + 0.06, 0.05, d + 0.06], mat: "trim" });
      }
      // little finial
      parts.push({ pos: [0, top + steps * h * 0.09, 0], size: [0.14, 0.5, 0.14], mat: "trim" });
    } else if (gable === "bell") {
      // Klokgevel — rounded; approximate with shrinking rounded steps
      const steps = 5;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        const sw = w * (1 - t * t * 0.85);
        const sh = h * 0.07;
        parts.push({ pos: [0, top + s * sh, 0], size: [sw, sh, d], mat: "facade" });
      }
      parts.push({ pos: [0, top + steps * h * 0.07, 0], size: [0.16, 0.4, 0.16], mat: "trim" });
    } else if (gable === "neck") {
      // Halsgevel — a raised neck block with shoulders
      parts.push({ pos: [0, top + h * 0.18, 0], size: [w * 0.5, h * 0.36, d], mat: "facade" });
      parts.push({ pos: [-w * 0.32, top + 0.05, 0], size: [w * 0.18, h * 0.12, d * 0.6], mat: "trim" });
      parts.push({ pos: [w * 0.32, top + 0.05, 0], size: [w * 0.18, h * 0.12, d * 0.6], mat: "trim" });
      parts.push({ pos: [0, top + h * 0.37, 0], size: [w * 0.6, 0.08, d + 0.04], mat: "trim" });
    } else if (gable === "spout") {
      // Tuitgevel / triangular pointed gable
      parts.push({ pos: [0, top + h * 0.16, 0], size: [w, h * 0.32, d], rot: [0, Math.PI / 4, 0], mat: "roof" });
    } else {
      // flat cornice (lijstgevel)
      parts.push({ pos: [0, top + 0.12, 0], size: [w + 0.12, 0.24, d + 0.12], mat: "trim" });
    }
    return parts;
  }, [gable, w, h, d]);

  const matFor = (k: "facade" | "trim" | "roof") =>
    k === "facade" ? facadeMat : k === "trim" ? trimMat : roofMat;

  return (
    <group position={[house.x, 0, house.z]}>
      {/* main facade body */}
      <mesh position={[0, h / 2, 0]} material={facadeMat} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>

      {/* ground-floor plinth (slightly darker base) */}
      <mesh position={[0, 0.5, frontZ + eps * 0.3]} castShadow>
        <boxGeometry args={[w * 0.98, 1.0, 0.08]} />
        <meshStandardMaterial color="#0e0c0c" roughness={0.9} />
      </mesh>

      {/* spout/triangular roof behind needs a roof box for others */}
      {gable !== "spout" && (
        <mesh position={[0, h + 0.4, 0]} material={roofMat} castShadow>
          <boxGeometry args={[w * 0.96, 0.8, d * 0.96]} />
        </mesh>
      )}

      {/* gable parts */}
      {gableParts.map((g, i) => (
        <mesh
          key={i}
          position={g.pos}
          rotation={g.rot}
          material={matFor(g.mat)}
          castShadow
        >
          {g.mat === "roof" && g.rot ? (
            <coneGeometry args={[g.size[0] * 0.72, g.size[1], 4]} />
          ) : (
            <boxGeometry args={g.size} />
          )}
        </mesh>
      ))}

      {/* hijsbalk — the iconic Amsterdam hoist beam sticking out the top */}
      <mesh position={[0, h + 0.9, frontZ + 0.35 * facing]} castShadow>
        <boxGeometry args={[0.12, 0.12, 0.9]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.8} />
      </mesh>
      <mesh position={[0, h + 0.78, frontZ + 0.72 * facing]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#1a1a1e" />
      </mesh>

      {/* windows with white frames */}
      {house.windows.map((win, i) => (
        <group key={i} position={[win.x, win.y, frontZ + eps]}>
          {/* white frame */}
          <mesh material={trimMat}>
            <boxGeometry args={[0.62, 0.92, 0.06]} />
          </mesh>
          {/* glass */}
          <mesh position={[0, 0, 0.04 * facing]}>
            <planeGeometry args={[0.5, 0.8]} />
            {win.lit ? (
              <meshBasicMaterial
                color={win.warm ? "#ffce6b" : "#ffa838"}
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            ) : (
              <meshStandardMaterial
                color="#0b1626"
                roughness={0.2}
                metalness={0.5}
                emissive="#060f1c"
                emissiveIntensity={0.25}
                side={THREE.DoubleSide}
              />
            )}
          </mesh>
          {/* window cross muntins */}
          <mesh position={[0, 0, 0.05 * facing]} material={trimMat}>
            <boxGeometry args={[0.5, 0.04, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.05 * facing]} material={trimMat}>
            <boxGeometry args={[0.04, 0.8, 0.02]} />
          </mesh>
        </group>
      ))}

      {/* door + stoep */}
      <mesh position={[0, 0.85, frontZ + eps]}>
        <boxGeometry args={[0.55, 1.6, 0.08]} />
        <meshStandardMaterial color={doorColor} roughness={0.6} emissive="#1a0e06" emissiveIntensity={0.3} />
      </mesh>
      {/* door frame */}
      <mesh position={[0, 0.85, frontZ + eps * 0.8]} material={trimMat}>
        <boxGeometry args={[0.68, 1.74, 0.05]} />
      </mesh>
      {/* fanlight glow above door */}
      <mesh position={[0, 1.72, frontZ + eps * 1.2]}>
        <planeGeometry args={[0.5, 0.18]} />
        <meshBasicMaterial color="#ffce6b" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── PROCEDURAL CANAL STREET (default — no assets needed) ────
function ProceduralCity() {
  const houses = useMemo<House[]>(() => {
    const arr: House[] = [];
    const gables: GableKind[] = ["step", "bell", "neck", "spout", "flat"];

    function build(x: number, z: number, facing: 1 | -1, scale: number) {
      // Dutch canal houses are NARROW and TALL, packed together
      const w = (2.0 + Math.random() * 0.8) * scale;
      const h = (8 + Math.random() * 5) * scale;
      const d = 3.0 + Math.random() * 1.2;
      const floors = Math.max(3, Math.round(h / 2.3));
      const cols = Math.random() > 0.5 ? 2 : 3;

      const windows: House["windows"] = [];
      for (let f = 0; f < floors; f++) {
        for (let c = 0; c < cols; c++) {
          const wx = -w / 2 + (c + 1) * (w / (cols + 1));
          const wy = 2.2 + f * ((h - 2.6) / floors);
          // upper floors more likely lit at night
          const lit = Math.random() > 0.45;
          windows.push({ x: wx, y: wy, lit, warm: Math.random() > 0.45 });
        }
      }

      arr.push({
        x, z, facing, w, h, d,
        color: FACADE_COLORS[Math.floor(Math.random() * FACADE_COLORS.length)],
        doorColor: DOOR_COLORS[Math.floor(Math.random() * DOOR_COLORS.length)],
        gable: gables[Math.floor(Math.random() * gables.length)],
        cols, floors, windows,
      });
    }

    // Pack houses tightly along each bank (touching shoulders, like real canals)
    let xL = -34;
    while (xL < 34) {
      const w = 2.0 + Math.random() * 0.8;
      build(xL + w / 2, -8.5, 1, 1); // far bank faces +Z toward camera/canal
      xL += w + 0.12;
    }
    let xR = -34;
    while (xR < 34) {
      const w = 2.0 + Math.random() * 0.8;
      build(xR + w / 2, 8.5, -1, 1); // near bank faces -Z toward canal
      xR += w + 0.12;
    }

    // hazy distant row behind the far bank
    let xD = -42;
    while (xD < 42) {
      const w = (2.0 + Math.random() * 0.8) * 0.85;
      build(xD + w / 2, -20 - Math.random() * 6, 1, 0.85);
      xD += w + 0.2;
    }

    return arr;
  }, []);

  return (
    <group>
      {houses.map((h, i) => (
        <CanalHouse key={i} house={h} />
      ))}
      {/* stone canal embankments (kademuur) on both sides */}
      <mesh position={[0, 0.1, -6.6]} castShadow receiveShadow>
        <boxGeometry args={[80, 1.2, 1.2]} />
        <meshStandardMaterial color="#14140f" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.1, 6.6]} castShadow receiveShadow>
        <boxGeometry args={[80, 1.2, 1.2]} />
        <meshStandardMaterial color="#14140f" roughness={0.95} />
      </mesh>
    </group>
  );
}

// ── CITY: try the real model, fall back to procedural ──────
function City() {
  const [hasModel, setHasModel] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(MODEL_URL, { method: "HEAD" })
      .then((r) => {
        if (!alive) return;
        const type = r.headers.get("content-type") || "";
        setHasModel(r.ok && !type.includes("text"));
        setChecked(true);
      })
      .catch(() => {
        if (alive) setChecked(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!checked) return null;
  if (hasModel) {
    return (
      <Suspense fallback={<ProceduralCity />}>
        <RealCity url={MODEL_URL} />
      </Suspense>
    );
  }
  return <ProceduralCity />;
}

// ── REFLECTIVE CANAL WATER ──────────────────────────────────
function CanalWater() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
      <planeGeometry args={[220, 90]} />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={0.75}
        mixBlur={8}
        mixStrength={2}
        roughness={0.4}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#040a14"
        metalness={0.85}
      />
    </mesh>
  );
}

// ── CINEMATIC CAMERA RIG ────────────────────────────────────
// Looks DOWN the canal so both rows of houses frame the water.
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 6, -20));
  useFrame((_, delta) => {
    const p = scrollProgress.current;
    const dx = Math.sin(performance.now() * 0.0001) * 2 + pointer.x * 3;
    const dy = 6 + pointer.y * -1.5 + p * 7;
    const dz = 30 - p * 22;
    const k = Math.min(1, delta * 1.4);
    camera.position.x += (dx - camera.position.x) * k;
    camera.position.y += (dy - camera.position.y) * k;
    camera.position.z += (dz - camera.position.z) * k;
    target.current.set(pointer.x * 2, 5.5 - pointer.y * 1.5, -18);
    camera.lookAt(target.current);
  });
  return null;
}

// ── ATMOSPHERE ──────────────────────────────────────────────
function Atmosphere() {
  return (
    <>
      <Cloud position={[0, 7, -22]} speed={0.12} opacity={0.05} color="#0a1830" segments={18} bounds={[50, 6, 16]} />
      <Sparkles count={100} scale={[60, 14, 30]} size={2} speed={0.25} opacity={0.45} color="#ffc070" position={[0, 5, -6]} />
      <Sparkles count={36} scale={[30, 10, 14]} size={3} speed={0.2} opacity={0.35} color="#D6001C" position={[0, 4, 10]} />
    </>
  );
}

// ── LIGHTING ────────────────────────────────────────────────
function Lighting() {
  const red = useRef<THREE.PointLight>(null);
  useFrame((s) => {
    if (red.current) {
      red.current.intensity = 5 + Math.sin(s.clock.elapsedTime * 1.5) * 1.3;
      red.current.position.x = Math.sin(s.clock.elapsedTime * 0.3) * 10;
    }
  });
  return (
    <>
      <directionalLight position={[-20, 40, 15]} intensity={0.55} color="#8fa8d6" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
      <ambientLight intensity={0.28} color="#1a2540" />
      <pointLight position={[0, 4, 18]} intensity={1.8} color="#ffb060" distance={55} />
      <pointLight ref={red} position={[0, 13, 8]} intensity={5} color="#D6001C" distance={85} />
      <pointLight position={[-22, 6, -10]} intensity={2.6} color="#D6001C" distance={65} />
    </>
  );
}

// ── POST PROCESSING ─────────────────────────────────────────
function Post() {
  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      <Bloom intensity={1.05} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />
      <DepthOfField focusDistance={0.015} focalLength={0.05} bokehScale={4} height={700} />
      <Vignette eskil={false} offset={0.18} darkness={0.85} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

// ── MAIN EXPORT ─────────────────────────────────────────────
export default function AmsterdamHero3D({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 52, near: 0.1, far: 500, position: [0, 6, 30] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#02040a"]} />
      <fogExp2 attach="fog" args={["#02040a", 0.022]} />

      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
        <Lighting />
        <City />
        <CanalWater />
        <Atmosphere />
        <CameraRig scrollProgress={scrollProgress} />
        <Post />
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}

try {
  useGLTF.preload(MODEL_URL);
} catch {}
