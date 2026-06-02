'use client'

import Gallery from '@/components/home/Gallery'
import Hero from '@/components/home/Hero'
import Logos from '@/components/home/Logos'
import Reel from '@/components/home/Reel'
import Services from '@/components/home/Services'
import Testimonials from '@/components/home/Testimonials'
import { SplitWordCTA } from '@/components/SplitWordCTA'
import AboutTeaser from '@/components/home/About'
import PopupCTA from '@/components/PopupCTA'

export default function HomePage() {
	return (
		<main className='relative min-h-screen'>
			<PopupCTA />
			<section className='relative z-10'>
				<Hero />
			</section>

			<section className='relative z-10'>
				<Reel />
			</section>

			<section className='relative z-10'>
				<Services />
			</section>

			<section className='relative z-10'>
				<AboutTeaser />
			</section>

			<section className='relative z-10'>
				<Gallery />
			</section>

			<section className='relative z-10'>
				<Logos />
			</section>

			<section className='relative z-10'>
				<Testimonials />
			</section>

			<section className='relative z-10'>
				<SplitWordCTA />
			</section>
		</main>
	)
}
