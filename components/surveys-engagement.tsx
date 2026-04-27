"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Heart,
  Star,
  Users,
  Plus,
  Send,
  CheckCircle,
  Clock,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

interface Survey {
  id: string
  title: string
  type: "Pulse" | "eNPS" | "Engagement" | "Exit" | "Custom"
  status: "Draft" | "Active" | "Closed"
  responses: number
  target: number
  createdAt: string
  closesAt: string
  avgScore?: number
}

const surveys: Survey[] = [
  { id: "1", title: "Q1 2024 Pulse Check", type: "Pulse", status: "Active", responses: 312, target: 450, createdAt: "2024-01-15", closesAt: "2024-01-31", avgScore: 7.4 },
  { id: "2", title: "January eNPS", type: "eNPS", status: "Active", responses: 198, target: 300, createdAt: "2024-01-20", closesAt: "2024-01-28", avgScore: 42 },
  { id: "3", title: "Annual Engagement Survey 2023", type: "Engagement", status: "Closed", responses: 1100, target: 1200, createdAt: "2023-11-01", closesAt: "2023-11-30", avgScore: 74 },
  { id: "4", title: "Remote Work Satisfaction", type: "Custom", status: "Closed", responses: 445, target: 500, createdAt: "2023-12-01", closesAt: "2023-12-15", avgScore: 8.1 },
]

const engagementDrivers = [
  { driver: "Leadership & Vision", score: 76, change: 4, trend: "up" },
  { driver: "Career Growth", score: 68, change: -2, trend: "down" },
  { driver: "Work-Life Balance", score: 72, change: 6, trend: "up" },
  { driver: "Team Collaboration", score: 84, change: 2, trend: "up" },
  { driver: "Compensation & Benefits", score: 65, change: -1, trend: "down" },
  { driver: "Manager Effectiveness", score: 79, change: 3, trend: "up" },
  { driver: "Company Culture", score: 81, change: 1, trend: "up" },
  { driver: "Job Clarity", score: 78, change: 0, trend: "flat" },
]

const feedbackItems = [
  { id: "1", text: "The new flexible work policy has made a huge difference for my work-life balance.", sentiment: "positive", dept: "Technology", date: "2024-01-22" },
  { id: "2", text: "Would love to see clearer career progression paths outlined by management.", sentiment: "neutral", dept: "Marketing", date: "2024-01-21" },
  { id: "3", text: "Team offsites help build great relationships across departments.", sentiment: "positive", dept: "Finance", date: "2024-01-20" },
  { id: "4", text: "The new performance review process feels more transparent and fair.", sentiment: "positive", dept: "HR", date: "2024-01-19" },
  { id: "5", text: "Benefits package could be more competitive compared to market standards.", sentiment: "negative", dept: "Technology", date: "2024-01-18" },
]

const enpsBreakdown = {
  promoters: 45,
  passives: 32,
  detractors: 23,
  score: 22,
}

function SentimentIcon({ sentiment }: { sentiment: string }) {
  if (sentiment === "positive") return <Smile className="h-4 w-4 text-green-500" />
  if (sentiment === "negative") return <Frown className="h-4 w-4 text-red-500" />
  return <Meh className="h-4 w-4 text-yellow-500" />
}

function SentimentColor(sentiment: string) {
  if (sentiment === "positive") return "border-l-green-400 bg-green-50 dark:bg-green-900/10"
  if (sentiment === "negative") return "border-l-red-400 bg-red-50 dark:bg-red-900/10"
  return "border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/10"
}

