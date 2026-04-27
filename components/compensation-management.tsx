"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  TrendingUp,
  Award,
  BarChart3,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  Edit,
  Download,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react"

interface SalaryBand {
  id: string
  title: string
  level: string
  department: string
  min: number
  mid: number
  max: number
  currentHeadcount: number
}

interface EquityGrant {
  id: string
  employee: string
  department: string
  grantType: "Options" | "RSU" | "ESOP"
  shares: number
  grantDate: string
  vestingSchedule: string
  status: "Vesting" | "Fully Vested" | "Expired"
  currentValue: number
}

interface CompReviewCycle {
  id: string
  name: string
  status: "Planning" | "In Progress" | "Completed"
  deadline: string
  coverage: number
  avgIncrease: number
  budget: number
  utilized: number
}

const salaryBands: SalaryBand[] = [
  { id: "1", title: "Software Engineer I", level: "L3", department: "Technology", min: 12000, mid: 16000, max: 20000, currentHeadcount: 18 },
  { id: "2", title: "Software Engineer II", level: "L4", department: "Technology", min: 18000, mid: 23000, max: 28000, currentHeadcount: 12 },
  { id: "3", title: "Senior Software Engineer", level: "L5", department: "Technology", min: 25000, mid: 32000, max: 40000, currentHeadcount: 8 },
  { id: "4", title: "HR Specialist", level: "L2", department: "Human Resources", min: 8000, mid: 11000, max: 14000, currentHeadcount: 5 },
  { id: "5", title: "HR Manager", level: "L4", department: "Human Resources", min: 15000, mid: 20000, max: 26000, currentHeadcount: 3 },
  { id: "6", title: "Marketing Analyst", level: "L2", department: "Marketing", min: 9000, mid: 12000, max: 16000, currentHeadcount: 6 },
  { id: "7", title: "Marketing Manager", level: "L4", department: "Marketing", min: 18000, mid: 24000, max: 32000, currentHeadcount: 2 },
]

const equityGrants: EquityGrant[] = [
  { id: "1", employee: "Ahmed Hassan", department: "Technology", grantType: "RSU", shares: 5000, grantDate: "2022-01-01", vestingSchedule: "4yr / 1yr cliff", status: "Vesting", currentValue: 125000 },
  { id: "2", employee: "Sara Ahmed", department: "Technology", grantType: "Options", shares: 10000, grantDate: "2021-06-01", vestingSchedule: "4yr / 1yr cliff", status: "Vesting", currentValue: 180000 },
  { id: "3", employee: "Omar Farouk", department: "Finance", grantType: "ESOP", shares: 2500, grantDate: "2023-01-01", vestingSchedule: "3yr linear", status: "Vesting", currentValue: 45000 },
  { id: "4", employee: "Nour Hassan", department: "Marketing", grantType: "RSU", shares: 3000, grantDate: "2020-03-01", vestingSchedule: "4yr / 1yr cliff", status: "Fully Vested", currentValue: 90000 },
]

const reviewCycles: CompReviewCycle[] = [
  { id: "1", name: "2024 Annual Review", status: "In Progress", deadline: "2024-03-31", coverage: 68, avgIncrease: 8.2, budget: 2400000, utilized: 1632000 },
  { id: "2", name: "2023 Annual Review", status: "Completed", deadline: "2023-03-31", coverage: 100, avgIncrease: 7.5, budget: 2100000, utilized: 2100000 },
  { id: "3", name: "2024 Mid-Year Review", status: "Planning", deadline: "2024-09-30", coverage: 0, avgIncrease: 0, budget: 1200000, utilized: 0 },
]

