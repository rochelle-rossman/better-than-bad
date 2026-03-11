'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/all'

export default function SmoothProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollSmoother)

		if (!wrapperRef.current || !contentRef.current) return

		ScrollSmoother.create({
			wrapper: wrapperRef.current,
			content: contentRef.current,
			smooth: 2,
			effects: true,
		})
	}, [])

	return (
		<div ref={wrapperRef}>
			<div ref={contentRef}>{children}</div>
		</div>
	)
}
