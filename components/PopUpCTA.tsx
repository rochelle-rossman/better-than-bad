'use client'

import GrainientBackground from '@/components/Grainient'
import { gsap } from '@/lib/gsap'
import { ArrowRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function PopupCTA() {
	const [isVisible, setIsVisible] = useState(false)

	const overlayRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const tl = useRef<gsap.core.Timeline | null>(null)

	useEffect(() => {
		const hasSeen = localStorage.getItem('btb-popup-seen')
		if (hasSeen) return

		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 1200)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!isVisible) return

		const ctx = gsap.context(() => {
			tl.current = gsap.timeline({ defaults: { ease: 'power4.out' } })

			tl.current
				.fromTo(
					overlayRef.current,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.5 },
				)

				.from(
					contentRef.current?.children || [],
					{
						opacity: 0,
						y: 30,
						filter: 'blur(8px)',
						stagger: 0.12,
						duration: 0.6,
					},
					'-=0.7',
				)

			tl.current.eventCallback('onComplete', () => {
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'))
				}, 50)
			})
		}, modalRef)

		return () => ctx.revert()
	}, [isVisible])

	// Prevent body scrolling while modal is visible
	useEffect(() => {
		if (!isVisible) return

		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = prev
		}
	}, [isVisible])

	const handleClose = () => {
		localStorage.setItem('btb-popup-seen', 'true')

		if (tl.current) {
			tl.current.reverse()
			setTimeout(() => setIsVisible(false), 600)
		} else {
			setIsVisible(false)
		}
	}

	if (!isVisible) return null

	return (
		<div
			ref={overlayRef}
			onClick={(e) => {
				if (e.target === overlayRef.current) handleClose()
			}}
			className='fixed inset-0 z-9999 bg-black/70 backdrop-blur-xs'
		>
			<div
				ref={modalRef}
				className='
				absolute top-22 md:top-48 left-1/2
				-translate-x-1/2
				w-[92%] max-w-4xl
				text-white
				rounded-2xl overflow-hidden
				shadow-[0_20px_80px_rgba(0,0,0,0.6)]
				'
			>
				<GrainientBackground className='absolute inset-0 w-full h-full' />
				{/* Close */}
				<button
					onClick={handleClose}
					className='absolute top-5 right-5 z-20 text-white shadow-lg rounded-full border p-1 hover:scale-125 transition duration-200'
				>
					<X size={24} />
					<span className='sr-only'>Close</span>
				</button>

				<div className='grid md:grid-cols-2'>
					{/* IMAGE SIDE */}
					<div className='relative h-65 md:h-full overflow-hidden'>
						<Image
							ref={imageRef}
							src='/Julia-Camera.png'
							alt='Better Than Bad'
							fill
							className='object-cover object-[5%_25%]'
						/>
					</div>

					{/* CONTENT SIDE */}
					<div
						ref={contentRef}
						className='
						flex flex-col justify-center items-center
						p-8 md:p-14
						space-y-3
						'
					>
						<h3 className='text-2xl md:text-3xl lg:text-4xl font-medium text-shadow-lg'>
							OH SH*T. You’re ready to step up your digital
							content.
						</h3>

						<p className='text-black/80'>
							Book your discovery call now and get excited. Your
							future self will thank you.
						</p>

						<div className='pt-2 flex justify-center w-full'>
							<Link
								href='/contact'
								onClick={handleClose}
								className='
								w-full max-w-lg
								inline-flex items-center justify-center gap-2
								uppercase tracking-wide font-semibold
								px-8 py-3 rounded-full
								bg-white text-black
								hover:scale-105 
								transition-all duration-75
								shadow-lg
								'
							>
								Get In Touch
								<ArrowRight size={18} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
