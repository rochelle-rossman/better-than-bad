'use client'

import Hero from '@/components/home/Hero'
import Reel from '@/components/home/Reel'
import Services from '@/components/home/Services'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import Logos from '@/components/home/Logos'
import ContactSection from '@/components/home/ContactSection'
import AboutTeaser from '@/components/home/About'

export default function HomePage() {
	return (
		<main className='relative overflow-hidden min-h-screen'>
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
				<ContactSection />
			</section>
		</main>
	)
}
