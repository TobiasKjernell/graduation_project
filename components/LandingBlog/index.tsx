import Link from "next/link";
import BlogCard from "../BlogCard";

const LandingBlog = () => {
    return (
        <div className='flex flex-col h-full items-center justify-center'>
            <div className="flex items-center justify-between w-full mt-5 shadow-2xl">
                <h2 className='font-semibold text-2xl ml-5 psp-text-jura'>Latest posts</h2>
                <h3 className="psp-text-asi text-3xl">Polarbear Sandbox Production</h3>
                <Link href={'/blog'} className="psp-text-gold px-5 hover:underline text-2xl psp-text-jura">Visit blog page &#8594;</Link>
            </div>  
            <div className='grid grid-cols-1 xl:grid-cols-3 grid-rows-2 gap-5 p-5 flex-1'>
                {Array.from({ length: 6 }).map((_, index) => <BlogCard key={index} />)}
            </div>
        </div>  
    )
}

export default LandingBlog; 