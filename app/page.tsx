'use client'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

export default function Home() {
	useGSAP(() => {
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
		const panels = gsap.utils.toArray<HTMLElement>('.panel')
		panels.forEach((panel) => {
			gsap.to(panel, {
				scrollTrigger: {
					trigger: panel,
					start: 'top top',
					pin: true,
					scrub: true,
				},
				yPercent: 20,
				ease: 'none',
			})
		})
		ScrollSmoother.create({
			smooth: 2,
			effects: true,
		})
	})

	return (
		<div
			className='relative bg-gradient w-full h-full overflow-x-hidden'
			id='smooth-wrapper'
		>
			<main id='smooth-content'>
				<section className='panel relative h-full overflow-hidden'>
					<video
						autoPlay
						loop
						muted
						className='w-full h-auto'
					>
						<source
							src='/website-reel.mp4'
							type='video/mp4'
						/>
					</video>
					<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
						<Image
							src={'/btbfilms.svg'}
							alt='Logo'
							width={350}
							height={250}
							className='aspect-auto'
						/>
					</div>
				</section>
				<section className='panel relative h-full flex justify-center items-center'>
					<video
						autoPlay
						loop
						muted
						preload='none'
						className='w-full h-auto'
					>
						<source
							src='/static-tv-glitch.mp4'
							type='video/mp4'
						/>
					</video>

					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-center p-4 flex flex-col gap-4 bg-black/50 rounded-lg'>
						<p className='text-2xl'>This is a test.</p>
						<p className='text-3xl'>
							Website under construction. Stay tuned for more
							soon!
						</p>
						<p className='text-4xl'>This is only a test.</p>
					</div>
				</section>
			</main>
		</div>
	)
}
