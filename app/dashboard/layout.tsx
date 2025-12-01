

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full">
            {/* Sidebar */}
            <div className="px-4">
            {/* Navbar */}
                {children}
            </div>
        </main>
    )
}

export default Layout;  