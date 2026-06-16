'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap, SplitText } from '@/lib/gsap'
import { Button } from './ui/button'

export function SplitWordCTA() {
	const containerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLHeadingElement>(null)
	const buttonRef = useRef<HTMLAnchorElement>(null)

	useEffect(() => {
		if (!textRef.current || !buttonRef.current) return
		
		const mm = gsap.matchMedia()

		mm.add('(prefers-reduced-motion: no-preference)', () => { 
			const ctx = gsap.context(() => {
				const split = new SplitText(textRef.current, {
					type: 'words',
				})

				const words = split.words

				const tl = gsap.timeline({
					defaults: { ease: 'power3.out' },
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top top',
					},
				})

				tl.from(words, {
					y: 200,
					opacity: 0,
					stagger: 0.04,
					duration: 1,
				})

					.to({}, { duration: 0.3 })

					.fromTo(
						buttonRef.current,
						{
							opacity: 0,
							scale: 0.5,
							y: 40,
						},
						{
							opacity: 1,
							scale: 1,
							y: 0,
							duration: 0.5,
							ease: 'power3.out',
						},
						'-=0.2',
					)
			}, containerRef)
			return () => ctx.revert()
		})
		
		mm.add('(prefers-reduced-motion: reduce)', () => {
			gsap.set(textRef.current, { opacity: 1, y: 0 })
			gsap.set(buttonRef.current, { opacity: 1, scale: 1, y: 0 })
		})

		return () => mm.revert()

	}, [])

	return (
		<section
			ref={containerRef}
			className='py-32 text-white text-center flex flex-col gap-8 items-center justify-start px-6 min-h-[80vh]'
		>
			<h2
				ref={textRef}
				className='text-5xl md:text-7xl max-w-4xl'
			>
				Ready to make something that actually stands out?
			</h2>

			<Link
				ref={buttonRef}
				href='/contact'
				className='w-full'
			>
				<Button
					className='w-full max-w-lg text-lg
								inline-flex items-center justify-center gap-2
								tracking-wide font-semibold
								px-8 py-6 rounded-full
								bg-white text-black
								hover:scale-105 
								transition-all duration-75
								shadow-lg'
				>
					Let&apos;s talk
				</Button>
			</Link>
		</section>
	)
}
