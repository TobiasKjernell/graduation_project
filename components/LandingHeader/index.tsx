import Image from "next/image";
import Link from "next/link";
import arena from '@/public/arena.png'

const LandingHeader = () => {
    return (
        <div className='h-full overflow-hidden flex flex-col'>
            <header className='p-5 flex items-center shadow-2xl border-b justify-center gap-5 lg:gap-0 lg:justify-between'>
                <div className='flex gap-5 items-center'>
                    <div className='w-20 h-20 relative'>
                        <Image src={'/psplogo.png'} alt='psp-logo' fill className='object-fill' />
                    </div>
                    <h1 className='hidden lg:block text-4xl font-(family-name:--asimovian)'>Polarbear Sandbox Production</h1>
                </div>
                <div className='flex psp-text-jura text-3xl gap-10 psp-text-gold'>
                    <Link className='hover:underline hove   r:decoration-1' href={'/games'}>Games</Link>
                    <Link className='hover:underline hover:decoration-1' href={'/blog'}>Blog</Link>
                </div>
            </header>
            <div className='relative flex-1 mask-b-from-5% blur-md'>
                <Image src={arena} alt='arena' fill className='object-cover' placeholder='blur' />
            </div>
        </div>
    )
}
export default LandingHeader;