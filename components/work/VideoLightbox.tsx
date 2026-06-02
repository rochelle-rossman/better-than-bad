'use client'

import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), {
	ssr: false,
})

type Props = {
	url: string
}

export default function VideoLightbox({ url }: Props) {
	return (
		<div className='w-full h-full'>
			<ReactPlayer
				src={url}
				playing
				controls
				width='100%'
				height='100%'
			/>
		</div>
	)
}
