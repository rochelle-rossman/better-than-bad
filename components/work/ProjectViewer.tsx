
import ProjectMedia from './ProjectMedia'
import type { WorkProject } from '@/lib/workProjects'
import {X} from 'lucide-react'

type ProjectViewerProps = {
	project: WorkProject | null
	onClose: () => void
}

export default function ProjectViewer({
	project,
	onClose,
}: ProjectViewerProps) {
	if (!project) return null

	return (
		<div
			className='fixed inset-0 z-50 overflow-y-auto bg-black/95 py-32 flex items-start justify-center'
			onClick={onClose}
		>
			<div
				className='relative w-full h-full max-w-11/12'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-white cursor-pointer opacity-70 hover:opacity-100'
				>
					<X size={30} />
					<span className='sr-only'>Close</span>
				</button>

				<h2 className='text-3xl md:text-5xl my-6'>{project.title}</h2>
				{project.client && (
					<p className='text-sm uppercase tracking-wider text-white/60 mb-4'>
						{project.client}
					</p>
				)}
				{project.description && (
					<p className='text-lg leading-relaxed'>
						{project.description}
					</p>
				)}
				{project.externalLink && (
					<a
						href={project.externalLink}
						target='_blank'
						rel='noopener noreferrer'
						className='text-accent hover:underline'
					>
						See More
					</a>
				)}

				<ProjectMedia media={project.media} />
			</div>
		</div>
	)
}
