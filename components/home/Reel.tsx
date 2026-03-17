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
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					scrollTrigger: {
						trigger: container.current,
						start: 'top 80%',
						end: 'top 30%',
						scrub: true,
					},
				},
			)
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='reel relative min-h-[110vh] justify-center'
		>
			<video
				autoPlay
				loop
				muted
				playsInline
				className='reel-video w-full h-auto object-cover'
			>
				<source
					src='/website-reel.mp4'
					type='video/mp4'
				/>
			</video>
		</section>
	)
}
