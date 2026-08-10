'use client'

import { useRef, useEffect, useState, SubmitEvent } from 'react'
import { gsap } from '@/lib/gsap'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactForm() {
	const formRef = useRef<HTMLFormElement | null>(null)
	const [result, setResult] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const leftRef = useRef<HTMLDivElement>(null)
	const formWrapperRef = useRef<HTMLDivElement>(null)
	const successRef = useRef<HTMLDivElement>(null)
	
	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		setError(null)
		setResult('Sending....')
		const target = event.target as HTMLFormElement
		const formData = new FormData(target)
		formData.append('access_key', '9daa89c6-7b52-429e-b4fa-3f05bd341ae7')

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			body: formData,
		})

		const data = (await response.json())
		if (data && data.success) {
			setResult('Form Submitted Successfully')
			target.reset()
		} else {
			setResult('Error')
		}
	}

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
		if (successRef.current) {
			gsap.fromTo(
				successRef.current,
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
			)
		}
	}, [successRef, result])

	return (
		<section
			ref={containerRef}
			className='w-full h-100svh px-4 md:px-10  text-white  flex items-center justify-center'
			id='contact'
		>
			{result === 'Form Submitted Successfully' ?
				<div
					ref={successRef}
					className='max-w-5xl mx-auto flex flex-col gap-12 items-center w-full'
				>
					<h3 className='text-5xl md:text-7xl font-semibold mb-6'>
						Got it.
					</h3>
					<p className='text-xl'>
						We’ll be in touch soon. In the meantime, go make
						something interesting.
					</p>
				</div>
			:	<div className='max-w-5xl mx-auto flex flex-col gap-12 items-center w-full'>
					<div
						ref={leftRef}
						className='w-full'
					>
						<h2 className='text-4xl lg:text-5xl leading-[1.2] font-semibold mb-6'>
							Let’s make something better than bad.
						</h2>
						<p className='text-lg lg:text-xl opacity-80'>
							If you’re tired of safe, predictable work — we’ll
							get along just fine.
						</p>
					</div>

					<div
						ref={formWrapperRef}
						className='w-full'
					>
						<form
							ref={formRef}
							onSubmit={handleSubmit}
							className='flex flex-col gap-10'
						>
							<div className='field border-b pb-2'>
								<label className='block text-xs uppercase tracking-[0.2em] mb-2'>
									Name
								</label>
								<Input
									name='name'
									required
									className='form-field bg-transparent border-none text-2xl px-0 focus-visible:ring-0'
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
									className='form-field bg-transparent border-none text-2xl px-0 focus-visible:ring-0'
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
									className='form-field bg-transparent border-none text-2xl px-0 resize-none focus-visible:ring-0'
								/>
							</div>

							<Button className='mt-10 w-full text-lg py-6 border rounded-full bg-transparent border-white hover:bg-white hover:text-black transition-all duration-300'>
								Send Message
							</Button>

							{error && (
								<p className='text-red-400 text-sm mt-2'>
									{error}
								</p>
							)}
						</form>
					</div>
				</div>
			}
		</section>
	)
}
