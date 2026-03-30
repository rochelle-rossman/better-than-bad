'use client'

import { SplitWordCTA } from '@/components/SplitWordCTA'
import FeaturedFilm from '@/components/work/FeaturedFilm'
import VideoLightbox from '@/components/work/VideoLightbox'
import WorkGrid from '@/components/work/WorkGrid'
import WorkHero from '@/components/work/WorkHero'
import { workProjects } from '@/lib/workProjects'
import { useState } from 'react'

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
			<SplitWordCTA />
		</main>
	)
}
