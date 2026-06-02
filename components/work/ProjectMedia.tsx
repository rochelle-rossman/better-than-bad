'use client'

import ReactPlayer from 'react-player'
import Image from 'next/image'
import type { WorkMedia } from '@/lib/workProjects'

type Props = {
	media: WorkMedia
}

export default function ProjectMedia({ media }: Props) {
	// VIDEO
	if (media.type === 'video') {
		return (
			<div className='aspect-video mt-6'>
				<ReactPlayer
					src={media.url}
					playing={false}
					controls
					width='100%'
					height='100%'
				/>
			</div>
		)
	}

	// GALLERY (film strip)
	if (media.type === 'gallery') {
		return (
			<div className='mt-8'>
				<div
					className='
					flex gap-4 overflow-x-auto
					scrollbar-none
				'
				>
					{media.images.map((src) => (
						<div
							key={src}
							className='
							max-w-1/3
							overflow-hidden
							rounded-lg
						'
						>
							<Image
								src={src}
								alt=''
								width={1920}
								height={1080}
								className='object-cover'
							/>
						</div>
					))}
				</div>
			</div>
		)
	}
}
