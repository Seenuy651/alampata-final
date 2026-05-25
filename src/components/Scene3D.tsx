import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Float,
  Environment,
  Stars,
  MeshDistortMaterial,
  Sparkles,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import wine from "@/assets/products/wine.jpg";
import green from "@/assets/products/green.jpg";
import cica from "@/assets/products/cica.jpg";
import radiating from "@/assets/products/radiating.jpg";
import combo from "@/assets/products/combo.jpg";

/* ───────── scroll progress hook (0 → 1 across page) ───────── */
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/* Build a transparent canvas texture for label text (no external font fetch) */
function makeLabelTexture(title: string, sub: string, tint: string) {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#eaffe9";
  ctx.font = "700 130px 'Space Grotesk', system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(title.toUpperCase(), 24, 200);
  ctx.fillStyle = tint;
  ctx.font = "500 44px 'Inter', system-ui, sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("ALAMPATA · SKINCARE", 28, 320);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/* ───────── Floating product "card" (frosted plane with title + image) ───────── */
function ProductCard({
  src,
  title,
  position,
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
  tint = "#7df0ce",
}: {
  src: string;
  title: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  tint?: string;
}) {
  const tex = useLoader(TextureLoader, src);
  tex.anisotropy = 8;
  const labelTex = useMemo(() => makeLabelTexture(title, "", tint), [title, tint]);
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.08;
  });
  const W = 2.6 * scale;
  const H = 1.6 * scale;
  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.6} floatingRange={[0.05, 0.25]}>
      <group ref={group} position={position} rotation={rotation}>
        {/* outer glow */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[W * 1.4, H * 1.6]} />
          <meshBasicMaterial color={tint} transparent opacity={0.14} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* glass card body */}
        <mesh>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial color="#0e1a18" transparent opacity={0.55} />
        </mesh>
        {/* product image */}
        <mesh position={[-W * 0.28, 0, 0.02]}>
          <planeGeometry args={[H * 0.85, H * 0.85]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} />
        </mesh>
        {/* label texture */}
        <mesh position={[W * 0.18, 0, 0.03]}>
          <planeGeometry args={[W * 0.55, H * 0.55]} />
          <meshBasicMaterial map={labelTex} transparent toneMapped={false} />
        </mesh>
        {/* border */}
        <lineSegments position={[0, 0, 0.035]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(W, H)]} />
          <lineBasicMaterial color={tint} transparent opacity={0.6} />
        </lineSegments>
      </group>
    </Float>
  );
}

/* ───────── Vertical "coral" particle column (the tall living stream in the reel) ───────── */
function CoralColumn({ count = 1600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const cA = new THREE.Color("#7df0ce");
    const cB = new THREE.Color("#a78bfa");
    const cC = new THREE.Color("#10d39a");
    for (let i = 0; i < count; i++) {
      const y = (Math.random() - 0.5) * 22; // tall column
      const radius = 0.25 + Math.pow(Math.random(), 2) * 1.6;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      const mix = Math.random();
      const c = mix < 0.4 ? cA : mix < 0.75 ? cC : cB;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      sizes[i] = 0.04 + Math.random() * 0.12;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.12;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.008 + (i % 7) * 0.0008;
      if (arr[i * 3 + 1] > 11) arr[i * 3 + 1] = -11;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ───────── Distorted logo orb (intro/outro) ───────── */
function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.25;
    ref.current.rotation.x = s.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.1, 6]} />
        <MeshDistortMaterial
          color="#10d39a"
          emissive="#0d7a5f"
          emissiveIntensity={0.7}
          roughness={0.15}
          metalness={0.8}
          distort={0.45}
          speed={1.6}
        />
      </mesh>
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshBasicMaterial color="#5be9b9" wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

/* ───────── Rotating wireframe rings ───────── */
function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (a.current) { a.current.rotation.x = t * 0.25; a.current.rotation.y = t * 0.18; }
    if (b.current) { b.current.rotation.y = -t * 0.2; b.current.rotation.z = t * 0.15; }
  });
  return (
    <group>
      <mesh ref={a}>
        <torusGeometry args={[2.4, 0.012, 16, 160]} />
        <meshBasicMaterial color="#7df0ce" transparent opacity={0.5} />
      </mesh>
      <mesh ref={b}>
        <torusGeometry args={[3.0, 0.008, 12, 200]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* ───────── Camera rig driven by mouse + scroll ───────── */
function CameraRig({ progress }: { progress: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const p = progress.current;
    // Path: intro close to orb → fly through cards → pull back to outro
    // Y rises through the column, Z varies for parallax feeling
    const targetY = THREE.MathUtils.lerp(0, 6, p) - (p > 0.85 ? (p - 0.85) * 20 : 0);
    const targetZ = 8 - Math.sin(p * Math.PI) * 3.5; // closer in middle
    const targetX = Math.sin(p * Math.PI * 2) * 1.2;
    const mx = state.pointer.x * 0.6;
    const my = state.pointer.y * 0.4;
    state.camera.position.x += (targetX + mx - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY + my - state.camera.position.y) * 0.05;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.lookAt(0, targetY * 0.6, 0);
  });
  return null;
}

/* ───────── Scene root ───────── */
export default function Scene3D() {
  const scroll = useScrollProgress();
  const progress = useRef(0);
  useEffect(() => { progress.current = scroll; }, [scroll]);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      {/* gradient sky */}
      <color attach="background" args={["#0a0e1f"]} />
      <fog attach="fog" args={["#0a0e1f", 10, 26]} />

      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#7df0ce" />
      <pointLight position={[-6, -3, -4]} intensity={1.1} color="#a78bfa" />
      <pointLight position={[0, 6, 4]} intensity={0.9} color="#5be9b9" />

      <Suspense fallback={<Html><div /></Html>}>
        {/* Central coral particle column */}
        <CoralColumn />

        {/* Orb sits at the bottom of the column for intro */}
        <group position={[0, -1, 0]}>
          <CoreOrb />
          <Rings />
        </group>

        {/* Floating product cards distributed along Y so scroll flies past them */}
        <ProductCard src={wine}      title="Luminous Wine"     position={[-3.2, 1.5,  -0.5]} rotation={[0,  0.25, 0]} scale={1.1} tint="#f9a8a8" />
        <ProductCard src={green}     title="Celestial Green"   position={[ 3.4, 2.8,   0.2]} rotation={[0, -0.30, 0]} scale={1.05} tint="#7df0ce" />
        <ProductCard src={cica}      title="Cica · Ceramide"   position={[-3.6, 4.2,   0.4]} rotation={[0,  0.20, 0]} scale={1.05} tint="#a78bfa" />
        <ProductCard src={radiating} title="Skin Radiating"    position={[ 3.2, 5.6,  -0.3]} rotation={[0, -0.22, 0]} scale={1.1} tint="#fecaca" />
        <ProductCard src={combo}     title="Summer Combo"      position={[-3.0, 7.0,   0.0]} rotation={[0,  0.18, 0]} scale={1.15} tint="#73ffb8" />

        <Sparkles count={180} scale={[10, 22, 10]} size={3} speed={0.4} color="#a78bfa" />
        <Stars radius={60} depth={20} count={2500} factor={3} fade speed={0.6} />
        <Environment preset="night" />
      </Suspense>

      <CameraRig progress={progress} />
    </Canvas>
  );
}
