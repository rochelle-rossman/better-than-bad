import Masonry from '@/components/Masonry'
import { galleryImages } from '@/lib/galleryImages'

export default function Gallery() {
	return (
		<section className='py-32'>
			<Masonry images={galleryImages.map((src) => ({ src }))} />
		</section>
	)
}
