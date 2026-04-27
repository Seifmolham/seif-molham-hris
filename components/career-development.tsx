"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Target,
  TrendingUp,
  BookOpen,
  Star,
  Plus,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Users,
  Briefcase,
  Award,
  Map,
  ChevronRight,
  Lightbulb,
  Flag,
} from "lucide-react"

interface Goal {
  id: string
  employee: string
  title: string
  description: string
  category: "Performance" | "Development" | "Business" | "Personal"
  progress: number
  status: "On Track" | "At Risk" | "Completed" | "Not Started"
  dueDate: string
  quarter: string
  keyResults: { text: string; progress: number }[]
}

interface CareerPath {
  id: string
  employee: string
  currentRole: string
  currentLevel: string
  targetRole: string
  targetLevel: string
  timeframe: string
  skills: { name: string; current: number; required: number }[]
  milestones: { title: string; completed: boolean }[]
}

interface IDP {
  id: string
  employee: string
  department: string
  focusAreas: string[]
  completedActions: number
  totalActions: number
  lastUpdated: string
}

const goals: Goal[] = [
  {
    id: "1",
    employee: "Ahmed Hassan",
    title: "Launch new API platform v2",
    description: "Design, build, and deploy the next generation API platform",
    category: "Business",
    progress: 72,
    status: "On Track",
    dueDate: "2024-03-31",
    quarter: "Q1 2024",
    keyResults: [
      { text: "Complete API design specs", progress: 100 },
      { text: "Build core services", progress: 80 },
      { text: "Internal beta testing", progress: 60 },
      { text: "Production deployment", progress: 0 },
    ],
  },
  {
    id: "2",
    employee: "Ahmed Hassan",
    title: "Achieve AWS Solutions Architect certification",
    description: "Obtain AWS certification to strengthen cloud architecture skills",
    category: "Development",
    progress: 55,
    status: "On Track",
    dueDate: "2024-06-30",
    quarter: "Q2 2024",
    keyResults: [
      { text: "Complete online course (40hrs)", progress: 85 },
      { text: "Practice exams (3 attempts)", progress: 67 },
      { text: "Pass certification exam", progress: 0 },
    ],
  },
  {
    id: "3",
    employee: "Sara Ahmed",
    title: "Increase team velocity by 20%",
    description: "Improve sprint planning and reduce technical debt to increase delivery speed",
    category: "Performance",
    progress: 30,
    status: "At Risk",
    dueDate: "2024-03-31",
    quarter: "Q1 2024",
    keyResults: [
      { text: "Implement new sprint retro process", progress: 100 },
      { text: "Reduce bug backlog by 50%", progress: 40 },
      { text: "Improve story point accuracy", progress: 10 },
    ],
  },
]

const careerPaths: CareerPath[] = [
  {
    id: "1",
    employee: "Sara Ahmed",
    currentRole: "Software Engineer II",
    currentLevel: "L4",
    targetRole: "Senior Software Engineer",
    targetLevel: "L5",
    timeframe: "12-18 months",
    skills: [
      { name: "System Design", current: 3, required: 5 },
      { name: "Technical Leadership", current: 2, required: 4 },
      { name: "Code Review", current: 4, required: 5 },
      { name: "Mentoring", current: 2, required: 3 },
      { name: "Architecture", current: 3, required: 4 },
    ],
    milestones: [
      { title: "Lead a cross-team feature end-to-end", completed: true },
      { title: "Mentor 2 junior engineers", completed: false },
      { title: "Design and deliver a major system", completed: false },
      { title: "Positive L5 calibration review", completed: false },
    ],
  },
]

const idps: IDP[] = [
  { id: "1", employee: "Ahmed Hassan", department: "Technology", focusAreas: ["Cloud Architecture", "Technical Leadership", "AWS"], completedActions: 8, totalActions: 12, lastUpdated: "2024-01-20" },
  { id: "2", employee: "Sara Ahmed", department: "Technology", focusAreas: ["System Design", "Mentoring", "Agile"], completedActions: 5, totalActions: 10, lastUpdated: "2024-01-22" },
  { id: "3", employee: "Nour Hassan", department: "Marketing", focusAreas: ["Brand Strategy", "Data Analytics", "Leadership"], completedActions: 3, totalActions: 8, lastUpdated: "2024-01-15" },
]

function GoalStatusColor(status: string) {
  const map: Record<string, string> = {
    "On Track": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    "At Risk": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    Completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    "Not Started": "bg-slate-100 text-slate-700",
  }
  return map[status] || "bg-slate-100 text-slate-700"
}

function CategoryColor(category: string) {
  const map: Record<string, string> = {
    Performance: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Development: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Business: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Personal: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  }
  return map[category] || "bg-slate-100 text-slate-700"
}

