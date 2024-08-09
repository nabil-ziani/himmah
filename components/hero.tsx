'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <div className="flex max-w-[90vw] flex-col items-center justify-center">
      <img
        alt="hero image"
        src="/himmah-banner.jpg"
        className="bg-blend-multiply absolute inset-0 h-full w-full object-cover -z-10"
      />

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-white mt-4">
        <span className="bg-clip-text bg-gradient-to-br from-[#f86d6d] to-[#f6ce69]">
          The Platform for  <br />
        </span>

        <TypeAnimation
          sequence={[
            'Muslims',
            3000,
            'Productivity',
            3000,
            'Relaxation',
            3000,
            'Zeal',
            3000
          ]}
          wrapper="span"
          speed={25}
          repeat={Infinity}
        />
      </h1>

      <div className="flex gap-10">
        <Button variant={'secondary'} size={'lg'} className="mt-20 p-7 text-white/30">
          <Link
            className="text-2xl font-semibold bg-clip-text text-transparent"
            href="#about"
            style={{
              backgroundImage: "url('/himmah-banner.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed"
            }}
          >
            Learn More
          </Link>
        </Button>
        <Button variant={'gradient'} size={'lg'} className="mt-20 p-7">
          <Link className="text-2xl font-semibold" href="/auth/register">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}