const employeeComp = [
  { name: "Ahmed Hassan", title: "Senior Software Engineer", base: 38000, bonus: 5700, equity: 125000, total: 168700, status: "Above Mid", band: "L5" },
  { name: "Sara Ahmed", title: "Software Engineer II", base: 22000, bonus: 2640, equity: 45000, total: 69640, status: "At Mid", band: "L4" },
  { name: "Omar Farouk", title: "HR Manager", base: 19500, bonus: 1950, equity: 0, total: 21450, status: "Below Mid", band: "L4" },
  { name: "Nour Hassan", title: "Marketing Manager", base: 25000, bonus: 3750, equity: 30000, total: 58750, status: "Above Mid", band: "L4" },
  { name: "Yasmine Samir", title: "Software Engineer I", base: 15000, bonus: 1500, equity: 0, total: 16500, status: "At Mid", band: "L3" },
]

function CompaRatioColor(status: string) {
  if (status === "Above Mid") return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
  if (status === "At Mid") return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
  return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
}

export function CompensationManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("all")

  const totalPayroll = employeeComp.reduce((s, e) => s + e.base, 0)
  const avgBase = Math.round(totalPayroll / employeeComp.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <DollarSign className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Compensation & Equity</h1>
              <p className="text-emerald-100 text-lg">Salary bands, equity grants, and compensation reviews</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Total Payroll (Monthly)", value: `EGP ${(totalPayroll / 1000).toFixed(0)}K`, icon: DollarSign },
              { label: "Avg. Base Salary", value: `EGP ${(avgBase / 1000).toFixed(0)}K`, icon: BarChart3 },
              { label: "Equity Pool", value: "EGP 440K", icon: Award },
              { label: "Open Review Cycles", value: "1 Active", icon: Target },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-emerald-200" />
                  <span className="text-emerald-200 text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="bands" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Salary Bands</TabsTrigger>
          <TabsTrigger value="equity" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Equity</TabsTrigger>
          <TabsTrigger value="review" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Review Cycles</TabsTrigger>
          <TabsTrigger value="employees" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Employee View</TabsTrigger>
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Compensation Distribution</CardTitle>
                <CardDescription>Employees vs. salary band position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Above Mid-point", count: 2, pct: 40, color: "bg-green-500" },
                    { label: "At Mid-point (±5%)", count: 2, pct: 40, color: "bg-blue-500" },
                    { label: "Below Mid-point", count: 1, pct: 20, color: "bg-orange-500" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.count} employees ({item.pct}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Compensation by Department</CardTitle>
                <CardDescription>Average base salary per department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { dept: "Technology", avg: 28000, pct: 93 },
                    { dept: "Marketing", avg: 22000, pct: 73 },
                    { dept: "Human Resources", avg: 17500, pct: 58 },
                    { dept: "Finance", avg: 20000, pct: 67 },
                    { dept: "Operations", avg: 14000, pct: 47 },
                  ].map((dept) => (
                    <div key={dept.dept} className="flex items-center gap-3">
                      <span className="text-sm w-36">{dept.dept}</span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${dept.pct}%` }} />
                      </div>
                      <span className="text-sm font-medium w-24 text-right">EGP {(dept.avg / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Review Cycle */}
          {reviewCycles.filter((c) => c.status === "In Progress").map((cycle) => (
            <Card key={cycle.id} className="rounded-2xl border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
                      <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold">{cycle.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Deadline: {cycle.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{cycle.coverage}% Complete</p>
                    <Progress value={cycle.coverage} className="w-48 h-2" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Budget Utilized</p>
                    <p className="font-bold text-emerald-600">EGP {(cycle.utilized / 1000000).toFixed(1)}M / {(cycle.budget / 1000000).toFixed(1)}M</p>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Manage Cycle</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ── Salary Bands ── */}
        <TabsContent value="bands" className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Add Band
            </Button>
          </div>
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Min</TableHead>
                  <TableHead>Mid</TableHead>
                  <TableHead>Max</TableHead>
                  <TableHead>Headcount</TableHead>
                  <TableHead>Band Visual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryBands
                  .filter((b) => deptFilter === "all" || b.department === deptFilter)
                  .map((band) => (
                    <TableRow key={band.id} className="border-slate-100 dark:border-slate-800">
                      <TableCell className="font-medium">{band.title}</TableCell>
                      <TableCell><Badge variant="secondary" className="rounded-lg">{band.level}</Badge></TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">{band.department}</TableCell>
                      <TableCell className="text-sm">EGP {band.min.toLocaleString()}</TableCell>
                      <TableCell className="text-sm font-medium text-emerald-600">EGP {band.mid.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">EGP {band.max.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{band.currentHeadcount}</TableCell>
                      <TableCell>
                        <div className="w-32 h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <div className="absolute h-full bg-emerald-500/30 rounded-full" style={{ left: "0%", width: "100%" }} />
                          <div className="absolute h-full w-1 bg-emerald-600 rounded-full" style={{ left: "50%" }} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ── Equity ── */}
        <TabsContent value="equity" className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Equity Pool", value: "EGP 440K", sub: "Across 4 grants" },
              { label: "Avg. Grant Value", value: "EGP 110K", sub: "Per employee" },
              { label: "Fully Vested", value: "1 grant", sub: "Nour Hassan" },
            ].map((kpi) => (
              <Card key={kpi.label} className="rounded-2xl border-slate-200 dark:border-slate-700 text-center p-4">
                <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-emerald-600">{kpi.value}</p>
                <p className="text-xs text-slate-400">{kpi.sub}</p>
              </Card>
            ))}
          </div>
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Grant Type</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Grant Date</TableHead>
                  <TableHead>Vesting</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equityGrants.map((grant) => (
                  <TableRow key={grant.id} className="border-slate-100 dark:border-slate-800">
                    <TableCell className="font-medium">{grant.employee}</TableCell>
                    <TableCell className="text-sm text-slate-500">{grant.department}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-lg text-xs">{grant.grantType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{grant.shares.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-slate-500">{grant.grantDate}</TableCell>
                    <TableCell className="text-sm text-slate-500">{grant.vestingSchedule}</TableCell>
                    <TableCell className="text-sm font-medium text-emerald-600">
                      EGP {grant.currentValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs rounded-lg ${
                          grant.status === "Vesting"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            : grant.status === "Fully Vested"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {grant.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ── Review Cycles ── */}
        <TabsContent value="review" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />New Cycle
            </Button>
          </div>
          <div className="grid gap-4">
            {reviewCycles.map((cycle) => (
              <Card key={cycle.id} className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{cycle.name}</h3>
                        <Badge
                          className={`text-xs rounded-lg ${
                            cycle.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : cycle.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {cycle.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">Deadline: {cycle.deadline}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">{cycle.coverage}%</p>
                        <p className="text-xs text-slate-500">Coverage</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{cycle.avgIncrease > 0 ? `+${cycle.avgIncrease}%` : "—"}</p>
                        <p className="text-xs text-slate-500">Avg Increase</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">EGP {(cycle.budget / 1000000).toFixed(1)}M</p>
                        <p className="text-xs text-slate-500">Budget</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      {cycle.status === "Planning" ? "Start Cycle" : "View Details"}
                    </Button>
                  </div>
                  {cycle.status === "In Progress" && (
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Progress</span>
                        <span>{cycle.coverage}%</span>
                      </div>
                      <Progress value={cycle.coverage} className="h-2 rounded-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Employee View ── */}
        <TabsContent value="employees" className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search employees…" className="pl-9 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Band</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Equity</TableHead>
                  <TableHead>Total Comp</TableHead>
                  <TableHead>Position in Band</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeComp
                  .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
                  .map((emp) => (
                    <TableRow key={emp.name} className="border-slate-100 dark:border-slate-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                              {emp.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{emp.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">{emp.title}</TableCell>
                      <TableCell><Badge variant="secondary" className="rounded-lg text-xs">{emp.band}</Badge></TableCell>
                      <TableCell className="text-sm font-medium">EGP {emp.base.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-slate-500">EGP {emp.bonus.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-slate-500">{emp.equity > 0 ? `EGP ${emp.equity.toLocaleString()}` : "—"}</TableCell>
                      <TableCell className="text-sm font-bold text-emerald-600">EGP {emp.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs rounded-lg ${CompaRatioColor(emp.status)}`}>{emp.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
