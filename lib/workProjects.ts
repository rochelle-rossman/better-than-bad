export type WorkProject = {
	title: string
	client?: string
	services?: string[]
	thumbnail: string
	videoUrl: string
	description?: string
}

export const workProjects = [
	{
		title: '45 Degrees',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/45degees-still.jpg',
		videoUrl: 'https://vimeo.com/836936545?fl=pl&fe=sh',
		description: 'An Award-Winning Short Documentary by Julia Barrett-Mitchell, made possibly with funds granted by HudsyTV. Premiered at the Woodstock Film Festival 2023; Won Best Short Documentary at the Big Apple Film Festival 2024'
	},
	{
		title: 'The Beautiful Nothing',
		client: 'The Bobby Anspach Foundation',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/the-beautiful-nothing.png',
		videoUrl: 'https://www.youtube.com/watch?v=bVIu1JVJa8s',
		description: `'Premiered at the Newport Art Museum in the exhibit “Everything is Change”, Summer 2025. 
Coming Soon to the Toledo Museum of Art'`
	},
]
