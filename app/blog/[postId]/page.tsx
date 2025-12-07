import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getSinglePost } from "@/lib/supabase/queries";
import { getProjectNameByNumber } from "@/lib/utils";
import Image from "next/image";

export const generateMetadata = async ({ params }: { params: Promise<{ postId: string }> }) => {
    const { data } = await getSinglePost((await params).postId);
    return {
        title: `Blog: ${data?.title}`
    }
}

const PostPage = async ({ params }: { params: Promise<{ postId: string }> }) => {
    const { data, error } = await getSinglePost((await params).postId);

    if (error) return <div>Something went wrong</div>
    return (
        <div className="flex flex-col gap-5 border p-5 psp-border-color shadow-2xl shadow-black psp-background-dark w-auto">
            <div className="flex psp-text-jura justify-between">
                <div className="flex flex-col">
                    <h1 className="xl:text-3xl">{data.title}</h1>
                    <h2 className="psp-text-gold text-sm">Author: {data.author}</h2>
                </div>
                <h2 className="xl:text-3xl psp-text-gold">{getProjectNameByNumber(data.project_id)}</h2>
            </div>
            {data.image_url &&
                <div className="flex items-center justify-center flex-wrap gap-5">
                    <Carousel className="w-full max-w-xl" >
                        <CarouselContent className="flex">
                            {data.image_url.map((item, index) =>
                                <CarouselItem key={index}>
                                    <Image src={item} className="object-contain w-auto xl:w-auto h-auto" width={1920} height={1080} alt="post photo" />
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            }
            <p>{data.content} </p>
        </div>
    )
}

export default PostPage;        