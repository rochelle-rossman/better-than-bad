'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function StatementsAbout() {
	const container = useRef<HTMLDivElement>(null)
	const subheadingRef = useRef<HTMLHeadingElement>(null)
	const paragraphRef = useRef<HTMLParagraphElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
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
			<div className='flex flex-col md:flex-row  gap-12'>
				<div className='text-center md:text-left space-y-6 md:space-y-8'>
					<h3
						ref={subheadingRef}
						className='text-3xl md:text-4xl font-light'
					> So, why call it &quot;Better Than Bad&quot;?
						<br />
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
					<a href='/about'>
						<Button className='inline-flex w-full items-center justify-center max-w-96 mt-4 px-6 py-3 bg-light-mustard text-black font-semibold rounded-full hover:opacity-90 transition'>
							Read More
						</Button>
					</a>
				</div>

				{/* Headshot */}
				<div
					ref={imageRef}
					className='mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-lg'
				>
					<Image
						src='/Julia-Headshot.png'
						alt='Julia Barrett-Mitchell'
						width={340}
						height={340}
						className='w-full h-full lg:max-h-96 object-cover'
					/>
				</div>
			</div>
		</section>
	)
}
