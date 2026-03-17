'use client'

import Image from 'next/image'
import { WorkProject } from '@/lib/workProjects'

type FeaturedFilmProps = {
	project: WorkProject
	onPlay: (url: string) => void
}


export default function FeaturedFilm({ project, onPlay }: FeaturedFilmProps) {
	return (
		<section className='px-6 pb-32'>
			<div className='max-w-6xl mx-auto space-y-6'>
				<button
					onClick={() => onPlay(project.videoUrl)}
					className='group relative block overflow-hidden rounded-2xl'
				>
					<Image
						src={project.thumbnail}
						alt={project.title}
						width={1920}
						height={1080}
						className='w-full h-auto object-cover transition duration-700 group-hover:scale-105'
					/>

					<div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition'>
						<div className='text-4xl'>▶</div>
					</div>
				</button>

				<div className='space-y-2'>
					<p className='opacity-60'>{project.client}</p>

					<h2 className='text-4xl md:text-5xl font-light'>
						{project.title}
					</h2>

					{project.services && (
						<p className='opacity-70'>
							{project.services.join(' / ')}
						</p>
					)}
					
					{project.description && (
						<p>
							{project.description}
						</p>
					)}
				</div>
			</div>
		</section>
	)
}
