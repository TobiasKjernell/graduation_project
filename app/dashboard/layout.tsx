import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dark">

        <SidebarProvider>
            <main className="w-full">
                {/* Sidebar */}
                <DashboardSidebar />
                <div className="px-4">
                    {/* Navbar */}
                    {children}
                </div>
            </main>
        </SidebarProvider>
        </div>
    )
}

export default Layout;  