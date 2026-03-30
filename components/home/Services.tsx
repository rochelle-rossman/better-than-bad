'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const services = [
	{
		title: 'Creative Direction',
		desc: 'Shaping bold ideas into cohesive visual stories — from first spark to final frame.',
	},
	{
		title: 'Creative Content Strategy',
		desc: 'Building campaigns that don’t just reach audiences, but stay with them.',
	},
	{
		title: 'Video Production',
		desc: 'Crafting cinematic, story-driven video — from branded films to social-first content.',
	},
	{
		title: 'Social Media Management',
		desc: 'Turning content into momentum through thoughtful distribution and storytelling.',
	},
]

export default function Services() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.utils
				.toArray<HTMLElement>('.service-row')
				.forEach((row, i) => {
					const isLeft = i % 2 === 0

					gsap.from(row.querySelectorAll('.service-content > *'), {
						opacity: 0,
						y: 40,
						x: isLeft ? -40 : 40,
						stagger: 0.15,
						duration: 1.1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: row,
							start: 'top 75%',
						},
					})
				})
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-40 px-6 max-w-6xl mx-auto'
		>
			<div className='space-y-32'>
				{services.map((service, i) => {
					const isLeft = i % 2 === 0

					return (
						<div
							key={i}
							className={`service-row flex flex-col md:flex-row items-center gap-12 ${
								!isLeft ? 'md:flex-row-reverse' : ''
							}`}
						>
							{/* Index */}
							<div className='text-6xl md:text-8xl font-light text-white/10'>
								{String(i + 1).padStart(2, '0')}
							</div>

							{/* Content */}
							<div className='service-content max-w-xl text-center md:text-left'>
								<h3 className='text-4xl md:text-5xl font-semibold text-white mb-6'>
									{service.title}
								</h3>

								<div className='h-px w-16 bg-white/30 mb-6 mx-auto md:mx-0' />

								<p className='text-lg text-white/80 leading-relaxed'>
									{service.desc}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}
