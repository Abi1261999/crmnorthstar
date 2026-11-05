import type { ReactNode } from "react";
export default function PageHeader({eyebrow,title,description,action}: {eyebrow?:string;title:string;description:string;action?:ReactNode}) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow&&<p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>}<h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{title}</h2><p className="mt-1.5 text-sm text-slate-500">{description}</p></div>{action}</div>;
}