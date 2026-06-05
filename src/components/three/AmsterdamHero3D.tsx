"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
  Environment,
  useGLTF,
  Sparkles,
  AdaptiveDpr,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  SMAA,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * ============================================================
 *  404 DAMNED — AMSTERDAM CANAL JOURNEY HERO  (v3 — SCROLL SAIL)
 * ============================================================
 *  You start low on the water inside the canal. As you scroll,
 *  the camera sails FORWARD down the canal and passes UNDER the
 *  bridges, with Dutch canal houses on both banks and their
 *  warm + red reflections shimmering on the water.
 *
 *  Driven by `scrollProgress` (0..1) coming from HeroSection.
 * ============================================================
 */

const MODEL_URL = "/models/amsterdam_canal.glb";
const CANAL_HALF = 7;

const FACADE_COLORS = [
  "#5a3a30", "#4a322c", "#32384a", "#523c2e",
  "#3a4048", "#4a302c", "#3a4828", "#42322a",
];
const TRIM = "#f0ece2";
const DOOR_COLORS = ["#1a1510", "#5a1010", "#10261c", "#281e14"];

type GableKind = "step" | "bell" | "neck" | "spout" | "flat";

interface House {
  side: "left" | "right";
  z: number;
  w: number; h: number; d: number;
  color: string; doorColor: string; gable: GableKind;
  cols: number; floors: number;
  windows: { x: number; y: number; lit: boolean; warm: boolean }[];
}

// ── Optional real GLB ──
function RealCity({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  useMemo(() => {
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        const m = o.material as THREE.MeshStandardMaterial;
        if (m && o.name.toLowerCase().includes("window_lit")) {
          m.emissive = new THREE.Color("#ffce6b");
          m.emissiveIntensity = 2.4;
          m.toneMapped = false;
        }
        if (m && o.name.toLowerCase().includes("neon_red")) {
          m.emissive = new THREE.Color("#D6001C");
          m.emissiveIntensity = 4;
          m.toneMapped = false;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} />;
}

// ── One Dutch canal house ──
function CanalHouse({ house }: { house: House }) {
  const { w, h, d, color, doorColor, gable } = house;
  const frontZ = d / 2;


    const facadeMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(color),
                roughness: 0.65,
                metalness: 0.05,
                envMapIntensity: 1.4,
            }),
        [color]
    );
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(TRIM), roughness: 0.55 }),
    []
  );
  const roofMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color("#16161c"), roughness: 0.8, metalness: 0.1 }),
    []
  );

  const gableParts = useMemo(() => {
    const parts: { pos: [number, number, number]; size: [number, number, number]; rot?: [number, number, number]; mat: "facade" | "trim" }[] = [];
    const top = h;
    if (gable === "step") {
      for (let s = 0; s < 4; s++) {
        const sw = w * (1 - s * 0.2);
        const sh = h * 0.09;
        parts.push({ pos: [0, top + s * sh, 0], size: [sw, sh, d], mat: "facade" });
        parts.push({ pos: [0, top + s * sh + sh / 2, 0], size: [sw + 0.08, 0.06, d + 0.08], mat: "trim" });
      }
      parts.push({ pos: [0, top + 4 * h * 0.09, 0], size: [0.16, 0.55, 0.16], mat: "trim" });
    } else if (gable === "bell") {
      for (let s = 0; s < 5; s++) {
        const t = s / 5;
        const sw = w * (1 - t * t * 0.85);
        const sh = h * 0.07;
        parts.push({ pos: [0, top + s * sh, 0], size: [sw, sh, d], mat: "facade" });
      }
      parts.push({ pos: [0, top + 5 * h * 0.07 + 0.2, 0], size: [0.18, 0.45, 0.18], mat: "trim" });
    } else if (gable === "neck") {
      parts.push({ pos: [0, top + h * 0.18, 0], size: [w * 0.5, h * 0.36, d], mat: "facade" });
      parts.push({ pos: [0, top + h * 0.37, 0], size: [w * 0.6, 0.1, d + 0.04], mat: "trim" });
    } else if (gable === "flat") {
      parts.push({ pos: [0, top + 0.14, 0], size: [w + 0.14, 0.28, d + 0.14], mat: "trim" });
    }
    return parts;
  }, [gable, w, h, d]);

  return (
    <group>
      <mesh position={[0, h / 2, 0]} material={facadeMat} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>

      <mesh position={[0, 0.55, frontZ + 0.02]}>
        <boxGeometry args={[w * 0.98, 1.1, 0.12]} />
        <meshStandardMaterial color="#18141a" roughness={0.9} />
      </mesh>

      {gable !== "spout" && (
        <mesh position={[0, h + 0.45, 0]} material={roofMat} castShadow>
          <boxGeometry args={[w * 0.96, 0.9, d * 0.96]} />
        </mesh>
      )}
      {gable === "spout" && (
        <mesh position={[0, h + h * 0.17, 0]} rotation={[0, Math.PI / 4, 0]} material={facadeMat} castShadow>
          <coneGeometry args={[w * 0.72, h * 0.34, 4]} />
        </mesh>
      )}

      {gableParts.map((g, i) => (
        <mesh key={i} position={g.pos} material={g.mat === "facade" ? facadeMat : trimMat} castShadow>
          <boxGeometry args={g.size} />
        </mesh>
      ))}

      {/* hijsbalk */}
      <mesh position={[0, h + 1, frontZ + 0.4]} castShadow>
        <boxGeometry args={[0.14, 0.14, 1]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.8} />
      </mesh>

      {house.windows.map((win, i) => (
        <group key={i} position={[win.x, win.y, frontZ + 0.05]}>
          <mesh material={trimMat}>
            <boxGeometry args={[0.7, 1.0, 0.08]} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[0.56, 0.86]} />
            {win.lit ? (
              <meshBasicMaterial color={win.warm ? "#ffd87a" : "#ffb050"} toneMapped={false} />
            ) : (
              <meshStandardMaterial color="#0e1c30" roughness={0.2} metalness={0.5} emissive="#0a1424" emissiveIntensity={0.4} />
            )}
          </mesh>
          <mesh position={[0, 0, 0.06]} material={trimMat}>
            <boxGeometry args={[0.05, 0.86, 0.03]} />
          </mesh>
        </group>
      ))}

      {/* door + fanlight */}
      <mesh position={[0, 0.9, frontZ + 0.05]}>
        <boxGeometry args={[0.6, 1.7, 0.1]} />
        <meshStandardMaterial color={doorColor} roughness={0.6} emissive="#1a0e06" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 1.85, frontZ + 0.07]}>
        <planeGeometry args={[0.56, 0.2]} />
        <meshBasicMaterial color="#ffd87a" toneMapped={false} />
      </mesh>
    </group>
  );
}

