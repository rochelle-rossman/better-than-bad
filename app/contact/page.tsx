import ContactForm from '@/components/ContactForm'

export default function Contact() {
	return (
		<section
			className='w-full h-100svh flex flex-col justify-center items-center py-32'
			id='contact'
		>
			<h1 className='text-sm text-white uppercase tracking-[0.35em] opacity-60 mt-6 mb-16'>
				Contact
			</h1>
			<ContactForm />
		</section>
	)
}
