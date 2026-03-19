'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const clients = [
	{ name: 'Letterboxd', logo: '/logos/letterboxd-logo.png' },
	{
		name: 'FemCap',
		logo: '/logos/femcap-logo.jpeg',
	},
	{
		name: 'Dead Oceans',
		logo: '/logos/dead-oceans-logo.svg',
	},
	{
		name: 'RiseMedia',
		logo: '/logos/rise-media-logo.png',
	},
	{
		name: 'Green Mountain Minerals',
		logo: '/logos/green-mountain-logo.png',
	},
]

export default function Logos() {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.from('.client-logo', {
				opacity: 0,
				y: 20,
				stagger: 0.15,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container.current,
					start: 'top 90%',
				},
			})
		},
		{ scope: container },
	)

	return (
		<section
			ref={container}
			className='py-20 px-6'
		>
			<div className='flex flex-col justify-center gap-4'>
				<h3 className='text-white text-center uppercase font-heading text-3xl leading-relaxed tracking-wider'>
					Trusted by
				</h3>
				<div
					className='flex flex-wrap justify-center gap-4 items-center'
				>
					{clients.map((client, i) => (
						<div
							key={i}
							className='rounded-lg bg-white p-4 flex items-center w-48 h-48 md:w-52 md:h-52'
						>
							<Image
								src={client.logo}
								alt={client.name + 'logo'}
								title={client.name}
								width={200}
								height={200}
								className='client-logo'
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
