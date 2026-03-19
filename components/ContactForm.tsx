'use client'

import { useRef, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { sendEmail } from '@/app/api/send'
import { gsap } from '@/lib/gsap'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const initialState = { success: false, error: '' }

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<Button
			type='submit'
			disabled={pending}
			className='mt-10 w-full text-lg py-6 border border-white hover:bg-white hover:text-black transition-all duration-300'
		>
			{pending ? 'Sending...' : 'Send Message'}
		</Button>
	)
}

export default function ContactForm() {
	const [state, formAction] = useActionState(sendEmail, initialState)

	const containerRef = useRef<HTMLDivElement>(null)
	const leftRef = useRef<HTMLDivElement>(null)
	const formWrapperRef = useRef<HTMLDivElement>(null)
	const successRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(leftRef.current, {
				y: 80,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
			})
			gsap.from('.field', {
				y: 40,
				opacity: 0,
				stagger: 0.12,
				duration: 0.8,
				delay: 0.3,
				ease: 'power3.out',
			})
		}, containerRef)
		return () => ctx.revert()
	}, [])

	useEffect(() => {
		if (state.success && successRef.current) {
			gsap.fromTo(
				successRef.current,
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
			)
		}
	}, [state.success])

	return (
		<section
			ref={containerRef}
			className='w-full px-6 md:px-12 py-32 text-white relative min-h-[80vh] flex items-center justify-center'
			id='contact'
		>
			{state.success ?
				<div
					ref={successRef}
					className='flex flex-col items-center text-center max-w-xl'
				>
					<h3 className='text-5xl md:text-7xl font-semibold mb-6'>
						Got it.
					</h3>
					<p className='text-xl'>
						We’ll be in touch soon. In the meantime, go make
						something interesting.
					</p>
				</div>
			:	<div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center w-full'>
					<div ref={leftRef} className='w-full md:max-w-1/2'>
						<h2 className='text-6xl md:text-7xl leading-[0.9] font-semibold mb-8'>
							Let’s make
							<br />
							something
							<br />
							better
							<br />
							than bad.
						</h2>
						<p className='text-xl  max-w-md opacity-80'>
							If you’re tired of safe, predictable work—we’ll get
							along just fine.
						</p>
					</div>

					<div
						ref={formWrapperRef}
						className='w-full'
					>
						<form
							action={formAction}
							className='flex flex-col gap-10'
						>
							<div className='field border-b pb-2'>
								<label className='block text-xs uppercase tracking-[0.2em] mb-2'>
									Name
								</label>
								<Input
									name='name'
									required
									className='bg-transparent border-none text-2xl px-0 focus-visible:ring-0'
								/>
							</div>

							<div className='field border-b pb-2'>
								<label className='block text-xs uppercase tracking-[0.2em] mb-2'>
									Email
								</label>
								<Input
									type='email'
									name='email'
									required
									className='bg-transparent border-none text-2xl px-0 focus-visible:ring-0'
								/>
							</div>

							<div className='field border-b pb-2'>
								<label className='block text-xs uppercase tracking-[0.2em] mb-2'>
									Message
								</label>
								<Textarea
									name='message'
									required
									rows={4}
									className='bg-transparent border-none text-2xl px-0 resize-none focus-visible:ring-0'
								/>
							</div>

							<SubmitButton />

							{state?.error && (
								<p className='text-red-400 text-sm mt-2'>
									{state.error}
								</p>
							)}
						</form>
					</div>
				</div>
			}
		</section>
	)
}
