import Image from "next/image";
import Link from "next/link";

const BlogCard = () => {
    return (
        <Link href={'#'} className='flex flex-col border psp-border-color rounded-sm overflow-hidden psp-background-light hover:bg-[#0a1428]'>
            <div className='relative  h-44' >
                <Image src='/codeplaceholder.png' alt='test picture' fill className='object-cover' />
            </div>
            <div className='grow p-5'>
                <h2 className='text-2xl psp-text-gold'>Website</h2>
                <h3 className='text-xl'>Update #21</h3>
                <p className='text-wrap text-sm'> Fixed a bug where a Raycast hit would not be successful when using the default BoxcastCommand() constructor... </p>
            </div>
        </Link>
    )
}
export default BlogCard;