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

		const ctx = gsap.context(() => {
			const split = new SplitText(textRef.current, {
				type: 'words',
			})

			const words = split.words

			const tl = gsap.timeline({
				defaults: { ease: 'power3.out' },
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 70%',
				},
			})

			tl.from(words, {
				y: 120,
				opacity: 0,
				stagger: 0.04,
				duration: 1,
				
			})

				.to({}, { duration: 0.6 })

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
						duration: 0.8,
						ease: 'power3.out',
					},
					'-=0.2',
				)
		}, containerRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={containerRef}
			className='py-32 text-white text-center flex flex-col gap-8 items-center justify-center px-6 min-h-[80vh]'
		>
			<h2
				ref={textRef}
				className='text-5xl md:text-7xl font-semibold max-w-4xl'
			>
				Ready to make something that actually stands out?
			</h2>

			<Link
				ref={buttonRef}
				href='/contact'
				className='w-full max-w-80'
			>
				<Button className='w-full text-lg py-6 border rounded-full bg-transparent border-white hover:bg-white hover:text-black transition-all duration-300'>
					Let&apos;s chat
				</Button>
			</Link>
		</section>
	)
}
