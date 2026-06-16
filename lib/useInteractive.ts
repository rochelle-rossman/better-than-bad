'use client'

import { useState, useCallback } from 'react'

export function useInteractive(options?: {
	onOpen?: () => void
	enableTapToReveal?: boolean
}) {
	const { onOpen, enableTapToReveal = false } = options || {}

	const [hovered, setHovered] = useState(false)
	const [pressed, setPressed] = useState(false)
	const [focused, setFocused] = useState(false)
	const [active, setActive] = useState(false)

	const isTouch =
		typeof window !== 'undefined' &&
		('ontouchstart' in window || navigator.maxTouchPoints > 0)

	const handleClick = useCallback(() => {
		// mobile: tap-to-reveal pattern
		if (isTouch && enableTapToReveal) {
			if (!active) {
				setActive(true)
				return
			}
		}

		onOpen?.()
	}, [isTouch, enableTapToReveal, active, onOpen])

	return {
		state: { hovered, pressed, focused, active },

		bind: {
			onMouseEnter: () => setHovered(true),
			onMouseLeave: () => setHovered(false),
			onMouseDown: () => setPressed(true),
			onMouseUp: () => setPressed(false),
			onFocus: () => setFocused(true),
			onBlur: () => setFocused(false),
			onClick: handleClick,
		},

		dataAttrs: {
			'data-hovered': hovered ? '' : undefined,
			'data-pressed': pressed ? '' : undefined,
			'data-focused': focused ? '' : undefined,
			'data-active': active ? '' : undefined,
		},
	}
}
