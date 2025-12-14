'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostWithImageSchema } from "@/actions/schemas";
import { getProjectNameByNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CreateBlogPost } from "@/actions/createBlogPost";
import { Spinner } from "../ui/spinner";

const DashboardCreatePost = ({ title, user }: { title: string, user: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>();

    const handleOnClick = () => setIsOpen(e => !e);
    return (
        <>
            {isOpen && <CreatePostForm handleOnClick={handleOnClick} user={user} />}
            <button className="bg-gray-900 text-2xl border psp-border-color px-6 py-4 cursor-pointer psp-text-jura text-white hover:text-gray-400" onClick={handleOnClick}>{title}</button>
        </>

    )
}

const CreatePostForm = ({ handleOnClick, user }: { handleOnClick: () => void, user: string }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ resolver: zodResolver(blogPostWithImageSchema), defaultValues: { author: user } });
    const [imageName, setImageName] = useState<string[]>([]);
    const { mutate, error, isPending } = useMutation({
        mutationFn: CreateBlogPost,
        mutationKey: ['blogPost'],
        onSuccess: handleOnClick
    })
    const [watchedProject, watchedTitle, watchedContent] = watch(['project', 'title', 'content']);

    return <div className="fixed h-full overflow-y-scroll overflow-x-hidde w-screen flex flex-col psp-linear-background top-0 b-0 z-10 psp-text-jura items-center text-white">
        <button className="bg-gray-900 text-2xl border psp-border-color px-6 py-4 cursor-pointer psp-text-jura text-white hover:text-gray-400 mt-10" onClick={() => { reset(); handleOnClick(); }}>Close</button>

        <form className="max-w-[80%] w-full flex flex-col gap-2 my-5 lg:my-0" onSubmit={handleSubmit((values) => {
            const imageForm: FormData = new FormData();

            if (values.images && values.images.length > 0 && values.images.every(item => typeof item !== undefined))
                values.images.forEach(item => imageForm!.append('image', item))

            mutate({
                createInfo: {
                    title: values.title,
                    images: imageForm,
                    author: user,
                    content: values.content,
                    project: values.project
                }
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
                        <select {...register('project')} defaultValue={1} className="w-auto bg-gray-800 text-center">
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
                <label className="font-bold cursor-pointer border p-1 text-nowrap " htmlFor="files">Upload image(s)?</label>
                <div className="flex flex-col">
                    {imageName && imageName.map((file, index) => <div key={index + file} className="underline">{file}</div>)}
                    {errors.images && <div className="bg-red-500 text-xs w-fit px-2 rounded-sm">{errors.images.message}</div>}
                </div>
                <input type="file" multiple={true} className="w-0 h-0" id="files" {...register('images')} onChange={(e) => {
                    setImageName(e.target.files ? Array.from(e.target.files).map(f => f.name + " (Size:" + (f.size / 1000000).toFixed(2) + ' MB)') : []);
                }} />
            </fieldset>
            {/* submit button */}
            <fieldset className="flex justify-between px-2">
                <button className="cursor-pointer hover:text-zinc-300">{isPending ? <Spinner /> : 'Create'}</button>
            </fieldset>
        </form>


        {/* preview */}
        <div className="mt-10 flex justify-center items-center p-5 w-full">
            <div className="flex flex-col gap-5 border p-5 psp-border-color shadow-2xl shadow-black psp-background-dark w-[80%]">
                <div className="flex flex-col-reverse lg:flex-row psp-text-jura justify-between">
                    <div className="flex flex-col">
                        <h1 className="xl:text-3xl text-wrap wrap-break-word w-full">{watchedTitle}</h1>
                        <h2 className="psp-text-gold text-sm">Author: {user} </h2>
                    </div>
                    <h2 className="xl:text-3xl psp-text-gold">{getProjectNameByNumber(Number(watchedProject))}</h2>
                </div>
                {imageName.length > 0 &&
                    <div className="flex items-center justify-center flex-wrap gap-5">
                        <Carousel className="w-full max-w-xl" >
                            <CarouselContent className="flex">
                                {imageName.map((item, index) =>
                                    <CarouselItem key={index}>
                                        <Image src='/psplogo.png' className="object-contain w-auto xl:w-auto h-auto" width={1920} height={1080} alt="post photo" />
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

export default DashboardCreatePost;         