'use client'

import { useState } from 'react'
import { SplitWordCTA } from '@/components/SplitWordCTA'
import ProjectViewer from '@/components/work/ProjectViewer'
import WorkGrid from '@/components/work/WorkGrid'
import WorkHero from '@/components/work/WorkHero'
import ProjectMorphLayer from '@/components/work/ProjectMorphLayer'
import { workProjects, WorkProject } from '@/lib/workProjects'

export default function WorkPage() {
	const [activeProject, setActiveProject] = useState<WorkProject | null>(null)
	const [scrollY, setScrollY] = useState(0)
	const [morphRect, setMorphRect] = useState<DOMRect | null>(null)
	const [morphing, setMorphing] = useState(false)

	const handleOpen = (project: WorkProject, rect: DOMRect) => {
		const currentScroll = window.scrollY
		setScrollY(currentScroll)
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setMorphRect(rect)
		setActiveProject(project)
		setMorphing(true)
	}
	
	const handleClose = () => {
		setActiveProject(null)
		
		// restore previous scroll position
		window.scrollTo({
			top: scrollY,
			behavior: 'smooth',
		})
	}

	return (
		<main className='bg-black text-white'>
			<WorkHero />

			<WorkGrid
				projects={workProjects}
				onOpen={handleOpen}
			/>

			{morphing && activeProject && morphRect && (
				<ProjectMorphLayer
					project={activeProject}
					rect={morphRect}
					onComplete={() => setMorphing(false)}
				/>
			)}

			<ProjectViewer
				project={activeProject}
				onClose={handleClose}
			/>

			<SplitWordCTA />
		</main>
	)
}
