export type WorkMedia =
	| {
		type: 'video'
		url: string
	}
	| {
		type: 'gallery'
		images: string[]
	}
	

export type WorkProject = {
	title: string
	client?: string
	services?: string[]
	thumbnail: string
	media: WorkMedia
	description?: string
	externalLink?: string
}

export const workProjects: WorkProject[] = [
	{
		title: '45 Degrees',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/45degees-still.jpg',
		media: {
			type: 'video',
			url: 'https://vimeo.com/836936545?fl=ip&fe=ec',
		},
		description: 'An Award-Winning Short Documentary by Julia Barrett-Mitchell, made possible with funds granted by HudsyTV. Premiered at the Woodstock Film Festival 2023; Won Best Short Documentary at the Big Apple Film Festival 2024'
	},
	{
		title: 'The Beautiful Nothing',
		client: 'The Bobby Anspach Foundation',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/the-beautiful-nothing.png',
		media: {
			type: 'video',
			url: 'https://youtu.be/bVIu1JVJa8s?si=QK8C6PxG14XOgLGO',
		},
		description: `'Premiered at the Newport Art Museum in the exhibit “Everything is Change”, Summer 2025. Coming Soon to the Toledo Museum of Art'`
	},
	{
		title: 'EWI (Official Music Video)',
		client: 'Moon Hooch',
		thumbnail: '/work/moon-hooch-ewi-still.png',
		media: {
			type: 'video',
			url: 'https://www.youtube.com/watch?v=yUEapzqptIA'
		}
	},
	{
		title: "Good Comin' (Official Music Video)",
		client: 'Beccs',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/good-comin-still.png',
		media: {
			type: 'video',
			url: 'https://www.youtube.com/watch?v=aVejzAbokdk'
		}
	},
	{
		title: "Swimmers (Official Music Video)",
		client: 'Alexander F',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/swimmers-still.png',
		media: {
			type: 'video',
			url: 'https://www.youtube.com/watch?v=AYeg9u1PBxE'
		}
	},
	{
		title: 'Casa Pole Dance',
		client: 'Casa Pole Dance',
		services: ['Creative Direction', 'Video Production'],
		thumbnail: '/work/Cass-Crop-Top-Cherry-Blossom.png',
		media: {
			type: 'gallery',
			images: ['/work/Cass-Crop-Top-Cherry-Blossom.png', '/work/Cass-Outfit-Detail-On-Liberty.png', '/work/Cass-Shorts-Liberty-Street.png']
		},
		description: 'A series of videos and photos created for Casa Pole Dance, a pole dance studio in Newburgh, NY. The project included a brand video, social media content, and promotional materials for the studio.',
		externalLink: 'https://www.instagram.com/p/DYXL6EkRLJU/'


	},
]
