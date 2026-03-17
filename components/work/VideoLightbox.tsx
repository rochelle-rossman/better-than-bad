import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

type VideoLightboxProps = {
	url: string | null
	onClose: () => void
}

export default function VideoLightbox({ url, onClose }: VideoLightboxProps) {
	if (!url) return null

	return (
		<div className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center'>
			<button
				onClick={onClose}
				className='absolute top-8 right-8 text-3xl text-white'
			>
				✕
			</button>

			<div className='w-[90vw] max-w-6xl aspect-video'>
				<ReactPlayer
					src={url}
					controls
					width='100%'
					height='100%'
				/>
			</div>
		</div>
	)
}
