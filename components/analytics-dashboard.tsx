"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Target,
  Download,
  Building,
  Award,
  AlertTriangle,
  CheckCircle,
  Activity,
  UserCheck,
  Heart,
  Globe,
  GraduationCap,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ShieldAlert,
  PieChart,
  TrendingUp as Trend,
  Send,
  Plus,
  Trash2,
  Edit3,
  Mail,
  FileText,
  FileSpreadsheet,
  ToggleLeft,
  ToggleRight,
  Bell,
  X,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // ── Scheduled Reports ─────────────────────────────────────────────────────
  type ReportFormat = "PDF" | "Excel" | "CSV" | "Email Summary"
  type ReportFreq   = "Daily" | "Weekly" | "Monthly" | "Quarterly"
  interface ScheduledReport {
    id: number; name: string; type: string; format: ReportFormat
    recipients: string; frequency: ReportFreq; dayOfWeek?: string
    dayOfMonth?: string; time: string; enabled: boolean
    lastSent: string; lastStatus: "Success" | "Failed" | "Pending"
    nextRun: string; sentCount: number
  }
  const [schedules, setSchedules] = useState<ScheduledReport[]>([
    { id: 1, name: "Weekly Headcount Summary", type: "Headcount", format: "PDF", recipients: "ceo@valu.com, hr@valu.com", frequency: "Weekly", dayOfWeek: "Monday", time: "08:00", enabled: true, lastSent: "Mon 15 Apr 08:00", lastStatus: "Success", nextRun: "Mon 22 Apr 08:00", sentCount: 24 },
    { id: 2, name: "Monthly Payroll Report", type: "Payroll", format: "Excel", recipients: "finance@valu.com, cfo@valu.com", frequency: "Monthly", dayOfMonth: "1", time: "07:00", enabled: true, lastSent: "1 Apr 07:00", lastStatus: "Success", nextRun: "1 May 07:00", sentCount: 12 },
    { id: 3, name: "Daily Attendance Digest", type: "Attendance", format: "Email Summary", recipients: "managers@valu.com", frequency: "Daily", time: "09:00", enabled: true, lastSent: "Today 09:00", lastStatus: "Success", nextRun: "Tomorrow 09:00", sentCount: 186 },
    { id: 4, name: "Quarterly DEI Report", type: "Diversity & Inclusion", format: "PDF", recipients: "board@valu.com, ceo@valu.com", frequency: "Quarterly", time: "10:00", enabled: true, lastSent: "1 Jan 10:00", lastStatus: "Success", nextRun: "1 Jul 10:00", sentCount: 4 },
    { id: 5, name: "Turnover & Attrition", type: "Retention", format: "PDF", recipients: "hr@valu.com, chro@valu.com", frequency: "Monthly", dayOfMonth: "5", time: "08:30", enabled: true, lastSent: "5 Apr 08:30", lastStatus: "Success", nextRun: "5 May 08:30", sentCount: 12 },
    { id: 6, name: "Recruitment Funnel", type: "Recruitment", format: "Excel", recipients: "talent@valu.com", frequency: "Weekly", dayOfWeek: "Friday", time: "17:00", enabled: false, lastSent: "5 Apr 17:00", lastStatus: "Failed", nextRun: "Paused", sentCount: 18 },
    { id: 7, name: "Performance Score Digest", type: "Performance", format: "PDF", recipients: "managers@valu.com, hr@valu.com", frequency: "Quarterly", time: "09:00", enabled: true, lastSent: "1 Jan 09:00", lastStatus: "Success", nextRun: "1 Jul 09:00", sentCount: 4 },
    { id: 8, name: "Training Completion Rate", type: "Training", format: "CSV", recipients: "ld@valu.com", frequency: "Monthly", dayOfMonth: "15", time: "10:00", enabled: true, lastSent: "15 Apr 10:00", lastStatus: "Pending", nextRun: "15 May 10:00", sentCount: 11 },
  ])
  const emptyForm = {
    name: "", type: "Headcount", format: "PDF" as ReportFormat, recipients: "",
    frequency: "Monthly" as ReportFreq, dayOfWeek: "Monday", dayOfMonth: "1", time: "08:00", enabled: true,
  }
  const [showForm, setShowForm]           = useState(false)
  const [editId, setEditId]               = useState<number | null>(null)
  const [form, setForm]                   = useState({ ...emptyForm })
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const reportTypes = ["Headcount","Payroll","Attendance","Diversity & Inclusion","Retention","Recruitment","Performance","Training","Compensation & Pay Equity","Leave Utilization","Benefits","Full HR Dashboard"]
  const handleSave = () => {
    if (!form.name || !form.recipients) return
    if (editId !== null) {
      setSchedules(s => s.map(r => r.id === editId ? { ...r, ...form } : r))
      setEditId(null)
    } else {
      const newId = Math.max(...schedules.map(s => s.id)) + 1
      setSchedules(s => [...s, { ...form, id: newId, lastSent: "Never", lastStatus: "Pending" as const, nextRun: "Based on schedule", sentCount: 0 }])
    }
    setForm({ ...emptyForm }); setShowForm(false)
  }
  const handleEdit = (r: ScheduledReport) => {
    setForm({ name: r.name, type: r.type, format: r.format, recipients: r.recipients, frequency: r.frequency, dayOfWeek: r.dayOfWeek, dayOfMonth: r.dayOfMonth, time: r.time, enabled: r.enabled })
    setEditId(r.id); setShowForm(true)
  }
  const handleDelete = (id: number) => { setSchedules(s => s.filter(r => r.id !== id)); setDeleteConfirm(null) }
  const handleToggle = (id: number) => { setSchedules(s => s.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)) }

  // ── KPI Data ──────────────────────────────────────────────────────────────
  const kpiData = [
    { title: "Total Employees", value: "1,247", change: "+5.2%", trend: "up", icon: Users, color: "teal" },
    { title: "Turnover Rate", value: "9.3%", change: "-1.1%", trend: "down-good", icon: TrendingDown, color: "green" },
    { title: "Time to Hire", value: "18 days", change: "-3 days", trend: "down-good", icon: Clock, color: "blue" },
    { title: "eNPS Score", value: "62", change: "+8", trend: "up", icon: Heart, color: "pink" },
    { title: "Gender Pay Ratio", value: "0.94", change: "+0.02", trend: "up", icon: Target, color: "purple" },
    { title: "Avg Tenure", value: "3.8 yrs", change: "+0.2", trend: "up", icon: Calendar, color: "amber" },
    { title: "Training Completion", value: "89%", change: "+4%", trend: "up", icon: GraduationCap, color: "indigo" },
    { title: "Absenteeism Rate", value: "2.1%", change: "-0.3%", trend: "down-good", icon: Activity, color: "orange" },
  ]

  // ── Department Data ───────────────────────────────────────────────────────
  const departmentData = [
    { name: "Engineering", employees: 342, avgSalary: 95000, turnover: 8.2, satisfaction: 4.7, avgTenure: 4.2, femaleRatio: 32 },
    { name: "Sales", employees: 189, avgSalary: 68000, turnover: 12.5, satisfaction: 4.3, avgTenure: 2.9, femaleRatio: 41 },
    { name: "Marketing", employees: 156, avgSalary: 72000, turnover: 9.8, satisfaction: 4.5, avgTenure: 3.5, femaleRatio: 58 },
    { name: "HR", employees: 89, avgSalary: 65000, turnover: 6.1, satisfaction: 4.8, avgTenure: 5.1, femaleRatio: 72 },
    { name: "Finance", employees: 134, avgSalary: 78000, turnover: 7.3, satisfaction: 4.4, avgTenure: 4.8, femaleRatio: 44 },
    { name: "Operations", employees: 267, avgSalary: 58000, turnover: 11.2, satisfaction: 4.2, avgTenure: 3.1, femaleRatio: 38 },
    { name: "Legal", employees: 45, avgSalary: 85000, turnover: 4.5, satisfaction: 4.6, avgTenure: 6.2, femaleRatio: 51 },
    { name: "IT", employees: 125, avgSalary: 82000, turnover: 9.1, satisfaction: 4.5, avgTenure: 3.7, femaleRatio: 28 },
  ]

  const getKpiColors = (color: string) => {
    const map: Record<string, { bg: string; icon: string; text: string }> = {
      teal:   { bg: "bg-teal-50 dark:bg-teal-900/20",   icon: "text-teal-600",   text: "text-teal-700" },
      green:  { bg: "bg-green-50 dark:bg-green-900/20", icon: "text-green-600",  text: "text-green-700" },
      blue:   { bg: "bg-blue-50 dark:bg-blue-900/20",   icon: "text-blue-600",   text: "text-blue-700" },
      pink:   { bg: "bg-pink-50 dark:bg-pink-900/20",   icon: "text-pink-600",   text: "text-pink-700" },
      purple: { bg: "bg-purple-50 dark:bg-purple-900/20", icon: "text-purple-600", text: "text-purple-700" },
      amber:  { bg: "bg-amber-50 dark:bg-amber-900/20", icon: "text-amber-600",  text: "text-amber-700" },
      indigo: { bg: "bg-indigo-50 dark:bg-indigo-900/20", icon: "text-indigo-600", text: "text-indigo-700" },
      orange: { bg: "bg-orange-50 dark:bg-orange-900/20", icon: "text-orange-600", text: "text-orange-700" },
    }
    return map[color] ?? map.blue
  }

  const TrendBadge = ({ trend, change }: { trend: string; change: string }) => {
    const isGood = trend === "up" || trend === "down-good"
    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${isGood ? "text-green-600" : "text-red-600"}`}>
        {trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : trend === "down-good" ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
        {change}
      </div>
    )
  }

  // ── Simple Bar visual ─────────────────────────────────────────────────────
  const Bar = ({ value, max, color = "#00C5B3" }: { value: number; max: number; color?: string }) => (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex-1">
      <div className="h-full rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  )

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl" style={{ background: "linear-gradient(135deg,#00C5B3 0%,#00a89a 55%,#007a70 100%)" }}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl -translate-y-36 translate-x-36" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl translate-y-24 -translate-x-24" style={{ background: "rgba(255,80,0,0.18)" }} />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl border border-white/25 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.18)" }}>
              <BarChart3 className="h-8 w-8" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Valu People Analytics</p>
              <h1 className="text-3xl font-bold">HR Analytics & Intelligence</h1>
              <p className="text-white/80 mt-1">Deep workforce insights across all dimensions</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-36 border-white/25 text-white" style={{ background: "rgba(255,255,255,0.18)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button className="border-white/25 text-white hover:bg-white/20" style={{ background: "rgba(255,255,255,0.18)" }} variant="outline">
              <Download className="w-4 h-4 mr-2" />Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* ── 8 KPI Cards ──────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, i) => {
          const c = getKpiColors(kpi.color)
          return (
            <Card key={i} className={`border-0 shadow-md ${c.bg}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                <kpi.icon className={`w-4 h-4 ${c.icon}`} />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className={`text-2xl font-bold ${c.text}`}>{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendBadge trend={kpi.trend} change={kpi.change} />
                  <span className="text-xs text-slate-400">vs last period</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="w-max min-w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Workforce Demographics</TabsTrigger>
            <TabsTrigger value="tenure">Tenure & Retention</TabsTrigger>
            <TabsTrigger value="compensation">Compensation & Pay</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="scheduled" className="flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />Scheduled Reports
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            TAB 1 – OVERVIEW
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Headcount Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Headcount Growth</CardTitle>
                <CardDescription>Monthly employee count – last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { month: "Apr 2024", count: 1247, growth: 5.2 },
                  { month: "Mar 2024", count: 1184, growth: 3.8 },
                  { month: "Feb 2024", count: 1141, growth: 2.1 },
                  { month: "Jan 2024", count: 1117, growth: 4.5 },
                  { month: "Dec 2023", count: 1069, growth: 6.2 },
                  { month: "Nov 2023", count: 1007, growth: 3.9 },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 w-20 shrink-0">{d.month}</span>
                    <Bar value={d.count} max={1400} />
                    <span className="text-sm font-bold w-12 text-right">{d.count}</span>
                    <span className="text-xs text-green-600 w-12 text-right">+{d.growth}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Leave Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Utilization</CardTitle>
                <CardDescription>Usage across leave categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "Annual Leave", used: 2340, available: 3120, pct: 75 },
                  { type: "Sick Leave", used: 890, available: 1560, pct: 57 },
                  { type: "Personal Leave", used: 456, available: 780, pct: 58 },
                  { type: "Maternity / Paternity", used: 234, available: 390, pct: 60 },
                  { type: "Unpaid Leave", used: 89, available: 312, pct: 29 },
                ].map((l, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{l.type}</span>
                      <span className="text-slate-400">{l.used}/{l.available} days</span>
                    </div>
                    <Progress value={l.pct} className="h-2" />
                    <p className="text-xs text-slate-400 text-right">{l.pct}% utilized</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Top Performers */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />Top Performers</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Sarah Johnson", score: 4.9, dept: "Engineering" },
                  { name: "Michael Chen", score: 4.8, dept: "Sales" },
                  { name: "Lisa Anderson", score: 4.7, dept: "Marketing" },
                  { name: "David Wilson", score: 4.6, dept: "Finance" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-slate-400">{p.dept}</p></div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{p.score}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" />Attention Needed</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { issue: "High Turnover", dept: "Sales", val: "12.5%" },
                  { issue: "Low Attendance", dept: "Operations", val: "89.2%" },
                  { issue: "Pending Reviews", dept: "All", val: "23" },
                  { issue: "Training Overdue", dept: "IT", val: "15" },
                  { issue: "Flight Risk", dept: "Engineering", val: "8" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div><p className="text-sm font-medium">{a.issue}</p><p className="text-xs text-slate-400">{a.dept}</p></div>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">{a.val}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="w-4 h-4 text-blue-600" />Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: "New hire onboarded", time: "2 hrs ago" },
                  { action: "Performance review completed", time: "4 hrs ago" },
                  { action: "Leave request approved", time: "6 hrs ago" },
                  { action: "Training session scheduled", time: "1 day ago" },
                  { action: "Offer letter sent", time: "1 day ago" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "#00C5B3" }} />
                    <div><p className="text-sm font-medium">{a.action}</p><p className="text-xs text-slate-400">{a.time}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 2 – WORKFORCE DEMOGRAPHICS
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="demographics" className="space-y-6">

          {/* Gender + Age row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Gender Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" />Gender Distribution</CardTitle>
                <CardDescription>Workforce breakdown by gender identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stacked bar */}
                <div className="flex h-8 rounded-xl overflow-hidden gap-0.5">
                  <div className="flex items-center justify-center text-xs font-bold text-white" style={{ width: "54%", background: "#00C5B3" }}>54% M</div>
                  <div className="flex items-center justify-center text-xs font-bold text-white" style={{ width: "43%", background: "#FF5000" }}>43% F</div>
                  <div className="flex items-center justify-center text-xs font-bold text-white bg-slate-400" style={{ width: "3%" }}></div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Male", count: 673, pct: 54, color: "#00C5B3" },
                    { label: "Female", count: 536, pct: 43, color: "#FF5000" },
                    { label: "Non-binary", count: 25, pct: 2, color: "#94a3b8" },
                    { label: "Prefer not to say", count: 13, pct: 1, color: "#cbd5e1" },
                  ].map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: g.color }} />
                      <span className="text-sm font-medium flex-1">{g.label}</span>
                      <Bar value={g.pct} max={100} color={g.color} />
                      <span className="text-sm font-bold w-8 text-right">{g.pct}%</span>
                      <span className="text-xs text-slate-400 w-12 text-right">{g.count}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <p className="text-xs text-slate-500">Leadership gender split: <span className="font-semibold text-slate-700 dark:text-slate-200">61% M / 39% F</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Age / Generation Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Age & Generational Mix</CardTitle>
                <CardDescription>Workforce spread across generations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { gen: "Gen Z", range: "18–27", count: 187, pct: 15, color: "#00C5B3" },
                  { gen: "Millennials", range: "28–43", count: 548, pct: 44, color: "#0ea5e9" },
                  { gen: "Gen X", range: "44–59", count: 386, pct: 31, color: "#8b5cf6" },
                  { gen: "Baby Boomers", range: "60+", count: 126, pct: 10, color: "#f59e0b" },
                ].map((g, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">{g.gen} <span className="text-xs text-slate-400 font-normal">({g.range})</span></span>
                      <span className="font-bold">{g.pct}% <span className="text-xs text-slate-400 font-normal">· {g.count}</span></span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${g.pct}%`, background: g.color }} />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <p className="text-2xl font-bold" style={{ color: "#00C5B3" }}>34.2</p>
                    <p className="text-xs text-slate-500">Avg age (yrs)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <p className="text-2xl font-bold text-purple-600">62%</p>
                    <p className="text-xs text-slate-500">Under 40</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nationality + Education + Employment Type */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Nationality / Origin */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Nationality Mix</CardTitle>
                <CardDescription>Top employee nationalities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { country: "Egypt", count: 687, pct: 55 },
                  { country: "Saudi Arabia", count: 175, pct: 14 },
                  { country: "UAE", count: 137, pct: 11 },
                  { country: "Jordan", count: 100, pct: 8 },
                  { country: "Lebanon", count: 75, pct: 6 },
                  { country: "Other", count: 73, pct: 6 },
                ].map((n, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm flex-1 truncate">{n.country}</span>
                    <Bar value={n.pct} max={100} />
                    <span className="text-xs font-bold w-8 text-right">{n.pct}%</span>
                  </div>
                ))}
                <div className="pt-2 border-t text-xs text-slate-500">Diversity Index: <span className="font-semibold text-slate-700 dark:text-slate-200">0.68 / 1.0</span></div>
              </CardContent>
            </Card>

            {/* Education Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" />Education Level</CardTitle>
                <CardDescription>Highest qualification attained</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { level: "PhD / Doctorate", count: 62, pct: 5, color: "#7c3aed" },
                  { level: "Master's Degree", count: 312, pct: 25, color: "#2563eb" },
                  { level: "Bachelor's Degree", count: 623, pct: 50, color: "#00C5B3" },
                  { level: "Diploma / Associate", count: 175, pct: 14, color: "#0ea5e9" },
                  { level: "High School", count: 75, pct: 6, color: "#94a3b8" },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: e.color }} />
                    <span className="text-xs flex-1 truncate">{e.level}</span>
                    <Bar value={e.pct} max={100} color={e.color} />
                    <span className="text-xs font-bold w-8 text-right">{e.pct}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Employment Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" />Employment Type</CardTitle>
                <CardDescription>Full-time, part-time & contractors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "Full-time", count: 1023, pct: 82, color: "#00C5B3" },
                  { type: "Part-time", count: 112, pct: 9, color: "#FF5000" },
                  { type: "Contractor", count: 87, pct: 7, color: "#8b5cf6" },
                  { type: "Intern", count: 25, pct: 2, color: "#f59e0b" },
                ].map((t, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{t.type}</span>
                      <span>{t.pct}% <span className="text-xs text-slate-400">({t.count})</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.color }} />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t grid grid-cols-2 gap-2 text-xs text-center">
                  <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                    <p className="font-bold text-teal-700">87%</p><p className="text-slate-500">Permanent</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                    <p className="font-bold text-orange-700">13%</p><p className="text-slate-500">Flexible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gender by department */}
          <Card>
            <CardHeader>
              <CardTitle>Gender Breakdown by Department</CardTitle>
              <CardDescription>Female representation across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departmentData.map((dept, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-28 shrink-0">{dept.name}</span>
                    <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full flex items-center justify-center text-xs font-bold text-white" style={{ width: `${100 - dept.femaleRatio}%`, background: "#00C5B3" }}>
                        {100 - dept.femaleRatio > 15 ? `${100 - dept.femaleRatio}%` : ""}
                      </div>
                      <div className="h-full flex items-center justify-center text-xs font-bold text-white" style={{ width: `${dept.femaleRatio}%`, background: "#FF5000" }}>
                        {dept.femaleRatio > 10 ? `${dept.femaleRatio}%` : ""}
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs shrink-0">
                      <span className="text-teal-700 font-semibold">M {100 - dept.femaleRatio}%</span>
                      <span className="text-orange-600 font-semibold">F {dept.femaleRatio}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ background: "#00C5B3" }} /><span>Male</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ background: "#FF5000" }} /><span>Female</span></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 3 – TENURE & RETENTION
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="tenure" className="space-y-6">
          {/* Tenure KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Avg Tenure", value: "3.8 yrs", sub: "+0.2 yrs YoY", good: true },
              { label: "Retention Rate", value: "90.7%", sub: "+1.1% YoY", good: true },
              { label: "Annual Turnover", value: "9.3%", sub: "-1.1% YoY", good: true },
              { label: "Flight Risk Count", value: "47", sub: "High-risk employees", good: false },
            ].map((k, i) => (
              <Card key={i} className="border-0 shadow-md bg-slate-50 dark:bg-slate-800/50">
                <CardContent className="pt-4 pb-4 px-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{k.label}</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{k.value}</p>
                  <p className={`text-xs mt-1 font-medium ${k.good ? "text-green-600" : "text-red-500"}`}>{k.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Tenure Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Tenure Distribution</CardTitle>
                <CardDescription>How long employees have been with the company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { band: "< 1 year", count: 187, pct: 15, color: "#f59e0b" },
                  { band: "1 – 3 years", count: 374, pct: 30, color: "#0ea5e9" },
                  { band: "3 – 5 years", count: 311, pct: 25, color: "#00C5B3" },
                  { band: "5 – 10 years", count: 249, pct: 20, color: "#8b5cf6" },
                  { band: "10+ years", count: 126, pct: 10, color: "#FF5000" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: t.color }} />
                    <span className="text-sm font-medium w-28 shrink-0">{t.band}</span>
                    <Bar value={t.pct} max={100} color={t.color} />
                    <span className="text-sm font-bold w-8 text-right">{t.pct}%</span>
                    <span className="text-xs text-slate-400 w-10 text-right">{t.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Avg Tenure by Department */}
            <Card>
              <CardHeader>
                <CardTitle>Avg Tenure by Department</CardTitle>
                <CardDescription>Which teams have the most experienced staff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...departmentData].sort((a, b) => b.avgTenure - a.avgTenure).map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24 shrink-0">{d.name}</span>
                    <Bar value={d.avgTenure} max={8} />
                    <span className="text-sm font-bold w-16 text-right">{d.avgTenure} yrs</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Retention by Year */}
            <Card>
              <CardHeader>
                <CardTitle>Retention Rate Trend</CardTitle>
                <CardDescription>Annual employee retention over the past 4 years</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { year: "2024 (YTD)", rate: 90.7, turnover: 9.3 },
                  { year: "2023", rate: 89.6, turnover: 10.4 },
                  { year: "2022", rate: 87.2, turnover: 12.8 },
                  { year: "2021", rate: 85.9, turnover: 14.1 },
                ].map((r, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">{r.year}</span>
                      <span>Retention <span className="text-green-600 font-bold">{r.rate}%</span> · Turnover <span className="text-red-500 font-bold">{r.turnover}%</span></span>
                    </div>
                    <div className="flex gap-1 h-3">
                      <div className="rounded-l-full" style={{ width: `${r.rate}%`, background: "#00C5B3" }} />
                      <div className="rounded-r-full" style={{ width: `${r.turnover}%`, background: "#FF5000" }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Turnover Reasons */}
            <Card>
              <CardHeader>
                <CardTitle>Exit Reasons Analysis</CardTitle>
                <CardDescription>Voluntary vs involuntary turnover breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl text-center" style={{ background: "rgba(0,197,179,0.1)" }}>
                    <p className="text-2xl font-bold" style={{ color: "#00C5B3" }}>67%</p>
                    <p className="text-xs text-slate-500 mt-1">Voluntary exits</p>
                  </div>
                  <div className="p-3 rounded-xl text-center bg-red-50 dark:bg-red-900/20">
                    <p className="text-2xl font-bold text-red-600">33%</p>
                    <p className="text-xs text-slate-500 mt-1">Involuntary exits</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { reason: "Better compensation elsewhere", pct: 31 },
                    { reason: "Career growth opportunity", pct: 24 },
                    { reason: "Work-life balance", pct: 18 },
                    { reason: "Relocation / personal", pct: 14 },
                    { reason: "Performance / conduct", pct: 8 },
                    { reason: "Redundancy / restructure", pct: 5 },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs flex-1 truncate">{r.reason}</span>
                      <Bar value={r.pct} max={100} color={i < 4 ? "#00C5B3" : "#FF5000"} />
                      <span className="text-xs font-bold w-8 text-right">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flight Risk Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Flight Risk Analysis
              </CardTitle>
              <CardDescription>Employees flagged as at risk of leaving based on engagement, performance, and tenure signals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Alex Thompson", dept: "Engineering", risk: "High", score: 82, tenure: "2.1 yrs", signal: "Low engagement + declined bonus" },
                  { name: "Maria Santos", dept: "Sales", risk: "High", score: 78, tenure: "1.4 yrs", signal: "3 missed reviews, searching LinkedIn" },
                  { name: "James Okafor", dept: "Marketing", risk: "Medium", score: 61, tenure: "3.2 yrs", signal: "Below-average satisfaction survey" },
                  { name: "Priya Nair", dept: "Finance", risk: "Medium", score: 58, tenure: "4.8 yrs", signal: "Peer left recently, stagnant salary" },
                  { name: "Chen Wei", dept: "Operations", risk: "Low", score: 34, tenure: "6.0 yrs", signal: "Missed one training deadline" },
                ].map((e, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${e.risk === "High" ? "bg-red-500" : e.risk === "Medium" ? "bg-amber-400" : "bg-green-500"}`} />
                      <div>
                        <p className="text-sm font-medium">{e.name}</p>
                        <p className="text-xs text-slate-400">{e.dept} · {e.tenure}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 flex-1 mx-4 hidden md:block">{e.signal}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={e.risk === "High" ? "bg-red-100 text-red-700" : e.risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}>
                        {e.risk} · {e.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 4 – COMPENSATION & PAY EQUITY
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="compensation" className="space-y-6">
          {/* Comp KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Payroll / Mo", value: "$2.45M", sub: "+3.1% YoY" },
              { label: "Avg Total Comp", value: "$85,400", sub: "+4.2% YoY" },
              { label: "Gender Pay Ratio", value: "0.94", sub: "F earns 94¢ per $1 M" },
              { label: "Benefits Cost / EE", value: "$8,200", sub: "/yr per employee" },
            ].map((k, i) => (
              <Card key={i} className="border-0 shadow-md bg-slate-50 dark:bg-slate-800/50">
                <CardContent className="pt-4 pb-4 px-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{k.label}</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{k.value}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{k.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Pay Equity by Gender */}
            <Card>
              <CardHeader>
                <CardTitle>Gender Pay Equity</CardTitle>
                <CardDescription>Average compensation by gender per department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departmentData.slice(0, 5).map((dept, i) => {
                  const mSalary = dept.avgSalary
                  const fSalary = Math.round(dept.avgSalary * (0.88 + Math.random() * 0.1))
                  const ratio = (fSalary / mSalary).toFixed(2)
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{dept.name}</span>
                        <span className="text-xs text-slate-400">Ratio: <span className={`font-bold ${parseFloat(ratio) >= 0.95 ? "text-green-600" : parseFloat(ratio) >= 0.9 ? "text-amber-600" : "text-red-500"}`}>{ratio}</span></span>
                      </div>
                      <div className="flex gap-1 h-4">
                        <div className="h-full rounded-l flex items-center justify-end pr-1 text-xs text-white font-bold" style={{ width: `${(mSalary / 120000) * 100}%`, background: "#00C5B3" }}>M</div>
                        <div className="h-full rounded-r flex items-center justify-start pl-1 text-xs text-white font-bold" style={{ width: `${(fSalary / 120000) * 100}%`, background: "#FF5000" }}>F</div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>${mSalary.toLocaleString()}</span>
                        <span>${fSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Salary Band Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Band Distribution</CardTitle>
                <CardDescription>Employee count across salary ranges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { band: "< $40K", count: 89, pct: 7, color: "#94a3b8" },
                  { band: "$40K – $60K", count: 237, pct: 19, color: "#0ea5e9" },
                  { band: "$60K – $80K", count: 374, pct: 30, color: "#00C5B3" },
                  { band: "$80K – $100K", count: 299, pct: 24, color: "#8b5cf6" },
                  { band: "$100K – $130K", count: 162, pct: 13, color: "#f59e0b" },
                  { band: "$130K+", count: 86, pct: 7, color: "#FF5000" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: b.color }} />
                    <span className="text-sm w-28 shrink-0">{b.band}</span>
                    <Bar value={b.pct} max={100} color={b.color} />
                    <span className="text-sm font-bold w-8 text-right">{b.pct}%</span>
                    <span className="text-xs text-slate-400 w-10 text-right">{b.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Comp Ratio by Dept */}
            <Card>
              <CardHeader>
                <CardTitle>Compensation Ratio by Department</CardTitle>
                <CardDescription>Actual pay vs salary band midpoint (1.0 = at midpoint)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { dept: "Legal", ratio: 1.08, status: "Above" },
                  { dept: "Engineering", ratio: 1.04, status: "Above" },
                  { dept: "IT", ratio: 1.01, status: "At midpoint" },
                  { dept: "Finance", ratio: 0.98, status: "Slightly below" },
                  { dept: "Marketing", ratio: 0.96, status: "Slightly below" },
                  { dept: "HR", ratio: 0.94, status: "Below" },
                  { dept: "Sales", ratio: 0.92, status: "Below" },
                  { dept: "Operations", ratio: 0.89, status: "Below" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24 shrink-0">{c.dept}</span>
                    <div className="flex-1 relative h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-slate-300 z-10" />
                      <div className={`h-full rounded-full ${c.ratio >= 1 ? "ml-auto" : ""}`}
                        style={{
                          width: `${Math.min(Math.abs(c.ratio - 1) * 200, 50)}%`,
                          marginLeft: c.ratio >= 1 ? "50%" : `${50 - Math.abs(c.ratio - 1) * 200}%`,
                          background: c.ratio >= 1.0 ? "#00C5B3" : c.ratio >= 0.95 ? "#f59e0b" : "#FF5000"
                        }} />
                    </div>
                    <span className={`text-sm font-bold w-10 text-right ${c.ratio >= 1 ? "text-teal-600" : c.ratio >= 0.95 ? "text-amber-600" : "text-red-500"}`}>{c.ratio}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits Cost */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits Cost Breakdown</CardTitle>
                <CardDescription>Annual benefits spend per category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { benefit: "Health Insurance", annual: 4850000, perEE: 3890, pct: 47 },
                  { benefit: "Pension / Retirement", annual: 2450000, perEE: 1965, pct: 24 },
                  { benefit: "Life & Disability", annual: 980000, perEE: 786, pct: 10 },
                  { benefit: "Dental & Vision", annual: 740000, perEE: 593, pct: 7 },
                  { benefit: "Wellness Programs", annual: 620000, perEE: 497, pct: 6 },
                  { benefit: "Other Benefits", annual: 610000, perEE: 489, pct: 6 },
                ].map((b, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{b.benefit}</span>
                      <span className="text-slate-400">${b.perEE.toLocaleString()}/EE · {b.pct}%</span>
                    </div>
                    <Progress value={b.pct} className="h-2" />
                  </div>
                ))}
                <div className="pt-3 border-t text-sm text-slate-500">
                  Total annual benefits spend: <span className="font-bold text-slate-700 dark:text-slate-200">$10.25M</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 5 – DEPARTMENTS
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Department Analytics</CardTitle>
                  <CardDescription>Comprehensive metrics across all departments</CardDescription>
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departmentData.map((d) => (
                      <SelectItem key={d.name} value={d.name.toLowerCase()}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {departmentData.map((dept, i) => (
                  <div key={i} className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">{dept.name}</h3>
                          <p className="text-sm text-slate-400">{dept.employees} employees</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{dept.satisfaction}/5 satisfaction</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <div><p className="text-slate-400 text-xs">Avg Salary</p><p className="font-bold">${dept.avgSalary.toLocaleString()}</p></div>
                      <div><p className="text-slate-400 text-xs">Turnover</p><p className={`font-bold ${dept.turnover > 10 ? "text-red-500" : "text-green-600"}`}>{dept.turnover}%</p></div>
                      <div><p className="text-slate-400 text-xs">Avg Tenure</p><p className="font-bold">{dept.avgTenure} yrs</p></div>
                      <div><p className="text-slate-400 text-xs">Female %</p><p className="font-bold">{dept.femaleRatio}%</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 6 – RECRUITMENT
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="recruitment" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Recruitment Funnel</CardTitle><CardDescription>Monthly pipeline – last 6 months</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { month: "Apr", applications: 312, interviews: 124, hires: 31 },
                  { month: "Mar", applications: 289, interviews: 115, hires: 29 },
                  { month: "Feb", applications: 356, interviews: 142, hires: 38 },
                  { month: "Jan", applications: 278, interviews: 98, hires: 26 },
                  { month: "Dec", applications: 198, interviews: 76, hires: 19 },
                  { month: "Nov", applications: 245, interviews: 89, hires: 23 },
                ].map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm"><span className="font-medium">{d.month} 2024</span><span className="text-slate-400">{d.hires} hires / {d.applications} apps</span></div>
                    <div className="flex gap-0.5 h-3">
                      <div className="rounded-l-full flex-shrink-0" style={{ width: "100%", background: "#e2e8f0", position: "relative" }}>
                        <div className="absolute inset-y-0 left-0 rounded-l-full" style={{ width: `${(d.interviews / d.applications) * 100}%`, background: "#0ea5e9" }} />
                        <div className="absolute inset-y-0 left-0 rounded-l-full" style={{ width: `${(d.hires / d.applications) * 100}%`, background: "#00C5B3" }} />
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-400">
                      <span>Apps: {d.applications}</span>
                      <span className="text-blue-500">Interviews: {d.interviews}</span>
                      <span className="text-teal-600 font-medium">Hires: {d.hires}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Hiring Metrics</CardTitle><CardDescription>Key recruitment performance indicators</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <p className="text-4xl font-bold" style={{ color: "#00C5B3" }}>8.7%</p>
                  <p className="text-sm text-slate-500 mt-1">Overall application-to-hire rate</p>
                </div>
                <div className="space-y-3">
                  {[
                    { stage: "Application → Screening", rate: 45, time: "2 days" },
                    { stage: "Screening → Interview", rate: 35, time: "5 days" },
                    { stage: "Interview → Offer", rate: 65, time: "8 days" },
                    { stage: "Offer → Accept", rate: 85, time: "3 days" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs flex-1">{s.stage}</span>
                      <Progress value={s.rate} className="w-20 h-2" />
                      <span className="text-xs font-bold w-8">{s.rate}%</span>
                      <Badge variant="outline" className="text-xs">{s.time}</Badge>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-center">
                    <p className="text-xl font-bold text-teal-700">18 days</p>
                    <p className="text-xs text-slate-500">Time to hire</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-center">
                    <p className="text-xl font-bold text-orange-600">$4,200</p>
                    <p className="text-xs text-slate-500">Cost per hire</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 7 – PERFORMANCE
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Performance Distribution</CardTitle><CardDescription>Rating breakdown across all employees</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { cat: "Exceptional (5)", count: 112, pct: 9, color: "#00C5B3" },
                  { cat: "Exceeds Expectations (4)", count: 274, pct: 22, color: "#0ea5e9" },
                  { cat: "Meets Expectations (3)", count: 723, pct: 58, color: "#8b5cf6" },
                  { cat: "Below Expectations (2)", count: 100, pct: 8, color: "#f59e0b" },
                  { cat: "Unsatisfactory (1)", count: 38, pct: 3, color: "#FF5000" },
                ].map((p, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{p.cat}</span>
                      <span className="text-slate-400">{p.count} ({p.pct}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Performance vs Tenure</CardTitle><CardDescription>Average performance score by tenure band</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { band: "< 1 year", score: 3.2, employees: 187 },
                  { band: "1–3 years", score: 3.6, employees: 374 },
                  { band: "3–5 years", score: 4.0, employees: 311 },
                  { band: "5–10 years", score: 4.3, employees: 249 },
                  { band: "10+ years", score: 4.5, employees: 126 },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm w-24 shrink-0">{t.band}</span>
                    <Bar value={t.score} max={5} />
                    <span className="text-sm font-bold w-8 text-right" style={{ color: "#00C5B3" }}>{t.score}</span>
                  </div>
                ))}
                <p className="text-xs text-slate-400 pt-2 border-t">Insight: Performance scores improve significantly with tenure, suggesting experience is a strong predictor of output.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Goal Achievement Rate by Department</CardTitle><CardDescription>% of employees who fully met their OKR/goal targets this cycle</CardDescription></CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {departmentData.map((dept, i) => {
                  const goalRate = Math.round(60 + Math.random() * 35)
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-28 shrink-0">{dept.name}</span>
                      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${goalRate}%`, background: goalRate >= 80 ? "#00C5B3" : goalRate >= 65 ? "#f59e0b" : "#FF5000" }}>
                          <span className="text-xs font-bold text-white">{goalRate}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════════
            TAB 8 – TRAINING & L&D
        ════════════════════════════════════════════════════════════════ */}
        <TabsContent value="training" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Training Hours / EE", value: "42 hrs", sub: "avg this year" },
              { label: "Completion Rate", value: "89%", sub: "+4% YoY" },
              { label: "L&D Spend / EE", value: "$1,240", sub: "annual average" },
            ].map((k, i) => (
              <Card key={i} className="border-0 shadow-md bg-slate-50 dark:bg-slate-800/50">
                <CardContent className="pt-4 pb-4 px-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{k.label}</p>
                  <p className="text-2xl font-bold" style={{ color: "#00C5B3" }}>{k.value}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{k.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle>Training Program Analytics</CardTitle><CardDescription>Enrollment, completion, and impact across all L&D programs</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {[
                { program: "Leadership Development", enrolled: 89, completed: 76, completion: 85, hours: 40 },
                { program: "Technical Skills Bootcamp", enrolled: 156, completed: 142, completion: 91, hours: 60 },
                { program: "Mandatory Safety Training", enrolled: 234, completed: 228, completion: 97, hours: 8 },
                { program: "Compliance & Ethics", enrolled: 312, completed: 298, completion: 95, hours: 4 },
                { program: "DEI & Inclusion Workshop", enrolled: 198, completed: 167, completion: 84, hours: 6 },
                { program: "Data Literacy Programme", enrolled: 112, completed: 89, completion: 79, hours: 20 },
                { program: "Management Essentials", enrolled: 67, completed: 54, completion: 81, hours: 32 },
              ].map((t, i) => (
                <div key={i} className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">{t.program}</span>
                    </div>
                    <Badge className={`${t.completion >= 90 ? "bg-green-100 text-green-800" : t.completion >= 80 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"} hover:bg-inherit`}>
                      {t.completion}% done
                    </Badge>
                  </div>
                  <Progress value={t.completion} className="h-2 mb-2" />
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span>Enrolled: <span className="font-medium text-slate-600 dark:text-slate-300">{t.enrolled}</span></span>
                    <span>Completed: <span className="font-medium text-slate-600 dark:text-slate-300">{t.completed}</span></span>
                    <span>Avg hours: <span className="font-medium text-slate-600 dark:text-slate-300">{t.hours} hrs</span></span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ════ TAB: SCHEDULED REPORTS ═══════════════════════════════════ */}
        <TabsContent value="scheduled" className="space-y-6">

          {/* KPI Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Schedules",     value: String(schedules.length),                                         icon: Calendar,      color: "text-teal-600"   },
              { label: "Active",              value: String(schedules.filter(s => s.enabled).length),                  icon: CheckCircle,   color: "text-green-600"  },
              { label: "Total Deliveries",    value: String(schedules.reduce((a, s) => a + s.sentCount, 0)),           icon: Send,          color: "text-blue-600"   },
              { label: "Pending / Failed",    value: String(schedules.filter(s => s.lastStatus !== "Success").length), icon: AlertTriangle, color: "text-orange-500" },
            ].map((k, i) => (
              <Card key={i} className="border-0 shadow-md bg-slate-50 dark:bg-slate-800/50">
                <CardContent className="pt-4 pb-4 px-4 flex items-center gap-3">
                  <k.icon className={`w-8 h-8 ${k.color} shrink-0`} />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{k.label}</p>
                    <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Header + New Schedule button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Report Schedules</h2>
              <p className="text-sm text-slate-400">Automate HR report delivery to stakeholders on a recurring schedule.</p>
            </div>
            <Button
              onClick={() => { setEditId(null); setForm({ ...emptyForm }); setShowForm(v => !v) }}
              className="text-white"
              style={{ background: showForm && editId === null ? "#FF5000" : "#00C5B3" }}
            >
              {showForm && editId === null ? <><X className="w-4 h-4 mr-2" />Cancel</> : <><Plus className="w-4 h-4 mr-2" />New Schedule</>}
            </Button>
          </div>

          {/* Create / Edit Form */}
          {showForm && (
            <Card className="border-2" style={{ borderColor: "#00C5B3" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base" style={{ color: "#00C5B3" }}>
                  {editId !== null ? "Edit Schedule" : "Create New Report Schedule"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Report Name *</Label>
                    <Input placeholder="e.g. Monthly Headcount Summary" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Report Type *</Label>
                    <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{reportTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Delivery Format *</Label>
                    <Select value={form.format} onValueChange={v => setForm(f => ({ ...f, format: v as ReportFormat }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{(["PDF","Excel","CSV","Email Summary"] as ReportFormat[]).map(fmt => <SelectItem key={fmt} value={fmt}>{fmt}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Frequency *</Label>
                    <Select value={form.frequency} onValueChange={v => setForm(f => ({ ...f, frequency: v as ReportFreq }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{(["Daily","Weekly","Monthly","Quarterly"] as ReportFreq[]).map(fr => <SelectItem key={fr} value={fr}>{fr}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Send Time *</Label>
                    <Input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
                  </div>
                  {form.frequency === "Weekly" && (
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Day of Week</Label>
                      <Select value={form.dayOfWeek} onValueChange={v => setForm(f => ({ ...f, dayOfWeek: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                  {(form.frequency === "Monthly" || form.frequency === "Quarterly") && (
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Day of Month</Label>
                      <Select value={form.dayOfMonth} onValueChange={v => setForm(f => ({ ...f, dayOfMonth: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{Array.from({ length: 28 }, (_, i) => String(i + 1)).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recipients (comma-separated) *</Label>
                    <Input placeholder="ceo@valu.com, hr@valu.com" value={form.recipients} onChange={e => setForm(f => ({ ...f, recipients: e.target.value }))} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.enabled} onCheckedChange={v => setForm(f => ({ ...f, enabled: v }))} />
                    <Label className="text-sm">{form.enabled ? "Enabled — will run automatically" : "Paused"}</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null) }}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!form.name || !form.recipients} className="text-white" style={{ background: "#00C5B3" }}>
                      <Send className="w-4 h-4 mr-2" />{editId !== null ? "Save Changes" : "Create Schedule"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Schedule list */}
          <div className="space-y-3">
            {schedules.map((r) => {
              const statusCls = r.lastStatus === "Success" ? "bg-green-100 text-green-700" : r.lastStatus === "Failed" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
              const fmtCls    = r.format === "PDF" ? "bg-red-50 text-red-700" : r.format === "Excel" ? "bg-green-50 text-green-700" : r.format === "CSV" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
              return (
                <Card key={r.id} className={`border shadow-sm transition-all duration-200 ${!r.enabled ? "opacity-60" : "hover:shadow-md"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl shrink-0" style={{ background: r.enabled ? "rgba(0,197,179,0.1)" : "#f1f5f9" }}>
                        <Send className="w-5 h-5" style={{ color: r.enabled ? "#00C5B3" : "#94a3b8" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{r.name}</h3>
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-xs">{r.type}</Badge>
                          <Badge className={`${fmtCls} hover:bg-inherit text-xs`}>{r.format}</Badge>
                          {!r.enabled && <Badge variant="outline" className="text-xs text-slate-400">Paused</Badge>}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {r.frequency}{r.frequency === "Weekly" ? ` · ${r.dayOfWeek}` : r.frequency === "Monthly" ? ` · Day ${r.dayOfMonth}` : ""} at {r.time}
                          </span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{r.recipients.split(",").length} recipient{r.recipients.split(",").length > 1 ? "s" : ""}</span>
                          <span className="flex items-center gap-1"><Send className="w-3 h-3" />{r.sentCount} total sent</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs">
                          <span className="text-slate-400">Last: <span className="text-slate-600 dark:text-slate-300 font-medium">{r.lastSent}</span></span>
                          <Badge className={`${statusCls} text-xs px-1.5 py-0 hover:bg-inherit`}>{r.lastStatus}</Badge>
                          {r.enabled && <span className="text-slate-400">Next: <span className="font-semibold" style={{ color: "#00C5B3" }}>{r.nextRun}</span></span>}
                        </div>
                        <p className="text-xs text-slate-300 dark:text-slate-500 mt-1 truncate">{r.recipients}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Switch checked={r.enabled} onCheckedChange={() => handleToggle(r.id)} />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50" onClick={() => handleEdit(r)}>
                          <Edit3 className="w-4 h-4 text-blue-500" />
                        </Button>
                        {deleteConfirm === r.id ? (
                          <div className="flex items-center gap-1">
                            <Button size="sm" className="h-7 text-xs bg-red-500 hover:bg-red-600 text-white px-2" onClick={() => handleDelete(r.id)}>Delete</Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => setDeleteConfirm(null)}>No</Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50" onClick={() => setDeleteConfirm(r.id)}>
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Delivery History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary" />Delivery History</CardTitle>
              <CardDescription>Last 8 report deliveries across all schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { report: "Daily Attendance Digest",  time: "Today 09:00",      status: "Success", rcpt: 14, fmt: "Email Summary" },
                  { report: "Weekly Headcount Summary", time: "Mon 15 Apr 08:00", status: "Success", rcpt: 2,  fmt: "PDF" },
                  { report: "Training Completion Rate", time: "15 Apr 10:00",     status: "Pending", rcpt: 1,  fmt: "CSV" },
                  { report: "Turnover & Attrition",     time: "5 Apr 08:30",      status: "Success", rcpt: 2,  fmt: "PDF" },
                  { report: "Monthly Payroll Report",   time: "1 Apr 07:00",      status: "Success", rcpt: 2,  fmt: "Excel" },
                  { report: "Recruitment Funnel",       time: "5 Apr 17:00",      status: "Failed",  rcpt: 1,  fmt: "Excel" },
                  { report: "Weekly Headcount Summary", time: "Mon 8 Apr 08:00",  status: "Success", rcpt: 2,  fmt: "PDF" },
                  { report: "Performance Score Digest", time: "1 Jan 09:00",      status: "Success", rcpt: 3,  fmt: "PDF" },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${h.status === "Success" ? "bg-green-500" : h.status === "Failed" ? "bg-red-500" : "bg-amber-400"}`} />
                    <span className="text-sm font-medium flex-1 truncate">{h.report}</span>
                    <span className="text-xs text-slate-400 shrink-0 hidden sm:block">{h.time}</span>
                    <Badge variant="outline" className="text-xs shrink-0">{h.fmt}</Badge>
                    <span className="text-xs text-slate-400 shrink-0">{h.rcpt} rcpt</span>
                    <Badge className={`text-xs shrink-0 hover:bg-inherit ${h.status === "Success" ? "bg-green-100 text-green-700" : h.status === "Failed" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"}`}>{h.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}