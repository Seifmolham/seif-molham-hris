"use client"

import { useState } from "react"
import type { ElementType } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Heart,
  Shield,
  Car,
  GraduationCap,
  Coffee,
  Dumbbell,
  Baby,
  Plus,
  CheckCircle,
  AlertCircle,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  Smartphone,
  Laptop,
  Building,
} from "lucide-react"

interface BenefitPlan {
  id: string
  name: string
  category: string
  icon: ElementType
  description: string
  employerCost: number
  employeeCost: number
  enrolled: number
  eligible: number
  status: "Active" | "Inactive" | "Open Enrollment"
  renewalDate: string
  provider: string
}

interface EmployeeBenefit {
  employee: string
  department: string
  medical: boolean
  dental: boolean
  vision: boolean
  lifeInsurance: boolean
  gym: boolean
  learning: boolean
  pension: boolean
  totalMonthly: number
}

const benefitPlans: BenefitPlan[] = [
  { id: "1", name: "Medical Insurance", category: "Health", icon: Heart, description: "Comprehensive medical coverage with major hospitals network across Egypt", employerCost: 1200, employeeCost: 200, enrolled: 987, eligible: 1247, status: "Active", renewalDate: "2024-12-31", provider: "AXA Egypt" },
  { id: "2", name: "Dental Plan", category: "Health", icon: Shield, description: "Dental coverage including cleanings, fillings, and major procedures", employerCost: 300, employeeCost: 50, enrolled: 756, eligible: 1247, status: "Active", renewalDate: "2024-12-31", provider: "Metlife Egypt" },
  { id: "3", name: "Vision Care", category: "Health", icon: Shield, description: "Annual eye exams, prescription glasses, and contact lenses", employerCost: 150, employeeCost: 30, enrolled: 620, eligible: 1247, status: "Active", renewalDate: "2024-12-31", provider: "Allianz Egypt" },
  { id: "4", name: "Life Insurance", category: "Insurance", icon: Shield, description: "Life insurance coverage up to 3x annual salary", employerCost: 400, employeeCost: 0, enrolled: 1100, eligible: 1247, status: "Active", renewalDate: "2024-12-31", provider: "Misr Insurance" },
  { id: "5", name: "Gym Membership", category: "Wellness", icon: Dumbbell, description: "Subsidized gym membership at Gold's Gym and Smart Gym locations", employerCost: 200, employeeCost: 100, enrolled: 445, eligible: 1247, status: "Active", renewalDate: "2024-06-30", provider: "Various" },
  { id: "6", name: "Learning & Development", category: "Education", icon: GraduationCap, description: "Annual learning budget for courses, certifications, and conferences", employerCost: 500, employeeCost: 0, enrolled: 823, eligible: 1247, status: "Active", renewalDate: "2024-12-31", provider: "Internal" },
  { id: "7", name: "Transportation Allowance", category: "Commute", icon: Car, description: "Monthly transportation allowance or company shuttle service", employerCost: 600, employeeCost: 0, enrolled: 890, eligible: 1247, status: "Active", renewalDate: "N/A", provider: "Internal" },
  { id: "8", name: "Parental Leave", category: "Family", icon: Baby, description: "16 weeks paid maternity leave, 4 weeks paid paternity leave", employerCost: 0, employeeCost: 0, enrolled: 234, eligible: 1247, status: "Active", renewalDate: "N/A", provider: "Policy" },
  { id: "9", name: "Pension / Retirement", category: "Financial", icon: Building, description: "Employer matches up to 5% of base salary into pension fund", employerCost: 750, employeeCost: 375, enrolled: 934, eligible: 1247, status: "Active", renewalDate: "N/A", provider: "NSGB" },
  { id: "10", name: "Phone Allowance", category: "Tech", icon: Smartphone, description: "Monthly phone bill allowance up to EGP 300", employerCost: 300, employeeCost: 0, enrolled: 620, eligible: 1247, status: "Active", renewalDate: "N/A", provider: "Internal" },
]