export function SurveysEngagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [newFeedback, setNewFeedback] = useState("")

  const currentEngagement = 74
  const prevEngagement = 71

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Surveys & Engagement</h1>
              <p className="text-amber-100 text-lg">Pulse surveys, eNPS, and employee feedback insights</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Engagement Score", value: `${currentEngagement}%`, icon: Heart },
              { label: "eNPS Score", value: "+22", icon: ThumbsUp },
              { label: "Active Surveys", value: "2", icon: MessageSquare },
              { label: "Avg Response Rate", value: "69%", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-amber-200" />
                  <span className="text-amber-200 text-sm">{stat.label}</span>
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
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="surveys" className="rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white">Surveys</TabsTrigger>
          <TabsTrigger value="enps" className="rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white">eNPS</TabsTrigger>
          <TabsTrigger value="drivers" className="rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white">Engagement Drivers</TabsTrigger>
          <TabsTrigger value="feedback" className="rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white">Anonymous Feedback</TabsTrigger>
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Engagement Score Card */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Overall Engagement Score</CardTitle>
                <CardDescription>Based on 2023 Annual Engagement Survey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3"
                        strokeDasharray={`${currentEngagement} ${100 - currentEngagement}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-3xl font-bold">{currentEngagement}</p>
                      <p className="text-xs text-slate-500">/ 100</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium">+{currentEngagement - prevEngagement} pts vs last year</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { label: "Highly Engaged", pct: 45, color: "bg-green-500" },
                        { label: "Engaged", pct: 29, color: "bg-amber-400" },
                        { label: "Not Engaged", pct: 26, color: "bg-red-400" },
                      ].map((seg) => (
                        <div key={seg.label} className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${seg.color}`} />
                          <span className="flex-1 text-slate-600 dark:text-slate-400">{seg.label}</span>
                          <span className="font-medium">{seg.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Progress value={currentEngagement} className="h-3 rounded-full" />
              </CardContent>
            </Card>

            {/* Trend Card */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Engagement Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { period: "Q1 2023", score: 68, change: null },
                    { period: "Q2 2023", score: 70, change: 2 },
                    { period: "Q3 2023", score: 71, change: 1 },
                    { period: "Q4 2023", score: 74, change: 3 },
                    { period: "Q1 2024", score: null, change: null },
                  ].map((item) => (
                    <div key={item.period} className="flex items-center gap-3">
                      <span className="text-sm w-20 text-slate-500">{item.period}</span>
                      {item.score ? (
                        <>
                          <Progress value={item.score} className="flex-1 h-3" />
                          <span className="text-sm font-medium w-8">{item.score}</span>
                          {item.change !== null && (
                            <Badge className="text-xs rounded-lg bg-green-100 text-green-700 w-12 justify-center">
                              +{item.change}
                            </Badge>
                          )}
                        </>
                      ) : (
                        <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center px-3">
                          <span className="text-xs text-slate-400">In progress…</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Insights */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Biggest Strength", value: "Team Collaboration", score: 84, icon: Users, color: "green" },
                  { title: "Most Improved", value: "Work-Life Balance", change: "+6 pts", icon: TrendingUp, color: "blue" },
                  { title: "Needs Attention", value: "Career Growth", score: 68, icon: AlertCircle, color: "red" },
                ].map((insight) => (
                  <div key={insight.title} className={`p-4 rounded-2xl bg-${insight.color}-50 dark:bg-${insight.color}-900/20 border border-${insight.color}-100 dark:border-${insight.color}-900`}>
                    <div className="flex items-center gap-2 mb-2">
                      <insight.icon className={`h-4 w-4 text-${insight.color}-600 dark:text-${insight.color}-400`} />
                      <span className={`text-xs font-medium text-${insight.color}-600 dark:text-${insight.color}-400`}>{insight.title}</span>
                    </div>
                    <p className="font-semibold">{insight.value}</p>
                    {insight.score && <p className="text-sm text-slate-500 mt-1">Score: {insight.score}/100</p>}
                    {insight.change && <p className={`text-sm font-medium text-${insight.color}-600 dark:text-${insight.color}-400 mt-1`}>{insight.change} this cycle</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Surveys ── */}
        <TabsContent value="surveys" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />New Survey
            </Button>
          </div>
          <div className="grid gap-4">
            {surveys.map((survey) => (
              <Card key={survey.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{survey.title}</h3>
                        <Badge className="text-xs rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">{survey.type}</Badge>
                        <Badge className={`text-xs rounded-lg ${survey.status === "Active" ? "bg-green-100 text-green-700" : survey.status === "Draft" ? "bg-slate-100 text-slate-700" : "bg-gray-100 text-gray-700"}`}>
                          {survey.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">Created {survey.createdAt} · Closes {survey.closesAt}</p>
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Responses: {survey.responses} / {survey.target}</span>
                          <span>{Math.round((survey.responses / survey.target) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((survey.responses / survey.target) * 100)} className="h-2" />
                      </div>
                    </div>
                    {survey.avgScore !== undefined && (
                      <div className="text-center mx-8">
                        <p className="text-3xl font-bold text-amber-600">{survey.avgScore}</p>
                        <p className="text-xs text-slate-500">Avg Score</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-xl">View Results</Button>
                      {survey.status === "Active" && (
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl">Manage</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── eNPS ── */}
        <TabsContent value="enps" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">eNPS Score</CardTitle>
                <CardDescription>Employee Net Promoter Score — January 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-amber-600 mb-2">+{enpsBreakdown.score}</div>
                  <Badge className="rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 text-sm px-4">Good</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Promoters (9-10)", pct: enpsBreakdown.promoters, color: "bg-green-500", text: "text-green-700" },
                    { label: "Passives (7-8)", pct: enpsBreakdown.passives, color: "bg-amber-400", text: "text-amber-700" },
                    { label: "Detractors (0-6)", pct: enpsBreakdown.detractors, color: "bg-red-400", text: "text-red-700" },
                  ].map((seg) => (
                    <div key={seg.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{seg.label}</span>
                        <span className={`font-medium ${seg.text}`}>{seg.pct}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${seg.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">eNPS = Promoters% − Detractors% = {enpsBreakdown.promoters - enpsBreakdown.detractors} = +{enpsBreakdown.score}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">eNPS by Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { dept: "Technology", score: 35 },
                  { dept: "Marketing", score: 28 },
                  { dept: "Human Resources", score: 42 },
                  { dept: "Finance", score: 18 },
                  { dept: "Operations", score: 12 },
                ].map((dept) => (
                  <div key={dept.dept} className="flex items-center gap-3">
                    <span className="text-sm w-36">{dept.dept}</span>
                    <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div
                        className={`h-full rounded-lg flex items-center px-2 text-white text-xs font-medium ${dept.score >= 30 ? "bg-green-500" : dept.score >= 15 ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${Math.max((dept.score / 50) * 100, 20)}%` }}
                      >
                        +{dept.score}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Engagement Drivers ── */}
        <TabsContent value="drivers" className="space-y-4">
          <div className="grid gap-3">
            {engagementDrivers.map((driver) => (
              <Card key={driver.driver} className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-48">
                      <span className="text-sm font-medium">{driver.driver}</span>
                    </div>
                    <Progress value={driver.score} className="flex-1 h-3" />
                    <div className="w-16 text-right">
                      <span className="text-sm font-bold">{driver.score}</span>
                      <span className="text-xs text-slate-400">/100</span>
                    </div>
                    <div className="w-20 flex items-center justify-end">
                      {driver.trend === "up" ? (
                        <span className="text-xs text-green-600 flex items-center gap-1"><TrendingUp className="h-3 w-3" />+{driver.change}</span>
                      ) : driver.trend === "down" ? (
                        <span className="text-xs text-red-500 flex items-center gap-1"><TrendingDown className="h-3 w-3" />{driver.change}</span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Anonymous Feedback ── */}
        <TabsContent value="feedback" className="space-y-4">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base">Submit Anonymous Feedback</CardTitle>
              <CardDescription>Your feedback is completely anonymous and helps improve our workplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share what's on your mind…"
                className="rounded-xl resize-none"
                rows={3}
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
              />
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl">
                <Send className="h-4 w-4 mr-2" />Submit Anonymously
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {feedbackItems.map((item) => (
              <div key={item.id} className={`p-4 rounded-2xl border-l-4 ${SentimentColor(item.sentiment)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <SentimentIcon sentiment={item.sentiment} />
                    <p className="text-sm flex-1">{item.text}</p>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <Badge variant="secondary" className="text-xs rounded-lg">{item.dept}</Badge>
                    <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
