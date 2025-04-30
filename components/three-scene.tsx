"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const isDarkMode = theme === "dark"

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Simple controls implementation
    const rotationSpeed = 0.005
    const autoRotate = true

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10

      // Colors - create gradient effect with our brand colors
      const colors = [
        [1, 0.4, 0.7], // pink
        [0.5, 0, 1], // purple
        [0, 0.5, 1], // blue
        [1, 0.5, 0], // orange
      ]

      const colorIndex = Math.floor(Math.random() * colors.length)
      colorsArray[i * 3] = colors[colorIndex][0]
      colorsArray[i * 3 + 1] = colors[colorIndex][1]
      colorsArray[i * 3 + 2] = colors[colorIndex][2]
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animate
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Animate particles
      if (autoRotate) {
        particlesMesh.rotation.y = elapsedTime * 0.05
      }

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      window.requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [theme])

  return <div ref={containerRef} className="absolute inset-0" />
}
