"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

interface EnhancedThreeSceneProps {
  intensity?: number
  particleCount?: number
  particleSize?: number
  speed?: number
  interactive?: boolean
  colorScheme?: "default" | "blue" | "purple" | "teal"
  height?: string
}

export default function EnhancedThreeScene({
  intensity = 1,
  particleCount = 2000,
  particleSize = 0.02,
  speed = 0.5,
  interactive = true,
  colorScheme = "default",
  height = "100%",
}: EnhancedThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const particlesMeshRef = useRef<THREE.Points | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
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
    rendererRef.current = renderer

    // Simple controls implementation instead of OrbitControls
    const rotationSpeed = speed * 0.01
    const autoRotate = true
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }

    // Mouse events for manual rotation
    const handleMouseDown = (event: MouseEvent) => {
      if (!interactive) return
      isDragging = true
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return

      // Calculate normalized device coordinates for hover effect
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })

      // Handle rotation when dragging
      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        }

        if (particlesMeshRef.current) {
          particlesMeshRef.current.rotation.y += deltaMove.x * 0.005
          particlesMeshRef.current.rotation.x += deltaMove.y * 0.005
        }

        previousMousePosition = {
          x: event.clientX,
          y: event.clientY,
        }
      }
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = particleCount * intensity

    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    // Define color schemes
    const colorSchemes = {
      default: [
        [1, 0.4, 0.7], // pink
        [0.5, 0, 1], // purple
        [0, 0.5, 1], // blue
        [1, 0.5, 0], // orange
      ],
      blue: [
        [0, 0.5, 1], // blue
        [0, 0.7, 0.9], // light blue
        [0, 0.3, 0.8], // dark blue
        [0, 0.8, 0.8], // teal blue
      ],
      purple: [
        [0.5, 0, 1], // purple
        [0.7, 0.3, 1], // light purple
        [0.3, 0, 0.8], // dark purple
        [0.8, 0.2, 0.8], // magenta
      ],
      teal: [
        [0, 0.8, 0.7], // teal
        [0, 0.9, 0.8], // light teal
        [0, 0.6, 0.6], // dark teal
        [0, 0.7, 0.5], // green teal
      ],
    }

    const selectedColors = colorSchemes[colorScheme]

    for (let i = 0; i < particlesCount; i++) {
      // Position with more clustering toward center
      const radius = Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      posArray[i * 3] = x
      posArray[i * 3 + 1] = y
      posArray[i * 3 + 2] = z

      // Colors - create gradient effect with our brand colors
      const colorIndex = Math.floor(Math.random() * selectedColors.length)
      colorsArray[i * 3] = selectedColors[colorIndex][0]
      colorsArray[i * 3 + 1] = selectedColors[colorIndex][1]
      colorsArray[i * 3 + 2] = selectedColors[colorIndex][2]
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    particlesMeshRef.current = particlesMesh

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(isDarkMode ? 0x404040 : 0x606060)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(isDarkMode ? 0xffffff : 0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Animate
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Animate particles
      if (particlesMesh && !isDragging && autoRotate) {
        particlesMesh.rotation.y += rotationSpeed
      }

      if (particlesMesh) {
        // Subtle wave effect
        const positions = particlesMesh.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const y = positions[i + 1]
          const z = positions[i + 2]

          // Apply subtle wave effect
          positions[i + 1] = y + Math.sin(elapsedTime + x) * 0.01
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true

        // Mouse interaction for hover effect
        if (interactive && !isDragging) {
          particlesMesh.rotation.x += (mousePosition.y * 0.01 - particlesMesh.rotation.x) * 0.05
          particlesMesh.rotation.y += (mousePosition.x * 0.01 - particlesMesh.rotation.y) * 0.05
        }
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
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }

      if (particlesMesh) {
        scene.remove(particlesMesh)
        particlesGeometry.dispose()
        particlesMaterial.dispose()
      }

      renderer.dispose()
    }
  }, [theme, intensity, particleCount, particleSize, speed, interactive, colorScheme])

  // Update on theme change
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return

    const isDarkMode = theme === "dark"

    // Update background color
    if (rendererRef.current) {
      rendererRef.current.setClearColor(isDarkMode ? 0x000000 : 0xffffff, 0)
    }

    // Update particle brightness
    if (particlesMeshRef.current) {
      const material = particlesMeshRef.current.material as THREE.PointsMaterial
      material.opacity = isDarkMode ? 0.8 : 0.6
    }
  }, [theme])

  return <div ref={containerRef} className="absolute inset-0" style={{ height }} />
}
