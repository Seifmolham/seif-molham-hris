"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
  Building2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Map,
  Layers,
  Briefcase,
} from "lucide-react"

interface HeadcountPlan {
  id: string
  department: string
  currentHeadcount: number
  targetHeadcount: number
  openRoles: number
  budget: number
  utilized: number
  quarter: string
  status: "On Track" | "At Risk" | "Behind"
}

interface OpenRole {
  id: string
  title: string
  department: string
  level: string
  budgetedSalary: number
  targetStartDate: string
  status: "Approved" | "Pending Approval" | "On Hold" | "Filled"
  priority: "Critical" | "High" | "Medium" | "Low"
  recruitingStatus: string
}

interface Scenario {
  id: string
  name: string
  description: string
  headcountChange: number
  costImpact: number
  timeframe: string
}

const headcountPlans: HeadcountPlan[] = [
  { id: "1", department: "Technology", currentHeadcount: 234, targetHeadcount: 280, openRoles: 12, budget: 8400000, utilized: 5616000, quarter: "Q2 2024", status: "On Track" },
  { id: "2", department: "Marketing", currentHeadcount: 89, targetHeadcount: 100, openRoles: 4, budget: 2400000, utilized: 2136000, quarter: "Q2 2024", status: "On Track" },
  { id: "3", department: "Human Resources", currentHeadcount: 45, targetHeadcount: 50, openRoles: 3, budget: 1200000, utilized: 1080000, quarter: "Q2 2024", status: "At Risk" },
  { id: "4", department: "Finance", currentHeadcount: 67, targetHeadcount: 70, openRoles: 2, budget: 1680000, utilized: 1596000, quarter: "Q2 2024", status: "On Track" },
  { id: "5", department: "Operations", currentHeadcount: 312, targetHeadcount: 320, openRoles: 6, budget: 6400000, utilized: 6400000, quarter: "Q2 2024", status: "Behind" },
  { id: "6", department: "Sales", currentHeadcount: 156, targetHeadcount: 200, openRoles: 18, budget: 7200000, utilized: 4320000, quarter: "Q2 2024", status: "At Risk" },
]

const openRoles: OpenRole[] = [
  { id: "1", title: "Senior Software Engineer", department: "Technology", level: "L5", budgetedSalary: 35000, targetStartDate: "2024-03-01", status: "Approved", priority: "Critical", recruitingStatus: "Interview Stage" },
  { id: "2", title: "Product Manager", department: "Technology", level: "L4", budgetedSalary: 28000, targetStartDate: "2024-04-01", status: "Approved", priority: "High", recruitingStatus: "Sourcing" },
  { id: "3", title: "Sales Manager", department: "Sales", level: "L4", budgetedSalary: 25000, targetStartDate: "2024-03-15", status: "Approved", priority: "Critical", recruitingStatus: "Final Interviews" },
  { id: "4", title: "Data Analyst", department: "Finance", level: "L3", budgetedSalary: 18000, targetStartDate: "2024-04-15", status: "Pending Approval", priority: "Medium", recruitingStatus: "Not Started" },
  { id: "5", title: "HR Business Partner", department: "Human Resources", level: "L4", budgetedSalary: 20000, targetStartDate: "2024-05-01", status: "On Hold", priority: "Low", recruitingStatus: "On Hold" },
  { id: "6", title: "Account Executive", department: "Sales", level: "L3", budgetedSalary: 16000, targetStartDate: "2024-03-01", status: "Approved", priority: "High", recruitingStatus: "Sourcing" },
]

const scenarios: Scenario[] = [
  { id: "1", name: "Conservative Growth", description: "10% headcount increase focused on critical roles only", headcountChange: 125, costImpact: 30000000, timeframe: "12 months" },
  { id: "2", name: "Moderate Expansion", description: "15% headcount growth with balanced department expansion", headcountChange: 187, costImpact: 44880000, timeframe: "12 months" },
  { id: "3", name: "Aggressive Hiring", description: "25% headcount growth to accelerate product and sales", headcountChange: 312, costImpact: 74880000, timeframe: "12 months" },
]

function StatusColor(status: string) {
  if (status === "On Track") return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
  if (status === "At Risk") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
  return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
}

function PriorityColor(priority: string) {
  const map: Record<string, string> = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  }
  return map[priority] || "bg-slate-100 text-slate-700"
}

