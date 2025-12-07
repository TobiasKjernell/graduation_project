import Image from "next/image";
import Link from "next/link";
import { SinglePost } from "@/lib/supabase/queries";
import { imageFallback, getProjectNameByNumber } from "@/lib/utils";

const BlogCard = async ({ author, content, project_id, slug, title }: SinglePost) => {

    return (
        <Link href={`/blog/${slug}`} className='flex flex-row xl:flex-col border psp-border-color rounded-sm overflow-hidden psp-background-light hover:bg-[#0a1428]'>
            <div className='hidden xl:block relative h-44 mask-b-from-10% overflow-hidden'>
                <Image src={imageFallback(project_id)} alt='test picture' fill className='object-cover' />
            </div>
            <div className='grow p-5 psp-text-jura flex flex-col'>
                <h2 className='text-2xl psp-text-gold'>{getProjectNameByNumber(project_id)}</h2>
                <h3 className='text-xl'>{title}</h3>
                <p className='text-wrap text-sm'> {content.slice(0, 80)}...  </p>
                <h4 className="text-sm psp-text-gold ml-auto">Author: {author}</h4>
            </div>
        </Link>
    )   
}   
export default BlogCard;                    