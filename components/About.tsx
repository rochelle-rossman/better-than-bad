import Image from "next/image"

export default function About() {
	return (
		<div className='flex flex-wrap md:flex-nowrap items-center justify-center gap-6  text-light-mustard'>
			<div className='leading-relaxed'>
				{/* <h2 className='text-4xl font-bold mb-6'>About</h2> */}
				<p>
					Better Than Bad Films is a studio founded by award-winning
					director and creative strategist Julia Barrett-Mitchell.
					Julia has led creative direction for internationally
					recognized brands, produced viral content, and earned
					accolades at major festivals for her original work. Her
					background spans branded content campaigns, documentary, and
					narrative filmmaking.
				</p>
				<p className='mt-6 text-lg italic'>
					So why call it Better Than Bad?
				</p>
				<p className='mt-6'>
					The name is both a wink and a manifesto. Because perfection
					is boring. It’s a rebellion against ego and a reminder that
					the best creative work has humor and humility. It’s a
					promise that the process can be joyful, collaborative, and
					yes — better than bad. Possibly even f*cking amazing.
				</p>
			</div>
			<Image
				src={'/Julia-Headshot-2.jpg'}
				alt=''
				width={800}
				height={800}
				className='max-w-1/3 rounded-2xl'
			/>
		</div>
	)
}
