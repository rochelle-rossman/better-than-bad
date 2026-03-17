'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

import Hero from '@/components/home/Hero'
import Reel from '@/components/home/Reel'
import Statements from '@/components/home/Statements'
import Services from '@/components/home/Services'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import Logos from '@/components/home/Logos'
import ContactSection from '@/components/home/ContactSection'
import CinematicBackground from '@/components/home/CinematicBackground'
import About from '@/components/About'

export default function HomePage() {
	const containerRef = useRef<HTMLElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!containerRef.current) return

		const ctx = gsap.context(() => {
			// Cinematic Background Parallax
			gsap.to(bgRef.current, {
				yPercent: -15,
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			})
		}, containerRef)

		return () => ctx.revert()
	}, [])

	return (
		<main
			ref={containerRef}
			className='relative overflow-hidden min-h-screen'
		>
			<CinematicBackground />

			<section className='relative z-10'>
				<Hero />
			</section>

			<section className='relative z-10'>
				<Reel />
			</section>

			<section className='relative z-10'>
				<About />
			</section>

			<section className='relative z-10'>
				<Statements />
			</section>

			<section className='relative z-10'>
				<Services />
			</section>

			<section className='relative z-10'>
				<Gallery />
			</section>

			<section className='relative z-10'>
				<Testimonials />
			</section>

			<section className='relative z-10'>
				<Logos />
			</section>

			<section className='relative z-10'>
				<ContactSection />
			</section>
		</main>
	)
}
