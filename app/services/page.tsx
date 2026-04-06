'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

import Link from 'next/link'

const services = [
	{
		title: 'Creative Direction',
		desc: 'Guiding your project’s vision from concept to execution with clarity and cinematic flair.',
		points: [
			'Visual language and tone',
			'Campaign framing and narrative focus',
			'Creative reviews and execution guidance',
		],
	},
	{
		title: 'Creative Content Strategy',
		desc: 'Developing campaigns and content that engage, resonate, and build meaningful connections.',
		points: [
			'Content pillars and messaging',
			'Platform-aware planning',
			'Editorial direction and rollout structure',
		],
	},
	{
		title: 'Video Production',
		desc: 'Producing original films, branded content, and social-ready video that tells your story with impact.',
		points: [
			'Pre-production planning',
			'Shoot direction and production support',
			'Editing for web, social, and launch campaigns',
		],
	},
	{
		title: 'Social Media Management',
		desc: 'Amplifying your creative work across platforms with strategy, storytelling, and consistency.',
		points: [
			'Publishing cadence and content support',
			'Visual cohesion across platforms',
			'Performance-informed iteration',
		],
	},
]

export default function ServicesPage() {
	const container = useRef<HTMLDivElement>(null)
	const panelsRef = useRef<HTMLElement[]>([])

	useGSAP(
		() => {
			if (!container.current || !panelsRef.current) return
			const panels = gsap.utils.toArray<HTMLElement>('.service-panel')

			panels.forEach((panel) => {
				const title = panel.querySelector<HTMLElement>('.service-title')
				const desc = panel.querySelector<HTMLElement>('.service-desc')
				const points =
					panel.querySelectorAll<HTMLElement>('.service-point')
				const eyebrow =
					panel.querySelector<HTMLElement>('.service-eyebrow')

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: panel,
						start: 'top top',
						end: '+=110%',
						pin: true,
						scrub: false,
						toggleActions: 'play none none none',
						invalidateOnRefresh: true,
					},
				})

				tl.from(eyebrow, {
					y: 24,
					opacity: 0,
					duration: 0.5,
					ease: 'power2.out',
				})
					.from(
						title,
						{
							y: 80,
							opacity: 0,
							duration: 0.8,
							ease: 'power3.out',
						},
						'-=0.2',
					)
					.from(
						desc,
						{
							y: 30,
							opacity: 0,
							duration: 0.5,
							ease: 'power3.out',
						},
						'-=0.55',
					)
					.from(
						points,
						{
							y: 24,
							opacity: 0,
							stagger: 0.06,
							duration: 0.4,
							ease: 'power2.out',
						},
						'-=0.45',
					)
			})
		},
		{ scope: container },
	)

	return (
		<div
			ref={container}
			className='text-white'
		>
			<section className='min-h-[80vh] flex items-center px-6 md:px-12'>
				<div className='my-24 max-w-6xl mx-auto w-full flex flex-col items-center gap-6 text-center'>
					<h1 className='service-eyebrow text-sm uppercase tracking-[0.35em] opacity-60 mb-16'>
						Services
					</h1>
					<h2 className='text-4xl md:text-5xl lg:text-6xl leading-[0.95] font-semibold max-w-5xl'>
						What we make should <em className='italic'>feel</em>
						<br />
						as considered as it looks.
					</h2>
					<p className='mt-8 max-w-2xl text-lg md:text-xl opacity-80'>
						Each service gets its own scene, its own pacing, and its
						own moment to land.
					</p>
				</div>
			</section>

			{services.map((service, index) => (
				<section
					key={service.title}
					ref={(el) => {
						if (el) panelsRef.current[index] = el
					}}
					className='service-panel min-h-screen px-6 py-2 md:px-12 border-t border-white/10'
				>
					<div className='max-w-7xl mx-auto h-screen grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center'>
						<div className='relative'>
							<div className='absolute -top-8 left-0 text-[18vw] md:text-[14vw] font-semibold opacity-[0.04] pointer-events-none select-none leading-none'>
								{String(index + 1).padStart(2, '0')}
							</div>

							<p className='service-eyebrow text-xs uppercase tracking-[0.35em] opacity-60 mb-6'>
								0{index + 1}
							</p>

							<h2 className='service-title text-5xl md:text-7xl leading-[0.95] font-semibold max-w-2xl'>
								{service.title}
							</h2>

							<p className='service-desc mt-8 text-xl md:text-2xl max-w-xl opacity-80 leading-relaxed'>
								{service.desc}
							</p>
						</div>

						<div className='self-center md:pl-8 pb-8 md:pb-0'>
							<div className='border-t border-white/20 pt-6 space-y-6'>
								{service.points.map((point) => (
									<p
										key={point}
										className='service-point text-lg md:text-xl opacity-85 border-b border-white/10 pb-4'
									>
										{point}
									</p>
								))}
							</div>
						</div>
					</div>
				</section>
			))}

			<section className='min-h-[80vh] flex items-center justify-center px-6 md:px-12'>
				<div className='text-center max-w-3xl'>
					<p className='text-xs uppercase tracking-[0.35em] opacity-60 mb-6'>
						Next step
					</p>
					<h2 className='text-5xl md:text-7xl leading-[0.95] font-semibold'>
						Ready to turn the idea into something real?
					</h2>
					<Link
						href='/contact'
						className='inline-flex mt-10 border border-white px-10 py-4 text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300'
					>
						Start a Project
					</Link>
				</div>
			</section>
		</div>
	)
}
