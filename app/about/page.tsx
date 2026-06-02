'use client'

import { SplitWordCTA } from '@/components/SplitWordCTA'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'

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
			<section
				ref={sectionRef}
				className='py-40 px-6 relative max-w-6xl mx-auto text-white'
			>
				<h1 className='text-sm uppercase tracking-[0.35em] opacity-60 mb-16'>
					About
				</h1>
				<h2
					ref={headingRef}
					className='text-5xl md:text-6xl font-semibold text-center tracking-wider font-heading mb-16 text-light-mustard'
				>
					So, why call it <em>Better Than Bad</em>?
				</h2>

				<div className='space-y-12 flex flex-col md:flex-row items-center justify-center gap-6'>
					<div className='space-y-6 text-lg md:text-xl leading-relaxed max-w-4xl'>
						<p>
							<strong>Better Than Bad Films</strong> is a boutique
							studio founded by award-winning director and
							creative strategist{' '}
							<strong>Julia Barrett-Mitchell</strong>.
						</p>

						<p>
							The name <strong>Better Than Bad</strong> is both a
							wink and a manifesto—a rebellion against ego,
							pretension, and the futile pursuit of “perfect.”
							It’s a reminder that the best creative work is
							human, playful, and collaborative. Where your ideas
							are nurtured and the process is fun.
						</p>

						<p>
							From concept to final cut, Better Than Bad Films
							approaches every project with{' '}
							<strong>
								strategic precision and cinematic flair
							</strong>
							. Whether it’s a branded campaign, a web or social
							first series, a documentary or narrative short film,
							Julia and her team strive to create work that is{' '}
							<strong>
								entertaining, impactful, and unmistakably alive.
							</strong>
							.
						</p>

						<p>
							And the results? They&apos;re{' '}
							<strong>better than bad</strong>. Heck, they’re
							f*cking amazing.
						</p>
						<p className='text-md italic text-white/70'>
							Julia’s work has been published by NPR, BBC, Vevo,
							Nylon, Chronogram, Inside+Out, Letterboxd, and
							premiered at the Woodstock Film Festival. It has
							also won “Best Of” awards at the Big Apple Film
							Festival and the Hudson Valley Film Festival.
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
				<SplitWordCTA />
			</section>
		</>
	)
}
