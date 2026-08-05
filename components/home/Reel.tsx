'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Reel() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.fromTo(
				'.reel-video',
				{ opacity: 0.8, y: 10 },
				{
					opacity: 1,
					y: 0,
					scrollTrigger: {
						trigger: container.current,
						start: 'top top',
						end: 'bottom top',
						scrub: 1.2,
						pin: true,
						anticipatePin: 1,
					},
				},
			)
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='reel relative h-dvh w-full overflow-hidden'
		>
			<video
				autoPlay
				loop
				muted
				playsInline
				preload='metadata'
				className='reel-video absolute inset-0 w-full h-full object-cover'
			>
				<source
					src='/website-reel.mp4'
					type='video/mp4'
				/>
			</video>
		</section>
	)
}
