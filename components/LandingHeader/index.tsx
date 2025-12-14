import arena from '@/public/arena.png';
import Image from "next/image";
import LandingNavbar from "../LandingNavbar";

const LandingHeader = () => {
    return (
        <div className='h-full overflow-hidden flex flex-col relative'>
            <LandingNavbar />

            <div className='flex-1 relative mask-b-from-5% blur-md'>
                <Image src={arena} alt='arena' fill className='object-cover' placeholder='blur' />
            </div>

            <div className="absolute top-[50%] translate-x-[50%] right-[50%] translate-y-[-50%] w-3/4 lg:w-auto bg-gray-800/80 p-4 border psp-border-color ">
                <h2 className="psp-text-jura text-2xl lg:text-3xl">Official studio trailer coming soon</h2>
            </div>
        </div>
    )   
}
export default LandingHeader;               