function RoleStatusColor(status: string) {
  if (status === "Approved") return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
  if (status === "Pending Approval") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
  if (status === "On Hold") return "bg-slate-100 text-slate-700"
  return "bg-blue-100 text-blue-700"
}

export function WorkforcePlanning() {
  const [activeTab, setActiveTab] = useState("headcount")
  const [selectedScenario, setSelectedScenario] = useState("2")

  const totalCurrent = headcountPlans.reduce((s, p) => s + p.currentHeadcount, 0)
  const totalTarget = headcountPlans.reduce((s, p) => s + p.targetHeadcount, 0)
  const totalOpen = headcountPlans.reduce((s, p) => s + p.openRoles, 0)
  const totalBudget = headcountPlans.reduce((s, p) => s + p.budget, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Layers className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Workforce Planning</h1>
              <p className="text-blue-100 text-lg">Headcount plans, open roles budget, and scenario modeling</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Current Headcount", value: totalCurrent.toLocaleString(), icon: Users },
              { label: "Target Headcount", value: totalTarget.toLocaleString(), icon: Target },
              { label: "Open Roles", value: totalOpen, icon: Briefcase },
              { label: "Total HC Budget", value: `EGP ${(totalBudget / 1000000).toFixed(0)}M`, icon: DollarSign },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-blue-200" />
                  <span className="text-blue-200 text-sm">{stat.label}</span>
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
          <TabsTrigger value="headcount" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Headcount Plan</TabsTrigger>
          <TabsTrigger value="openroles" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Open Roles</TabsTrigger>
          <TabsTrigger value="positions" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Positions</TabsTrigger>
          <TabsTrigger value="scenarios" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Scenario Modeling</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analytics</TabsTrigger>
        </TabsList>

        {/* ── Headcount Plan ── */}
        <TabsContent value="headcount" className="space-y-4">
          <div className="flex items-center justify-between">
            <Select defaultValue="Q2 2024">
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                <SelectItem value="Q4 2024">Q4 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Add Department Plan
            </Button>
          </div>

          <div className="grid gap-4">
            {headcountPlans.map((plan) => (
              <Card key={plan.id} className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
                        <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{plan.department}</h3>
                        <p className="text-sm text-slate-500">{plan.openRoles} open roles</p>
                      </div>
                    </div>
                    <Badge className={`text-xs rounded-lg ${StatusColor(plan.status)}`}>{plan.status}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Headcount Progress</p>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-2xl font-bold">{plan.currentHeadcount}</span>
                        <span className="text-slate-400 pb-0.5">/ {plan.targetHeadcount}</span>
                      </div>
                      <Progress value={Math.round((plan.currentHeadcount / plan.targetHeadcount) * 100)} className="h-2" />
                      <p className="text-xs text-slate-400 mt-1">{plan.targetHeadcount - plan.currentHeadcount} remaining</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">Budget Utilization</p>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-2xl font-bold">EGP {(plan.utilized / 1000000).toFixed(1)}M</span>
                      </div>
                      <Progress value={Math.round((plan.utilized / plan.budget) * 100)} className="h-2" />
                      <p className="text-xs text-slate-400 mt-1">of EGP {(plan.budget / 1000000).toFixed(1)}M total</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">Open Roles Pipeline</p>
                      <div className="space-y-1 mt-2">
                        {openRoles.filter((r) => r.department === plan.department).slice(0, 2).map((role) => (
                          <div key={role.id} className="flex items-center justify-between">
                            <span className="text-xs text-slate-600 dark:text-slate-400 truncate flex-1">{role.title}</span>
                            <Badge className={`text-xs rounded ml-2 ${PriorityColor(role.priority)}`}>{role.priority}</Badge>
                          </div>
                        ))}
                        {plan.openRoles > 2 && (
                          <p className="text-xs text-blue-600 dark:text-blue-400">+{plan.openRoles - 2} more roles</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Open Roles ── */}
        <TabsContent value="openroles" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Request Role
            </Button>
          </div>
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Budgeted Salary</TableHead>
                  <TableHead>Target Start</TableHead>
                  <TableHead>Approval</TableHead>
                  <TableHead>Recruiting</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openRoles.map((role) => (
                  <TableRow key={role.id} className="border-slate-100 dark:border-slate-800">
                    <TableCell className="font-medium">{role.title}</TableCell>
                    <TableCell className="text-sm text-slate-500">{role.department}</TableCell>
                    <TableCell><Badge variant="secondary" className="rounded-lg text-xs">{role.level}</Badge></TableCell>
                    <TableCell><Badge className={`text-xs rounded-lg ${PriorityColor(role.priority)}`}>{role.priority}</Badge></TableCell>
                    <TableCell className="text-sm">EGP {role.budgetedSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-slate-500">{role.targetStartDate}</TableCell>
                    <TableCell><Badge className={`text-xs rounded-lg ${RoleStatusColor(role.status)}`}>{role.status}</Badge></TableCell>
                    <TableCell className="text-xs text-slate-500">{role.recruitingStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ── Scenario Modeling ── */}
        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`rounded-2xl cursor-pointer transition-all ${
                  selectedScenario === scenario.id
                    ? "border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-400"
                    : "border-slate-200 dark:border-slate-700 hover:shadow-md"
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{scenario.name}</h3>
                    {selectedScenario === scenario.id && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{scenario.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">New Hires</span>
                      <span className="font-medium text-blue-600">+{scenario.headcountChange}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Cost Impact</span>
                      <span className="font-medium">EGP {(scenario.costImpact / 1000000).toFixed(1)}M/yr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Timeframe</span>
                      <span className="font-medium">{scenario.timeframe}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scenario Detail */}
          {selectedScenario && (() => {
            const scenario = scenarios.find((s) => s.id === selectedScenario)!
            return (
              <Card className="rounded-2xl border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-base">Impact Analysis: {scenario.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total Headcount", value: `${totalCurrent + scenario.headcountChange}`, icon: Users },
                      { label: "Headcount Change", value: `+${scenario.headcountChange}`, icon: TrendingUp },
                      { label: "Annual Cost", value: `EGP ${(scenario.costImpact / 1000000).toFixed(1)}M`, icon: DollarSign },
                      { label: "Hiring Timeline", value: scenario.timeframe, icon: Calendar },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <stat.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs text-slate-500">{stat.label}</span>
                        </div>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                      Adopt This Scenario
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })()}
        </TabsContent>

        {/* ── Analytics ── */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Headcount by Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {headcountPlans.map((plan) => (
                  <div key={plan.department} className="flex items-center gap-3">
                    <span className="text-sm w-36">{plan.department}</span>
                    <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center px-2 text-white text-xs font-medium bg-blue-500"
                        style={{ width: `${(plan.currentHeadcount / totalTarget) * 100}%` }}
                      >
                        {plan.currentHeadcount}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Attrition & Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Annual Attrition Rate", value: "12%", change: "-2% vs last year", positive: true },
                  { label: "Time to Fill (avg)", value: "32 days", change: "-5 days vs last year", positive: true },
                  { label: "Internal Mobility Rate", value: "18%", change: "+3% vs last year", positive: true },
                  { label: "Offer Acceptance Rate", value: "87%", change: "+5% vs last year", positive: true },
                  { label: "New Hire 90-Day Retention", value: "94%", change: "+2% vs last year", positive: true },
                ].map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm">{kpi.label}</span>
                    <div className="text-right">
                      <span className="font-bold text-blue-600">{kpi.value}</span>
                      <p className="text-xs text-green-600">{kpi.change}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Positions ── */}
        <TabsContent value="positions" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Each position is linked to its grade, location, benefits package, and compensation band.</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Add Position
            </Button>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Senior Software Engineer",
                department: "Technology",
                grade: "L5 — Senior",
                location: "Cairo HQ (Hybrid)",
                benefitsPackage: "Premium Package",
                benefitsIncludes: ["Health + Dental + Vision", "6% 401k match", "25 days PTO", "L&D budget EGP 10K"],
                compensationBand: { min: "EGP 38,000", mid: "EGP 44,000", max: "EGP 52,000" },
                headcount: 18,
                filled: 16,
                status: "Active",
              },
              {
                title: "Product Manager",
                department: "Technology",
                grade: "L4 — Mid-Senior",
                location: "Cairo HQ (On-site)",
                benefitsPackage: "Standard Package",
                benefitsIncludes: ["Health + Dental", "4% 401k match", "21 days PTO", "L&D budget EGP 6K"],
                compensationBand: { min: "EGP 28,000", mid: "EGP 33,000", max: "EGP 40,000" },
                headcount: 6,
                filled: 5,
                status: "Active",
              },
              {
                title: "Marketing Manager",
                department: "Marketing",
                grade: "G5 — Manager",
                location: "Cairo HQ (Hybrid)",
                benefitsPackage: "Standard Package",
                benefitsIncludes: ["Health + Dental", "4% 401k match", "21 days PTO", "L&D budget EGP 5K"],
                compensationBand: { min: "EGP 24,000", mid: "EGP 29,000", max: "EGP 36,000" },
                headcount: 4,
                filled: 4,
                status: "Active",
              },
              {
                title: "Finance Analyst",
                department: "Finance",
                grade: "L3 — Associate",
                location: "Cairo HQ (On-site)",
                benefitsPackage: "Core Package",
                benefitsIncludes: ["Health", "3% 401k match", "18 days PTO"],
                compensationBand: { min: "EGP 16,000", mid: "EGP 20,000", max: "EGP 25,000" },
                headcount: 8,
                filled: 7,
                status: "Active",
              },
              {
                title: "Principal Engineer",
                department: "Technology",
                grade: "L6 — Principal",
                location: "Remote (Egypt)",
                benefitsPackage: "Executive Package",
                benefitsIncludes: ["Health + Dental + Vision", "8% 401k match", "30 days PTO", "L&D budget EGP 20K", "RSUs"],
                compensationBand: { min: "EGP 52,000", mid: "EGP 62,000", max: "EGP 75,000" },
                headcount: 4,
                filled: 3,
                status: "Active",
              },
              {
                title: "HR Business Partner",
                department: "Human Resources",
                grade: "G4 — Senior Associate",
                location: "Cairo HQ (Hybrid)",
                benefitsPackage: "Standard Package",
                benefitsIncludes: ["Health + Dental", "4% 401k match", "21 days PTO", "L&D budget EGP 5K"],
                compensationBand: { min: "EGP 18,000", mid: "EGP 22,000", max: "EGP 27,000" },
                headcount: 5,
                filled: 4,
                status: "Active",
              },
            ].map((pos, idx) => {
              const fillPct = Math.round((pos.filled / pos.headcount) * 100)
              return (
                <Card key={idx} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base">{pos.title}</h3>
                          <Badge className="text-xs rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{pos.grade}</Badge>
                          <Badge className="text-xs rounded-lg bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">{pos.status}</Badge>
                        </div>
                        <p className="text-sm text-slate-500">{pos.department} · {pos.location}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium">{pos.filled}/{pos.headcount} filled</p>
                        <p className="text-xs text-slate-400">{fillPct}% headcount</p>
                      </div>
                    </div>

                    <Progress value={fillPct} className="h-1.5 mb-5" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Compensation Band */}
                      <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-3 border border-green-100 dark:border-green-900/40">
                        <div className="flex items-center gap-1.5 mb-2">
                          <DollarSign className="h-3.5 w-3.5 text-green-600" />
                          <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Compensation Band</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-green-700 dark:text-green-300 mb-1">
                          <span>Min</span><span>Mid</span><span>Max</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-semibold text-green-800 dark:text-green-200">
                          <span>{pos.compensationBand.min}</span>
                          <span className="text-base">{pos.compensationBand.mid}</span>
                          <span>{pos.compensationBand.max}</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-3 border border-blue-100 dark:border-blue-900/40">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Map className="h-3.5 w-3.5 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">Location</span>
                        </div>
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">{pos.location}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{pos.grade}</p>
                      </div>

                      {/* Benefits */}
                      <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-3 border border-purple-100 dark:border-purple-900/40">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Briefcase className="h-3.5 w-3.5 text-purple-600" />
                          <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wide">Benefits — {pos.benefitsPackage}</span>
                        </div>
                        <ul className="space-y-0.5">
                          {pos.benefitsIncludes.slice(0, 3).map((b) => (
                            <li key={b} className="text-xs text-purple-700 dark:text-purple-300 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 flex-shrink-0" />{b}
                            </li>
                          ))}
                          {pos.benefitsIncludes.length > 3 && (
                            <li className="text-xs text-purple-500">+{pos.benefitsIncludes.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
