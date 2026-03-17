'use client'

import Image from 'next/image'
import { WorkProject } from '@/lib/workProjects'

type WorkCardProps = {
	project: WorkProject
	onPlay: (url: string) => void
}

export default function WorkCard({ project, onPlay }: WorkCardProps) {
	return (
		<button
			onClick={() => onPlay(project.videoUrl)}
			className='group text-left'
		>
			<div className='relative overflow-hidden rounded-xl'>
				<Image
					src={project.thumbnail}
					alt={project.title}
					width={1920}
					height={1080}
					className='w-full h-auto object-cover transition duration-700 group-hover:scale-105'
				/>

				<div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
					<div className='text-3xl'>▶</div>
				</div>
			</div>

			<div className='mt-4 space-y-1'>
				<p className='text-sm opacity-60'>{project.client}</p>

				<h3 className='text-xl'>{project.title}</h3>

				{project.services && (
					<p className='text-sm opacity-60'>
						{project.services.join(' / ')}
					</p>
				)}

				{project.description && <p>{project.description}</p>}
			</div>
		</button>
	)
}
