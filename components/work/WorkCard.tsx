'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { WorkProject } from '@/lib/workProjects'
import { ArrowRight } from 'lucide-react'

type Props = {
	project: WorkProject
	onOpen: (project: WorkProject, rect: DOMRect) => void
}

const getCTA = (type: WorkProject['media']['type']) => {
	switch (type) {
		case 'video':
			return 'Watch'
		case 'gallery':
			return 'View'
		default:
			return 'View'
	}
}

export default function MasonryCard({ project, onOpen }: Props) {
	const cardRef = useRef<HTMLDivElement>(null)
	
	return (
		<div
			ref={cardRef}
			className='block group relative w-full cursor-pointer overflow-hidden rounded-xl border border-white/20'
			onClick={() => {
				const rect = cardRef.current?.getBoundingClientRect()
				if (!rect) return

				onOpen(project, rect)
			}}
		>
			{/* Image */}
			<Image
				src={project.thumbnail}
				alt={project.title}
				width={1920}
				height={1080}
				className='object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105'
			/>

			{/* Gradient Overlay */}
			<div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500' />

			{/* Content */}
			<div className='absolute inset-0 flex flex-col justify-end p-5 md:p-6'>
				<div className='translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out space-y-2'>
					<h3 className='text-lg md:text-xl font-medium leading-tight'>
						{project.title}
					</h3>

					{/* CTA */}
					<div>
						<span className='text-sm font-medium tracking-wide inline-flex items-center gap-2'>
							{getCTA(project.media.type)}
							<span className='inline-block transition-transform duration-300 group-hover:translate-x-1'>
								<ArrowRight size={16} />
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
