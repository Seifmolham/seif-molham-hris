"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3, Users, AlertTriangle, Lightbulb, User, Database,
  Building2, UserPlus, Calculator, Presentation, Sliders, TrendingUp,
  ChevronRight, Lock
} from "lucide-react"

// ===================== TYPES =====================
interface ExecObjective { id: string; title: string; desc: string; weight: number }
interface ExecEmployee {
  id: string; name: string; role: string; reportsTo: string | null
  baseSalary: number; bonusMonths: number; objectives: ExecObjective[]
}
interface ExecScore { deadline: string; submission: string; onTime: number; quality: number; perf: number }
type ExecView = "executive" | "individual" | "aggregated" | "master"

// ===================== INITIAL DATA =====================
const INITIAL_EMPLOYEES: ExecEmployee[] = [
  {
    id: "me", name: "Ramy Zayed", role: "Chief People & Culture Officer", reportsTo: null,
    baseSalary: 120000, bonusMonths: 4,
    objectives: [
      { id: "o1", title: "Strategic HR Leadership", desc: "Implement automated performance framework across all depts.", weight: 40 },
      { id: "o2", title: "Culture Transformation", desc: "Achieve minimum 85% positive employee engagement score.", weight: 40 },
      { id: "o3", title: "Executive Hiring", desc: "Fill all C-level vacancies within target SLA.", weight: 20 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "salma", name: "Salma Halim", role: "Senior BP (L&D)", reportsTo: "me",
    baseSalary: 45000, bonusMonths: 2,
    objectives: [
      { id: "o1", title: "L&D Strategy", desc: "Audit pending E-Learning proposals.", weight: 40 },
      { id: "o2", title: "Mandatory Training", desc: "Identify mandatory courses.", weight: 40 },
      { id: "o3", title: "Universal SLAs", desc: "Submit monthly reports on time.", weight: 20 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "mina_e", name: "Mina Emad", role: "L&D Specialist", reportsTo: "salma",
    baseSalary: 20000, bonusMonths: 1.5,
    objectives: [
      { id: "o1", title: "Training Delivery", desc: "Execute 5 training sessions.", weight: 50 },
      { id: "o2", title: "Content Creation", desc: "Draft new onboarding modules.", weight: 50 },
      { id: "o3e", title: "", desc: "", weight: 0 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "hania", name: "Hania Abu El-Nasr", role: "L&D Coordinator", reportsTo: "salma",
    baseSalary: 15000, bonusMonths: 1,
    objectives: [
      { id: "o1", title: "Vendor Management", desc: "Coordinate with external vendors.", weight: 50 },
      { id: "o2", title: "Logistics", desc: "Manage venue and catering for sessions.", weight: 50 },
      { id: "o3e", title: "", desc: "", weight: 0 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "seif", name: "Seif", role: "Lead BP (OD)", reportsTo: "me",
    baseSalary: 55000, bonusMonths: 2.5,
    objectives: [
      { id: "o1", title: "Policies & Procedures", desc: "Review legacy Policies & Procedures.", weight: 40 },
      { id: "o2", title: "JD Manual", desc: "Audit missing Job Descriptions.", weight: 40 },
      { id: "o3", title: "Universal SLAs", desc: "Submit monthly reports on time.", weight: 20 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "mai", name: "Mai El-Sayed", role: "OD Specialist", reportsTo: "seif",
    baseSalary: 22000, bonusMonths: 1.5,
    objectives: [
      { id: "o1", title: "Structure Audit", desc: "Audit org structures across 3 depts.", weight: 50 },
      { id: "o2", title: "Role Mapping", desc: "Map competencies to current roles.", weight: 50 },
      { id: "o3e", title: "", desc: "", weight: 0 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "mina_a", name: "Mina Adel", role: "OD Analyst", reportsTo: "seif",
    baseSalary: 18000, bonusMonths: 1,
    objectives: [
      { id: "o1", title: "Data Analytics", desc: "Prepare monthly OD dashboards.", weight: 100 },
      { id: "o2e", title: "", desc: "", weight: 0 },
      { id: "o3e", title: "", desc: "", weight: 0 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "yousteena", name: "Yousteena Hany", role: "OD Coordinator", reportsTo: "seif",
    baseSalary: 14000, bonusMonths: 1,
    objectives: [
      { id: "o1", title: "Policy Tracking", desc: "Track compliance on updated P&P.", weight: 100 },
      { id: "o2e", title: "", desc: "", weight: 0 },
      { id: "o3e", title: "", desc: "", weight: 0 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "ahmed", name: "Ahmed Mansour", role: "Compensation Supervisor", reportsTo: "me",
    baseSalary: 38000, bonusMonths: 2,
    objectives: [
      { id: "o1", title: "Payroll Operations", desc: "Process monthly payroll accurately.", weight: 40 },
      { id: "o2", title: "Financial Reporting", desc: "Aggregate all HC expenses.", weight: 40 },
      { id: "o3", title: "Universal SLAs", desc: "Submit monthly reports on time.", weight: 20 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
  {
    id: "mohamed", name: "Mohamed Ghali", role: "Payroll Specialist", reportsTo: "ahmed",
    baseSalary: 25000, bonusMonths: 1.5,
    objectives: [
      { id: "o1", title: "Payroll Processing", desc: "Execute monthly payroll operations.", weight: 70 },
      { id: "o2", title: "Reconciliations", desc: "Reconcile tax and insurance sheets.", weight: 30 },
      { id: "o3e", title: "", desc: "", weight: 0 },
      { id: "o4e", title: "", desc: "", weight: 0 },
    ]
  },
]

function buildInitialScores(employees: ExecEmployee[]): Record<string, ExecScore> {
  const s: Record<string, ExecScore> = {}
  employees.forEach(emp =>
    emp.objectives.forEach(obj => {
      s[`${emp.id}_${obj.id}`] = obj.weight > 0
        ? { deadline: "2026-05-31", submission: "2026-05-30", onTime: 100, quality: 85, perf: 80 }
        : { deadline: "", submission: "", onTime: 0, quality: 0, perf: 0 }
    })
  )
  return s
}

// ===================== HELPERS =====================
const fmt = (n: number) => (Number(n) || 0).toLocaleString("en-EG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })

function scoreColor(s: number) {
  if (s >= 90) return "text-green-600"
  if (s >= 80) return "text-blue-600"
  if (s >= 70) return "text-orange-500"
  return "text-red-500"
}
function scoreBg(s: number) {
  if (s >= 90) return "bg-green-100 text-green-700 border border-green-200"
  if (s >= 80) return "bg-blue-100 text-blue-700 border border-blue-200"
  if (s >= 70) return "bg-orange-100 text-orange-700 border border-orange-200"
  return "bg-red-100 text-red-700 border border-red-200"
}
function getRating(s: number) {
  if (s >= 90) return { scale: "4.0", label: "Outstanding" }
  if (s >= 80) return { scale: "3.0", label: "Steady Performer" }
  if (s >= 70) return { scale: "2.0", label: "Improvement Needed" }
  return { scale: "1.0", label: "Unsatisfactory" }
}
function computeDateScore(deadline: string, submission: string): number {
  if (!deadline || !submission) return 0
  const diff = Math.ceil((new Date(submission).getTime() - new Date(deadline).getTime()) / 86400000)
  if (diff <= 0) return 100
  return Math.max(0, 100 - Math.ceil(diff / 7) * 25)
}
function computeEgyptianTax(monthlySalary: number, grossBonus: number) {
  const si = Math.min(monthlySalary, 12600) * 0.11
  const annualTaxable = Math.max(0, monthlySalary * 12 - si * 12 - 20000)
  const brackets = [
    { lim: 40000, r: 0 }, { lim: 55000, r: 0.10 }, { lim: 70000, r: 0.15 },
    { lim: 200000, r: 0.20 }, { lim: 400000, r: 0.225 }, { lim: 1200000, r: 0.25 }, { lim: Infinity, r: 0.275 }
  ]
  const calcTax = (taxable: number) => {
    let tax = 0, rem = taxable, prev = 0
    for (const b of brackets) {
      const size = b.lim - prev
      if (rem > size) { tax += size * b.r; rem -= size } else { tax += rem * b.r; break }
      prev = b.lim
    }
    return tax
  }
  const baseTax = calcTax(annualTaxable)
  const taxOnBonus = calcTax(annualTaxable + grossBonus) - baseTax
  const monthlyTax = baseTax / 12
  const monthlyNet = monthlySalary - si - monthlyTax
  return { si, monthlyTax, monthlyNet, taxOnBonus, netBonus: grossBonus - taxOnBonus }
}

// ===================== COMPONENT =====================
export function ExecutiveDashboard() {
  const [execView, setExecView] = useState<ExecView>("executive")
  const [employees, setEmployees] = useState<ExecEmployee[]>(INITIAL_EMPLOYEES)
  const [scores, setScores] = useState<Record<string, ExecScore>>(() => buildInitialScores(INITIAL_EMPLOYEES))
  const [selectedId, setSelectedId] = useState("me")
  const [gw, setGw] = useState({ onTime: 40, quality: 40, perf: 20 })
  const [showAddModal, setShowAddModal] = useState(false)
  const [newMember, setNewMember] = useState({ name: "", role: "", manager: "me" })

  // ---------- Calculations ----------
  const objScore = (empId: string, objId: string) => {
    const s = scores[`${empId}_${objId}`]
    if (!s) return 0
    const tot = gw.onTime + gw.quality + gw.perf
    if (!tot) return 0
    return Math.round(((s.onTime * gw.onTime + s.quality * gw.quality + s.perf * gw.perf) / 100) * 100 / tot)
  }
  const empScore = (empId: string) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return 0
    let tw = 0, ws = 0
    emp.objectives.forEach(o => { if (o.weight > 0) { ws += objScore(empId, o.id) * o.weight; tw += o.weight } })
    return tw ? Math.round(ws / tw) : 0
  }
  const teamAvg = (mgr: string) => {
    const rpts = employees.filter(e => e.reportsTo === mgr)
    return rpts.length ? Math.round(rpts.reduce((s, e) => s + empScore(e.id), 0) / rpts.length) : 0
  }

  // ---------- Mutations ----------
  const updateObj = (empId: string, objId: string, field: string, val: string | number) =>
    setEmployees(prev => prev.map(e => e.id !== empId ? e : {
      ...e, objectives: e.objectives.map(o => o.id !== objId ? o : { ...o, [field]: val })
    }))

  const updateScore = (empId: string, objId: string, field: string, val: string | number) =>
    setScores(prev => {
      const key = `${empId}_${objId}`
      const updated = { ...prev[key], [field]: val }
      if (field === "deadline" || field === "submission") {
        const dl = field === "deadline" ? String(val) : updated.deadline
        const sb = field === "submission" ? String(val) : updated.submission
        updated.onTime = computeDateScore(dl, sb)
      }
      return { ...prev, [key]: updated }
    })

  const addMember = () => {
    if (!newMember.name || !newMember.role) return
    const id = `emp_${Math.random().toString(36).substr(2, 9)}`
    const objs: ExecObjective[] = [1, 2, 3, 4].map(i => ({ id: `o${i}e`, title: "", desc: "", weight: 0 }))
    const newScores: Record<string, ExecScore> = {}
    objs.forEach(o => { newScores[`${id}_${o.id}`] = { deadline: "", submission: "", onTime: 0, quality: 0, perf: 0 } })
    setEmployees(prev => [...prev, { id, name: newMember.name, role: newMember.role, reportsTo: newMember.manager, baseSalary: 10000, bonusMonths: 1, objectives: objs }])
    setScores(prev => ({ ...prev, ...newScores }))
    setNewMember({ name: "", role: "", manager: "me" })
    setShowAddModal(false)
  }

  // ---------- Org Tree Node ----------
  const OrgNode = ({ empId, depth = 0 }: { empId: string; depth?: number }) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return null
    const children = employees.filter(e => e.reportsTo === empId)
    const sc = empScore(emp.id)
    const ta = children.length > 0 ? teamAvg(emp.id) : null
    const isActive = emp.id === selectedId
    return (
      <div>
        <div
          onClick={() => setSelectedId(emp.id)}
          className={`p-3 rounded-lg cursor-pointer border transition-all mb-1 ${isActive ? "bg-primary/10 border-primary shadow-sm" : "bg-transparent border-transparent hover:bg-gray-50"}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {emp.id === "me" ? <Building2 className="h-4 w-4 text-blue-500 shrink-0" /> :
                children.length > 0 ? <Users className="h-4 w-4 text-orange-500 shrink-0" /> :
                  <User className="h-4 w-4 text-green-600 shrink-0" />}
              <div className="min-w-0">
                <p className={`text-sm font-bold truncate ${isActive ? "text-primary" : "text-gray-800"}`}>{emp.name}</p>
                <p className="text-xs text-gray-400 truncate">{emp.role}</p>
              </div>
            </div>
            <div className="text-right ml-2 shrink-0">
              {ta !== null && <p className="text-xs text-gray-400">Team: <span className={`font-bold ${scoreColor(ta)}`}>{ta}%</span></p>}
              <p className={`text-sm font-black ${scoreColor(sc)}`}>{sc}%</p>
            </div>
          </div>
        </div>
        {children.length > 0 && (
          <div className="border-l border-gray-200 ml-4 pl-3 mb-2">
            {children.map(c => <OrgNode key={c.id} empId={c.id} depth={depth + 1} />)}
          </div>
        )}
      </div>
    )
  }

  // ====================================================
  // VIEW: EXECUTIVE INSIGHTS
  // ====================================================
  const renderExecutive = () => {
    let totObjs = 0, sumSc = 0, sumOT = 0, sumQ = 0, sumP = 0, evalCt = 0
    employees.forEach(emp => {
      sumSc += empScore(emp.id)
      emp.objectives.forEach(o => {
        if (o.weight > 0) {
          totObjs++
          const s = scores[`${emp.id}_${o.id}`]
          if (s) { sumOT += s.onTime; sumQ += s.quality; sumP += s.perf; evalCt++ }
        }
      })
    })
    const n = employees.length
    const orgSc = n ? Math.round(sumSc / n) : 0
    const highPct = n ? Math.round(employees.filter(e => empScore(e.id) >= 80).length / n * 100) : 0
    const riskCt = employees.filter(e => empScore(e.id) < 75).length
    const avgOT = evalCt ? Math.round(sumOT / evalCt) : 0
    const avgQ = evalCt ? Math.round(sumQ / evalCt) : 0
    const avgP = evalCt ? Math.round(sumP / evalCt) : 0

    const dist = [
      { label: "Outstanding\n≥90%", count: employees.filter(e => empScore(e.id) >= 90).length, color: "bg-green-500" },
      { label: "Steady\n80–89%", count: employees.filter(e => { const s = empScore(e.id); return s >= 80 && s < 90 }).length, color: "bg-blue-500" },
      { label: "Improving\n70–79%", count: employees.filter(e => { const s = empScore(e.id); return s >= 70 && s < 80 }).length, color: "bg-orange-500" },
      { label: "At Risk\n<70%", count: employees.filter(e => empScore(e.id) < 70).length, color: "bg-red-500" },
    ]
    const maxDist = Math.max(...dist.map(d => d.count), 1)

    const criteria = [
      { label: "On-Time Delivery", avg: avgOT, barColor: "bg-orange-500", textColor: "text-orange-500" },
      { label: "Quality & Accuracy", avg: avgQ, barColor: "bg-blue-500", textColor: "text-blue-500" },
      { label: "Performance & Proactivity", avg: avgP, barColor: "bg-green-600", textColor: "text-green-600" },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">C-Suite Executive Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Holistic performance analytics, organizational distribution, and strategic recommendations.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Org Health Score", value: `${orgSc}%`, color: scoreColor(orgSc), border: "border-l-blue-500" },
            { label: "High Performers (≥80%)", value: `${highPct}%`, color: "text-green-600", border: "border-l-green-500" },
            { label: "Risk Count (<75%)", value: String(riskCt), color: "text-red-500", border: "border-l-red-500" },
            { label: "Total Objectives", value: String(totObjs), color: "text-gray-800", border: "border-l-gray-400" },
          ].map(c => (
            <Card key={c.label} className={`border-0 shadow-sm border-l-4 ${c.border}`}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{c.label}</p>
                <p className={`text-4xl font-black ${c.color}`}>{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criteria Averages */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-500" /> Global Criteria Averages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {criteria.map(c => (
                <div key={c.label}>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-gray-600">{c.label}</span>
                    <span className={c.textColor}>{c.avg}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${c.barColor} rounded-full transition-all duration-500`} style={{ width: `${c.avg}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weak Points */}
          <Card className="border-0 shadow-sm border-t-4 border-t-red-400">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" /> Critical Weak Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criteria.filter(c => c.avg < 80).length === 0 ? (
                <p className="text-sm text-gray-500">All criteria above threshold — performance is healthy.</p>
              ) : (
                criteria.filter(c => c.avg < 80).sort((a, b) => a.avg - b.avg).map(c => (
                  <div key={c.label} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <span className="text-sm font-medium text-gray-700">{c.label}</span>
                    <span className="text-sm font-black text-red-500">{c.avg}%</span>
                  </div>
                ))
              )}
              {riskCt > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-sm font-medium text-gray-700">{riskCt} employee{riskCt > 1 ? "s" : ""} below 75%</span>
                  <Button size="sm" variant="ghost" className="text-xs text-red-500 h-6 px-2" onClick={() => setExecView("individual")}>Review →</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="border-0 shadow-sm border border-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-green-600" /> AI-Assisted Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: criteria.sort((a,b)=>a.avg-b.avg)[0].avg < 75 ? `Improve ${criteria[0].label}` : "Sustain Strong Performance", desc: criteria[0].avg < 75 ? `Org average is ${criteria[0].avg}%. Consider targeted coaching and clearer KPI definitions.` : "Performance is on track. Maintain review cadence and recognition programs.", color: "border-l-4 border-orange-400 bg-orange-50" },
                { icon: "⚠️", title: riskCt > 0 ? `Address ${riskCt} At-Risk Employee${riskCt > 1 ? "s" : ""}` : "No At-Risk Employees", desc: riskCt > 0 ? `${riskCt} employee${riskCt > 1 ? "s" : ""} scored below 75%. Initiate PIPs and bi-weekly check-ins.` : "All employees are performing above the risk threshold.", color: "border-l-4 border-red-400 bg-red-50" },
                { icon: "🏆", title: "Recognize High Performers", desc: `${highPct}% of the org scored above 80%. Consider fast-track promotions or retention bonuses.`, color: "border-l-4 border-green-400 bg-green-50" },
                { icon: "📊", title: "Review Score Distribution", desc: `${dist[0].count} outstanding, ${dist[1].count} steady, ${dist[2].count} improving, ${dist[3].count} at-risk.`, color: "border-l-4 border-blue-400 bg-blue-50" },
              ].map((r, i) => (
                <div key={i} className={`p-4 rounded-lg ${r.color}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{r.title}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" /> Organizational Distribution
              </CardTitle>
              <div className="flex gap-2 flex-wrap">
                {[{ label: "4.0: ≥90%", cls: "bg-green-100 text-green-700 border-green-200" }, { label: "3.0: 80-89%", cls: "bg-blue-100 text-blue-700 border-blue-200" }, { label: "2.0: 70-79%", cls: "bg-orange-100 text-orange-700 border-orange-200" }, { label: "1.0: <70%", cls: "bg-red-100 text-red-700 border-red-200" }].map(b => (
                  <span key={b.label} className={`px-2 py-0.5 rounded text-xs font-bold border ${b.cls}`}>{b.label}</span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-around h-48 gap-4 px-4">
              {dist.map(b => (
                <div key={b.label} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xl font-black text-gray-700">{b.count}</span>
                  <div className={`w-full rounded-t-lg ${b.color} transition-all duration-500`} style={{ height: `${Math.max(6, Math.round((b.count / maxDist) * 140))}px` }} />
                  <span className="text-xs text-gray-500 text-center whitespace-pre-line leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Matrix Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" /> Comprehensive Performance Matrix
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-semibold border-y border-gray-100">
                <tr>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3 text-center">Obj. Count</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-center border-l border-gray-100">Rating</th>
                  <th className="px-5 py-3 text-center">Designation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map(emp => {
                  const sc = empScore(emp.id)
                  const r = getRating(sc)
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedId(emp.id); setExecView("individual") }}>
                      <td className="px-5 py-3 font-semibold text-sm">{emp.name}</td>
                      <td className="px-5 py-3 text-gray-500 text-sm">{emp.role}</td>
                      <td className="px-5 py-3 text-center text-sm font-semibold">{emp.objectives.filter(o => o.weight > 0).length}</td>
                      <td className={`px-5 py-3 text-center font-black text-sm ${scoreColor(sc)}`}>{sc}%</td>
                      <td className="px-5 py-3 text-center border-l border-gray-100">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${scoreBg(sc)}`}>{r.scale}</span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${scoreBg(sc)}`}>{r.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }

  // ====================================================
  // VIEW: INDIVIDUAL & TEAM
  // ====================================================
  const renderIndividual = () => {
    const emp = employees.find(e => e.id === selectedId)
    if (!emp) return null
    const directReports = employees.filter(e => e.reportsTo === emp.id)
    const sc = empScore(emp.id)
    const ta = directReports.length > 0 ? teamAvg(emp.id) : null
    const rating = getRating(sc)
    const totalWeight = emp.objectives.reduce((sum, o) => sum + (o.weight || 0), 0)
    const weightOk = totalWeight === 100

    // Bonus engine
    const overallMultiplier = sc
    const earnedGross = (emp.baseSalary * emp.bonusMonths * overallMultiplier) / 100
    const tax = computeEgyptianTax(emp.baseSalary, earnedGross)

    return (
      <div className="flex h-full gap-0">
        {/* Sidebar */}
        <div className="w-72 shrink-0 border-r border-gray-100 overflow-y-auto pr-3 mr-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Users className="h-3.5 w-3.5" /> My Team
            </p>
            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setShowAddModal(true)}>
              <UserPlus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <OrgNode empId="me" />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Floating header */}
          <div className="sticky top-0 z-20 bg-primary rounded-xl p-5 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-white">{emp.name}</h2>
                <p className="text-white/80 text-sm font-semibold mt-0.5">{emp.role}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20 text-sm text-white font-semibold">
                  <span>{emp.objectives.filter(o => o.weight > 0).length} Objectives</span>
                  <span className={`font-black ${weightOk ? "text-white" : "text-red-300"}`}>Wgt: {totalWeight}%</span>
                  <span className="pl-3 border-l border-white/30 bg-black/20 px-2 py-1 rounded text-xs">{rating.scale} — {rating.label}</span>
                </div>
              </div>
              <div className="flex gap-8 items-end">
                {ta !== null && (
                  <div className="text-right">
                    <p className="text-xs text-white/70 uppercase tracking-widest font-bold mb-1">Team Avg</p>
                    <p className="text-5xl font-black text-white">{ta}%</p>
                  </div>
                )}
                <div className="text-right pl-6 border-l border-white/30">
                  <p className="text-xs text-white/70 uppercase tracking-widest font-bold mb-1">Personal Score</p>
                  <p className="text-5xl font-black text-white">{sc}%</p>
                </div>
              </div>
            </div>

            {/* Global weights */}
            <div className="mt-4 flex items-center justify-between bg-black/20 rounded-lg p-3 border border-white/10">
              <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="h-4 w-4" /> Global Weighting
              </span>
              <div className="flex gap-4">
                {[{ label: "On-Time", key: "onTime" }, { label: "Quality", key: "quality" }, { label: "Perf", key: "perf" }].map(w => (
                  <div key={w.key} className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <label className="text-white/80 text-xs">{w.label}</label>
                    <input
                      type="number" min={0} max={100}
                      value={gw[w.key as keyof typeof gw]}
                      onChange={e => setGw(prev => ({ ...prev, [w.key]: Number(e.target.value) || 0 }))}
                      className="w-16 py-1 px-2 bg-white/20 border-none rounded text-center text-white font-bold outline-none focus:ring-2 focus:ring-white text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Reports Table */}
          {directReports.length > 0 && (
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" /> Direct Reports Overview
                  </CardTitle>
                  <span className="text-sm text-gray-500">Team Avg: <span className={`font-black ${ta !== null ? scoreColor(ta) : ""}`}>{ta}%</span></span>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-y border-gray-100">
                    <tr>
                      <th className="px-4 py-3">Employee</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-center">Score</th>
                      <th className="px-4 py-3 text-center border-l border-gray-100">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {directReports.map(r => {
                      const rs = empScore(r.id); const rr = getRating(rs)
                      return (
                        <tr key={r.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedId(r.id)}>
                          <td className="px-4 py-3 font-semibold text-sm">{r.name}</td>
                          <td className="px-4 py-3 text-gray-500 text-sm">{r.role}</td>
                          <td className={`px-4 py-3 text-center font-black text-sm ${scoreColor(rs)}`}>{rs}%</td>
                          <td className="px-4 py-3 text-center border-l border-gray-100">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${scoreBg(rs)}`}>{rr.scale}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Objectives & Tasks Setting */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" /> Objectives & Tasks Setting
              </CardTitle>
              <p className="text-xs text-gray-400 mt-1">Define core responsibilities, metrics, and targeted delivery dates.</p>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-y border-gray-100">
                  <tr>
                    <th className="px-3 py-3 text-center w-10">#</th>
                    <th className="px-4 py-3 w-1/3">Objective / Task</th>
                    <th className="px-4 py-3 w-1/3">Measurement Criteria</th>
                    <th className="px-4 py-3 text-center whitespace-nowrap">Target Date</th>
                    <th className="px-4 py-3 text-center whitespace-nowrap">Weight %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {emp.objectives.map((obj, idx) => {
                    const s = scores[`${emp.id}_${obj.id}`] || { deadline: "", submission: "", onTime: 0, quality: 0, perf: 0 }
                    return (
                      <tr key={obj.id} className="hover:bg-gray-50 align-top">
                        <td className="px-3 py-3 text-center text-gray-400 font-bold text-sm border-r border-gray-100">{idx + 1}</td>
                        <td className="px-4 py-2 border-r border-gray-100">
                          <textarea
                            rows={2} value={obj.title} placeholder="Enter objective..."
                            onChange={e => updateObj(emp.id, obj.id, "title", e.target.value)}
                            className="w-full text-sm font-semibold resize-none border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                          />
                        </td>
                        <td className="px-4 py-2 border-r border-gray-100">
                          <textarea
                            rows={2} value={obj.desc} placeholder="Measurement criteria..."
                            onChange={e => updateObj(emp.id, obj.id, "desc", e.target.value)}
                            className="w-full text-sm resize-none border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                          />
                        </td>
                        <td className="px-4 py-3 text-center border-r border-gray-100">
                          <input
                            type="date" value={s.deadline}
                            onChange={e => updateScore(emp.id, obj.id, "deadline", e.target.value)}
                            className="text-sm border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-primary w-36"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="number" min={0} max={100} value={obj.weight}
                              onChange={e => updateObj(emp.id, obj.id, "weight", Number(e.target.value) || 0)}
                              className="w-16 text-center text-sm font-black border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <span className="text-xs text-gray-400">%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Execution & Assessment */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-500" /> Execution & Assessment
              </CardTitle>
              <p className="text-xs text-gray-400 mt-1">Core targets are locked. Provide submission dates and evaluation scores.</p>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-y border-gray-100">
                  <tr>
                    <th className="px-3 py-3 text-center w-10 border-r border-gray-100">#</th>
                    <th className="px-4 py-3 border-r border-gray-100">Locked Objective & Criteria</th>
                    <th className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100 whitespace-nowrap">Sub Date</th>
                    <th className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100 whitespace-nowrap text-orange-500">On-Time<br /><span className="text-xs text-gray-400 font-normal normal-case">(Auto)</span></th>
                    <th className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100 whitespace-nowrap text-blue-500">Quality<br /><span className="text-xs text-gray-400 font-normal normal-case">{gw.quality}%</span></th>
                    <th className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100 whitespace-nowrap text-green-600">Perf<br /><span className="text-xs text-gray-400 font-normal normal-case">{gw.perf}%</span></th>
                    <th className="px-4 py-3 text-center bg-green-50 border-l-2 border-green-200 whitespace-nowrap text-green-700">Overall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {emp.objectives.map((obj, idx) => {
                    const s = scores[`${emp.id}_${obj.id}`] || { deadline: "", submission: "", onTime: 0, quality: 0, perf: 0 }
                    const isEmpty = obj.weight === 0 && !obj.title
                    const os = isEmpty ? 0 : objScore(emp.id, obj.id)
                    return (
                      <tr key={obj.id} className="hover:bg-gray-50 align-middle">
                        <td className="px-3 py-3 text-center text-gray-400 font-bold text-sm border-r border-gray-100">{idx + 1}</td>
                        <td className="px-4 py-3 border-r border-gray-100">
                          <p className="font-semibold text-sm text-gray-800">{obj.title || "—"}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{obj.desc || "—"} {s.deadline && <span>· Tgt: <b className="text-gray-600">{s.deadline}</b></span>} <span>· Wgt: <b className="text-gray-600">{obj.weight}%</b></span></p>
                        </td>
                        <td className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100">
                          <input
                            type="date" value={s.submission} disabled={isEmpty}
                            onChange={e => updateScore(emp.id, obj.id, "submission", e.target.value)}
                            className="text-sm border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 w-36 text-blue-600"
                          />
                        </td>
                        <td className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100">
                          <span className={`text-lg font-black ${isEmpty ? "text-gray-300" : "text-orange-500"}`}>{isEmpty ? "—" : s.onTime}</span>
                        </td>
                        <td className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100">
                          <input
                            type="number" min={0} max={100} value={s.quality} disabled={isEmpty}
                            onChange={e => updateScore(emp.id, obj.id, "quality", Number(e.target.value) || 0)}
                            className="w-20 text-center text-sm font-bold text-blue-600 border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 mx-auto block"
                          />
                        </td>
                        <td className="px-4 py-3 text-center bg-blue-50 border-r border-gray-100">
                          <input
                            type="number" min={0} max={100} value={s.perf} disabled={isEmpty}
                            onChange={e => updateScore(emp.id, obj.id, "perf", Number(e.target.value) || 0)}
                            className="w-20 text-center text-sm font-bold text-green-600 border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-green-400 mx-auto block"
                          />
                        </td>
                        <td className="px-4 py-3 text-center bg-green-50 border-l-2 border-green-200">
                          {isEmpty ? <span className="text-gray-300 font-black text-lg">—</span> : (
                            <div>
                              <span className={`text-lg font-black ${scoreColor(os)}`}>{os}%</span>
                              <div className="h-1.5 w-full bg-green-100 rounded-full mt-1.5 overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${os}%` }} />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Linked Bonus Engine */}
          <Card className="border-0 shadow-lg border border-blue-100 overflow-hidden">
            <CardHeader className="pb-0 bg-primary text-white rounded-t-lg">
              <div className="flex justify-between items-center pb-4">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5" /> Linked Bonus Engine
                  </CardTitle>
                  <p className="text-white/80 text-xs mt-1 font-medium">Gross-to-Net simulation via Egyptian Tax Rules</p>
                </div>
                <div className="text-right bg-black/20 rounded-lg px-4 py-2">
                  <p className="text-xs text-white/70 uppercase tracking-wider">Performance Multiplier</p>
                  <p className="text-3xl font-black text-white">{overallMultiplier}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Base Salary (EGP)</label>
                      <input
                        type="number" value={emp.baseSalary}
                        onChange={e => setEmployees(prev => prev.map(em => em.id !== emp.id ? em : { ...em, baseSalary: Number(e.target.value) || 0 }))}
                        className="w-full text-center font-black text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Target (Months)</label>
                      <input
                        type="number" step={0.5} value={emp.bonusMonths}
                        onChange={e => setEmployees(prev => prev.map(em => em.id !== emp.id ? em : { ...em, bonusMonths: Number(e.target.value) || 0 }))}
                        className="w-full text-center font-black text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Earned Gross Bonus:</span>
                      <span className="text-xl font-black text-blue-600">EGP {fmt(earnedGross)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 border-t border-blue-100 pt-2 mt-2">
                      <span>= {emp.baseSalary.toLocaleString()} × {emp.bonusMonths} × {overallMultiplier}%</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Calculation Breakdown</h4>
                  <div className="space-y-1.5 text-sm font-mono">
                    <p className="font-sans font-bold text-gray-700 text-xs uppercase mb-2">1. Monthly Payroll</p>
                    <div className="flex justify-between text-gray-500 pl-3"><span>Monthly Base:</span><span className="font-bold text-gray-800">EGP {fmt(emp.baseSalary)}</span></div>
                    <div className="flex justify-between text-orange-500 pl-3"><span>Social Insurance (11%):</span><span>— EGP {fmt(tax.si)}</span></div>
                    <div className="flex justify-between text-orange-500 pl-3"><span>Income Tax:</span><span>— EGP {fmt(tax.monthlyTax)}</span></div>
                    <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-2 mt-2 pl-3"><span>Net Monthly:</span><span>EGP {fmt(tax.monthlyNet)}</span></div>
                    <p className="font-sans font-bold text-blue-600 text-xs uppercase mb-2 mt-4">2. Bonus Computation</p>
                    <div className="flex justify-between text-gray-500 pl-3"><span>Earned Gross:</span><span className="font-bold text-gray-800">EGP {fmt(earnedGross)}</span></div>
                    <div className="flex justify-between text-orange-500 pl-3"><span>Tax on Bonus (Delta):</span><span>— EGP {fmt(tax.taxOnBonus)}</span></div>
                    <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-2 mt-2 pl-3"><span>Net Bonus:</span><span className="text-green-600">EGP {fmt(tax.netBonus)}</span></div>
                  </div>
                </div>

                {/* Output */}
                <div className="flex flex-col gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center flex-1 flex flex-col justify-center">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Total Monthly Payout</p>
                    <p className="text-4xl font-black text-green-600">EGP {fmt(tax.monthlyNet + tax.netBonus)}</p>
                    <p className="text-xs text-gray-500 mt-2">Net Salary + Net Bonus</p>
                    <p className="text-xs text-gray-400 mt-3 border-t border-green-100 pt-3">Effective Bonus Tax Rate: {earnedGross > 0 ? Math.round((tax.taxOnBonus / earnedGross) * 100) : 0}%</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-xs text-gray-500 leading-relaxed">
                    Egyptian income taxes are progressive and annualized. A lump-sum bonus inflates the taxable base, pushing income into a higher bracket and raising the effective rate.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ====================================================
  // VIEW: AGGREGATED DEPARTMENT
  // ====================================================
  const renderAggregated = () => {
    const dist = [
      { label: "Outstanding\n≥90%", count: employees.filter(e => empScore(e.id) >= 90).length, color: "bg-green-500" },
      { label: "Steady\n80–89%", count: employees.filter(e => { const s = empScore(e.id); return s >= 80 && s < 90 }).length, color: "bg-blue-500" },
      { label: "Improving\n70–79%", count: employees.filter(e => { const s = empScore(e.id); return s >= 70 && s < 80 }).length, color: "bg-orange-500" },
      { label: "At Risk\n<70%", count: employees.filter(e => empScore(e.id) < 70).length, color: "bg-red-500" },
    ]
    const maxDist = Math.max(...dist.map(d => d.count), 1)

    // Bonus forecast
    let targetPool = 0, earnedPool = 0, taxPool = 0, netPool = 0
    employees.forEach(emp => {
      const sc = empScore(emp.id)
      const gross = (emp.baseSalary * emp.bonusMonths * sc) / 100
      const target = emp.baseSalary * emp.bonusMonths
      const tax = computeEgyptianTax(emp.baseSalary, gross)
      targetPool += target
      earnedPool += gross
      taxPool += tax.taxOnBonus
      netPool += tax.netBonus
    })

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aggregated Department Data</h2>
        </div>

        {/* Performance Matrix */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" /> Comprehensive Performance Matrix
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-y border-gray-100">
                <tr>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3 text-center">Obj. Count</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-center border-l border-gray-100">Rating</th>
                  <th className="px-5 py-3 text-center">Designation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map(emp => {
                  const sc = empScore(emp.id); const r = getRating(sc)
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-sm">{emp.name}</td>
                      <td className="px-5 py-3 text-gray-500 text-sm">{emp.role}</td>
                      <td className="px-5 py-3 text-center text-sm font-semibold">{emp.objectives.filter(o => o.weight > 0).length}</td>
                      <td className={`px-5 py-3 text-center font-black text-sm ${scoreColor(sc)}`}>{sc}%</td>
                      <td className="px-5 py-3 text-center border-l border-gray-100">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${scoreBg(sc)}`}>{r.scale}</span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${scoreBg(sc)}`}>{r.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Distribution Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" /> Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-around h-48 gap-4 px-4">
              {dist.map(b => (
                <div key={b.label} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xl font-black text-gray-700">{b.count}</span>
                  <div className={`w-full rounded-t-lg ${b.color} transition-all duration-500`} style={{ height: `${Math.max(6, Math.round((b.count / maxDist) * 140))}px` }} />
                  <span className="text-xs text-gray-500 text-center whitespace-pre-line leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bonus Payout Forecast */}
        <Card className="border-0 shadow-sm border border-blue-100 overflow-hidden">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-base flex items-center gap-2 text-blue-700">
              <TrendingUp className="h-4 w-4" /> Bonus Payout Forecast
            </CardTitle>
            <p className="text-xs text-blue-500 mt-1">Global pool simulation based on performance scores</p>
          </CardHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-100">
            {[
              { label: "Target Pool (100%)", value: `EGP ${fmt(targetPool)}`, color: "text-gray-800" },
              { label: "Earned Pool (Gross)", value: `EGP ${fmt(earnedPool)}`, color: "text-blue-600" },
              { label: "Est. Tax Withheld", value: `EGP ${fmt(taxPool)}`, color: "text-orange-500" },
              { label: "Final Net Payout", value: `EGP ${fmt(netPool)}`, color: "text-green-600" },
            ].map(c => (
              <div key={c.label} className={`bg-white p-4 rounded-lg border border-gray-100 ${c.color === "text-green-600" ? "border-green-100 bg-green-50" : ""}`}>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{c.label}</p>
                <p className={`text-xl font-black ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-y border-gray-100">
                <tr>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-right">Target Gross</th>
                  <th className="px-5 py-3 text-right text-blue-500">Earned Gross</th>
                  <th className="px-5 py-3 text-right text-orange-500">Est. Tax</th>
                  <th className="px-5 py-3 text-right text-green-600">Net Bonus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map(emp => {
                  const sc = empScore(emp.id)
                  const gross = (emp.baseSalary * emp.bonusMonths * sc) / 100
                  const target = emp.baseSalary * emp.bonusMonths
                  const tax = computeEgyptianTax(emp.baseSalary, gross)
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-sm">{emp.name}</td>
                      <td className={`px-5 py-3 text-center font-black text-sm ${scoreColor(sc)}`}>{sc}%</td>
                      <td className="px-5 py-3 text-right text-sm text-gray-600">EGP {fmt(target)}</td>
                      <td className="px-5 py-3 text-right text-sm font-semibold text-blue-600">EGP {fmt(gross)}</td>
                      <td className="px-5 py-3 text-right text-sm text-orange-500">EGP {fmt(tax.taxOnBonus)}</td>
                      <td className="px-5 py-3 text-right text-sm font-black text-green-600">EGP {fmt(tax.netBonus)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }

  // ====================================================
  // VIEW: COMP MASTER DATA
  // ====================================================
  const renderMaster = () => {
    let targetPool = 0, earnedPool = 0, taxPool = 0, netPool = 0
    employees.forEach(emp => {
      const sc = empScore(emp.id)
      const gross = (emp.baseSalary * emp.bonusMonths * sc) / 100
      const target = emp.baseSalary * emp.bonusMonths
      const tax = computeEgyptianTax(emp.baseSalary, gross)
      targetPool += target; earnedPool += gross; taxPool += tax.taxOnBonus; netPool += tax.netBonus
    })

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compensation Master Data</h2>
          <p className="text-sm text-gray-500 mt-1">Manage global compensation vectors and simulate aggregate payouts instantly.</p>
        </div>

        <Card className="border-0 shadow-sm border border-blue-100 overflow-hidden">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base flex items-center gap-2 text-blue-700">
                <Database className="h-4 w-4" /> Employee Salary Roster
              </CardTitle>
              <Button size="sm" onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="h-4 w-4 mr-1.5" /> Add Team Member
              </Button>
            </div>
          </CardHeader>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-100">
            {[
              { label: "Target Pool (100%)", value: `EGP ${fmt(targetPool)}`, color: "text-gray-800", card: "" },
              { label: "Earned Pool (Gross)", value: `EGP ${fmt(earnedPool)}`, color: "text-blue-600", card: "" },
              { label: "Est. Tax Withheld", value: `EGP ${fmt(taxPool)}`, color: "text-orange-500", card: "" },
              { label: "Final Net Payout", value: `EGP ${fmt(netPool)}`, color: "text-green-600", card: "bg-green-50 border-green-100" },
            ].map(c => (
              <div key={c.label} className={`bg-white p-4 rounded-lg border border-gray-100 ${c.card}`}>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{c.label}</p>
                <p className={`text-xl font-black ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-y border-gray-100">
                <tr>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3 text-center">Base Salary (EGP)</th>
                  <th className="px-5 py-3 text-center">Target Months</th>
                  <th className="px-5 py-3 text-center border-l border-gray-100">Score</th>
                  <th className="px-5 py-3 text-right text-blue-500">Earned Gross</th>
                  <th className="px-5 py-3 text-right text-orange-500">Est. Tax</th>
                  <th className="px-5 py-3 text-right text-green-600">Net Bonus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map(emp => {
                  const sc = empScore(emp.id)
                  const gross = (emp.baseSalary * emp.bonusMonths * sc) / 100
                  const tax = computeEgyptianTax(emp.baseSalary, gross)
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-sm">{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.role}</p>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input
                          type="number" value={emp.baseSalary}
                          onChange={e => setEmployees(prev => prev.map(em => em.id !== emp.id ? em : { ...em, baseSalary: Number(e.target.value) || 0 }))}
                          className="w-32 text-center text-sm font-black border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input
                          type="number" step={0.5} value={emp.bonusMonths}
                          onChange={e => setEmployees(prev => prev.map(em => em.id !== emp.id ? em : { ...em, bonusMonths: Number(e.target.value) || 0 }))}
                          className="w-20 text-center text-sm font-bold border border-gray-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </td>
                      <td className={`px-5 py-3 text-center font-black text-sm border-l border-gray-100 ${scoreColor(sc)}`}>{sc}%</td>
                      <td className="px-5 py-3 text-right text-sm font-semibold text-blue-600">EGP {fmt(gross)}</td>
                      <td className="px-5 py-3 text-right text-sm text-orange-500">EGP {fmt(tax.taxOnBonus)}</td>
                      <td className="px-5 py-3 text-right text-sm font-black text-green-600">EGP {fmt(tax.netBonus)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }

  // ====================================================
  // MAIN RENDER
  // ====================================================
  const navItems: { key: ExecView; label: string; icon: React.ReactNode }[] = [
    { key: "executive", label: "Executive Insights", icon: <Presentation className="h-4 w-4" /> },
    { key: "individual", label: "Individual & Team", icon: <User className="h-4 w-4" /> },
    { key: "aggregated", label: "Aggregated Dept", icon: <BarChart3 className="h-4 w-4" /> },
    { key: "master", label: "Comp Master Data", icon: <Database className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6">
      {/* Inner nav */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl flex-wrap">
        {navItems.map(n => (
          <button
            key={n.key}
            onClick={() => setExecView(n.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${execView === n.key ? "bg-white shadow text-primary" : "text-gray-500 hover:text-gray-700 hover:bg-white/60"}`}
          >
            {n.icon} {n.label}
          </button>
        ))}
      </div>

      {/* Views */}
      <div className={execView === "individual" ? "min-h-[800px]" : ""}>
        {execView === "executive" && renderExecutive()}
        {execView === "individual" && renderIndividual()}
        {execView === "aggregated" && renderAggregated()}
        {execView === "master" && renderMaster()}
      </div>

      {/* Add Member Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-500" /> Add Team Member
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
              <Input value={newMember.name} onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Sarah Ahmed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Role / Job Title</label>
              <Input value={newMember.role} onChange={e => setNewMember(p => ({ ...p, role: e.target.value }))} placeholder="e.g. HR Specialist" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Reports To</label>
              <Select value={newMember.manager} onValueChange={v => setNewMember(p => ({ ...p, manager: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {employees.map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.name} — {e.role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={addMember} disabled={!newMember.name || !newMember.role}>Add Member</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
