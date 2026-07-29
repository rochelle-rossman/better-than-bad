'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Hero() {
	
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()
			
			mm.add('(prefers-reduced-motion: no-preference)', () => { 
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: container.current,
						start: 'top top',
						end: 'bottom top',
						scrub: 1.2,
						pin: true,
						anticipatePin: 1,
					},
				})

				tl.fromTo(
					'.logo',
					{ y: 0, opacity: 1 },
					{
						y: -30,
						scale: 0.8,
						opacity: 0.8,
						ease: 'none',
					},
				).fromTo(
					'.tagline',
					{ y: 0, scale: 0.8, opacity: 0.8 },
					{
						y: -45,
						scale: 1.15,
						opacity: 1,
						ease: 'none',
					},
					0,
				)
			})
			
			mm.add('(prefers-reduced-motion: reduce)', () => {
				gsap.set('.logo', { y: 0, opacity: 1, scale: 1 })
				gsap.set('.tagline', { y: 0, opacity: 1, scale: 1 })
			})

			return () => mm.revert()
			
		},
		{ scope: container }
	)

	return (
		<section
			ref={container}
			className='relative min-h-100svh px-6'
		>
			<div className='flex flex-col justify-center-safe lg:justify-start items-center text-center h-full py-10 lg:py-20'>
				<Image
					src='/btbfilms.svg'
					alt='Better Than Bad Films Logo'
					width={800}
					height={400}
					className='logo md:max-w-[65vw] object-contain'
					priority
				/>

				<p className='tagline text-2xl md:text-3xl lg:text-4xl tracking-wide text-white'>
					Bold, beautiful, and anything but boring.
				</p>
			</div>
		</section>
	)
}
