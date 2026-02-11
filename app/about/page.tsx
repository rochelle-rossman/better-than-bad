
export const metadata = {
	title: 'About - Better Than Bad',
	description: 'Learn more about Better Than Bad and our mission.',
}
export default function About() {
	return (
		<div className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden'>
			<div className='flex flex-col justify-center items-center gap-6 max-w-4xl p-8 rounded-lg bg-accent/60 text-center text-color-text'>
				<h1 className='text-6xl font-heading font-bold mb-4'>About</h1>
				<p className='text-lg max-w-2xl text-center'>
					Donec dolor pulvinar metus augue venenatis quam mollis
					maximus habitasse ante a. Sit turpis nascetur donec
					convallis facilisi. Cras purus maecenas faucibus malesuada
					consectetur eleifend letius vehicula proin. Natoque pede
					lobortis quisque netus maximus mollis. Integer fusce eget
					quam orci si tempus bibendum vulputate imperdiet. Habitant
					diam vehicula suspendisse feugiat sodales vestibulum morbi.
					Tempus congue condimentum sit at eleifend malesuada sodales
					nunc.
				</p>
				<p className='text-lg text-center max-w-2xl'>
					Vestibulum ridiculus mattis eros sed lectus sollicitudin.
					Nascetur tincidunt ipsum dui etiam suscipit. Ultricies odio
					convallis curabitur laoreet maecenas elit lorem leo massa
					aliquam. Netus placerat euismod neque morbi laoreet pulvinar
					maximus libero scelerisque condimentum. Enim nam a
					scelerisque habitasse netus quisque nascetur tincidunt. Non
					efficitur mus nisi vehicula si sollicitudin bibendum erat
					fusce.
				</p>
			</div>
		</div>
	)
}
