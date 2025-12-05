'use client'

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import LandingBlog from '../LandingBlog';
import LandingHeader from '../LandingHeader';
import LandingTeam from '../LandingTeam';

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
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
                <LandingTeam />
            </div>
            <div className="blog h-auto w-full xl:w-[80%] xl:h-[800px] psp-background-dark xl:absolute xl:top-[97%] xl:right-[50%] xl:translate-x-[50%] border psp-border-color xl:rounded-2xl ">
                <LandingBlog>
                            {children}
                </LandingBlog>
            </div>
        </div>
    )
}

export default ScrollContainer;