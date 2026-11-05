import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function AppShell() {
  const [open,setOpen]=useState(false);
  return <div className="min-h-screen bg-[#f7f8fc] text-slate-900"><Sidebar open={open} onClose={()=>setOpen(false)}/>{open&&<button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={()=>setOpen(false)}/>}<div className="min-h-screen lg:pl-[260px]"><Topbar onMenuClick={()=>setOpen(true)}/><main className="mx-auto w-full max-w-[1600px] px-4 pb-10 pt-6 sm:px-6 lg:px-8"><Outlet/></main></div></div>;
}