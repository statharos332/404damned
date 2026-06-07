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

// ── Realistic Amsterdam "humpback" bridge — smooth curved brick arch ──
//   Red brick + white limestone accents, LED-lit inner arch (glowing portal),
//   humpback deck, curved iron railings and ornate corner lamps.
function Bridge({ z }: { z: number }) {
    const brick = useMemo(
        () => new THREE.MeshStandardMaterial({ color: new THREE.Color("#6e2b1e"), roughness: 0.9, metalness: 0.02 }),
        []
    );
    const whiteStone = useMemo(
        () => new THREE.MeshStandardMaterial({ color: new THREE.Color("#d8cfc0"), roughness: 0.7, metalness: 0.02 }),
        []
    );
    const ironMat = useMemo(
        () => new THREE.MeshStandardMaterial({ color: new THREE.Color("#0c0c10"), roughness: 0.45, metalness: 0.75 }),
        []
    );

    const span = 2 * CANAL_HALF + 2.5;
    const archR = CANAL_HALF - 0.3;
    const archThick = 2.2;
    const ringW = 0.9;
    const outerR = archR + ringW;
    const deckTopY = archR + 1.4;

    // Smooth curved arch ring (semicircular opening) via extruded Shape with a hole
    const archGeo = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-outerR, 0);
        shape.lineTo(-outerR, 0.1);
        shape.absarc(0, 0.1, outerR, Math.PI, 0, true);
        shape.lineTo(outerR, 0);
        shape.lineTo(-outerR, 0);
        const hole = new THREE.Path();
        hole.moveTo(-archR, 0.1);
        hole.absarc(0, 0.1, archR, Math.PI, 0, true);
        hole.lineTo(-archR, 0.1);
        shape.holes.push(hole);
        const g = new THREE.ExtrudeGeometry(shape, {
            depth: archThick, bevelEnabled: true, bevelThickness: 0.06,
            bevelSize: 0.06, bevelSegments: 2, curveSegments: 48,
        });
        g.translate(0, 0, -archThick / 2);
        return g;
    }, [archR, outerR, archThick]);

    // White archivolt tube tracing the arch face (both sides)
    const archivoltGeo = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 40; i++) {
            const a = Math.PI * (i / 40);
            pts.push(new THREE.Vector3(Math.cos(a) * (archR + ringW * 0.5), 0.1 + Math.sin(a) * (archR + ringW * 0.5), 0));
        }
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.16, 8, false);
    }, [archR, ringW]);

    // Humpback deck (gently curved road)
    const deckGeo = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-span / 2, deckTopY - 0.6);
        s.quadraticCurveTo(0, deckTopY + 0.5, span / 2, deckTopY - 0.6);
        s.lineTo(span / 2, deckTopY - 1.1);
        s.quadraticCurveTo(0, deckTopY, -span / 2, deckTopY - 1.1);
        s.lineTo(-span / 2, deckTopY - 0.6);
        const g = new THREE.ExtrudeGeometry(s, { depth: archThick + 1.4, bevelEnabled: false, curveSegments: 32 });
        g.translate(0, 0, -(archThick + 1.4) / 2);
        return g;
    }, [span, deckTopY, archThick]);

    // Curved coping + railing rails (tubes following the humpback)
    const sideTubes = useMemo(() => {
        const make = (railH: number, radius: number, z: number) => {
            const pts: THREE.Vector3[] = [];
            for (let i = 0; i <= 30; i++) {
                const f = i / 30;
                const tx = -span / 2 + span * f;
                const ty = deckTopY - 0.5 + Math.cos((f - 0.5) * Math.PI) * 0.5 + railH;
                pts.push(new THREE.Vector3(tx, ty, z));
            }
            return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, radius, 8, false);
        };
        return { make };
    }, [span, deckTopY]);

    // Balusters + corner lamp transforms
    const balusters = useMemo(() => {
        const arr: { x: number; y: number; z: number; ball: boolean }[] = [];
        const railZs = [archThick / 2 + 0.7, -(archThick / 2 + 0.7)];
        const nb = Math.floor(span / 0.55);
        railZs.forEach((rz) => {
            for (let i = 0; i <= nb; i++) {
                const f = i / nb;
                const bx = -span / 2 + span * f;
                const by = deckTopY - 0.4 + Math.cos((f - 0.5) * Math.PI) * 0.5;
                arr.push({ x: bx, y: by + 0.75, z: rz, ball: i % 5 === 0 });
            }
        });
        return arr;
    }, [span, deckTopY, archThick]);

    const lamps = useMemo(() => {
        return ([[-span / 2 + 0.5, 1], [span / 2 - 0.5, 1], [-span / 2 + 0.5, -1], [span / 2 - 0.5, -1]] as [number, number][])
            .map(([px, sz]) => {
                const lz = sz * (archThick / 2 + 0.7);
                const by = deckTopY - 0.4 + Math.cos((px / span) * Math.PI) * 0.5;
                return { px, lz, by };
            });
    }, [span, deckTopY, archThick]);

    // LED dots tracing the inner arch (the "glowing portal")
    const leds = useMemo(() => {
        const arr: [number, number, number][] = [];
        [archThick / 2 + 0.05, -(archThick / 2 + 0.05)].forEach((zf) => {
            for (let i = 2; i <= 38; i++) {
                const a = Math.PI * (i / 40);
                arr.push([Math.cos(a) * (archR - 0.15), 0.1 + Math.sin(a) * (archR - 0.15), zf]);
            }
        });
        return arr;
    }, [archR, archThick]);

    const railZs = [archThick / 2 + 0.7, -(archThick / 2 + 0.7)];

    return (
        <group position={[0, 0, z]}>
            {/* curved brick arch ring */}
            <mesh geometry={archGeo} material={brick} castShadow receiveShadow />

            {/* white archivolt on both faces */}
            {[archThick / 2 + 0.02, -(archThick / 2 + 0.02)].map((zf, i) => (
                <mesh key={i} geometry={archivoltGeo} material={whiteStone} position={[0, 0, zf]} castShadow />
            ))}

            {/* keystone */}
            <mesh position={[0, 0.1 + outerR - 0.3, 0]} material={whiteStone} castShadow>
                <boxGeometry args={[0.6, 1.0, archThick + 0.3]} />
            </mesh>

            {/* humpback deck */}
            <mesh geometry={deckGeo} material={brick} castShadow receiveShadow />

            {/* white coping + iron rails along both sides */}
            {railZs.map((rz, i) => (
                <group key={i}>
                    <mesh geometry={sideTubes.make(0.1, 0.18, rz)} material={whiteStone} castShadow />
                    <mesh geometry={sideTubes.make(1.5, 0.045, rz)} material={ironMat} />
                    <mesh geometry={sideTubes.make(1.0, 0.045, rz)} material={ironMat} />
                </group>
            ))}

            {/* balusters */}
            {balusters.map((b, i) => (
                <group key={i}>
                    <mesh position={[b.x, b.y, b.z]} material={ironMat}>
                        <cylinderGeometry args={[0.03, 0.03, 1.5, 6]} />
                    </mesh>
                    {b.ball && (
                        <mesh position={[b.x, b.y + 0.85, b.z]} material={ironMat}>
                            <sphereGeometry args={[0.08, 8, 8]} />
                        </mesh>
                    )}
                </group>
            ))}

            {/* ornate corner lamps */}
            {lamps.map((l, i) => (
                <group key={i}>
                    <mesh position={[l.px, l.by + 1.6, l.lz]} material={ironMat} castShadow>
                        <cylinderGeometry args={[0.07, 0.11, 3, 8]} />
                    </mesh>
                    <mesh position={[l.px, l.by + 3.2, l.lz]}>
                        <sphereGeometry args={[0.18, 12, 12]} />
                        <meshBasicMaterial color="#ffce6b" toneMapped={false} />
                    </mesh>
                    <pointLight position={[l.px, l.by + 3.2, l.lz]} intensity={2.4} distance={24} color="#ffb850" />
                </group>
            ))}

            {/* LED glowing-portal dots */}
            {leds.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.06, 6, 6]} />
                    <meshBasicMaterial color="#ffd27a" toneMapped={false} />
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

            <Bridge z={-16} />
            <Bridge z={-86} />
            <Bridge z={-155} />
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

