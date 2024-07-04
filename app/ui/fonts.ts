import {
    Inter,
    Lusitana,
    Fredoka,
    Montserrat,
    Noto_Sans_JP,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export const fredoka = Fredoka({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export const montserrat = Montserrat({
    weight: ['500', '900'],
    subsets: ['latin'],
});

export const noto_sans_jp = Noto_Sans_JP({
    weight: ['500', '900'],
    subsets: ['latin'],
});
