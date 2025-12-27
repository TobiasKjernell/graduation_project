'use client'

import { EditBlogPost } from "@/actions/editBlogPost";
import { blogPostWithImageSchema } from "@/actions/schemas";
import { SinglePost } from "@/lib/supabase/queries";
import { getProjectNameByNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Spinner } from "../ui/spinner";
import DeletePostButton from "../DeletePostButton";

const DashboardEditPost = ({ title, post }: { title: string, post: SinglePost }) => {
    const [isOpen, setIsOpen] = useState<boolean>();

    const handleOnClick = () => setIsOpen(e => !e);
    return (
        <>
            <button className="bg-gray-900 text-2xl border psp-border-color px-6 py-4 cursor-pointer psp-text-jura text-white hover:text-gray-400" onClick={handleOnClick}>{title}</button>
            {isOpen && <EditPostForm handleOnClick={handleOnClick} post={post} />}
        </>

    )
}

const EditPostForm = ({ handleOnClick, post }: { handleOnClick: () => void, post: SinglePost }) => {
    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(blogPostWithImageSchema), defaultValues: {
            author: post.author,
            content: post.content,
            images: null,
            title: post.title
        }
    });
    const [imageName, setImageName] = useState<string[]>([]);
    const [currentImages, setCurrentImages] = useState<string[] | null>(post.image_url)
    const { mutate, error, isPending } = useMutation({          
        mutationFn: EditBlogPost,
        mutationKey: ['blogPost'],
        onSuccess: handleOnClick
    })
    const [watchedProject, watchedTitle, watchedContent] = watch(['project', 'title', 'content']);

    const handleDeleteImages = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post.image_url = null;
        setCurrentImages(null);             
    }
    if(error?.message) return null;
    return <div className="fixed h-full overflow-y-scroll overflow-x-hidde w-screen flex flex-col psp-linear-background top-0 b-0 z-10 psp-text-jura items-center text-white">
        <div className="flex gap-2 mt-10">
            <button className="bg-gray-900 text-2xl border psp-border-color px-6 py-4 cursor-pointer psp-text-jura text-white hover:text-gray-400 " onClick={() => { reset(); handleOnClick(); }}>Close</button>
            <DeletePostButton postId={post.id} />
        </div>
        <form className="max-w-[80%] w-full flex flex-col gap-2 my-5 lg:my-0" onSubmit={handleSubmit((values) => {
            let imageForm: null | FormData = null;

            if (values.images && values.images.length > 0) {    
                imageForm = new FormData();
                values.images.forEach(item => imageForm!.append('image', item))
            }

            mutate({
                updateInfo: {
                    title: values.title,
                    images: imageForm,
                    author: values.author,
                    content: values.content,
                    project: values.project
                },
                postId: post.id,
                currentImages: post.image_url ?? null
            })
        })}>
            <div className="flex flex-col lg:flex-row justify-between gap-2 items-center">
                {/* title */}
                <fieldset className="flex gap-2 px-2 border psp-border-color">
                    <label>Title:</label>
                    <input type="text" className="px-2" {...register('title')} placeholder="Post title" />
                </fieldset>
                {errors.title && <div className="bg-red-500 text-xs w-fit px-2 rounded-sm mr-auto ">{errors.title.message}</div>}
                {/* options */}
                <fieldset className="flex flex-col">
                    <div className="flex gap-2">
                        <label className="">Project:</label>
                        <select {...register('project')} defaultValue={post.project_id} className="w-auto bg-gray-800 text-center">
                            <option value={1} >Slot Car Racing VR</option>
                            <option value={2} >Number Ops Mobile</option>
                            <option value={3} >Website</option>
                        </select>
                    </div>
                    {errors.project && <div className="bg-red-500 text-xs w-fit px-2 rounded-sm">{errors.project.message}</div>}
                </fieldset>
            </div>
            {/* content */}
            <fieldset className="flex flex-col px-2 border psp-border-color ">
                <label className="">Content:</label>
                <textarea className="p-2 min-h-60 m-5 bg-gray-800 w-auto" id="content" {...register('content')}></textarea>
                {errors.content && <div className="bg-red-500 text-xs w-fit px-2 rounded-sm mb-2">{errors.content.message}</div>}
            </fieldset>
            {/* Image */}
            <fieldset className="mt-2 flex items-center gap-2">
                <label className="font-bold cursor-pointer  p-1 text-nowrap  border psp-border-color rounded-sm" htmlFor="files">Upload image(s)?</label>
                <div className="flex flex-col">
                    {imageName && imageName.map((file, index) => <div key={index + file} className="underline">{file}</div>)}
                    {errors.images && <div className="bg-red-500 text-xs w-fit px-2 rounded-sm">{errors.images.message}</div>}
                </div>
                <input type="file" multiple={true} className="w-0 h-0" id="files" {...register('images')} onChange={(e) => {
                    setImageName(e.target.files ? Array.from(e.target.files).map(f => f.name + " (Size:" + (f.size / 1000000).toFixed(2) + ' MB)') : []);
                }} />
            </fieldset>

            {/* submit button */}
            <fieldset className="flex gap-2 ">
                <button className="cursor-pointer hover:text-zinc-300 border psp-border-color px-2 rounded-sm">{isPending ? <Spinner /> : 'Send edit'}</button>
                {currentImages && <button className="px-2 border psp-border-color hover:text-zinc-300 cursor-pointer rounded-sm " onClick={(e) => handleDeleteImages(e)}>Delete all existing images</button>}
            </fieldset>
        </form>

        {/* preview */}
        <div className="mt-10 flex justify-center items-center p-5 w-full">
            <div className="flex flex-col gap-5 border p-5 psp-border-color shadow-2xl shadow-black psp-background-dark w-[80%]">
                <div className="flex flex-col-reverse lg:flex-row psp-text-jura justify-between">
                    <div className="flex flex-col">
                        <h1 className="xl:text-3xl text-wrap wrap-break-word w-full">{watchedTitle}</h1>
                        <h2 className="psp-text-gold text-sm">Author: {getValues('author')} </h2>
                    </div>
                    <h2 className="xl:text-3xl psp-text-gold">{getProjectNameByNumber(Number(watchedProject))}</h2>
                </div>
                {currentImages &&
                    <div className="flex items-center justify-center flex-wrap gap-5">
                        <Carousel className="w-full max-w-xl" >
                            <CarouselContent className="flex">
                                {currentImages && currentImages.map((item, index) =>
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
                <p className="text-wrap wrap-break-word whitespace-pre-line" >{watchedContent}</p>
            </div>
        </div>
    </div>
}

export default DashboardEditPost;         