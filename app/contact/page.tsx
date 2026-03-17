import ContactForm from '@/components/ContactForm'

export default function Contact() {
	return (
		<section
			className='panel w-full h-screen bg-gradient flex justify-center items-center'
			id='contact'
		>
			<div className='w-full max-w-4xl p-8 mt-16 text-center'>
				<h2 className='text-4xl font-bold mb-8'>Get in Touch</h2>
				<ContactForm />
			</div>
		</section>
	)
}
