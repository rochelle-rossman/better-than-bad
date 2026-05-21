import { FaInstagram } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='w-full p-4 bg-gradient'>
			<div className='p-4 flex flex-col md:flex-row md:justify-between w-full gap-6 items-center'>
				<div className='flex flex-col items-center md:items-start gap-4'>
					<Image
						src='/btbfilms.svg'
						alt='Better Than Bad Logo'
						width={200}
						height={150}
					/>
					<span className='text-center text-xs text-white'>
						&copy; {new Date().getFullYear()} Better Than Bad Films,
						LLC. All rights reserved.
					</span>
				</div>
				<div className='flex'>
					<a
						href='https://www.instagram.com/betterthanbadfilms/'
						target='_blank'
						rel='noopener noreferrer'
						className='text-white'
					>
						<FaInstagram className='w-8 h-8' />
					</a>
				</div>
			</div>
		</footer>
	)
}
