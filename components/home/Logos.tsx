'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const clients = [
	{ name: 'Letterboxd', logo: '/logos/letterboxd-logo.png' },
	{
		name: 'FemCap',
		logo: '/logos/femcap-logo.jpeg',
	},
	{
		name: 'Dead Oceans',
		logo: '/logos/dead-oceans-logo.svg',
	},
	{
		name: 'RiseMedia',
		logo: '/logos/rise-media-logo.png',
	},
	{
		name: 'Green Mountain Minerals',
		logo: '/logos/green-mountain-logo.png',
	},
]

const layout = {
	mobile: [
		{ top: '15%', left: '15%' },
		{ top: '15%', left: '55%' },
		{ top: '45%', left: '18%' },
		{ top: '50%', left: '55%' },
		{ top: '75%', left: '35%' },
	],

	tablet: [
		{ top: '15%', left: '15%' },
		{ top: '20%', left: '43%' },
		{ top: '15%', left: '68%' },
		{ top: '49%', left: '25%' },
		{ top: '50%', left: '55%' },
	],

	desktop: [
		{ top: '20%', left: '5%' },
		{ top: '25%', left: '25%' },
		{ top: '18%', left: '43%' },
		{ top: '23%', left: '62%' },
		{ top: '18%', left: '80%' },
	],
}

function useBreakpoint() {
	const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

	useEffect(() => {
		const update = () => {
			const w = window.innerWidth

			if (w < 640) setBp('mobile')
			else if (w < 1024) setBp('tablet')
			else setBp('desktop')
		}

		update()
		window.addEventListener('resize', update)

		return () => window.removeEventListener('resize', update)
	}, [])

	return bp
}

export default function Logos() {
	const container = useRef<HTMLDivElement>(null)
	const bp = useBreakpoint()
	const positions = layout[bp]
	const heightClass =
		bp === 'mobile' ? 'h-[420px]'
		: bp === 'tablet' ? 'h-[520px]'
		: 'h-[560px]'
	const motionScale = bp === 'tablet' ? 0.6 : 1

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add('(min-width: 768px)', () => {
				gsap.from('.client-logo', {
					opacity: 0,
					scale: 0.8,
					y: 30,
					filter: 'blur(6px)',
					duration: 1.2,
					stagger: {
						each: 0.12,
						from: 'random',
					},
					ease: 'power3.out',
					scrollTrigger: {
						trigger: container.current,
						start: 'top 85%',
					},
				})
				gsap.to('.client-logo', {
					y: `+=${10 * motionScale}`,
					x: (i) => (i % 2 === 0 ? 5 : -5),
					duration: 3,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
					stagger: 0.2,
				})
			})

			mm.add('(max-width: 767px)', () => {
				gsap.from('.client-logo', {
					opacity: 0,
					y: 20,
					duration: 0.8,
					stagger: 0.08,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: container.current,
						start: 'top 90%',
						once: true,
					},
				})
			})

			mm.add('(prefers-reduced-motion: reduce)', () => {
				gsap.set('.client-logo', { opacity: 1, y: 0 })
			})

			return () => mm.revert()
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-20 px-4'
		>
			<div className={`relative mx-auto w-full max-w-5xl ${heightClass}`}>
				<h3 className='text-white text-center uppercase font-heading text-3xl leading-relaxed tracking-wider'>
					Trusted by
				</h3>
				<div className='relative w-full h-full'>
					{clients.map((client, i) => {
						const pos = positions[i % positions.length]

						return (
							<div
								key={client.name}
								className='
									client-logo
									absolute
									w-28 h-28 md:w-36 md:h-36
									flex items-center justify-center
								'
								style={{
									top: pos.top,
									left: pos.left,
								}}
							>
								<div className='absolute inset-0 w-full h-full rounded-full bg-white blur-xs scale-160' />
								<Image
									src={client.logo}
									alt={client.name + ' logo'}
									width={160}
									height={160}
									className='object-contain opacity-100 relative'
								/>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
