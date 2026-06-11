'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import ReactDOM from 'react-dom'
import type { WorkProject } from '@/lib/workProjects'

type Props = {
	project: WorkProject
	rect: DOMRect
	onComplete: () => void
}

export default function ProjectMorphLayer({
	rect,
	onComplete,
}: Props) {
	const el = useRef<HTMLDivElement>(null)
	const { top, left, width, height } = rect
	const onCompleteRef = useRef(onComplete)

	useEffect(() => {
		if (!el.current) return

		const target = el.current

		gsap.set(target, {
			position: 'fixed',
			top,
			left,
			width,
			height,
			zIndex: 100,
		})

		gsap.to(target, {
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			duration: 0.7,
			ease: 'power3.inOut',
			onComplete: () => {
				onCompleteRef.current?.()
			},
		})
	}, [top, left, width, height])

	return ReactDOM.createPortal(
		<div
			ref={el}
			className='overflow-hidden'
		/>,
		document.body,
	)
}
