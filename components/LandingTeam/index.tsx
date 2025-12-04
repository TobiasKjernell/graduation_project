import Image from "next/image";
import bg from '@/public/fight.png'

const LandingTeam = () => {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 h-full p-20 gap-20'>
            <div className='hidden xl:block relative border psp-border-color'>
                <Image src={bg} alt='grp-logo' fill className='xl:object-cover' />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h2 className='psp-text-gold psp-text-jura text-3xl'>What is this?</h2>
                <p className='psp-text-jura text-center'>Our team is a group of developers from different game studios who have been creating games together in our free time for quite a while. A few times each year, whenever we can, we host our own game jams just for fun. We all enjoy similar types of games, yet we come from diverse backgrounds within the games industry. Our long-term goal is to eventually build a full-time studio? Who knows.. Follow our journey!</p>
            </div>
        </div>
    )
}

export default LandingTeam;