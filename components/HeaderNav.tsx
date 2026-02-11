import Image from "next/image"
import Link from "next/link"
import StaggeredMenu from "./StaggeredMenu"

export default function HeaderNav() {
	return (
		<nav
			className='flex justify-center fixed top-0 left-0 right-0 z-50 w-full bg-background shadow-2xl'
		>
			<div className='px-4 py-2 flex items-center justify-between w-full'>
				<div>
					<Link
						href='/'
						className='flex items-center gap-2'
					>
						<Image
						src='/btb-logo-circle-black.png'
						alt='Better Than Bad Logo'
						width={50}
						height={50}
						/>
						<span className='font-heading'>
							Better Than Bad Films
						</span>
					</Link>
				</div>
				<div>
					<StaggeredMenu
						menuButtonColor='#000000'
						openMenuButtonColor='#000000'
						accentColor='#23556e'
						displayItemNumbering={true}
						items={[
							{
								label: 'Home',
								ariaLabel: 'Go to home page',
								link: '/',
							},
							{
								label: 'About',
								ariaLabel: 'Learn more about Better Than Bad',
								link: '/about',
							},
							{
								label: 'Contact',
								ariaLabel: 'Contact Better Than Bad',
								link: '/contact',
							},
						]}
					/>
				</div>
			</div>
		</nav>
	)
}