const employeeBenefits: EmployeeBenefit[] = [
  { employee: "Ahmed Hassan", department: "Technology", medical: true, dental: true, vision: true, lifeInsurance: true, gym: true, learning: true, pension: true, totalMonthly: 3850 },
  { employee: "Sara Ahmed", department: "Technology", medical: true, dental: false, vision: true, lifeInsurance: true, gym: false, learning: true, pension: true, totalMonthly: 3200 },
  { employee: "Omar Farouk", department: "Finance", medical: true, dental: true, vision: false, lifeInsurance: true, gym: false, learning: false, pension: true, totalMonthly: 2550 },
  { employee: "Nour Hassan", department: "Marketing", medical: true, dental: true, vision: true, lifeInsurance: true, gym: true, learning: true, pension: false, totalMonthly: 3500 },
  { employee: "Yasmine Samir", department: "Technology", medical: true, dental: false, vision: false, lifeInsurance: true, gym: false, learning: true, pension: true, totalMonthly: 2350 },
]

function CategoryColor(category: string) {
  const map: Record<string, string> = {
    Health: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    Insurance: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Wellness: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Education: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Commute: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Family: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    Financial: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    Tech: "bg-slate-100 text-slate-700",
  }
  return map[category] || "bg-slate-100 text-slate-700"
}

