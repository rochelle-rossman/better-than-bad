'use client'

import CinematicBackground from "@/components/home/CinematicBackground"
import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'

export default function AboutPage() {
	const sectionRef = useRef<HTMLElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current || !headingRef.current) return

		const ctx = gsap.context(() => {
			// Animate heading first
			gsap.fromTo(
				headingRef.current,
				{ opacity: 0, y: -50 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: headingRef.current,
						start: 'top 90%',
						end: 'top 60%',
						toggleActions: 'play none none reverse',
					},
				},
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])
	return (
		<>
			<CinematicBackground />
			<section
						ref={sectionRef}
						className='py-40 px-6 relative max-w-6xl mx-auto text-light-mustard'
					>
						<h2
							ref={headingRef}
							className='text-5xl md:text-6xl font-semibold text-center tracking-wider font-heading mb-16'
						>
							So, why call it <em>Better Than Bad</em>?
						</h2>
			
						<div className='space-y-12 flex flex-col md:flex-row items-center justify-center gap-6'>
							<div className='space-y-6 text-lg md:text-xl leading-relaxed max-w-4xl'>
								<p>
									<strong>Better Than Bad Films</strong> is a boutique
									studio founded by award-winning director and creative
									strategist <strong>Julia Barrett-Mitchell</strong>. With
									a career spanning branded content campaigns, narrative
									filmmaking, and documentary work, Julia has guided
									creative direction for internationally recognized
									brands, produced viral content, and earned accolades at
									major film festivals for her original storytelling.
								</p>
			
								<p>
									At the heart of the studio is a simple yet powerful
									philosophy: <em>perfection is boring</em>. The name{' '}
									<strong>Better Than Bad</strong> is both a wink and a
									manifesto—a rebellion against ego, pretension, and the
									relentless pursuit of “perfect.” It’s a reminder that
									the best creative work is human, playful, and
									collaborative. Humor, humility, and curiosity are as
									important as cinematic craft.
								</p>
			
								<p>
									From concept to final cut, Better Than Bad Films
									approaches every project with{' '}
									<strong>strategic precision and cinematic flair</strong>
									. Whether it’s a brand campaign, a social media series,
									or a short film, Julia and her team strive to create
									work that is{' '}
									<strong>
										memorable, impactful, and unmistakably alive
									</strong>
									.
								</p>
			
								<p>
									This is a studio where ideas are nurtured, processes are
									joyful, and the end result is always{' '}
									<strong>better than bad</strong>—often f*cking amazing.
								</p>
							</div>
			
							<div className='flex justify-center'>
								<Image
									src='/Julia-Headshot.png'
									alt='Julia Barrett-Mitchell'
									width={800}
									height={800}
									className='rounded-2xl object-cover shadow-lg'
								/>
							</div>
						</div>
					</section>
		</>
	)
}
