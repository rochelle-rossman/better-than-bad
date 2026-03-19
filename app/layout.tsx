import type { Metadata } from 'next'
import HeaderNav from '@/components/HeaderNav'
import Footer from '@/components/Footer'
import { Montserrat, Karla } from 'next/font/google'
import CinematicBackground from '@/components/home/CinematicBackground'
import SmoothProvider from '@/components/SmoothProvider'
import './globals.css'

const montserrat = Montserrat({
	variable: '--font-heading',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

const karla = Karla({
	variable: '--font-body',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Better Than Bad Films',
	description:
		'Award-winning creative direction, cinematic video production, and social content strategy for brands and storytellers.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${montserrat.variable} ${karla.variable} antialiased`}
			>
				<HeaderNav />
				<SmoothProvider>
					<CinematicBackground />
					{children}
					<Footer />
				</SmoothProvider>
			</body>
		</html>
	)
}
