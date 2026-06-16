'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { WorkProject } from '@/lib/workProjects'
import BorderGlow from '../BorderGlow'
import { ArrowRight } from 'lucide-react'
import { useInteractive } from '@/lib/useInteractive'

type Props = {
	project: WorkProject
	onOpen: (project: WorkProject, rect: DOMRect) => void
}

const aspectVariants = ['aspect-[3/4]', 'aspect-[1/1]', 'aspect-[16/9]']

function getAspect(project: WorkProject) {
	const hash = project.title.length % aspectVariants.length
	return aspectVariants[hash]
}

export default function MasonryCard({ project, onOpen }: Props) {
	const cardRef = useRef<HTMLDivElement>(null)

	const { bind, state } = useInteractive({
		enableTapToReveal: true,
		onOpen: () => {
			const rect = cardRef.current?.getBoundingClientRect()
			if (!rect) return
			onOpen(project, rect)
		},
	})

	const isActive = state.active
	const isHovered = state.hovered

	return (
		<BorderGlow>
			<div
				ref={cardRef}
				{...bind}
				className={`
					group relative w-full cursor-pointer overflow-hidden rounded-xl
					${getAspect(project)}
					transition-transform duration-300
					${state.pressed ? 'scale-[0.98]' : ''}
				`}
			>
				<Image
					src={project.thumbnail}
					alt={project.title}
					fill
					className={`
						object-cover
						transition-transform duration-700
						${isHovered || isActive ? 'scale-110' : ''}
					`}
				/>

				{/* Overlay */}
				<div
					className={`
						absolute inset-0 bg-black/60
						transition duration-300
						${isHovered || isActive ? 'opacity-100' : 'opacity-0'}
					`}
				/>

				{/* Content */}
				<div
					className={`
						absolute bottom-0 p-5
						transition-all duration-500
						${
							isHovered || isActive ?
								'translate-y-0 opacity-100'
							:	'translate-y-4 opacity-0'
						}
					`}
				>
					<h3 className='text-lg'>{project.title}</h3>

					<div className='text-sm inline-flex items-center gap-2'>
						View More
						<ArrowRight size={16} />
					</div>
				</div>
			</div>
		</BorderGlow>
	)
}
