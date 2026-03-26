'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Hero() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.to('.logo', {
				y: -30,
				scale: 1.15,
				opacity: 0.6,
				ease: 'none',
				scrollTrigger: {
					trigger: container.current,
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			})

			gsap.to('.tagline', {
				y: -45,
				scale: 1.15,
				// opacity: 0.6,
				ease: 'none',
				scrollTrigger: {
					trigger: container.current,
					start: 'top center',
					end: 'bottom top',
					scrub: true,
				},
			})
		},
		{ scope: container }
	)

	return (
		<section
			ref={container}
			className="hero relative h-screen flex flex-col items-center justify-center gap-6 text-center my-12 px-6"
		>
			<Image
				src="/btbfilms.svg"
				alt="Better Than Bad Films Logo"
				width={800}
				height={400}
				className="logo w-[60vw] h-auto mt-10"
				priority
			/>

			<p className="tagline text-3xl lg:text-4xl tracking-wide mt-6 text-white">
				Cinematic craft with strategic precision.
			</p>
		</section>
	)
}
