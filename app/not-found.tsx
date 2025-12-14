import Link from "next/link";

function NotFound() {
    return (
        <main className='text-center h-screen psp-linear-background flex items-center justify-center psp-text-jura'>
            <div className="flex flex-col items-center justify-center gap-10">

                <h1 className='text-3xl font-semibold'>
                    This page could not be found :(
                </h1>
                <Link
                    href='/'
                    className='bg-gray-900 border psp-border-color px-6 py-3 text-lg w-60'
                >
                    Go back home
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
