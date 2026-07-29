import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger, SplitText, Flip } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip)

ScrollTrigger.config({
	ignoreMobileResize: true,
})

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip }
