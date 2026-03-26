'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import ContactForm from '@/components/ContactForm'

export default function ContactSection() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.from('.contact-inner', {
				opacity: 0,
				y: 60,
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
			className='px-6 mx-auto text-center'
		>
			<div className='contact-inner'>

				<ContactForm />
			</div>
		</section>
	)
}
