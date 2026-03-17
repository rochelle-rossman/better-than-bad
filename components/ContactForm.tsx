import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface FormData {
	name: string
	email: string
	message: string
}

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		message: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle form submission logic here (e.g., send to API)
		console.log('Form submitted:', formData)
		// Reset form
		setFormData({ name: '', email: '', message: '' })
	}

	return (
		<section
			className='w-full flex flex-col justify-center items-center'
			id='contact'
		>
			<h2 className='text-5xl md:text-7xl font-semibold mb-4'>
				Get In Touch
			</h2>
			<h3 className='text-2xl font-light mb-8'>
				Let’s make something better than bad.
			</h3>
			<form
				onSubmit={handleSubmit}
				className='contact-form w-full max-w-4xl flex flex-col gap-6 p-8'
			>
				<div>
					<label htmlFor='name'>Name:</label>
					<Input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='email'>Email:</label>
					<Input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='message'>Message:</label>
					<Textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleChange}
						required
					/>
				</div>
				<Button type='submit'>Send Message</Button>
			</form>
		</section>
	)
}

export default ContactForm
