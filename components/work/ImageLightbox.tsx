'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

type Props = {
	images: string[]
	initialIndex?: number
	onClose: () => void
}

export default function ImageLightbox({
	images,
	initialIndex = 0,
	onClose,
}: Props) {
	const [current, setCurrent] = useState(initialIndex)

	// Lock scroll
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = ''
		}
	}, [])

	const goNext = useCallback(() => {
		setCurrent((prev) => (prev + 1) % images.length)
	}, [images.length])

	const goPrev = useCallback(() => {
		setCurrent((prev) => (prev - 1 + images.length) % images.length)
	}, [images.length])

	// Keyboard controls
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowRight') goNext()
			if (e.key === 'ArrowLeft') goPrev()
		}

		window.addEventListener('keydown', handleKey)
		return () => window.removeEventListener('keydown', handleKey)
	}, [goNext, goPrev, onClose])

	return (
		<div
			className='fixed inset-0 z-50 bg-black/95 flex items-center justify-center'
			onClick={onClose}
		>
			{/* Prevent closing when clicking image */}
			<div
				className='relative max-w-6xl w-full px-4'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Image */}
				<div className='relative w-full h-[85vh]'>
					<Image
						src={images[current]}
						alt=''
						fill
						className='object-contain'
					/>
				</div>

				{/* Controls */}
				<button
					onClick={goPrev}
					className='absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100'
				>
					‹
				</button>

				<button
					onClick={goNext}
					className='absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100'
				>
					›
				</button>

				{/* Close */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-white text-xl opacity-70 hover:opacity-100'
				>
					✕
				</button>

				{/* Index */}
				<div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70'>
					{current + 1} / {images.length}
				</div>
			</div>
		</div>
	)
}
