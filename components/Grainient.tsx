'use client'

import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'
import { vertex, fragment } from '@/lib/grainentShader'

type GrainientCtx = {
	renderer: InstanceType<typeof Renderer>
	program: InstanceType<typeof Program>
	mesh: InstanceType<typeof Mesh>
}

type GrainientProps = {
	className?: string
	paused?: boolean
	pointerEvents?: boolean
	timeSpeed?: number
	colorBalance?: number
	warpStrength?: number
	warpFrequency?: number
	warpSpeed?: number
	warpAmplitude?: number
	blendAngle?: number
	blendSoftness?: number
	rotationAmount?: number
	noiseScale?: number
	grainAmount?: number
	grainScale?: number
	grainAnimated?: boolean
	contrast?: number
	gamma?: number
	saturation?: number
	centerX?: number
	centerY?: number
	zoom?: number
	color1?: string
	color2?: string
	color3?: string
}

const hexToRgb = (hex: string): [number, number, number] => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!result) return [1, 1, 1]
	return [
		parseInt(result[1], 16) / 255,
		parseInt(result[2], 16) / 255,
		parseInt(result[3], 16) / 255,
	]
}


export default function GrainientBackground({
	className = '',
	paused = false,
	pointerEvents = false,

	timeSpeed = 0.25,
	colorBalance = 0.0,
	warpStrength = 1.0,
	warpFrequency = 5.0,
	warpSpeed = 2.0,
	warpAmplitude = 50.0,
	blendAngle = 0.0,
	blendSoftness = 0.05,
	rotationAmount = 500.0,
	noiseScale = 2.0,
	grainAmount = 0.1,
	grainScale = 2.0,
	grainAnimated = false,
	contrast = 1.5,
	gamma = 1.0,
	saturation = 1.0,
	centerX = 0,
	centerY = 0,
	zoom = 0.9,
	color1 = '#FF9FFC',
	color2 = '#5227FF',
	color3 = '#B497CF',
}: GrainientProps) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const rafRef = useRef<number>(0)
	const ctxRef = useRef<GrainientCtx | null>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const renderer = new Renderer({
			webgl: 2,
			alpha: true,
			antialias: false,
			dpr: Math.min(window.devicePixelRatio || 1, 2),
		})

		const gl = renderer.gl
		const canvas = gl.canvas as HTMLCanvasElement

		canvas.style.width = '100%'
		canvas.style.height = '100%'
		canvas.style.display = 'block'

		container.appendChild(canvas)

		const geometry = new Triangle(gl)

		const program = new Program(gl, {
			vertex,
			fragment,
			uniforms: {
				iTime: { value: 0 },
				iResolution: { value: new Float32Array([1, 1]) },

				uTimeSpeed: { value: timeSpeed },
				uColorBalance: { value: colorBalance },
				uWarpStrength: { value: warpStrength },
				uWarpFrequency: { value: warpFrequency },
				uWarpSpeed: { value: warpSpeed },
				uWarpAmplitude: { value: warpAmplitude },
				uBlendAngle: { value: blendAngle },
				uBlendSoftness: { value: blendSoftness },
				uRotationAmount: { value: rotationAmount },
				uNoiseScale: { value: noiseScale },
				uGrainAmount: { value: grainAmount },
				uGrainScale: { value: grainScale },
				uGrainAnimated: { value: grainAnimated ? 1 : 0 },
				uContrast: { value: contrast },
				uGamma: { value: gamma },
				uSaturation: { value: saturation },
				uCenterOffset: { value: new Float32Array([centerX, centerY]) },
				uZoom: { value: zoom },
				uColor1: { value: new Float32Array(hexToRgb(color1)) },
				uColor2: { value: new Float32Array(hexToRgb(color2)) },
				uColor3: { value: new Float32Array(hexToRgb(color3)) },
			},
		})

		const mesh = new Mesh(gl, { geometry, program })
		ctxRef.current = { renderer, program, mesh }

		const resize = () => {
			const rect = container.getBoundingClientRect()
			renderer.setSize(rect.width, rect.height)
			const res = program.uniforms.iResolution.value
			res[0] = gl.drawingBufferWidth
			res[1] = gl.drawingBufferHeight
		}

		const ro = new ResizeObserver(resize)
		ro.observe(container)
    resize()
    
    requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			resize()
		})
	})

		const render = (t: number) => {
			if (!paused) {
				program.uniforms.iTime.value = t * 0.001
				renderer.render({ scene: mesh })
			}
			rafRef.current = requestAnimationFrame(render)
		}

		rafRef.current = requestAnimationFrame(render)

		return () => {
			cancelAnimationFrame(rafRef.current)
			ro.disconnect()
			container.removeChild(canvas)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// update uniforms reactively
	useEffect(() => {
		const ctx = ctxRef.current
		if (!ctx) return

		const u = ctx.program.uniforms

		u.uTimeSpeed.value = timeSpeed
		u.uColorBalance.value = colorBalance
		u.uWarpStrength.value = warpStrength
		u.uWarpFrequency.value = warpFrequency
		u.uWarpSpeed.value = warpSpeed
		u.uWarpAmplitude.value = warpAmplitude
		u.uBlendAngle.value = blendAngle
		u.uBlendSoftness.value = blendSoftness
		u.uRotationAmount.value = rotationAmount
		u.uNoiseScale.value = noiseScale
		u.uGrainAmount.value = grainAmount
		u.uGrainScale.value = grainScale
		u.uGrainAnimated.value = grainAnimated ? 1 : 0
		u.uContrast.value = contrast
		u.uGamma.value = gamma
		u.uSaturation.value = saturation
		u.uCenterOffset.value = new Float32Array([centerX, centerY])
		u.uZoom.value = zoom

		u.uColor1.value = new Float32Array(hexToRgb(color1))
		u.uColor2.value = new Float32Array(hexToRgb(color2))
		u.uColor3.value = new Float32Array(hexToRgb(color3))
	}, [
		timeSpeed,
		colorBalance,
		warpStrength,
		warpFrequency,
		warpSpeed,
		warpAmplitude,
		blendAngle,
		blendSoftness,
		rotationAmount,
		noiseScale,
		grainAmount,
		grainScale,
		grainAnimated,
		contrast,
		gamma,
		saturation,
		centerX,
		centerY,
		zoom,
		color1,
		color2,
		color3,
	])

	return (
		<div
			ref={containerRef}
			className={[
				'absolute inset-0 overflow-hidden',
				pointerEvents ? 'pointer-events-auto' : 'pointer-events-none',
				className,
			].join(' ')}
		/>
	)
}