// ── Super-realistic canal water: planar reflection + ripple shader ──
function Water() {
    const ref = useRef<THREE.Mesh>(null);
    const { gl, scene, camera } = useThree();

    // Off-screen target for the mirrored scene
    const reflRT = useMemo(
        () =>
            new THREE.WebGLRenderTarget(1024, 1024, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
            }),
        []
    );
    const reflCam = useMemo(() => new THREE.PerspectiveCamera(56, 1, 0.1, 600), []);
    const WATER_Y = -0.05;

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uReflect: { value: reflRT.texture },
            uDeep: { value: new THREE.Color("#040d16") },
            uShallow: { value: new THREE.Color("#0a2030") },
        }),
        [reflRT]
    );

    const mat = useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms,
                transparent: true,
                vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec4 vScreen;
          void main(){
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position,1.0);
            vec4 sp = projectionMatrix * viewMatrix * wp;
            vScreen = sp;
            gl_Position = sp;
          }`,
                fragmentShader: /* glsl */ `
          precision highp float;
          uniform float uTime;
          uniform sampler2D uReflect;
          uniform vec3 uDeep;
          uniform vec3 uShallow;
          varying vec2 vUv;
          varying vec4 vScreen;
          float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
          float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);
            return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
          void main(){
            vec2 scr = (vScreen.xy/vScreen.w)*0.5+0.5;
            float n1 = noise(vUv*vec2(8.0,60.0)+vec2(0.0,uTime*0.6));
            float n2 = noise(vUv*vec2(14.0,90.0)-vec2(0.0,uTime*0.9));
            float ripple = (n1+n2-1.0);
            vec2 distort = vec2(ripple*0.012, ripple*0.03);
            vec2 ruv = vec2(scr.x+distort.x, 1.0-scr.y+distort.y);
            vec3 refl = texture2D(uReflect, ruv).rgb;
            vec3 base = mix(uShallow, uDeep, clamp(vUv.y*1.2,0.0,1.0));
            float fres = clamp(pow(vUv.y,1.5)*0.9+0.25,0.0,1.0);
            vec3 col = mix(base, refl, fres*0.85);
            float spark = smoothstep(0.85,1.0,n1*n2);
            col += spark*vec3(0.5,0.4,0.25)*0.4;
            col += vec3(0.10,0.0,0.01)*smoothstep(0.4,1.0,vUv.y)*0.5;
            gl_FragColor = vec4(col, 0.96);
          }`,
            }),
        [uniforms]
    );

    const target = useRef(new THREE.Vector3());
    const frameCount = useRef(0);

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;

        // The reflection render is the single most expensive thing here.
        // Render it every OTHER frame — visually identical on rippling water,
        // but roughly halves this pass's GPU/CPU cost.
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        // Mirror the main camera across the water plane and render the scene

        reflCam.position.set(
            camera.position.x,
            2 * WATER_Y - camera.position.y,
            camera.position.z
        );
        // mirror the look target too
        camera.getWorldDirection(target.current);
        const lookAt = new THREE.Vector3()
            .copy(camera.position)
            .add(target.current.multiplyScalar(20));
        reflCam.up.set(0, -1, 0);
        reflCam.lookAt(lookAt.x, 2 * WATER_Y - lookAt.y, lookAt.z);
        reflCam.updateProjectionMatrix();

        if (ref.current) ref.current.visible = false;
        const prevTarget = gl.getRenderTarget();
        gl.setRenderTarget(reflRT);
        gl.clear();
        gl.render(scene, reflCam);
        gl.setRenderTarget(prevTarget);
        if (ref.current) ref.current.visible = true;
    });

    return (
        <mesh
            ref={ref}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, WATER_Y, -80]}
            material={mat}
        >
            <planeGeometry args={[2 * CANAL_HALF - 1.5, 240, 1, 1]} />
        </mesh>
    );
}

// ── Pauses ALL rendering when the hero is scrolled off-screen ──
// The 3D scene is the heaviest thing on the page; running it while the
// user reads the rest of the site wastes the main thread. This watches
// the canvas and flips the R3F frameloop on/off based on visibility.
function VisibilityGate() {
    const store = useThree() as unknown as {
        gl: THREE.WebGLRenderer;
        invalidate: () => void;
        setFrameloop?: (mode: "always" | "demand" | "never") => void;
    };
    useEffect(() => {
        const gl = store.gl;
        const canvas = gl?.domElement;
        if (!canvas || typeof IntersectionObserver === "undefined") return;

        const setLoop = (mode: "always" | "never") => {
            if (typeof store.setFrameloop === "function") {
                store.setFrameloop(mode);
                if (mode === "always") store.invalidate();
            }
        };

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries.some((e) => e.isIntersecting);
                setLoop(visible ? "always" : "never");
            },
            { threshold: 0.01 }
        );
        io.observe(canvas);
        return () => io.disconnect();
    }, [store]);
    return null;
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
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.3,
                powerPreference: "high-performance",
            }}
            camera={{ fov: 58, near: 0.1, far: 600, position: [0, 2.6, 8] }}
            style={{ position: "absolute", inset: 0 }}
        >
            <VisibilityGate />
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
