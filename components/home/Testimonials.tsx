'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const testimonials = [
	{
		quote: 'Julia absolutely understands the assignment!',
		author: 'Gemma Gracewood',
		role: 'Letterboxd',
	},
	{
		quote: 'Working with a director like Julia was amazing. Adaptable, collaborative, passionate, she delivered a fantastic final product on brand, on time, and on budget.',
		author: 'Aaron Frazer',
		role: 'Durand Jones & the Indications',
	},
	{
		quote: 'Working with JBM was really electrifying. She has a rare combination of being a great storyteller, strong visual sensibilities, and very visceral heartfelt ideas.',
		author: 'Alexander Toth',
		role: 'Rubblebucket',
	},
]

export default function Testimonials() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.from('.testimonial', {
				opacity: 0,
				y: 50,
				stagger: 0.25,
				duration: 1.2,
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
			className='py-32 px-6 max-w-6xl mx-auto text-center text-white'
		>
			<div className='grid md:grid-cols-3 gap-12'>
				{testimonials.map((t, i) => (
					<blockquote
						key={i}
						className='testimonial text-lg italic leading-relaxed'
					>
						“{t.quote}”
						<br />
						<span className='block mt-4 font-semibold not-italic'>
							— {t.author}, {t.role}
						</span>
					</blockquote>
				))}
			</div>
		</section>
	)
}
