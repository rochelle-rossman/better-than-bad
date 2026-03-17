'use client'
import { forwardRef } from 'react'

const CinematicBackground = forwardRef<HTMLDivElement>((_, ref) => (
	<div
		ref={ref}
		className='cinematic-bg fixed inset-0 -z-10 bg-cinematic'
	/>
))

CinematicBackground.displayName = 'CinematicBackground'
export default CinematicBackground