// ── Bridge we sail under ──
function Bridge({ z }: { z: number }) {
    const stone = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color("#3a2f28"),
                roughness: 0.95,
                metalness: 0.02,
            }),
        []
    );

    const rail = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color("#1a1a1a"),
                roughness: 0.7,
            }),
        []
    );

    return (
        <group position={[0, 0, z]}>
            {/* main deck */}
            <mesh position={[0, 3.2, 0]} material={stone} castShadow>
                <boxGeometry args={[2 * CANAL_HALF + 3, 0.8, 6]} />
            </mesh>

            {/* arch (real Amsterdam feel) */}
            <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]} material={stone}>
                {/* arch under bridge (Amsterdam style) */}
                <mesh position={[0, 1.6, 0]} material={stone}>
                    <boxGeometry args={[CANAL_HALF * 1.8, 2.2, 4]} />
                </mesh>
            </mesh>

            {/* side walls */}
            {[-1, 1].map((s) => (
                <group key={s} position={[s * (CANAL_HALF + 1.2), 2.5, 0]}>
                    <mesh material={stone}>
                        <boxGeometry args={[0.8, 3.5, 6]} />
                    </mesh>

                    {/* railing */}
                    <mesh position={[0, 2.3, 0]} material={rail}>
                        <boxGeometry args={[0.15, 0.15, 6]} />
                    </mesh>

                    {/* street light */}
                    <mesh position={[0, 3.2, 0]}>
                        <sphereGeometry args={[0.18, 12, 12]} />
                        <meshBasicMaterial color="#ffcc77" toneMapped={false} />
                    </mesh>

                    <pointLight intensity={1.5} distance={20} color="#ffbb66" />
                </group>
            ))}
        </group>
    );
}

