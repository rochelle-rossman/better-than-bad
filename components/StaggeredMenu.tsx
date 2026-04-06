'use client'

import { gsap } from 'gsap'
import { useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

const navItems = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Featured Work', href: '/work' },
	{ label: 'Services', href: '/services' },
]

const socialItems = [
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/betterthanbadfilms/',
		icon: <FaInstagram />,
	},
]

const layerColors = [
	'#330520',
	'#61093C',
	'#EDDAE5',
	'#F0EAA8',
	'#A6E0BE',
	'#244F46',
	'#23556E',
	'#0D2D3D',
]

export default function StaggeredMenu() {
	const router = useRouter()
	const panelRef = useRef<HTMLDivElement>(null)
	const layersRef = useRef<HTMLDivElement[]>([])
	const navRefs = useRef<HTMLAnchorElement[]>([])
	const iconRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const tlRef = useRef<gsap.core.Timeline | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.set(navRefs.current, {
				y: 40,
				rotate: 6,
				opacity: 0,
			})


			const tl = gsap.timeline({ paused: true })

			tl.to(layersRef.current, {
				right: 0,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power4.out',
			})

			tl.to(
				panelRef.current,
				{
					right: 0,
					duration: 0.5,
					ease: 'power4.out',
				},
				'-=0.3',
			)

			tl.to(
				navRefs.current,
				{
					y: 0,
					rotate: 0,
					opacity: 1,
					stagger: 0.08,
					duration: 0.7,
					ease: 'power4.out',
				},
				'-=0.4',
			)

			tl.to(iconRef.current, { rotate: 45, duration: 0.3 }, 0)

			tlRef.current = tl

			// Start closed
			tl.reverse()
		}, panelRef)

		return () => ctx.revert()
	}, [])

	const toggleMenu = () => {
		const tl = tlRef.current
		if (!tl) return

		if (tl.reversed()) {
			tl.play()
		} else {
			tl.reverse()
		}
	}

	const handleNavClick =
		(href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault()
			const tl = tlRef.current
			if (!tl) {
				router.push(href)
				return
			}

			if (!tl.reversed()) {
				tl.reverse()
			}

			const duration = tl.duration() * 1000

			setTimeout(() => {
				router.push(href)
			}, duration)
		}

	// Outside click
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			const tl = tlRef.current
			if (!tl || tl.reversed()) return

			if (
				panelRef.current &&
				!panelRef.current.contains(e.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(e.target as Node)
			) {
				tl.reverse()
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [])

	return (
		<>
			<Button
				ref={buttonRef}
				onClick={toggleMenu}
				className='fixed p-0 rounded-full top-6 right-6 z-50 w-10 h-10 flex items-center justify-center'
				variant={'outline'}
				aria-label='Toggle menu'
				type='button'
			>
				<div
					ref={iconRef}
					className='w-6 h-6 relative'
				>
					<span className='absolute w-full h-0.5 bg-current left-0 top-1/2 -translate-y-1/2' />
					<span className='absolute h-full w-0.5 bg-current left-1/2 -translate-x-1/2' />
				</div>
			</Button>

			{layerColors.map((color, i) => (
				<div
					key={i}
					ref={(el) => {
						if (el) layersRef.current[i] = el
					}}
					className='fixed top-0 -right-full w-full md:w-2/3 h-screen z-30'
					style={{ backgroundColor: color }}
				/>
			))}

			<div
				ref={panelRef}
				className='fixed top-0 -right-full w-full md:w-2/3 h-screen bg-light-mustard z-40 flex flex-col gap-14 p-16'
			>
				<nav className='flex flex-col gap-8'>
					{navItems.map((item, i) => (
						<a
							key={item.href}
							href={item.href}
							ref={(el) => {
								if (el) navRefs.current[i] = el
							}}
							onClick={handleNavClick(item.href)}
							className='text-4xl md:text-5xl tracking-wider uppercase text-deep-mauve hover:text-primary flex w-min'
						>
							{item.label}
							<span className='ml-2 text-sm'>{i + 1}</span>
						</a>
					))}
				</nav>

				<div className='flex gap-6'>
					{socialItems.map((item, i) => (
						<a
							key={i}
							href={item.href}
							target='_blank'
							rel='noopener noreferrer'
						>
							<span className='text-3xl'>{item.icon}</span>
						</a>
					))}
				</div>
			</div>
		</>
	)
}
