import { createClient } from "@/lib/supabase/server";

const CreateAuthButton = async() => {
    const supabase = await createClient();
     const {data:{user}, error} = await supabase.auth.getUser();
    return (
        <>
        { user && <div>CreatePost</div> }
        </>
    )
}

export default CreateAuthButton;