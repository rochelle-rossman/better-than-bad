import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText }
