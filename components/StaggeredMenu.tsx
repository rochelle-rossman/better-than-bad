'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaInstagram } from 'react-icons/fa'

const navItems = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/#about' },
	{ label: 'Contact', href: '/#contact' },
	
]

const socialItems = [
	{ label: 'Instagram', href: '#', icon: <FaInstagram /> },
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
	const [open, setOpen] = useState(false)

	const panelRef = useRef<HTMLDivElement>(null)
	const layersRef = useRef<HTMLDivElement[]>([])
	const navRefs = useRef<HTMLAnchorElement[]>([])
	const socialRefs = useRef<HTMLAnchorElement[]>([])
	const iconRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const tlRef = useRef<gsap.core.Timeline | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.set(panelRef.current, { xPercent: 100 })
			gsap.set(layersRef.current, { xPercent: 100 })

			gsap.set(navRefs.current, {
				y: 40,
				rotate: 6,
				opacity: 0,
			})

			gsap.set(socialRefs.current, {
				y: 20,
				opacity: 0,
			})
		})

		return () => ctx.revert()
	}, [])

	function openMenu() {
		tlRef.current?.kill()

		const tl = gsap.timeline()

		// Color layers stagger
		tl.to(layersRef.current, {
			xPercent: 0,
			duration: 0.8,
			stagger: 0.08,
			ease: 'power4.out',
		})

		// Main panel
		tl.to(
			panelRef.current,
			{
				xPercent: 0,
				duration: 0.8,
				ease: 'power4.out',
			},
			'-=0.3',
		)

		// Nav items stagger
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

		// Social items stagger
		tl.to(
			socialRefs.current,
			{
				y: 0,
				opacity: 1,
				stagger: 0.06,
				duration: 0.4,
				ease: 'power3.out',
			},
			'-=0.4',
		)

		// Icon rotate
		tl.to(
			iconRef.current,
			{
				rotate: 45,
				duration: 0.3,
			},
			0,
		)

		tlRef.current = tl
	}

	const closeMenu = useCallback(() => {
		tlRef.current?.kill()

		const tl = gsap.timeline()

		tl.to([...navRefs.current, ...socialRefs.current], {
			y: 20,
			opacity: 0,
			stagger: 0.04,
			duration: 0.2,
		})

		tl.to(
			panelRef.current,
			{
				xPercent: 100,
				duration: 0.4,
				ease: 'power4.in',
			},
			'-=0.2',
		)

		tl.to(
			layersRef.current,
			{
				xPercent: 100,
				duration: 0.4,
				stagger: 0.04,
				ease: 'power4.in',
			},
			'-=0.4',
		)

		tl.to(
			iconRef.current,
			{
				rotate: 0,
				duration: 0.3,
			},
			0,
		)

		tlRef.current = tl
	}, [])

	const toggleMenu = useCallback(() => {
		const next = !open
		setOpen(next)

		if (next) openMenu()
		else closeMenu()
	}, [open, closeMenu])

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				open &&
				panelRef.current &&
				!panelRef.current.contains(e.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(e.target as Node)
			) {
				closeMenu()
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [open, closeMenu])

	return (
		<>
			{/* Toggle */}
			<button
				ref={buttonRef}
				onClick={toggleMenu}
				className='fixed top-6 right-6 z-50 cursor-pointer w-10 h-10 flex items-center justify-center'
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
			</button>

			{/* Color Layers */}
			{layerColors.map((color, i) => (
				<div
					key={i}
					ref={(el) => {
						if (el) layersRef.current[i] = el
					}}
					className='fixed top-0 right-0 w-full md:w-2/3 h-screen z-30'
					style={{ backgroundColor: color }}
				/>
			))}

			{/* Main Panel */}
			<div
				ref={panelRef}
				className='fixed top-0 right-0 w-full md:w-2/3 h-screen bg-light-mustard z-40 flex flex-col gap-14 p-16'
			>
				<nav className='flex flex-col gap-8'>
					{navItems.map((item, i) => (
						<a
							key={item.href}
							href={item.href}
							ref={(el) => {
								if (el) navRefs.current[i] = el
							}}
							className='text-6xl tracking-wider uppercase text-deep-mauve hover:text-primary transition-colors flex w-min'
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
							ref={(el) => {
								if (el) socialRefs.current[i] = el
							}}
						>
							<span className='text-3xl'>{item.icon}</span>
						</a>
					))}
				</div>
			</div>
		</>
	)
}
