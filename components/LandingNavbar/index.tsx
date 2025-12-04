'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LandingNavbar = () => {
    const pathName = usePathname();
    return (
        <header className='p-5 flex items-center shadow-2xl justify-center gap-5 lg:gap-0 lg:justify-between'>
            <div className='flex gap-5 items-center'>
                <div className='w-20 h-20 relative'>
                    <Image src={'/psplogo.png'} alt='psp-logo' fill className='object-fill' />
                </div>
                <h1 className='hidden lg:block text-4xl psp-text-asi'>Polarbear Sandbox Production</h1>
            </div>
            <div className='flex psp-text-jura text-2xl lg:text-3xl gap-10 psp-text-gold'>
                <Link className={`hover:underline hover:decoration-2 decoration-2  ${pathName === '/' ? 'underline' : ""}`} href={'/'}>Home</Link>
                <Link className={`hover:underline hover:decoration-2 decoration-2  ${pathName === '/games' ? 'underline' : ""}`} href={'/games'}>Games</Link>
                <Link className={`hover:underline hover:decoration-2 decoration-2  ${pathName === '/blog' ? 'underline' : ""}`} href={'/blog'}>Blog</Link>
            </div>
        </header>
    )
}

export default LandingNavbar;