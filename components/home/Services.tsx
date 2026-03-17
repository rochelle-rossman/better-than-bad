'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const services = [
	{
		title: 'Creative Direction',
		desc: 'Guiding your project’s vision from concept to execution with clarity and cinematic flair.',
	},
	{
		title: 'Creative Content Strategy',
		desc: 'Developing campaigns and content that engage, resonate, and build meaningful connections.',
	},
	{
		title: 'Video Production',
		desc: 'Producing original, award-winning films, branded content, and social media-ready video that tells your story.',
	},
	{
		title: 'Social Media Management',
		desc: 'Amplifying your creative work across platforms with strategy, storytelling, and impact.',
	},
]

export default function Services() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.from('.service-card', {
				opacity: 0,
				y: 40,
				stagger: 0.2,
				duration: 1.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container.current,
					start: 'top 80%',
				},
			})
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-32 px-6 max-w-6xl mx-auto'
		>

			<div className='grid md:grid-cols-2 gap-12 text-center'>
				{services.map((service, i) => (
					<div
						key={i}
						className='service-card p-8 bg-white/5 rounded-xl backdrop-blur hover:bg-white/10 transition'
					>
						<h3 className='text-3xl font-semibold mb-4 text-white'>
							{service.title}
						</h3>
						<p className='text-white/80 leading-relaxed'>
							{service.desc}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
