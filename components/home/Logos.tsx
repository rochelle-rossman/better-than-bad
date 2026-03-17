'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const logos = [
	'/logos/letterboxd-logo.png',
	'/logos/femcap-logo.jpeg',
	'/logos/dead-oceans-logo.svg',
	'/logos/rise-media-logo.png',
	'/logos/green-mountain-logo.png'
]

export default function Logos() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.from('.client-logo', {
				opacity: 0,
				y: 20,
				stagger: 0.15,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container.current,
					start: 'top 90%',
				},
			})
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-20 px-6 flex flex-wrap justify-center gap-12 items-center'
		>
			{logos.map((logo, i) => (
				<div key={i} className='rounded-lg bg-white p-4 flex items-center w-52 h-52'>
					<Image
						src={logo}
						alt='Client logo'
						width={200}
						height={200}
						className='client-logo'
					/>
				</div>
			))}
		</section>
	)
}
