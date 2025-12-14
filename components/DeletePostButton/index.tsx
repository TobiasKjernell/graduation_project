'use client'

import { DeleteBlogPost } from "@/actions/deleteBlogPost";

const DeletePostButton = ({ postId }: { postId: number }) => {
    return (
        <button className="bg-gray-900 text-2xl border psp-border-color px-6 py-4 cursor-pointer psp-text-jura text-white hover:text-gray-400" onClick={() => DeleteBlogPost(postId)}>Delete post</button>
    )
}

export default DeletePostButton;    