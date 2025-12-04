import Image from "next/image";
import Link from "next/link";
import arena from '@/public/arena.png'
import LandingNavbar from "../LandingNavbar";

const LandingHeader = () => {
    return (
        <div className='h-full overflow-hidden flex flex-col'>
            <LandingNavbar />
            <div className='relative flex-1 mask-b-from-5% blur-md'>
                <Image src={arena} alt='arena' fill className='object-cover' placeholder='blur' />
            </div>
        </div>
    )
}
export default LandingHeader;