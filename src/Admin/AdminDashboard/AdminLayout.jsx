import { useState } from "react"
import AdminSidebar from "./AdminComponents/AdminSidebar"
import AdminNavbar from "./AdminComponents/AdminNavbar"

const AdminLayout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/90 z-0"></div>

            <div className="relative z-10 font-sans text-slate-200">

                <AdminNavbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

                <div className="flex pt-16 min-h-screen">

                    {/* Sidebar - Fixed on desktop, toggleable on mobile */}
                    <div className={`
            fixed md:fixed z-40 h-[calc(100vh-4rem)] top-16
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            border-r border-white/10 bg-slate-900/50 backdrop-blur-md
            w-64 transition-transform duration-300 ease-in-out
          `}>
                        <div className="h-full overflow-y-auto custom-scrollbar">
                            <AdminSidebar />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-6 md:p-10 md:ml-64 transition-all duration-300">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminLayout
