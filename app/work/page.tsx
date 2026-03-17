'use client'

import { useState } from 'react'
import WorkHero from '@/components/work/WorkHero'
import FeaturedFilm from '@/components/work/FeaturedFilm'
import WorkGrid from '@/components/work/WorkGrid'
import VideoLightbox from '@/components/work/VideoLightbox'
import { workProjects } from '@/lib/workProjects'

export default function WorkPage() {
	const [activeVideo, setActiveVideo] = useState<string | null>(null)

	return (
		<main className='bg-black text-white'>
			<WorkHero />
			

			<FeaturedFilm
				project={workProjects[0]}
				onPlay={(url) => setActiveVideo(url)}
			/>

			<WorkGrid
				projects={workProjects.slice(1)}
				onPlay={(url) => setActiveVideo(url)}
			/>

			<VideoLightbox
				url={activeVideo}
				onClose={() => setActiveVideo(null)}
			/>
		</main>
	)
}
