import LandingNavbar from "@/components/LandingNavbar";
import Image from "next/image";
import piratecove from '@/public/piratecove.png'
import numberops from '@/public/numberopsplaceholder.png'

const GamesPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="psp-background-dark">
                <LandingNavbar />
            </div>
            <div className="psp-linear-background p-10 flex-1 flex flex-col items-center gap-5">
                <h1 className="text-3xl psp-text-jura psp-text-gold">Our upcoming games</h1>

                <div className="flex flex-col w-full items-center gap-10">
                    <section className="flex flex-col overflow-hidden h-[600px] w-[80%] border psp-border-color relative">
                        <div className="flex-1 relative mask-b-from-55%">
                            <Image src={piratecove} fill alt="piratecove picture" className="object-cover blur-xs" placeholder='blur' />
                        </div>

                        <div className="absolute top-[50%] translate-x-[50%] right-[50%] translate-y-[-50%] bg-gray-800/80 p-4 border psp-border-color">
                            <h2 className="psp-text-gold text-2xl lg:text-4xl psp-text-jura font-semibold">Slot Car Racing VR</h2>
                            <h3 className="psp-text-jura">More information coming soon</h3>
                        </div>      
                    </section>          

                    <section className="flex flex-col overflow-hidden h-[600px] w-[80%] border psp-border-color relative">
                        <div className="flex-1 relative mask-b-from-55%">
                            <Image src={numberops} fill alt="piratecove picture" className="object-cover blur-xs" placeholder='blur' />
                        </div>

                        <div className="absolute top-[50%] translate-x-[50%] right-[50%] translate-y-[-50%] bg-gray-800/80 p-4 border psp-border-color">
                            <h3 className="psp-text-gold text-2xl lg:text-4xl psp-text-jura font-semibold">Number Ops Mobile</h3>
                            <h3 className="psp-text-jura">More information coming soon</h3>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default GamesPage;