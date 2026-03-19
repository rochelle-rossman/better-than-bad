'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import Link from 'next/link'

export default function StatementsAbout() {
	const container = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)
	const subheadingRef = useRef<HTMLHeadingElement>(null)
	const paragraphRef = useRef<HTMLParagraphElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.fromTo(
				headingRef.current,
				{ opacity: 0, y: -30 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: headingRef.current,
						start: 'top 90%',
						end: 'top 60%',
					},
				},
			)

			gsap.fromTo(
				subheadingRef.current,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: subheadingRef.current,
						start: 'top 85%',
						end: 'top 50%',
					},
				},
			)

			gsap.fromTo(
				paragraphRef.current,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: paragraphRef.current,
						start: 'top 85%',
						end: 'top 50%',
					},
				},
			)
			gsap.fromTo(
				imageRef.current,
				{ opacity: 0, y: 20, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: imageRef.current,
						start: 'top 85%',
						end: 'top 50%',
					},
				},
			)
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='relative py-20 px-6 max-w-6xl mx-auto text-white overflow-hidden'
		>
			{/* Full-width heading */}
			{/* <h2
				ref={headingRef}
				className='text-5xl font-semibold tracking-wider font-heading text-center mb-16'
			>
				So, why call it <em>Better Than Bad</em>?
			</h2> */}


			<div className='flex flex-col md:flex-row items-center gap-12'>
				<div className='flex-1 text-center md:text-left space-y-6 md:space-y-8'>
					<h3
						ref={subheadingRef}
						className='text-4xl md:text-5xl font-light'
					>
						Because perfection is boring.
					</h3>
					<p
						ref={paragraphRef}
						className='text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0'
					>
						<strong>Better Than Bad Films</strong> is a boutique
						studio led by award-winning director{' '}
						<strong>Julia Barrett-Mitchell</strong>. We create
						cinematic, human, and impactful work that’s
						<em> better than bad</em>, blending humor, humility, and
						strategic precision in every project.
					</p>
					<Link
						href='/about'
						className='inline-block mt-4 px-6 py-3 bg-light-mustard text-black font-semibold rounded-lg hover:opacity-90 transition'
					>
						Learn More
					</Link>
				</div>

				{/* Headshot */}
				<div
					ref={imageRef}
					className='shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-lg'
				>
					<Image
						src='/Julia-Headshot.png'
						alt='Julia Barrett-Mitchell'
						width={240}
						height={240}
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</section>
	)
}
