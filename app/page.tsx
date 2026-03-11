'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'

import Masonry from '@/components/Masonry'
import About from '@/components/About'
import ContactForm from '@/components/ContactForm'
import { galleryImages } from '@/lib/galleryImages'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
	const containerRef = useRef<HTMLDivElement>(null)
	const backgroundRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!containerRef.current || !backgroundRef.current) return

		const ctx = gsap.context(() => {
			// CINEMATIC BACKGROUND PARALLAX
			gsap.to(backgroundRef.current, {
				yPercent: -15, // slow upward movement
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			})

			// HERO LOGO
			gsap.to('.logo', {
				y: -30,
				scale: 1.15,
				opacity: 0.6,
				ease: 'none',
				scrollTrigger: {
					trigger: '.hero',
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			})

			// HERO TAGLINE
			gsap.to('.tagline', {
				y: -45,
				opacity: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: '.hero',
					start: 'top center',
					end: 'bottom top',
					scrub: true,
				},
			})

			// VIDEO REEL
			gsap.fromTo(
				'.reel-video',
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: '.reel',
						start: 'top 80%',
						end: 'top 30%',
						scrub: true,
					},
				},
			)

			// STATEMENT LINES
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

			// SERVICES CARDS
			gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
				gsap.fromTo(
					card,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: card,
							start: 'top 90%',
							end: 'top 60%',
							scrub: true,
						},
					},
				)
			})

			// MASONRY floating parallax
			gsap.utils
				.toArray<HTMLElement>('.masonry-item')
				.forEach((item, i) => {
					const yDistance = i % 2 === 0 ? -25 : -40
					const rotationAngle = gsap.utils.random(-1.5, 1.5)

					gsap.to(item, {
						y: yDistance,
						rotation: rotationAngle,
						ease: 'none',
						scrollTrigger: {
							trigger: containerRef.current,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						},
					})
				})

			// COMPANY LOGOS
			gsap.utils.toArray<HTMLElement>('.company-logo').forEach((logo) => {
				gsap.fromTo(
					logo,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: logo,
							start: 'top 90%',
							end: 'top 60%',
							scrub: true,
						},
					},
				)
			})
		}, containerRef)

		return () => ctx.revert()
	}, [])

	return (
		<main
			ref={containerRef}
			className='relative overflow-hidden'
		>
			{/* Cinematic Parallax Background */}
			<div
				ref={backgroundRef}
				className='fixed top-0 left-0 w-full h-full -z-10 bg-cinematic'
			/>

			{/* HERO */}
			<section className='hero relative h-screen flex flex-col items-center justify-center text-center px-6'>
				<Image
					src='/btbfilms.svg'
					alt='Better Than Bad Films Logo'
					width={800}
					height={400}
					className='logo w-[60vw] h-auto mt-10'
				/>
				<p className='tagline text-3xl md:text-4xl tracking-wide mt-6 text-white'>
					Cinematic craft with strategic precision.
				</p>
			</section>

			{/* VIDEO REEL */}
			<section className='reel relative min-h-[110vh] justify-center'>
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

			{/* CINEMATIC STATEMENTS */}
			<section className='statement py-40 text-center px-6 space-y-10'>
				<h3 className='statement-line text-5xl md:text-7xl font-light text-white'>
					Better than noise.
				</h3>
				<h3 className='statement-line text-5xl md:text-7xl font-light text-white'>
					Better than trends.
				</h3>
				<h3 className='statement-line text-6xl md:text-8xl font-light text-white'>
					Better than bad.
				</h3>
			</section>

			{/* SERVICES / OFFERINGS */}
			<section className='py-32 px-6 max-w-6xl mx-auto'>
				<h2 className='text-5xl md:text-6xl font-bold text-center mb-16 text-white'>
					Our Studio Services
				</h2>
				<div className='grid md:grid-cols-2 gap-12 text-center'>
					{[
						{
							title: 'Creative Direction',
							desc: 'Guiding your project’s vision from concept to execution with clarity and cinematic flair.',
						},
						{
							title: 'Creative Content Strategy',
							desc: 'Developing campaigns and content that engage, resonate, and build meaningful connections.',
						},
						{
							title: 'Video Production',
							desc: 'Producing original, award-winning films, branded content, and social media-ready video that tells your story.',
						},
						{
							title: 'Social Media Management',
							desc: 'Amplifying your creative work across platforms with strategy, storytelling, and impact.',
						},
					].map((service, i) => (
						<div
							key={i}
							className='service-card p-6 bg-white/5 rounded-xl hover:bg-white/10 transition'
						>
							<h3 className='text-3xl font-semibold mb-4 text-white'>
								{service.title}
							</h3>
							<p className='text-white/80'>{service.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* IMAGE GALLERY */}
			<section className='py-32'>
				<Masonry images={galleryImages.map((src) => ({ src }))} />
			</section>

			{/* ABOUT */}
			<section className='py-40 px-6 max-w-4xl mx-auto text-white'>
				<About />
				<p className='mt-8 text-lg text-center'>
					Better Than Bad Films is a studio founded by award-winning
					director and creative strategist Julia Barrett-Mitchell.
					Julia has led creative direction for internationally
					recognized brands, produced viral content, and earned
					accolades at major festivals for her original work. Her
					background spans branded content campaigns, documentary, and
					narrative filmmaking.
				</p>
				<p className='mt-6 text-lg text-center italic'>
					So why call it Better Than Bad? The name is both a wink and
					a manifesto. Because perfection is boring. It’s a rebellion
					against ego and a reminder that the best creative work has
					humor and humility. It’s a promise that the process can be
					joyful, collaborative, and yes — better than bad. Possibly
					even f*cking amazing.
				</p>
			</section>

			{/* TESTIMONIALS */}
			<section className='py-32 px-6 max-w-6xl mx-auto text-center space-y-16 text-white'>
				<h2 className='text-5xl md:text-6xl font-bold mb-12'>
					What Clients Say
				</h2>
				<div className='grid md:grid-cols-3 gap-12'>
					<blockquote className='text-lg italic'>
						“Julia absolutely understands the assignment!”
						<br />
						<span className='font-semibold'>
							— Gemma Gracewood, Letterboxd
						</span>
					</blockquote>
					<blockquote className='text-lg italic'>
						“Working with a director like Julia was amazing.
						Adaptable, collaborative, passionate, she delivered a
						fantastic final product on brand, on time, and on
						budget.”
						<br />
						<span className='font-semibold'>
							— Aaron Frazer, Durand Jones & the Indications
						</span>
					</blockquote>
					<blockquote className='text-lg italic'>
						“Working with JBM was really electrifying. She has a
						rare combination of being a great storyteller, strong
						visual sensibilities, and very visceral heartfelt ideas
						that are quite surprising.”
						<br />
						<span className='font-semibold'>
							— Alexander Toth, Rubblebucket
						</span>
					</blockquote>
				</div>
			</section>

			{/* COMPANY LOGOS */}
			<section className='py-16 px-6 flex justify-center flex-wrap gap-12 items-center'>
				{[
					'Letterboxd',
					'FemCap',
					'Dead Oceans',
					'Green Mountain Minerals',
					'Rise Media',
				].map((logo, i) => (
					<div
						key={i}
						className='company-logo text-white text-xl font-semibold'
					>
						{logo}
					</div>
				))}
			</section>

			{/* CONTACT / CTA */}
			<section className='py-40 px-6 text-center text-white'>
				<h2 className='text-5xl md:text-7xl font-light mb-16'>
					Let’s make something better than bad.
				</h2>
				<ContactForm />
			</section>
		</main>
	)
}
