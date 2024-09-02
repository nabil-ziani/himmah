import { Poppins } from "next/font/google"
import { Nunito } from "next/font/google";

export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});