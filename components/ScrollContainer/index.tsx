'use client'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import BlogCard from '../BlogCard';

const ScrollContainer = () => {
    gsap.registerPlugin(ScrollTrigger)
    const triggerPoint = useRef(null);

    useGSAP(() => {
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
    });

    return (
        <div ref={triggerPoint} className="h-screen relative py-5">

            <div className="w-[80%] h-[800px] psp-background-dark absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] border psp-border-color rounded-2xl shadow-2xl shadow-black">

            </div>
            <div className="psp w-[80%] h-[800px] psp-background-dark absolute top-[95%] right-[50%] translate-x-[50%] rotate-2 border psp-border-color rounded-2xl">

            </div>
            <div className="blog w-[80%] h-[800px] psp-background-dark absolute top-[97%] right-[50%] translate-x-[50%] border psp-border-color rounded-2xl ">

                <div className='flex flex-col h-full items-center justify-center'>
                    <h2 className='font-semibold text-2xl ml-5'>Latest posts</h2>
                    <div className='grid grid-cols-3 grid-rows-2 gap-5 p-5 flex-1'>
                        {Array.from({ length: 6 }).map((_, index) => <BlogCard key={index} />)}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ScrollContainer;