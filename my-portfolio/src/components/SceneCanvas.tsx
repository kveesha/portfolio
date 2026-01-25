import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Sparkles, Stars } from "@react-three/drei"
import * as THREE from "three"

/**
 * Full-screen 3D background.
 * pointer-events disabled so it never blocks UI interactions.
 */
export default function SceneCanvas() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const set = () => setReduce(!!mq.matches)
    set()
    mq.addEventListener?.("change", set)
    return () => mq.removeEventListener?.("change", set)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={reduce ? 1 : [1, 2]}
        gl={{ antialias: !reduce, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 50 }}
      >
        <color attach="background" args={[0x07090d]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        <Suspense fallback={null}>
          <Scene reduce={reduce} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene({ reduce }: { reduce: boolean }) {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <group>
      {!reduce ? <Stars radius={90} depth={55} count={1400} factor={4} fade speed={1} /> : null}

      {/* Soft sparkles near center */}
      <Sparkles count={reduce ? 40 : 140} scale={[14, 10, 1]} size={reduce ? 1 : 2} speed={0.35} />

      {/* Premium central form (NO knot) */}
      <Float floatIntensity={reduce ? 0.25 : 0.65} rotationIntensity={reduce ? 0.15 : 0.55} speed={reduce ? 0.7 : 1.0}>
        <GlassShards mouseRef={mouse} />
      </Float>

      {/* Subtle halo accent */}
      <Float floatIntensity={reduce ? 0.25 : 0.55} rotationIntensity={reduce ? 0.15 : 0.45} speed={reduce ? 0.7 : 1.0}>
        <Halo mouseRef={mouse} />
      </Float>

      {/* Background depth particles (NO orbit ring) */}
      {!reduce ? <FlowParticles mouseRef={mouse} /> : null}
    </group>
  )
}

/* =========================
   GLASS SHARDS (premium)
========================= */

function GlassShards({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>
}) {
  const group = useRef<THREE.Group>(null!)

  const shards = useMemo(() => {
    const count = 14
    return Array.from({ length: count }).map((_, i) => {
      const w = 1.2 + Math.random() * 1.6
      const h = 0.08 + Math.random() * 0.18
      const d = 0.45 + Math.random() * 0.9

      return {
        key: i,
        size: [w, h, d] as [number, number, number],
        pos: [
          (Math.random() - 0.5) * 5.2,
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 2.0,
        ] as [number, number, number],
        rot: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        drift: 0.25 + Math.random() * 0.65,
        spin: (Math.random() - 0.5) * 0.45,
      }
    })
  }, [])

  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#bcd7ff"),
        roughness: 0.08,
        metalness: 0.0,
        transmission: 1.0,
        thickness: 0.3,
        ior: 1.5,
        transparent: true,
        opacity: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      }),
    []
  )

  useFrame((state, dt) => {
    const m = mouseRef.current
    const t = state.clock.elapsedTime

    // parallax
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, m.x * 0.55, 0.05)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, m.y * 0.35, 0.05)

    // slow cluster rotation
    group.current.rotation.y += dt * 0.06
    group.current.rotation.x += dt * 0.03

    // per-shard micro wobble
    const g = group.current
    for (let i = 0; i < g.children.length; i++) {
      const child = g.children[i] as THREE.Mesh
      child.rotation.y += dt * 0.12 * (0.2 + i * 0.02)
      child.rotation.z += dt * 0.1 * (0.2 + i * 0.015)
      child.position.y += Math.sin(t * shards[i].drift + i) * 0.0008
      child.rotation.x += dt * shards[i].spin * 0.12
    }
  })

  return (
    <group ref={group} position={[0.4, 0.1, 0.2]}>
      {shards.map((s) => (
        <mesh key={s.key} position={s.pos} rotation={s.rot} material={mat}>
          <boxGeometry args={s.size} />
        </mesh>
      ))}
    </group>
  )
}

/* =========================
   HALO ACCENT (subtle)
========================= */

function Halo({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>
}) {
  const ring = useRef<THREE.Mesh>(null!)

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00d1ff"),
        roughness: 0.3,
        metalness: 0.7,
        emissive: new THREE.Color("#00313a"),
        emissiveIntensity: 1.6,
        transparent: true,
        opacity: 0.55,
      }),
    []
  )

  useFrame((_, dt) => {
    const m = mouseRef.current
    ring.current.rotation.z -= dt * 0.45
    ring.current.position.x = THREE.MathUtils.lerp(ring.current.position.x, -m.x * 0.4, 0.05)
    ring.current.position.y = THREE.MathUtils.lerp(ring.current.position.y, -m.y * 0.3, 0.05)
  })

  return (
    <mesh ref={ring} position={[-0.6, -0.25, -1.0]} material={mat}>
      <torusGeometry args={[2.15, 0.03, 12, 180]} />
    </mesh>
  )
}

/* =========================
   FLOW PARTICLES (no orbit)
========================= */

function FlowParticles({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>
}) {
  const group = useRef<THREE.Group>(null!)

  const { geo, seeds } = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const count = 1800
    const pos = new Float32Array(count * 3)
    const s = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      s[i * 3 + 0] = Math.random() * 1000
      s[i * 3 + 1] = Math.random() * 1000
      s[i * 3 + 2] = Math.random() * 1000
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return { geo: g, seeds: s }
  }, [])

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.02,
        color: new THREE.Color("#cbd5ff"),
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  useFrame((state, dt) => {
    const m = mouseRef.current
    const t = state.clock.elapsedTime

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, m.x * 0.35, 0.04)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, m.y * 0.25, 0.04)
    group.current.rotation.y += dt * 0.02

    const pos = geo.getAttribute("position") as THREE.BufferAttribute

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3

      const x = pos.array[ix]
      const y = pos.array[ix + 1]
      const z = pos.array[ix + 2]

      const sx = seeds[ix]
      const sy = seeds[ix + 1]
      const sz = seeds[ix + 2]

      pos.array[ix] = x + Math.sin(t * 0.35 + sx + y * 0.12) * 0.002
      pos.array[ix + 1] = y + Math.cos(t * 0.28 + sy + x * 0.1) * 0.002
      pos.array[ix + 2] = z + Math.sin(t * 0.32 + sz + (x + y) * 0.06) * 0.002

      // wrap softly
      if (pos.array[ix] > 8) pos.array[ix] = -8
      if (pos.array[ix] < -8) pos.array[ix] = 8
      if (pos.array[ix + 1] > 5) pos.array[ix + 1] = -5
      if (pos.array[ix + 1] < -5) pos.array[ix + 1] = 5
      if (pos.array[ix + 2] > 5) pos.array[ix + 2] = -5
      if (pos.array[ix + 2] < -5) pos.array[ix + 2] = 5
    }

    pos.needsUpdate = true
  })

  return (
    <group ref={group} position={[0, 0, -1.8]}>
      <points geometry={geo} material={mat} />
    </group>
  )
}
