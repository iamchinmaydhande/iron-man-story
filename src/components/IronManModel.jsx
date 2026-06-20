import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, Bounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function IronManModel() {
  const group = useRef()
  const { scene, animations } = useGLTF('/mark85.glb')
  const { actions, names } = useAnimations(animations, group)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (names.length > 0) {
      actions[names[0]]?.reset().play()
    }
  }, [actions, names])

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    if (!group.current) return
    // Full horizontal rotation follows cursor x (left-right across whole screen = full spin range)
    const targetY = mouse.current.x * Math.PI       // -180° to +180°
    const targetX = mouse.current.y * 0.35           // gentle tilt up/down, capped

    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06
  })

  return (
    <Bounds fit clip observe margin={1.2}>
      <group ref={group} dispose={null}>
        <primitive object={scene} />
      </group>
    </Bounds>
  )
}

useGLTF.preload('/mark85.glb')