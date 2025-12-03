'use client'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import BlogCard from '../BlogCard';
import LandingHeader from '../LandingHeader';
import Image from 'next/image';
import bg from '@/public/fight.png'

const ScrollContainer = () => {
    gsap.registerPlugin(ScrollTrigger)
    const triggerPoint = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(min-width:1280px)', () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: triggerPoint.current,
                    scrub: true,
                    markers: false,
                    pin: true,
                    start: 'center center',
                    invalidateOnRefresh: true,
                }
            }).to('.psp', { top: '50%', translateY: '-47.5%', translateX: '50%', right: '50%', rotate: '0deg', duration: 2 })
                .to('.blog', { top: '50%', translateY: '-45%', translateX: '50%', right: '50%', duration: 2 })

        })
    });

    return (
        <div ref={triggerPoint} className="xl:h-screen relative py-0 xl:py-5 flex flex-col xl:block gap-10">
            <div className="w-full xl:w-[80%] relative h-[800px] psp-background-dark xl:absolute xl:top-[50%] xl:right-[50%] xl:translate-x-[50%] xl:translate-y-[-50%] border psp-border-color xl:rounded-2xl shadow-2xl shadow-black overflow-hidden">
                <LandingHeader />
            </div>
            <div className="psp h-auto w-full xl:w-[80%] xl:h-[800px] psp-background-dark xl:top-[95%] xl:right-[50%] xl:translate-x-[50%] xl:rotate-2 rotate-0 border psp-border-color xl:rounded-2xl xl:absolute ">
                <div className='grid grid-cols-1 xl:grid-cols-2 h-full p-20 gap-20'>
                    <div className='hidden xl:block relative border psp-border-color'>
                        <Image src={bg} alt='grp-logo' fill className='xl:object-cover' />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='psp-text-gold psp-text-jura text-3xl'>What is this?</h2>
                        <p className='psp-text-jura text-center'>Our team is a group of developers from different game studios who have been creating games together in our free time for quite a while. A few times each year, whenever we can, we host our own game jams just for fun. We all enjoy similar types of games, yet we come from diverse backgrounds within the games industry. Our long-term goal is to eventually build a full-time studio? Who knows.. Follow our journey!</p>      
                    </div>
                </div>
            </div>
            <div className="blog h-auto w-full xl:w-[80%] xl:h-[800px] psp-background-dark xl:absolute xl:top-[97%] xl:right-[50%] xl:translate-x-[50%] border psp-border-color xl:rounded-2xl ">
                <div className='flex flex-col h-full items-center justify-center'>
                    <h2 className='font-semibold text-2xl ml-5  psp-text-jura'>Latest posts</h2>
                    <div className='grid grid-cols-1 xl:grid-cols-3 grid-rows-2 gap-5 p-5 flex-1'>
                        {Array.from({ length: 6 }).map((_, index) => <BlogCard key={index} />)}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ScrollContainer;