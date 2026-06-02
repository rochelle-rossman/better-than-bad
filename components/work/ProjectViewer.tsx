import VideoLightbox from './VideoLightbox'
import ImageLightbox from './ImageLightbox'
import type { WorkProject } from '@/lib/workProjects'

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
			className='fixed inset-0 z-50 bg-black/95 flex items-center justify-center'
			onClick={onClose}
		>
			<div
				className='relative w-full max-w-6xl'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-white text-xl'
				>
					✕
				</button>

				{/* Media */}
				{project.media.type === 'video' && (
					<div className='aspect-video'>
						<VideoLightbox url={project.media.url} />
					</div>
				)}

				{project.media.type === 'gallery' && (
					<ImageLightbox
						images={project.media.images}
						onClose={onClose}
					/>
				)}
			</div>
		</div>
	)
}
