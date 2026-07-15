'use client'

import { useEffect, useRef, useState } from 'react'
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
	const [isTouch, setIsTouch] = useState(false)
	
	useEffect(() => {
		const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
		const updateTouch = () => requestAnimationFrame(() => setIsTouch(mq.matches))

		updateTouch()
		mq.addEventListener('change', updateTouch)

		return () => mq.removeEventListener('change', updateTouch)
	}, [])

	const { bind, state } = useInteractive({
		enableTapToReveal: !isTouch,
		onOpen: () => {
			const rect = cardRef.current?.getBoundingClientRect()
			if (!rect) return
			onOpen(project, rect)
		},
	})

	const isActive = state.active
	const isHovered = state.hovered
	const showContent = isTouch || isHovered || isActive

	return (
		<BorderGlow>
			<div
				ref={cardRef}
				{...bind}
				className={`
					group relative w-full cursor-pointer overflow-hidden rounded-xl
					${getAspect(project)}
					transition-transform duration-300
					${showContent ? 'scale-[0.98]' : ''}
				`}
			>
				<Image
					src={project.thumbnail}
					alt={project.title}
					fill
					className={`
						object-cover
						transition-transform duration-700
						${showContent ? 'scale-110' : ''}
					`}
				/>

				{/* Overlay */}
				<div
					className={`
						absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/80 to-transparent
						transition duration-300
						${showContent ? 'opacity-100' : 'opacity-0'}
					`}
				/>

				{/* Content */}
				<div
					className={`
						absolute bottom-0 px-5 py-7
						transition-all duration-500
						${
							showContent ?
								'translate-y-0 opacity-100'
							:	'translate-y-4 opacity-0'
						}
					`}
				>
					<h3 className='text-2xl'>{project.title}</h3>

					<div className='inline-flex items-center gap-2'>
						View More
						<ArrowRight size={16} />
					</div>
				</div>
			</div>
		</BorderGlow>
	)
}
