import type { Metadata } from 'next'
import HeaderNav from '@/components/HeaderNav'
import { Montserrat, Karla } from 'next/font/google'

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
	title: 'Better Than Bad',
	description: '',
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
				{children}
			</body>
		</html>
	)
}
