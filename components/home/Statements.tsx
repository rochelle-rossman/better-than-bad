'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Statements() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.utils
				.toArray<HTMLElement>('.statement-line')
				.forEach((line) => {
					gsap.fromTo(
						line,
						{ opacity: 0, y: 50 },
						{
							opacity: 1,
							y: 0,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: line,
								start: 'top 85%',
								end: 'top 50%',
								scrub: true,
							},
						},
					)
				})
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-40 text-center px-6 space-y-10'
		>
			<h3 className='statement-line text-6xl md:text-8xl font-semibold uppercase text-white'>
				Better than bad.
			</h3>
			<h3 className='statement-line text-5xl md:text-7xl font-light text-white'>
				Because perfection is boring.
			</h3>
		</section>
	)
}
