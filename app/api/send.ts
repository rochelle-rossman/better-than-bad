'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type FormState = {
	success: boolean
	error?: string
}

export async function sendEmail(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const name = formData.get('name')?.toString() || ''
	const email = formData.get('email')?.toString() || ''
	const message = formData.get('message')?.toString() || ''

	// Basic validation (server-side safety)
	if (!name || !email || !message) {
		return { success: false, error: 'All fields are required.' }
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return { success: false, error: 'Invalid email address.' }
	}

	try {
		await resend.emails.send({
			from: 'Website Contact <hello@contact.betterthanbadfilms.com>',
			to: 'julia@betterthanbadfilms.com',
			replyTo: email,
			subject: `New message from ${name}`,
			html: `
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message}</p>
			`,
		})

		return { success: true }
	} catch (error) {
		console.error(error)
		return { success: false, error: 'Failed to send message.' }
	}
}
