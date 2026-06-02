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

		items.forEach((item) => {
			item.style.position = 'absolute'
			item.style.width = `${columnWidth}px`

			const minColumn = columnHeights.indexOf(Math.min(...columnHeights))

			const x = minColumn * columnWidth
			const y = columnHeights[minColumn]

			item.style.transform = `translate(${x}px, ${y}px)`

			columnHeights[minColumn] += item.offsetHeight + 16
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
			// debounce to avoid thrashing
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
				className='relative w-full'
			>
				{projects.map((project) => (
					<div key={project.title} data-masonry-item>
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
