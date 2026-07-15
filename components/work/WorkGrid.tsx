'use client'

import { useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { Flip } from '@/lib/gsap'
import WorkCard from './WorkCard'
import { WorkProject } from '@/lib/workProjects'

type WorkGridProps = {
	projects: WorkProject[]
	onOpen: (project: WorkProject, rect: DOMRect) => void
}

function getColumnCount() {
	if (window.innerWidth < 640) return 1
	if (window.innerWidth < 1024) return 2
	return 3
}

export default function WorkGrid({ projects, onOpen }: WorkGridProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	const layoutGrid = (container: HTMLDivElement, items: HTMLElement[]) => {
		const columnCount = getColumnCount()
		const columnHeights = new Array(columnCount).fill(0)
		const columnWidth = container.clientWidth / columnCount
		const offset = (index: number) => (index % 3 === 0 ? 12 : 0)
		

		items.forEach((item, i) => {
			const minColumn = columnHeights.indexOf(Math.min(...columnHeights))
			const gap = i % 3 === 0 ? 28 : 16
			const x = minColumn * columnWidth
			const y = columnHeights[minColumn] + offset(i)
			const variance = i % 4 === 0 ? -12 : 0
			
			item.style.position = 'absolute'
			item.style.width = `${columnWidth - 16 + variance}px`
			item.style.transform = `translate(${x}px, ${y}px)`

			columnHeights[minColumn] += item.offsetHeight + gap
		})

		container.style.height = `${Math.max(...columnHeights)}px`
	}

	const runLayout = useCallback(() => {
		const container = containerRef.current
		if (!container) return

		const items = Array.from(
			container.querySelectorAll('[data-masonry-item]'),
		) as HTMLElement[]
		const state = Flip.getState(items)

		layoutGrid(container, items)

		Flip.from(state, {
			duration: 0.6,
			ease: 'power3.out',
			stagger: 0.03,
		})
	}, [])

	useLayoutEffect(() => {
		runLayout()
	}, [runLayout, projects])

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null

		const handleResize = () => {
			if (timeout) clearTimeout(timeout)

			timeout = setTimeout(() => {
				runLayout()
			}, 150)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (timeout) clearTimeout(timeout)
		}
	}, [runLayout])

	return (
		<section className='px-6'>
			<div
				ref={containerRef}
				className='relative w-full max-sm:flex justify-center'
			>
				{projects.map((project) => (
					<div
						key={project.title}
						data-masonry-item
					>
						<WorkCard
							project={project}
							onOpen={onOpen}
						/>
					</div>
				))}
			</div>
		</section>
	)
}
