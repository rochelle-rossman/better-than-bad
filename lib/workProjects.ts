export type WorkProject = {
	title: string
	client: string
	services: string[]
	thumbnail: string
	videoUrl: string
}

export const workProjects = [
	{
		title: 'Award-Winning Short Documentary',
		client: '45 Degrees',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/45degees-still.jpg',
		videoUrl: 'https://vimeo.com/836936545?fl=pl&fe=sh',
	},
	// {
	// 	title: 'Music Video',
	// 	client: 'Dead Oceans',
	// 	services: ['Direction'],
	// 	thumbnail: '/work/dead-oceans.jpg',
	// 	videoUrl: 'https://www.youtube.com/watch?v=abc123',
	// },
]
