import arena from '@/public/arena.png';
import Image from "next/image";
import LandingNavbar from "../LandingNavbar";

const LandingHeader = () => {
    return (
        <div className='h-full overflow-hidden flex flex-col relative'>
            <LandingNavbar />
            <h2 className="absolute top-[50%] translate-x-[50%] right-[50%]">Coming soon</h2>
            <div className='flex-1 relative mask-b-from-5% blur-md'> 
                <Image src={arena} alt='arena' fill className='object-cover' placeholder='blur' />
            </div>
        </div>  
    )
}
export default LandingHeader;   