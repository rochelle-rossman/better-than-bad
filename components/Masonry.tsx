'use client'

import { useLayoutEffect, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

type MasonryImage = {
	src: StaticImageData
	alt?: string
}

interface MasonryProps {
	images: MasonryImage[]
	className?: string
}

gsap.registerPlugin(ScrollTrigger)

export default function Masonry({ images, className = '' }: MasonryProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!containerRef.current) return

		const items =
			containerRef.current.querySelectorAll<HTMLDivElement>(
				'.masonry-item',
			)

		// Entrance animation (fade + lift + subtle scale)
		gsap.from(items, {
			opacity: 0,
			y: 40,
			scale: 1.05,
			duration: 1.2,
			stagger: 0.08,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top 85%',
			},
		})

		// Scroll-based floating / parallax
		items.forEach((item) => {
			const yDistance = gsap.utils.random(-20, -50) // vertical float

			gsap.to(item, {
				y: yDistance,
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			})
		})
	}, [])

	return (
		<div className='w-full h-full flex justify-center items-center relative'>
			<div
				ref={containerRef}
				className={`
				masonry
				columns-2
				md:columns-3
				lg:columns-4
				gap-4
				p-2
				max-w-6xl
				${className}
				`}
			>
				{images.map((img, i) => (
					<div
						key={i}
						className='masonry-item mb-6 break-inside-avoid overflow-hidden rounded-2xl relative group'
					>
						<Image
							src={img.src}
							alt={img.alt || ''}
							placeholder='blur'
							className='
                w-full h-auto object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-[1.2]
              '
						/>
					</div>
				))}
			</div>
		</div>
	)
}
