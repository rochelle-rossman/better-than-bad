'use client'

import { ScrollSmoother } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function SmoothProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const pathname = usePathname()

	useGSAP(() => {
		if (!wrapperRef.current || !contentRef.current) return

		ScrollSmoother.create({
			wrapper: wrapperRef.current,
			content: contentRef.current,
			smooth: 2,
			effects: true,
		})
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return (
		<div ref={wrapperRef}>
			<div ref={contentRef}>{children}</div>
		</div>
	)
}
