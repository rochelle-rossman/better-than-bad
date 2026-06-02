'use client'

import { SplitWordCTA } from '@/components/SplitWordCTA'
import ProjectViewer from '@/components/work/ProjectViewer'
import WorkGrid from '@/components/work/WorkGrid'
import WorkHero from '@/components/work/WorkHero'
import { workProjects, WorkProject } from '@/lib/workProjects'
import { useState } from 'react'

export default function WorkPage() {
	const [activeProject, setActiveProject] = useState<WorkProject | null>(null)

	return (
		<main className='bg-black text-white'>
			<WorkHero />

			<WorkGrid
				projects={workProjects}
				onOpen={setActiveProject}
			/>

			<ProjectViewer
				project={activeProject}
				onClose={() => setActiveProject(null)}
			/>

			<SplitWordCTA />
		</main>
	)
}
