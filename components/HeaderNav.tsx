import Image from 'next/image'
import Link from 'next/link'
import StaggeredMenu from './StaggeredMenu'

export default function HeaderNav() {
	return (
		<nav className='flex justify-center fixed top-0 left-0 right-0 z-50 w-full shadow-2xl'>
			<div className='p-4 flex items-center justify-between w-full'>
				<div>
					<Link
						href='/'
						className='flex items-center gap-4'
					>
						<Image
							src='/btb-logo-circle-black.png'
							alt='Better Than Bad Logo'
							width={50}
							height={50}
						/>
						<span className='uppercase font-medium text-lg text-foreground'>
							Better Than Bad Films
						</span>
					</Link>
				</div>
				<div>
					<StaggeredMenu />
				</div>
			</div>
		</nav>
	)
}