export function CareerDevelopment() {
  const [activeTab, setActiveTab] = useState("goals")

  const completedGoals = goals.filter((g) => g.status === "Completed").length
  const onTrackGoals = goals.filter((g) => g.status === "On Track").length
  const atRiskGoals = goals.filter((g) => g.status === "At Risk").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Career Development & Goals</h1>
              <p className="text-sky-100 text-lg">OKRs, career paths, IDPs, and growth tracking</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Active Goals", value: goals.length, icon: Target },
              { label: "On Track", value: onTrackGoals, icon: CheckCircle },
              { label: "At Risk", value: atRiskGoals, icon: Clock },
              { label: "Career Paths Active", value: careerPaths.length, icon: Map },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-sky-200" />
                  <span className="text-sky-200 text-sm">{stat.label}</span>
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
          <TabsTrigger value="goals" className="rounded-lg data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <Target className="h-4 w-4 mr-2" />Goals & OKRs
          </TabsTrigger>
          <TabsTrigger value="careers" className="rounded-lg data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <Map className="h-4 w-4 mr-2" />Career Paths
          </TabsTrigger>
          <TabsTrigger value="idp" className="rounded-lg data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />Development Plans
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <Star className="h-4 w-4 mr-2" />Skills Matrix
          </TabsTrigger>
        </TabsList>

        {/* ── Goals & OKRs ── */}
        <TabsContent value="goals" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { label: `On Track (${onTrackGoals})`, color: "bg-green-100 text-green-700 border-green-200" },
                { label: `At Risk (${atRiskGoals})`, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
              ].map((filter) => (
                <Badge key={filter.label} variant="outline" className={`rounded-xl cursor-pointer ${filter.color}`}>
                  {filter.label}
                </Badge>
              ))}
            </div>
            <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Add Goal
            </Button>
          </div>

          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <Badge className={`text-xs rounded-lg ${CategoryColor(goal.category)}`}>{goal.category}</Badge>
                        <Badge className={`text-xs rounded-lg ${GoalStatusColor(goal.status)}`}>{goal.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{goal.description}</p>
                      <p className="text-xs text-slate-400">{goal.employee} · {goal.quarter} · Due {goal.dueDate}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-sky-600">{goal.progress}%</div>
                      <p className="text-xs text-slate-500">complete</p>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2 mb-4 rounded-full" />
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Key Results</p>
                    {goal.keyResults.map((kr, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${kr.progress === 100 ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                          {kr.progress === 100 && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span className="text-sm flex-1 text-slate-600 dark:text-slate-400">{kr.text}</span>
                        <span className="text-xs font-medium w-10 text-right">{kr.progress}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Career Paths ── */}
        <TabsContent value="careers" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Create Career Path
            </Button>
          </div>
          {careerPaths.map((path) => (
            <Card key={path.id} className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardContent className="p-5">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                      {path.employee.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{path.employee}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Badge variant="secondary" className="rounded-lg text-xs">{path.currentRole} ({path.currentLevel})</Badge>
                      <ChevronRight className="h-4 w-4" />
                      <Badge className="rounded-lg text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                        {path.targetRole} ({path.targetLevel})
                      </Badge>
                      <span className="text-slate-400">· {path.timeframe}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold mb-3">Skill Gaps</p>
                    <div className="space-y-3">
                      {path.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.current}/{skill.required}</span>
                          </div>
                          <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="absolute h-full bg-slate-300 dark:bg-slate-600 rounded-full" style={{ width: `${(skill.required / 5) * 100}%` }} />
                            <div className="absolute h-full bg-sky-500 rounded-full" style={{ width: `${(skill.current / 5) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-3">Milestones</p>
                    <div className="space-y-2">
                      {path.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${milestone.completed ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <span className="text-xs text-slate-500 dark:text-slate-400">{idx + 1}</span>
                            )}
                          </div>
                          <span className={`text-sm ${milestone.completed ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-300"}`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ── IDPs ── */}
        <TabsContent value="idp" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Create IDP
            </Button>
          </div>
          <div className="grid gap-4">
            {idps.map((idp) => (
              <Card key={idp.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 text-sm">
                          {idp.employee.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{idp.employee}</p>
                        <p className="text-sm text-slate-500">{idp.department} · Updated {idp.lastUpdated}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {idp.focusAreas.map((area) => (
                            <Badge key={area} variant="secondary" className="text-xs rounded-lg">{area}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm text-slate-500">Progress</span>
                        <span className="font-bold">{Math.round((idp.completedActions / idp.totalActions) * 100)}%</span>
                      </div>
                      <Progress value={Math.round((idp.completedActions / idp.totalActions) * 100)} className="w-36 h-2" />
                      <p className="text-xs text-slate-400">{idp.completedActions}/{idp.totalActions} actions</p>
                      <Button size="sm" variant="outline" className="rounded-xl">View Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Skills Matrix ── */}
        <TabsContent value="skills" className="space-y-4">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base">Team Skills Matrix — Technology</CardTitle>
              <CardDescription>Current skill levels across the team (1–5 scale)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-slate-500 pb-3 w-36">Employee</th>
                      {["React", "TypeScript", "Node.js", "AWS", "System Design", "Leadership"].map((skill) => (
                        <th key={skill} className="text-center text-xs font-medium text-slate-500 pb-3 px-2">{skill}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {[
                      { name: "Ahmed Hassan", scores: [5, 5, 4, 4, 4, 3] },
                      { name: "Sara Ahmed", scores: [4, 4, 3, 3, 3, 2] },
                      { name: "Khaled Omar", scores: [3, 3, 4, 5, 2, 1] },
                      { name: "Yasmine Samir", scores: [3, 4, 2, 2, 2, 1] },
                    ].map((emp) => (
                      <tr key={emp.name} className="border-t border-slate-100 dark:border-slate-800">
                        <td className="py-3 text-sm font-medium">{emp.name}</td>
                        {emp.scores.map((score, idx) => (
                          <td key={idx} className="text-center py-3 px-2">
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${
                              score >= 5 ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                              score >= 4 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                              score >= 3 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" :
                              score >= 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" :
                              "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                            }`}>
                              {score}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500">Legend:</p>
                {[
                  { label: "5 Expert", color: "bg-green-100 text-green-700" },
                  { label: "4 Advanced", color: "bg-blue-100 text-blue-700" },
                  { label: "3 Intermediate", color: "bg-yellow-100 text-yellow-700" },
                  { label: "2 Beginner", color: "bg-orange-100 text-orange-700" },
                  { label: "1 Novice", color: "bg-red-100 text-red-700" },
                ].map((item) => (
                  <Badge key={item.label} className={`text-xs rounded-lg ${item.color}`}>{item.label}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
