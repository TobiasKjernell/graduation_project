import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <div className="flex">
            
                <SidebarProvider defaultOpen={defaultOpen} >
                    <DashboardSidebar />
                    <main className="w-full">
                        {/* Sidebar */}
                        <Navbar />
                        <div className="px-4">
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            
        </div>
    )
}

export default Layout;  