'use client'

import { useLayoutEffect, useRef, useCallback } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Flip } from '@/lib/gsap'

type MasonryImage = {
	src: StaticImageData
	alt?: string
}

interface MasonryProps {
	images: MasonryImage[]
	className?: string
}

function MasonryItem({ img, index }: { img: MasonryImage; index: number }) {
	const aspectVariants = [
		'aspect-[4/3]',
		'aspect-[3/4]',
		'aspect-[1/1]',
		'aspect-[16/9]',
	]

	const aspect = aspectVariants[index % aspectVariants.length]

	const radius =
		index % 3 === 0 ? 'rounded-2xl'
		: index % 3 === 1 ? 'rounded-lg'
		: 'rounded-sm'

	const rotation = index % 2 === 0 ? 'rotate-[0.4deg]' : '-rotate-[0.4deg]'

	return (
		<div
			className={`
				group relative overflow-hidden
				${aspect} ${radius} ${rotation}
			`}
		>
			<Image
				src={img.src}
				alt={img.alt || ''}
				fill
				placeholder='blur'
				className='
					object-cover
					transition-transform duration-700
					group-hover:scale-110
				'
			/>
		</div>
	)
}

function getColumnCount() {
	// if (window.innerWidth < 640) return 1
	if (window.innerWidth < 1024) return 2
	return 3
}

export default function Masonry({ images, className = '' }: MasonryProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	const layout = useCallback(() => {
		const container = containerRef.current
		if (!container) return

		const items = Array.from(
			container.querySelectorAll('[data-item]'),
		) as HTMLElement[]

		const state = Flip.getState(items)

		const columnCount = getColumnCount()
		const columnHeights = new Array(columnCount).fill(0)
		const columnWidth = container.clientWidth / columnCount

		items.forEach((item, i) => {
			item.style.position = 'absolute'
			const variance = i % 5 === 0 ? -10 : 0
			item.style.width = `${columnWidth - 12 + variance}px`

			const minColumn = columnHeights.indexOf(Math.min(...columnHeights))

			const x = minColumn * columnWidth

			const offset = i % 3 === 0 ? 12 : 0
			const y = columnHeights[minColumn] + offset

			item.style.transform = `translate(${x}px, ${y}px)`

			const gap = i % 4 === 0 ? 28 : 16
			columnHeights[minColumn] += item.offsetHeight + gap
		})

		container.style.height = `${Math.max(...columnHeights)}px`

		Flip.from(state, {
			duration: 0.7,
			ease: 'power3.out',
			stagger: 0.04,
		})
	}, [])

	useLayoutEffect(() => {
		layout()

		const handleResize = () => layout()
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [layout, images])

	return (
		<div className='flex justify-center px-4'>
			<div
				ref={containerRef}
				className={`relative w-full max-w-6xl ${className}`}
			>
				{images.map((img, i) => (
					<div
						key={i}
						data-item
						className='absolute will-change-transform'
					>
						<MasonryItem
							img={img}
							index={i}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
