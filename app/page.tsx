'use client'
import ContactForm from '@/components/ContactForm'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Image from 'next/image'

export default function Home() {
	useGSAP(() => {
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
		const panels = gsap.utils.toArray<HTMLElement>('.panel')
		const tops = panels.map((panel) =>
			ScrollTrigger.create({ trigger: panel, start: 'top top' }),
		)
		panels.forEach((panel) => {
			gsap.to(panel, {
				scrollTrigger: {
					trigger: panel,
					start: () =>
						panel.offsetHeight < window.innerHeight ?
							'top top'
						:	'bottom bottom',
					pin: true,
					pinSpacing: false,
					scrub: true,
					snap: 1 / (panels.length - 1),
				},
			})
		})
		ScrollTrigger.create({
			snap: {
				snapTo: (_progress, self) => {
					const panelStarts = tops.map((st) => st.start),
						snapScroll = gsap.utils.snap(
							panelStarts,
							self?.scroll() || 0,
						) // find the closest one
					return gsap.utils.normalize(
						0,
						ScrollTrigger.maxScroll(window),
						snapScroll,
					)
				},
				duration: 0.5,
			},
		})
		// scroll based scale animation for the logo in the first panel
		gsap.to('.panel:nth-child(1) .logo', {
			scale: 1.5,
			scrollTrigger: {
				trigger: '.panel:nth-child(1)',
				start: 'top top',
				scrub: true,
			},
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
				<section className='panel relative w-full h-screen'>
					<div className='w-full h-full flex flex-col justify-center items-center mt-12'>
						<p className='tagline text-xl text-white pt-16'>
							Cinematic craft with strategic precision.{' '}
						</p>
						<Image
							src={'/btbfilms.svg'}
							alt='Logo'
							width={800}
							height={400}
							className='logo aspect-auto'
						/>
					</div>
				</section>
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
				</section>
				<section className='panel relative h-screen flex justify-center items-center'>
					<div id='about'></div>
				</section>
				<section className='panel w-full h-screen flex justify-center items-center'>
					<div
						id='contact'
						className='w-full h-full flex flex-col justify-center items-center mt-16'
					>
						<ContactForm />
					</div>
				</section>
			</main>
		</div>
	)
}