export function BenefitsManagement() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalEnrolled = Math.round(benefitPlans.reduce((s, p) => s + p.enrolled, 0) / benefitPlans.length)
  const avgEnrollmentRate = Math.round((totalEnrolled / 1247) * 100)
  const totalEmployerCost = benefitPlans.reduce((s, p) => s + p.employerCost * p.enrolled, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Benefits Management</h1>
              <p className="text-rose-100 text-lg">Employee benefits, enrollment, and wellness programs</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Active Plans", value: benefitPlans.filter((p) => p.status === "Active").length, icon: CheckCircle },
              { label: "Avg Enrollment", value: `${avgEnrollmentRate}%`, icon: Users },
              { label: "Monthly Cost / Employee", value: "EGP 4,200", icon: DollarSign },
              { label: "Open Enrollments", value: "1", icon: Calendar },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-rose-200" />
                  <span className="text-rose-200 text-sm">{stat.label}</span>
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
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-rose-600 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="plans" className="rounded-lg data-[state=active]:bg-rose-600 data-[state=active]:text-white">Benefit Plans</TabsTrigger>
          <TabsTrigger value="enrollment" className="rounded-lg data-[state=active]:bg-rose-600 data-[state=active]:text-white">Enrollment</TabsTrigger>
          <TabsTrigger value="employees" className="rounded-lg data-[state=active]:bg-rose-600 data-[state=active]:text-white">Employee Benefits</TabsTrigger>
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefitPlans.slice(0, 4).map((plan) => (
              <Card key={plan.id} className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40">
                      <plan.icon className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="font-medium text-sm">{plan.name}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Enrolled</span>
                      <span>{plan.enrolled} / {plan.eligible}</span>
                    </div>
                    <Progress value={Math.round((plan.enrolled / plan.eligible) * 100)} className="h-2" />
                    <p className="text-xs text-slate-400">{Math.round((plan.enrolled / plan.eligible) * 100)}% enrollment rate</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Enrollment by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { category: "Health", enrolled: 987, pct: 79 },
                  { category: "Financial", enrolled: 934, pct: 75 },
                  { category: "Commute", enrolled: 890, pct: 71 },
                  { category: "Insurance", enrolled: 1100, pct: 88 },
                  { category: "Wellness", enrolled: 445, pct: 36 },
                  { category: "Education", enrolled: 823, pct: 66 },
                ].map((cat) => (
                  <div key={cat.category} className="flex items-center gap-3">
                    <span className="text-sm w-24">{cat.category}</span>
                    <Progress value={cat.pct} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-10 text-right">{cat.pct}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Cost Breakdown</CardTitle>
                <CardDescription>Monthly employer spend by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { category: "Health & Medical", amount: 1650000, color: "bg-red-400" },
                  { category: "Pension", amount: 700500, color: "bg-emerald-400" },
                  { category: "Transportation", amount: 534000, color: "bg-orange-400" },
                  { category: "Life Insurance", amount: 440000, color: "bg-blue-400" },
                  { category: "L&D Budget", amount: 411500, color: "bg-purple-400" },
                ].map((item) => (
                  <div key={item.category} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm flex-1">{item.category}</span>
                    <span className="text-sm font-medium">EGP {(item.amount / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Plans ── */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Add Plan
            </Button>
          </div>
          <div className="grid gap-4">
            {benefitPlans.map((plan) => (
              <Card key={plan.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/40 shrink-0">
                        <plan.icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{plan.name}</h3>
                          <Badge className={`text-xs rounded-lg ${CategoryColor(plan.category)}`}>{plan.category}</Badge>
                          <Badge className={`text-xs rounded-lg ${plan.status === "Active" ? "bg-green-100 text-green-700" : plan.status === "Open Enrollment" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-700"}`}>
                            {plan.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{plan.description}</p>
                        <p className="text-xs text-slate-500">Provider: {plan.provider} · Renewal: {plan.renewalDate}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2 ml-6">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-rose-600">EGP {plan.employerCost}</span> employer
                        {plan.employeeCost > 0 && <> · EGP {plan.employeeCost} employee</>}
                        <span className="text-slate-400"> /mo</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{plan.enrolled}</span>
                        <span className="text-slate-400">/{plan.eligible} enrolled</span>
                      </div>
                      <Progress value={Math.round((plan.enrolled / plan.eligible) * 100)} className="w-32 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Enrollment ── */}
        <TabsContent value="enrollment" className="space-y-4">
          <Card className="rounded-2xl border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/40">
                  <Calendar className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-rose-900 dark:text-rose-100">Open Enrollment Period</h3>
                  <p className="text-sm text-rose-700 dark:text-rose-300">Annual enrollment window: Nov 1 – Dec 15, 2024. Employees can add, remove, or change benefit elections.</p>
                </div>
                <Button size="sm" className="ml-auto bg-rose-600 hover:bg-rose-700 text-white rounded-xl">
                  Manage Enrollment
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Enrolled this cycle", value: "823", sub: "of 1,247 eligible" },
              { label: "Pending decisions", value: "312", sub: "must decide by Dec 15" },
              { label: "Waived benefits", value: "112", sub: "opted out of coverage" },
            ].map((stat) => (
              <Card key={stat.label} className="rounded-2xl border-slate-200 dark:border-slate-700 text-center p-4">
                <p className="text-3xl font-bold text-rose-600 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                <p className="text-xs text-slate-400">{stat.sub}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Employee Benefits ── */}
        <TabsContent value="employees">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Medical</TableHead>
                  <TableHead>Dental</TableHead>
                  <TableHead>Vision</TableHead>
                  <TableHead>Life Ins.</TableHead>
                  <TableHead>Gym</TableHead>
                  <TableHead>L&D</TableHead>
                  <TableHead>Pension</TableHead>
                  <TableHead>Monthly Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeBenefits.map((emp) => (
                  <TableRow key={emp.employee} className="border-slate-100 dark:border-slate-800">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">
                            {emp.employee.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{emp.employee}</p>
                          <p className="text-xs text-slate-400">{emp.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    {[emp.medical, emp.dental, emp.vision, emp.lifeInsurance, emp.gym, emp.learning, emp.pension].map((enrolled, idx) => (
                      <TableCell key={idx}>
                        {enrolled
                          ? <CheckCircle className="h-4 w-4 text-green-500" />
                          : <span className="text-slate-300 dark:text-slate-600 text-sm">—</span>}
                      </TableCell>
                    ))}
                    <TableCell className="font-medium text-rose-600">EGP {emp.totalMonthly.toLocaleString()}</TableCell>
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
