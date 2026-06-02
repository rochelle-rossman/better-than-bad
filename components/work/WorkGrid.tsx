import WorkCard from './WorkCard'
import { WorkProject } from '@/lib/workProjects'

type WorkGridProps = {
	projects: WorkProject[]
	onOpen: (project: WorkProject) => void
}

export default function WorkGrid({ projects, onOpen }: WorkGridProps) {
	return (
		<section className='px-6'>
			<div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
				{projects.map((project) => (
					<div
						key={project.title}
						className='break-inside-avoid'
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
