import WorkCard from './WorkCard'
import { WorkProject } from '@/lib/workProjects'

type WorkGridProps = {
	projects: WorkProject[]
	onPlay: (url: string) => void
}

export default function WorkGrid({ projects, onPlay }: WorkGridProps) {
	return (
		<section className='px-6 pb-40'>
			<div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
				{projects.map((project, i) => (
					<WorkCard
						key={i}
						project={project}
						onPlay={onPlay}
					/>
				))}
			</div>
		</section>
	)
}
