'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { createPortal } from 'react-dom'

const ReactPlayer = dynamic(() => import('react-player'), {
	ssr: false,
})

type VideoLightboxProps = {
	url: string | null
	onClose: () => void
}

export default function VideoLightbox({ url, onClose }: VideoLightboxProps) {
	const overlayRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!url) return

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleKey)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKey)
			document.body.style.overflow = ''
		}
	}, [url, onClose])

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === overlayRef.current) {
			onClose()
		}
	}

	if (!url) return null

	return createPortal(
		<div
			ref={overlayRef}
			onClick={handleBackdropClick}
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm'
		>
			{/* Close Button */}
			<button
				onClick={onClose}
				className='absolute top-6 right-6 text-white text-3xl hover:opacity-70 transition'
				aria-label='Close video'
			>
				✕
			</button>

			{/* Video Container */}
			<div className='w-[90vw] max-w-6xl aspect-video'>
				<ReactPlayer
					src={url}
					controls
					playing
					width='100%'
					height='100%'
				/>
			</div>
		</div>,
		document.body
	)
}
