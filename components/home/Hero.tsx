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
						start: 'top top+=10%',
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
			className="relative h-screen flex flex-col items-center justify-center text-center px-6"
		>
			<Image
				src="/btbfilms.svg"
				alt="Better Than Bad Films Logo"
				width={800}
				height={400}
				className="logo md:max-w-[60vw] h-auto"
				priority
			/>

			<p className="tagline text-3xl lg:text-4xl tracking-wide text-white">
				Cinematic craft with strategic precision.
			</p>
		</section>
	)
}
