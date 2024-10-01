'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { TypeAnimation } from 'react-type-animation'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
	const { scrollY, scrollYProgress } = useScroll()

	const opacity = useTransform(scrollY, [500, 1000], [1, 0])

	return (
		<section id='hero-section' className="w-full h-[100vh]">
			<motion.img
				alt="volcano burst"
				src="/hero.jpg"
				className="absolute inset-0 h-full w-full object-cover -z-10"
				style={{ opacity }}
			/>

			<div className="flex flex-col items-center pt-[10vh]">
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-white">
					<span className="bg-clip-text bg-gradient-to-br from-[#f86d6d] to-[#f6ce69]">
						Muslim platform for  <br />
					</span>

					<div className="mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-9xl">
						<TypeAnimation
							sequence={[
								'Ambition',
								3000,
								'Productivity',
								3000,
								'Relaxation',
								3000,
								'Zeal',
								3000
							]}
							wrapper="span"
							style={{ display: 'inline-block' }}
							speed={25}
							repeat={Infinity}
						/>
					</div>
				</h1>

				<div className="flex gap-14">
					<Button variant={"outline"} className="border-white border-4 font-semibold text-4xl text-white h-16 rounded-2xl p-8 mt-20">
						<Link href="#about">
							Learn More
						</Link>
					</Button>

					<Button variant={"outline"} className="border-white border-4 bg-white font-semibold text-4xl text-[#303030] h-16 rounded-2xl p-8 mt-20">
						<Link href="/auth/register">
							Get Started
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
