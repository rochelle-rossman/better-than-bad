'use client'

import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const services = [
	{
		title: 'Creative Direction',
		desc: 'We didn’t win awards for nothing. Why blend in when you can be unforgettable?',
	},
	{
		title: 'Creative Content Strategy',
		desc: 'Detailed creative content strategies that focus on your goals, not on trends. Elevate your branding with flair and grow your reach with intention.',
	},
	{
		title: 'Video and Photo Production',
		desc: `“I feel like this was the best shoot of my career, and I’ve done a LOT. Thank you so much.” 
		- Cassandra Sales, a real Better Than Bad client.`,
	},
]

export default function Services() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.utils
					.toArray<HTMLElement>('.service-row')
					.forEach((row, i) => {
						const isLeft = i % 2 === 0

						gsap.from(
							row.querySelectorAll('.service-content > *'),
							{
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
							},
						)
					})
			})

			mm.add('(prefers-reduced-motion: reduce)', () => {
				gsap.utils
					.toArray<HTMLElement>('.service-row')
					.forEach((row) => {
						gsap.set(row.querySelectorAll('.service-content > *'), {
							opacity: 1,
							y: 0,
							x: 0,
						})
					})
			})

			return () => mm.revert()
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-32 px-6 max-w-6xl mx-auto'
		>
			<div className='space-y-32 border-b border-white/20 py-16'>
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
							<div className='text-6xl md:text-8xl font-light text-white/20'>
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
				<h3 className='text-center text-5xl italic text-white mb-6'>
					Need we say more?
				</h3>
			</div>
		</section>
	)
}
