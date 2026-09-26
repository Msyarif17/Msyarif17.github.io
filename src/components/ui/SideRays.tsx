"use client"

import { useEffect, useRef } from "react"
import type { Geometry, Program, Renderer } from "ogl"

type Origin = "top-right" | "top-left" | "bottom-right" | "bottom-left"

interface SideRaysProps {
  speed?: number
  rayColor1?: string
  rayColor2?: string
  intensity?: number
  spread?: number
  origin?: Origin
  tilt?: number
  saturation?: number
  blend?: number
  falloff?: number
  opacity?: number
  className?: string
}

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const fragmentShader = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`

function hexToRgb(hex: string): [number, number, number] {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return match
    ? [Number.parseInt(match[1], 16) / 255, Number.parseInt(match[2], 16) / 255, Number.parseInt(match[3], 16) / 255]
    : [1, 1, 1]
}

export default function SideRays({
  speed = 2.5,
  rayColor1 = "#EAB308",
  rayColor2 = "#96c8ff",
  intensity = 2,
  spread = 2,
  origin = "top-right",
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 1.6,
  opacity = 1,
  className = "",
}: SideRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let renderer: Renderer | null = null
    let program: Program | null = null
    let geometry: Geometry | null = null
    let resizeObserver: ResizeObserver | null = null
    let frame = 0
    let lastFrame = 0
    let visible = false
    let loading = false
    let failed = false
    let disposed = false
    let draw: ((time: number) => void) | null = null

    const tick = (time: number) => {
      if (!visible || document.hidden || motionPreference.matches || !draw) {
        frame = 0
        return
      }
      if (time - lastFrame >= 32) {
        draw(time)
        lastFrame = time
      }
      frame = window.requestAnimationFrame(tick)
    }

    const syncAnimation = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      if (!visible || document.hidden || !draw) return
      if (motionPreference.matches) draw(0)
      else frame = window.requestAnimationFrame(tick)
    }

    const initialize = async () => {
      loading = true
      try {
        const { Renderer, Program, Triangle, Mesh } = await import("ogl")
        if (disposed) return

        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
          alpha: true,
          depth: false,
          stencil: false,
          antialias: false,
          premultipliedAlpha: false,
          powerPreference: "low-power",
        })
        const activeRenderer = renderer
        const gl = activeRenderer.gl
        gl.clearColor(0, 0, 0, 0)
        gl.canvas.style.width = "100%"
        gl.canvas.style.height = "100%"
        gl.canvas.style.display = "block"
        container.appendChild(gl.canvas)

        const uniforms = {
          iTime: { value: 0 },
          iResolution: { value: [1, 1] },
          iSpeed: { value: speed },
          iRayColor1: { value: hexToRgb(rayColor1) },
          iRayColor2: { value: hexToRgb(rayColor2) },
          iIntensity: { value: intensity },
          iSpread: { value: spread },
          iFlipX: { value: origin.endsWith("left") ? 1 : 0 },
          iFlipY: { value: origin.startsWith("bottom") ? 1 : 0 },
          iTilt: { value: tilt },
          iSaturation: { value: saturation },
          iBlend: { value: blend },
          iFalloff: { value: falloff },
          iOpacity: { value: opacity },
        }

        geometry = new Triangle(gl)
        program = new Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        })
        const mesh = new Mesh(gl, { geometry, program })

        draw = (time: number) => {
          uniforms.iTime.value = time * 0.001
          activeRenderer.render({ scene: mesh })
        }

        const updateSize = () => {
          const width = container.clientWidth
          const height = container.clientHeight
          if (!width || !height) return
          activeRenderer.dpr = Math.min(window.devicePixelRatio || 1, 1.5)
          activeRenderer.setSize(width, height)
          uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height]
          if (motionPreference.matches) draw?.(0)
        }

        resizeObserver = new ResizeObserver(updateSize)
        resizeObserver.observe(container)
        updateSize()
        syncAnimation()
      } catch {
        failed = true
        resizeObserver?.disconnect()
        geometry?.remove()
        program?.remove()
        renderer?.gl.canvas.remove()
        renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext()
        renderer = null
        geometry = null
        program = null
        draw = null
      } finally {
        loading = false
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !renderer && !loading && !failed) void initialize()
        syncAnimation()
      },
      { threshold: 0.05 },
    )

    intersectionObserver.observe(container)
    motionPreference.addEventListener("change", syncAnimation)
    document.addEventListener("visibilitychange", syncAnimation)

    return () => {
      disposed = true
      intersectionObserver.disconnect()
      motionPreference.removeEventListener("change", syncAnimation)
      document.removeEventListener("visibilitychange", syncAnimation)
      resizeObserver?.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
      geometry?.remove()
      program?.remove()
      renderer?.gl.canvas.remove()
      renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden ${className}`.trim()}
    />
  )
}
