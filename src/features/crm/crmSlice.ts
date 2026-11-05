import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { Activity, CrmState, CrmTask, Lead, DealStage } from "../../types/crm";

const initialState: CrmState = {
  search: "",
  leads: [
    { id:"L-1001",name:"Olivia Rhye",company:"Layers",email:"olivia@layers.com",phone:"+1 415 555 0132",source:"Website",status:"Qualified",value:24000,owner:"Alex Morgan",createdAt:"2026-10-28" },
    { id:"L-1002",name:"Phoenix Baker",company:"Capsule",email:"phoenix@capsule.com",phone:"+1 415 555 0181",source:"Referral",status:"New",value:12500,owner:"Sarah Lee",createdAt:"2026-10-30" },
    { id:"L-1003",name:"Lana Steiner",company:"Circooles",email:"lana@circooles.com",phone:"+1 415 555 0194",source:"LinkedIn",status:"Proposal",value:38000,owner:"David Kim",createdAt:"2026-10-24" },
    { id:"L-1004",name:"Demi Wilkinson",company:"Catalog",email:"demi@catalog.com",phone:"+1 415 555 0166",source:"Website",status:"Contacted",value:9800,owner:"Alex Morgan",createdAt:"2026-11-01" },
    { id:"L-1005",name:"Candice Wu",company:"Quotient",email:"candice@quotient.com",phone:"+1 415 555 0177",source:"Event",status:"Won",value:52000,owner:"Sarah Lee",createdAt:"2026-10-18" },
    { id:"L-1006",name:"Natali Craig",company:"Sisyphus",email:"natali@sisyphus.com",phone:"+1 415 555 0121",source:"Referral",status:"Lost",value:7000,owner:"David Kim",createdAt:"2026-10-15" },
    { id:"L-1007",name:"Drew Cano",company:"Command+R",email:"drew@commandr.com",phone:"+1 415 555 0118",source:"LinkedIn",status:"New",value:18500,owner:"Alex Morgan",createdAt:"2026-11-02" }
  ],
  deals: [
    {id:"D-201",name:"Enterprise platform",company:"Layers",value:42000,stage:"Qualification",owner:"Alex Morgan",closeDate:"2026-11-24"},
    {id:"D-202",name:"Annual subscription",company:"Capsule",value:28500,stage:"Discovery",owner:"Sarah Lee",closeDate:"2026-11-19"},
    {id:"D-203",name:"CRM rollout",company:"Circooles",value:64000,stage:"Proposal",owner:"David Kim",closeDate:"2026-11-28"},
    {id:"D-204",name:"Data migration",company:"Catalog",value:37500,stage:"Negotiation",owner:"Alex Morgan",closeDate:"2026-11-14"},
    {id:"D-205",name:"Team expansion",company:"Quotient",value:52000,stage:"Won",owner:"Sarah Lee",closeDate:"2026-11-05"},
    {id:"D-206",name:"Customer portal",company:"Sisyphus",value:19500,stage:"Discovery",owner:"David Kim",closeDate:"2026-12-02"}
  ],
  customers: [
    {id:"C-301",name:"Olivia Rhye",company:"Layers",email:"olivia@layers.com",phone:"+1 415 555 0132",status:"Active",value:84000,lastContact:"Today",initials:"OR"},
    {id:"C-302",name:"Phoenix Baker",company:"Capsule",email:"phoenix@capsule.com",phone:"+1 415 555 0181",status:"Active",value:62500,lastContact:"Yesterday",initials:"PB"},
    {id:"C-303",name:"Lana Steiner",company:"Circooles",email:"lana@circooles.com",phone:"+1 415 555 0194",status:"At risk",value:38000,lastContact:"5 days ago",initials:"LS"},
    {id:"C-304",name:"Demi Wilkinson",company:"Catalog",email:"demi@catalog.com",phone:"+1 415 555 0166",status:"Active",value:97500,lastContact:"2 days ago",initials:"DW"},
    {id:"C-305",name:"Candice Wu",company:"Quotient",email:"candice@quotient.com",phone:"+1 415 555 0177",status:"Active",value:112000,lastContact:"Today",initials:"CW"},
    {id:"C-306",name:"Natali Craig",company:"Sisyphus",email:"natali@sisyphus.com",phone:"+1 415 555 0121",status:"Churned",value:12000,lastContact:"3 weeks ago",initials:"NC"}
  ],
  tasks: [
    {id:"T-401",title:"Send proposal to Layers",relatedTo:"Layers",assignee:"Alex Morgan",dueDate:"2026-11-06",priority:"High",completed:false},
    {id:"T-402",title:"Schedule discovery call",relatedTo:"Capsule",assignee:"Sarah Lee",dueDate:"2026-11-06",priority:"Medium",completed:false},
    {id:"T-403",title:"Review contract terms",relatedTo:"Catalog",assignee:"David Kim",dueDate:"2026-11-07",priority:"High",completed:false},
    {id:"T-404",title:"Follow up after demo",relatedTo:"Circooles",assignee:"Alex Morgan",dueDate:"2026-11-04",priority:"Low",completed:true},
    {id:"T-405",title:"Prepare onboarding plan",relatedTo:"Quotient",assignee:"Sarah Lee",dueDate:"2026-11-08",priority:"Medium",completed:false}
  ],
  activities: [
    {id:"A-501",type:"Call",title:"Discovery call completed",person:"Olivia Rhye",company:"Layers",date:"Today, 10:30 AM",detail:"Discussed current workflow and enterprise requirements."},
    {id:"A-502",type:"Email",title:"Proposal email sent",person:"Lana Steiner",company:"Circooles",date:"Today, 9:15 AM",detail:"Sent the updated proposal and implementation timeline."},
    {id:"A-503",type:"Meeting",title:"Product demo",person:"Phoenix Baker",company:"Capsule",date:"Yesterday, 2:00 PM",detail:"Walked through the sales automation features."},
    {id:"A-504",type:"Note",title:"Renewal risk flagged",person:"Demi Wilkinson",company:"Catalog",date:"Nov 3, 4:20 PM",detail:"Customer requested a revised support package."}
  ]
};

