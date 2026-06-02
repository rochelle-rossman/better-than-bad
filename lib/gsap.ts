import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger, SplitText, Flip } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip }
