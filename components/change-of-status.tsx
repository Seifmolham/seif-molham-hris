"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  ArrowRightLeft,
  DollarSign,
  GraduationCap,
  UserCheck,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Activity,
  BarChart3,
  Users,
  Calendar,
} from "lucide-react"

type ChangeType =
  | "Promotion"
  | "Transfer"
  | "Salary Change"
  | "Grade Change"
  | "Manager Requested Promotion"
  | "Manager Requested Salary Adjustment"

interface StatusChange {
  id: string
  employee: string
  employeeTitle: string
  department: string
  changeType: ChangeType
  effectiveDate: string
  requestedBy: string
  requestedByTitle: string
  status: "Completed" | "Pending Approval" | "Rejected"
  details: {
    from: string
    to: string
    reason: string
    notes?: string
  }
  approvedBy?: string
  approvedDate?: string
  timestamp: string
}

const statusChanges: StatusChange[] = [
  {
    id: "1",
    employee: "Ahmed Hassan",
    employeeTitle: "Senior Software Engineer → Principal Engineer",
    department: "Technology",
    changeType: "Promotion",
    effectiveDate: "2026-04-01",
    requestedBy: "Sara Ahmed",
    requestedByTitle: "Engineering Manager",
    status: "Completed",
    details: {
      from: "Senior Software Engineer (L5)",
      to: "Principal Engineer (L6)",
      reason: "Exceptional performance over 3 review cycles, led migration of API platform v2",
      notes: "Salary increased from EGP 42,000 to EGP 55,000/month",
    },
    approvedBy: "Mohamed Ali (Head of People)",
    approvedDate: "2026-03-15",
    timestamp: "2026-04-01",
  },
  {
    id: "2",
    employee: "Nour Hassan",
    employeeTitle: "Marketing Manager",
    department: "Marketing",
    changeType: "Salary Change",
    effectiveDate: "2026-04-01",
    requestedBy: "Layla Ibrahim",
    requestedByTitle: "Marketing Director",
    status: "Completed",
    details: {
      from: "EGP 28,000 / month",
      to: "EGP 34,000 / month",
      reason: "Annual merit increase — 40% engagement uplift on Q1 campaign exceeded targets",
    },
    approvedBy: "Mohamed Ali (Head of People)",
    approvedDate: "2026-03-20",
    timestamp: "2026-04-01",
  },
  {
    id: "3",
    employee: "Tarek Sayed",
    employeeTitle: "Data Engineer",
    department: "Technology",
    changeType: "Transfer",
    effectiveDate: "2026-04-15",
    requestedBy: "HR Team",
    requestedByTitle: "Human Resources",
    status: "Pending Approval",
    details: {
      from: "Technology — Backend Squad",
      to: "Technology — Data & AI Squad",
      reason: "Team restructuring — new Data & AI squad requires experienced pipeline engineers",
    },
    timestamp: "2026-04-10",
  },
  {
    id: "4",
    employee: "Rania Abdel",
    employeeTitle: "Marketing Manager",
    department: "Marketing",
    changeType: "Grade Change",
    effectiveDate: "2026-03-01",
    requestedBy: "Layla Ibrahim",
    requestedByTitle: "Marketing Director",
    status: "Completed",
    details: {
      from: "Grade 4 — Associate Manager",
      to: "Grade 5 — Manager",
      reason: "Role re-leveling after 6-month probation period — consistently exceeded expectations",
    },
    approvedBy: "Mohamed Ali (Head of People)",
    approvedDate: "2026-02-20",
    timestamp: "2026-03-01",
  },
  {
    id: "5",
    employee: "Omar Farouk",
    employeeTitle: "Finance Analyst",
    department: "Finance",
    changeType: "Manager Requested Promotion",
    effectiveDate: "2026-05-01",
    requestedBy: "Khaled Mostafa",
    requestedByTitle: "Finance Manager",
    status: "Pending Approval",
    details: {
      from: "Finance Analyst (L3)",
      to: "Senior Finance Analyst (L4)",
      reason: "Omar's budget analysis for Q1 flagged discrepancy saving $40K. Ready for next level.",
      notes: "Manager recommends salary band: EGP 22,000–26,000/month",
    },
    timestamp: "2026-04-12",
  },
  {
    id: "6",
    employee: "Yasmine Samir",
    employeeTitle: "Data Engineer",
    department: "Technology",
    changeType: "Manager Requested Salary Adjustment",
    effectiveDate: "2026-04-01",
    requestedBy: "Sara Ahmed",
    requestedByTitle: "Engineering Manager",
    status: "Completed",
    details: {
      from: "EGP 24,000 / month",
      to: "EGP 30,000 / month",
      reason: "Market correction — external benchmark shows 25% gap vs peers. Retention risk.",
    },
    approvedBy: "Mohamed Ali (Head of People)",
    approvedDate: "2026-03-18",
    timestamp: "2026-04-01",
  },
  {
    id: "7",
    employee: "Dina Mostafa",
    employeeTitle: "HR Coordinator",
    department: "Human Resources",
    changeType: "Transfer",
    effectiveDate: "2026-02-01",
    requestedBy: "Mohamed Ali",
    requestedByTitle: "Head of People",
    status: "Completed",
    details: {
      from: "Operations — Admin Support",
      to: "Human Resources — HR Coordination",
      reason: "Internal mobility program — Dina applied and was selected for HR Coordinator role",
    },
    approvedBy: "Mohamed Ali (Head of People)",
    approvedDate: "2026-01-25",
    timestamp: "2026-02-01",
  },
  {
    id: "8",
    employee: "Khaled Mostafa",
    employeeTitle: "Finance Manager",
    department: "Finance",
    changeType: "Manager Requested Salary Adjustment",
    effectiveDate: "2026-05-01",
    requestedBy: "Ahmed Hassan (CEO)",
    requestedByTitle: "Chief Executive Officer",
    status: "Pending Approval",
    details: {
      from: "EGP 38,000 / month",
      to: "EGP 44,000 / month",
      reason: "Exceptional contribution to Series B financial modeling and due diligence process",
    },
    timestamp: "2026-04-15",
  },
]

const changeTypeConfig: Record<ChangeType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  Promotion: { icon: TrendingUp, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", label: "Promotion" },
  Transfer: { icon: ArrowRightLeft, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", label: "Transfer" },
  "Salary Change": { icon: DollarSign, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", label: "Salary Change" },
  "Grade Change": { icon: GraduationCap, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", label: "Grade Change" },
  "Manager Requested Promotion": { icon: UserCheck, color: "text-teal-600", bg: "bg-teal-100 dark:bg-teal-900/30", label: "Mgr: Promotion Request" },
  "Manager Requested Salary Adjustment": { icon: DollarSign, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/30", label: "Mgr: Salary Request" },
}

const statusConfig = {
  Completed: { color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  "Pending Approval": { color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", icon: Clock },
  Rejected: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
}

const MONTHS = [
  { label: "January", value: "1" }, { label: "February", value: "2" },
  { label: "March", value: "3" }, { label: "April", value: "4" },
  { label: "May", value: "5" }, { label: "June", value: "6" },
  { label: "July", value: "7" }, { label: "August", value: "8" },
  { label: "September", value: "9" }, { label: "October", value: "10" },
  { label: "November", value: "11" }, { label: "December", value: "12" },
]
const YEARS = Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => String(2020 + i))

function isWithinCustomRange(
  dateStr: string,
  fromMonth: string, fromYear: string,
  toMonth: string, toYear: string
): boolean {
  const d = new Date(dateStr)
  const dVal = d.getFullYear() * 12 + d.getMonth() + 1 // 1-indexed month
  if (fromYear && fromMonth) {
    const fromVal = Number(fromYear) * 12 + Number(fromMonth)
    if (dVal < fromVal) return false
  }
  if (toYear && toMonth) {
    const toVal = Number(toYear) * 12 + Number(toMonth)
    if (dVal > toVal) return false
  }
  return true
}

export function ChangeOfStatus() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [fromMonth, setFromMonth] = useState("")
  const [fromYear, setFromYear] = useState("")
  const [toMonth, setToMonth] = useState("")
  const [toYear, setToYear] = useState("")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("history")

  const hasDateFilter = !!(fromMonth && fromYear) || !!(toMonth && toYear)

  const clearDateFilter = () => {
    setFromMonth(""); setFromYear(""); setToMonth(""); setToYear("")
  }

  const filtered = statusChanges.filter((c) => {
    const matchSearch =
      c.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = typeFilter === "All" || c.changeType === typeFilter
    const matchStatus = statusFilter === "All" || c.status === statusFilter
    const matchPeriod = isWithinCustomRange(c.effectiveDate, fromMonth, fromYear, toMonth, toYear)
    return matchSearch && matchType && matchStatus && matchPeriod
  })

  const stats = {
    total: statusChanges.length,
    pending: statusChanges.filter((c) => c.status === "Pending Approval").length,
    completed: statusChanges.filter((c) => c.status === "Completed").length,
    promotions: statusChanges.filter((c) => c.changeType === "Promotion" || c.changeType === "Manager Requested Promotion").length,
    salaryChanges: statusChanges.filter((c) => c.changeType === "Salary Change" || c.changeType === "Manager Requested Salary Adjustment").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)" }}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Activity className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Status Changes</h1>
              <p className="text-indigo-200 text-lg">Track all employee changes — promotions, transfers, salary, and grade updates</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {[
              { label: "Total Changes", value: stats.total, icon: Activity },
              { label: "Pending Approval", value: stats.pending, icon: Clock },
              { label: "Completed", value: stats.completed, icon: CheckCircle },
              { label: "Promotions", value: stats.promotions, icon: TrendingUp },
              { label: "Salary Changes", value: stats.salaryChanges, icon: DollarSign },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-indigo-200" />
                  <span className="text-indigo-200 text-xs">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            <Activity className="h-4 w-4 mr-2" />Change History
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            <Clock className="h-4 w-4 mr-2" />Pending Approval
            {stats.pending > 0 && (
              <Badge className="ml-2 bg-orange-500 text-white text-xs h-5 px-1.5">{stats.pending}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />Analytics
          </TabsTrigger>
        </TabsList>

        {/* ── Change History Tab ── */}
        <TabsContent value="history" className="space-y-4 mt-4">
          {/* Filters */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by employee, department, or requester..."
                    className="pl-9 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-52 rounded-xl">
                    <Filter className="h-4 w-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Change Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Promotion">Promotion</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="Salary Change">Salary Change</SelectItem>
                    <SelectItem value="Grade Change">Grade Change</SelectItem>
                    <SelectItem value="Manager Requested Promotion">Mgr: Promotion Request</SelectItem>
                    <SelectItem value="Manager Requested Salary Adjustment">Mgr: Salary Request</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-44 rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                {/* Custom date range picker */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-500 font-medium">From</span>
                  <Select value={fromMonth} onValueChange={setFromMonth}>
                    <SelectTrigger className="w-32 rounded-xl h-9 text-sm">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={fromYear} onValueChange={setFromYear}>
                    <SelectTrigger className="w-24 rounded-xl h-9 text-sm">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <span className="text-slate-400 text-sm">→</span>
                  <span className="text-xs text-slate-500 font-medium">To</span>
                  <Select value={toMonth} onValueChange={setToMonth}>
                    <SelectTrigger className="w-32 rounded-xl h-9 text-sm">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={toYear} onValueChange={setToYear}>
                    <SelectTrigger className="w-24 rounded-xl h-9 text-sm">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {hasDateFilter && (
                    <button
                      onClick={clearDateFilter}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />Clear
                    </button>
                  )}
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-2">
                  <Download className="h-4 w-4" />Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-8"></TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Employee</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Change Type</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">From → To</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Requested By</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Effective Date</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((change) => {
                  const typeConf = changeTypeConfig[change.changeType]
                  const statusConf = statusConfig[change.status]
                  const StatusIcon = statusConf.icon
                  const TypeIcon = typeConf.icon
                  const isExpanded = expandedRow === change.id

                  return (
                    <>
                      <TableRow
                        key={change.id}
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        onClick={() => setExpandedRow(isExpanded ? null : change.id)}
                      >
                        <TableCell className="py-3">
                          {isExpanded
                            ? <ChevronDown className="h-4 w-4 text-slate-400" />
                            : <ChevronRight className="h-4 w-4 text-slate-400" />
                          }
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-xs">
                                {change.employee.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{change.employee}</p>
                              <p className="text-xs text-slate-500">{change.department}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${typeConf.bg} ${typeConf.color}`}>
                            <TypeIcon className="h-3.5 w-3.5" />
                            {typeConf.label}
                          </div>
                        </TableCell>
                        <TableCell className="py-3 max-w-[220px]">
                          <p className="text-xs text-slate-500 truncate">{change.details.from}</p>
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{change.details.to}</p>
                        </TableCell>
                        <TableCell className="py-3">
                          <p className="text-sm font-medium">{change.requestedBy}</p>
                          <p className="text-xs text-slate-500">{change.requestedByTitle}</p>
                        </TableCell>
                        <TableCell className="py-3">
                          <p className="text-sm">{new Date(change.effectiveDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConf.color}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {change.status}
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* Expanded details row */}
                      {isExpanded && (
                        <TableRow key={`${change.id}-details`} className="bg-indigo-50/50 dark:bg-indigo-900/10">
                          <TableCell colSpan={7} className="py-4 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2 space-y-3">
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Reason for Change</p>
                                  <p className="text-sm text-slate-700 dark:text-slate-300">{change.details.reason}</p>
                                </div>
                                {change.details.notes && (
                                  <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Additional Notes</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">{change.details.notes}</p>
                                  </div>
                                )}
                                <div className="flex gap-6">
                                  <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">From</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{change.details.from}</p>
                                  </div>
                                  <div className="flex items-center text-slate-400">→</div>
                                  <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">To</p>
                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{change.details.to}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                {change.approvedBy && (
                                  <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Approved By</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">{change.approvedBy}</p>
                                    {change.approvedDate && (
                                      <p className="text-xs text-slate-400">{new Date(change.approvedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                    )}
                                  </div>
                                )}
                                {change.status === "Pending Approval" && (
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-xl gap-1.5">
                                      <CheckCircle className="h-3.5 w-3.5" />Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl">
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ── Pending Approval Tab ── */}
        <TabsContent value="pending" className="space-y-4 mt-4">
          {statusChanges.filter((c) => c.status === "Pending Approval").map((change) => {
            const typeConf = changeTypeConfig[change.changeType]
            const TypeIcon = typeConf.icon
            return (
              <Card key={change.id} className="rounded-2xl border-orange-200 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-900/10">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-11 w-11 shrink-0">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                          {change.employee.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{change.employee}</span>
                          <span className="text-slate-400 text-sm">•</span>
                          <span className="text-sm text-slate-500">{change.department}</span>
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium ${typeConf.bg} ${typeConf.color}`}>
                            <TypeIcon className="h-3 w-3" />
                            {typeConf.label}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-slate-400">{change.details.from}</span>
                          {" → "}
                          <span className="font-medium text-slate-800 dark:text-slate-200">{change.details.to}</span>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{change.details.reason}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span>Requested by <strong className="text-slate-600 dark:text-slate-300">{change.requestedBy}</strong></span>
                          <span>•</span>
                          <span>Effective {new Date(change.effectiveDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          <span>•</span>
                          <span>Submitted {change.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-xl gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5" />Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20 rounded-xl">
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* ── Analytics Tab ── */}
        <TabsContent value="analytics" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* By Type */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-indigo-500" />Changes by Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(Object.entries(changeTypeConfig) as [ChangeType, typeof changeTypeConfig[ChangeType]][]).map(([type, conf]) => {
                  const count = statusChanges.filter((c) => c.changeType === type).length
                  const pct = Math.round((count / statusChanges.length) * 100)
                  const TypeIcon = conf.icon
                  return (
                    <div key={type} className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${conf.bg}`}>
                        <TypeIcon className={`h-3.5 w-3.5 ${conf.color}`} />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-48 truncate">{conf.label}</span>
                      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-6 text-right">{count}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* By Department */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-500" />By Department
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Technology", "Marketing", "Finance", "Human Resources"].map((dept) => {
                  const count = statusChanges.filter((c) => c.department === dept).length
                  return (
                    <div key={dept} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{dept}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-indigo-400"
                            style={{ width: `${(count / statusChanges.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-4 text-right">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