const slice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    addLead: { reducer(state, action: PayloadAction<Lead>) { state.leads.unshift(action.payload); }, prepare(data: Omit<Lead,"id"|"createdAt">) { return { payload: { ...data, id: nanoid(7), createdAt: new Date().toISOString().slice(0,10) } }; } },
    updateLead(state, action: PayloadAction<Lead>) { const i = state.leads.findIndex(x => x.id === action.payload.id); if (i >= 0) state.leads[i] = action.payload; },
    deleteLead(state, action: PayloadAction<string>) { state.leads = state.leads.filter(x => x.id !== action.payload); },
    updateDealStage(state, action: PayloadAction<{id:string;stage:DealStage}>) { const deal = state.deals.find(x => x.id === action.payload.id); if (deal) deal.stage = action.payload.stage; },
    addTask: { reducer(state, action: PayloadAction<CrmTask>) { state.tasks.unshift(action.payload); }, prepare(data: Omit<CrmTask,"id">) { return { payload: { ...data, id: nanoid(7) } }; } },
    toggleTask(state, action: PayloadAction<string>) { const task = state.tasks.find(x => x.id === action.payload); if (task) task.completed = !task.completed; },
    deleteTask(state, action: PayloadAction<string>) { state.tasks = state.tasks.filter(x => x.id !== action.payload); },
    addActivity: { reducer(state, action: PayloadAction<Activity>) { state.activities.unshift(action.payload); }, prepare(data: Omit<Activity,"id"|"date">) { return { payload: { ...data, id: nanoid(7), date: new Date().toLocaleString() } }; } }
  }
});
export const { setSearch, addLead, updateLead, deleteLead, updateDealStage, addTask, toggleTask, deleteTask, addActivity } = slice.actions;
export default slice.reducer;