// ── Reflection streaks on water ──
function Reflections() {
  const ref = useRef<THREE.Group>(null);
  const streaks = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      x: -CANAL_HALF + 1.5 + Math.random() * (2 * CANAL_HALF - 3),
      z: -150 + Math.random() * 158,
      len: 2 + Math.random() * 3,
      red: Math.random() > 0.5,
      ph: Math.random() * Math.PI * 2,
    }));
  }, []);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.children.forEach((c, i) => {
      const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 * (0.5 + 0.5 * Math.sin(t * 2 + streaks[i].ph));
    });
  });
  return (
    <group ref={ref}>
      {streaks.map((s, i) => (
        <mesh key={i} position={[s.x, 0.02, s.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, s.len]} />
          <meshBasicMaterial
            color={s.red ? "#D6001C" : "#ffc266"}
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Procedural canal (two banks) ──
function ProceduralCity() {
  const houses = useMemo<House[]>(() => {
    const arr: House[] = [];
    const gables: GableKind[] = ["step", "bell", "neck", "spout", "flat"];

    function makeRow(side: "left" | "right") {
      let z = 10;
      while (z > -160) {
        const w = 2.6 + Math.random() * 0.8;
        const h = 9 + Math.random() * 6;
        const d = 3.5 + Math.random() * 1.5;
        const floors = Math.max(3, Math.round(h / 2.4));
        const cols = Math.random() > 0.5 ? 2 : 3;
        const windows: House["windows"] = [];
        for (let f = 0; f < floors; f++) {
          for (let c = 0; c < cols; c++) {
            const wx = -w / 2 + (c + 1) * (w / (cols + 1));
            const wy = 2.4 + f * ((h - 3) / floors);
            windows.push({ x: wx, y: wy, lit: Math.random() > 0.38, warm: Math.random() > 0.45 });
          }
        }
        arr.push({
          side, z, w, h, d,
          color: FACADE_COLORS[Math.floor(Math.random() * FACADE_COLORS.length)],
          doorColor: DOOR_COLORS[Math.floor(Math.random() * DOOR_COLORS.length)],
          gable: gables[Math.floor(Math.random() * gables.length)],
          cols, floors, windows,
        });
        z -= d + 0.15;
      }
    }
    makeRow("left");
    makeRow("right");
    return arr;
  }, []);

  return (
    <group>
      {houses.map((h, i) => (
        <group
          key={i}
          position={[h.side === "left" ? -CANAL_HALF : CANAL_HALF, 0, h.z]}
          rotation={[0, h.side === "left" ? Math.PI / 2 : -Math.PI / 2, 0]}
        >
          <CanalHouse house={h} />
        </group>
      ))}

      {/* embankment walls */}
      {[-CANAL_HALF + 1.2, CANAL_HALF - 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.3, -70]} receiveShadow>
          <boxGeometry args={[1.2, 1.4, 180]} />
          <meshStandardMaterial color="#1a1a14" roughness={0.95} />
        </mesh>
      ))}

      <Bridge z={-12} />
      <Bridge z={-78} />
      <Bridge z={-140} />
      <Reflections />
    </group>
  );
}

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
      .catch(() => alive && setChecked(true));
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

// ── Animated water surface ──
function Water() {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(2 * CANAL_HALF - 2, 200, 40, 120), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const ix = base[i * 3];
      const iz = base[i * 3 + 2];
        pos.array[i * 3 + 2] =
            Math.sin(ix * 0.18 + t * 0.5) * 0.03 +
            Math.cos(iz * 0.12 + t * 0.4) * 0.02;
    }
    pos.needsUpdate = true;
  });
  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -70]} receiveShadow>
      <meshStandardMaterial color="#06121f" roughness={0.12} metalness={0.95} transparent opacity={0.97} />
    </mesh>
  );
}

// ── Camera sails down the canal on scroll ──
function CameraRig({ scrollProgress }: any) {
    const { camera } = useThree();
    const target = useRef(new THREE.Vector3());

    useFrame((state) => {
        const p = scrollProgress.current;

        const z = 8 - p * 150;

        // smooth deterministic drift (scroll-based, όχι time-only)
        const xDrift = Math.sin(p * Math.PI * 2) * 0.12;

        const desiredPos = new THREE.Vector3(
            xDrift,
            0.65,
            z + 1.2
        );

        // stronger damping = no reverse wobble
        camera.position.lerp(desiredPos, 0.12);

        // FIXED forward look direction (important!)
        target.current.set(
            xDrift * 0.5,
            0.6,
            z - 20
        );

        camera.lookAt(target.current);

        // safe roll (clamped)
        camera.rotation.z = Math.sin(p * Math.PI * 2) * 0.005;
    });

    return null;
}

function Lighting() {
    return (
        <>
            {/* ambient πολύ χαμηλό (cinematic darkness) */}
            <ambientLight intensity={0.08} color="#1b2a3a" />

            {/* moon key light */}
            <directionalLight
                position={[-30, 50, -20]}
                intensity={1.4}
                color="#cfe3ff"
                castShadow
            />

            {/* canal bounce (warm HDR response) */}
            <pointLight
                position={[0, 3, -30]}
                intensity={4.0}
                color="#ffb36a"
                distance={180}
            />

            {/* rim separation (IMPORTANT για σπίτια) */}
            <pointLight
                position={[0, 10, 60]}
                intensity={2.2}
                color="#4aa3ff"
                distance={250}
            />
        </>
    );
}

function Post() {
  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      <Bloom intensity={1.0} luminanceThreshold={0.78} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />
      <Vignette eskil={false} offset={0.2} darkness={0.8} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

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
        toneMappingExposure: 1.3,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 58, near: 0.1, far: 600, position: [0, 2.6, 8] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#04060c"]} />
        <fogExp2 attach="fog" args={["#070a0f", 0.022]} />

      <Suspense fallback={null}>
          <Environment
              files="/hdr/tears_of_steel_bridge_1k.exr"
              background={false}
              blur={0.35}
              resolution={1024}
          />
        <Lighting />
        <City />
        <Water />
        <Sparkles count={80} scale={[2 * CANAL_HALF, 12, 160]} size={2} speed={0.25} opacity={0.5} color="#ffc070" position={[0, 5, -70]} />
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
