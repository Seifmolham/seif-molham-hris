"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  Building2,
  Sparkles,
  Zap,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

interface DashboardProps {
  userRole: "Employee" | "Manager" | "HR" | "Admin"
  onNavigate?: (module: string) => void
}

export function Dashboard({ userRole, onNavigate }: DashboardProps) {
  const getMetrics = () => {
    switch (userRole) {
      case "Admin":
      case "HR":
        return [
          {
            title: "Total Employees",
            value: "1,247",
            change: "+12%",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
            trend: "up",
          },
          {
            title: "New Hires",
            value: "23",
            change: "+8%",
            icon: UserPlus,
            color: "text-green-600",
            bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
            trend: "up",
          },
          {
            title: "Pending Requests",
            value: "15",
            change: "-5%",
            icon: Calendar,
            color: "text-orange-600",
            bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
            trend: "down",
          },
          {
            title: "Time to Hire",
            value: "18 days",
            change: "-3 days",
            icon: Clock,
            color: "text-purple-600",
            bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
            trend: "down",
          },
        ]
      case "Manager":
        return [
          {
            title: "Team Members",
            value: "12",
            change: "+1",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
            trend: "up",
          },
          {
            title: "Pending Approvals",
            value: "5",
            change: "+2",
            icon: AlertCircle,
            color: "text-orange-600",
            bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
            trend: "up",
          },
          {
            title: "Team Performance",
            value: "87%",
            change: "+5%",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
            trend: "up",
          },
          {
            title: "Upcoming Reviews",
            value: "3",
            change: "0",
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
            trend: "neutral",
          },
        ]
      default:
        return [
          {
            title: "Leave Balance",
            value: "18 days",
            change: "-2 days",
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
            trend: "down",
          },
          {
            title: "Pending Requests",
            value: "2",
            change: "+1",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
            trend: "up",
          },
          {
            title: "Training Progress",
            value: "75%",
            change: "+15%",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
            trend: "up",
          },
          {
            title: "Next Review",
            value: "45 days",
            change: "-15 days",
            icon: AlertCircle,
            color: "text-purple-600",
            bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
            trend: "down",
          },
        ]
    }
  }

  const getQuickActions = () => {
    switch (userRole) {
      case "Admin":
      case "HR":
        return [
          {
            title: "Add New Employee",
            description: "Onboard a new team member",
            action: "Add Employee",
            icon: UserPlus,
            color: "bg-blue-500",
          },
          {
            title: "Review Applications",
            description: "5 pending job applications",
            action: "Review",
            icon: Target,
            color: "bg-purple-500",
          },
          {
            title: "Generate Reports",
            description: "Monthly HR analytics",
            action: "Generate",
            icon: TrendingUp,
            color: "bg-green-500",
          },
          {
            title: "Manage Departments",
            description: "Update org structure",
            action: "Manage",
            icon: Building2,
            color: "bg-orange-500",
          },
        ]
      case "Manager":
        return [
          {
            title: "Approve Leave Requests",
            description: "5 pending approvals",
            action: "Review",
            icon: CheckCircle,
            color: "bg-gradient-to-r from-green-500 to-emerald-500",
          },
          {
            title: "Team Performance",
            description: "Conduct team reviews",
            action: "Review",
            icon: Award,
            color: "bg-gradient-to-r from-purple-500 to-indigo-500",
          },
          {
            title: "Job Requisitions",
            description: "Create new job posting",
            action: "Create",
            icon: UserPlus,
            color: "bg-gradient-to-r from-blue-500 to-cyan-500",
          },
          {
            title: "Team Reports",
            description: "View team analytics",
            action: "View",
            icon: TrendingUp,
            color: "bg-gradient-to-r from-orange-500 to-red-500",
          },
        ]
      default:
        return [
          {
            title: "Request Leave",
            description: "Submit time off request",
            action: "Request",
            icon: Calendar,
            color: "bg-gradient-to-r from-blue-500 to-cyan-500",
          },
          {
            title: "Update Profile",
            description: "Keep your info current",
            action: "Update",
            icon: Users,
            color: "bg-gradient-to-r from-green-500 to-emerald-500",
          },
          {
            title: "View Payslip",
            description: "Download latest payslip",
            action: "Download",
            icon: DollarSign,
            color: "bg-gradient-to-r from-purple-500 to-pink-500",
          },
          {
            title: "Enroll in Training",
            description: "Browse available courses",
            action: "Browse",
            icon: Sparkles,
            color: "bg-gradient-to-r from-orange-500 to-red-500",
          },
        ]
    }
  }

  const getRecentActivity = () => {
    switch (userRole) {
      case "Admin":
      case "HR":
        return [
          { action: "New employee onboarded", user: "John Smith", time: "2 hours ago", status: "success" },
          { action: "Leave request approved", user: "Sarah Johnson", time: "4 hours ago", status: "success" },
          { action: "Performance review submitted", user: "Mike Davis", time: "1 day ago", status: "pending" },
          { action: "Document uploaded", user: "Lisa Wilson", time: "2 days ago", status: "success" },
        ]
      case "Manager":
        return [
          { action: "Leave request submitted", user: "Team Member", time: "1 hour ago", status: "pending" },
          { action: "Performance goal updated", user: "You", time: "3 hours ago", status: "success" },
          { action: "Team meeting scheduled", user: "You", time: "1 day ago", status: "success" },
          { action: "Budget approval requested", user: "Finance", time: "2 days ago", status: "pending" },
        ]
      default:
        return [
          { action: "Leave request submitted", user: "You", time: "2 hours ago", status: "pending" },
          { action: "Training completed", user: "You", time: "1 day ago", status: "success" },
          { action: "Profile updated", user: "You", time: "3 days ago", status: "success" },
          { action: "Payslip downloaded", user: "You", time: "1 week ago", status: "success" },
        ]
    }
  }

  const metrics = getMetrics()
  const quickActions = getQuickActions()
  const recentActivity = getRecentActivity()

  return (
    <div className="space-y-8 p-1">
      {/* Valu-branded hero banner */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl"
        style={{ background: "linear-gradient(135deg, #00C5B3 0%, #00a89a 55%, #007a70 100%)" }}
      >
        {/* Subtle decorative layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
          {/* Light grey / white glow top-right */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -translate-y-40 translate-x-40"
            style={{ background: "rgba(255,255,255,0.12)" }} />
          {/* Orange accent glow bottom-left */}
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl translate-y-28 -translate-x-28"
            style={{ background: "rgba(255,80,0,0.18)" }} />
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />
        </div>

        <div className="relative flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Valu logo mark */}
            <div className="p-3 rounded-2xl border border-white/25 shadow-lg backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.18)" }}>
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-white/75 text-xs font-semibold uppercase tracking-[0.15em] mb-1">
                Valu People Platform
              </p>
              <h1 className="text-3xl font-bold drop-shadow-sm leading-tight">
                {userRole === "Employee"
                  ? "Welcome back, Seif 👋"
                  : userRole === "Manager"
                  ? "Good day, Seif"
                  : userRole === "HR"
                  ? "HR Overview"
                  : "Headcount Dashboard"}
              </h1>
              <p className="text-white/85 text-base mt-1">
                {userRole === "Employee"
                  ? "Here's what's happening at Valu today"
                  : userRole === "Manager"
                  ? "Your team is performing well this month"
                  : userRole === "HR"
                  ? "Manage people, policies, and programs"
                  : "Full visibility across the entire organisation"}
              </p>
            </div>
          </div>

          {/* Right side stat pill */}
          <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
            <div className="rounded-2xl px-5 py-3 text-right border border-white/20 shadow-md backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <p className="text-white/70 text-xs font-medium">Employees</p>
              <p className="text-white text-2xl font-bold">1,247</p>
            </div>
          </div>
        </div>

        {/* Badge row */}
        <div className="relative flex items-center gap-2 mt-5">
          <Badge className="border-white/30 text-white backdrop-blur-md shadow-sm"
            style={{ background: "rgba(255,255,255,0.18)" }}>
            <Zap className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
          <Badge className="border-white/30 text-white backdrop-blur-md shadow-sm"
            style={{ background: "rgba(255,80,0,0.35)", borderColor: "rgba(255,80,0,0.4)" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </Badge>
          {(userRole === "Admin" || userRole === "HR") && (
            <Badge className="border-white/30 text-white backdrop-blur-md shadow-sm"
              style={{ background: "rgba(255,255,255,0.18)" }}>
              <CheckCircle className="h-3 w-3 mr-1" />
              All systems normal
            </Badge>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${metric.bgColor}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">{metric.title}</CardTitle>
              <div
                className={`p-2 rounded-xl ${metric.color.replace("text-", "bg-").replace("-600", "-100")} dark:${metric.color.replace("text-", "bg-").replace("-600", "-900/30")}`}
              >
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{metric.value}</div>
              <div className="flex items-center gap-2">
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : metric.trend === "down" ? (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                ) : null}
                <span
                  className={`text-sm font-medium ${
                    metric.trend === "up"
                      ? "text-green-600"
                      : metric.trend === "down"
                        ? "text-red-600"
                        : "text-slate-500"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-secondary">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>Power up your workflow</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${action.color} shadow-lg`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
                    onClick={() => {
                      if (action.action === "Add Employee" || action.title.includes("Employee")) {
                        onNavigate?.("employees")
                      } else if (action.action === "Request" && action.title.includes("Leave")) {
                        onNavigate?.("leave")
                      } else if (action.title.includes("Reports")) {
                        onNavigate?.("analytics")
                      } else if (action.title.includes("Department")) {
                        onNavigate?.("departments")
                      } else {
                        console.log(`Action: ${action.action} for ${action.title}`)
                      }
                    }}
                  >
                    {action.action}
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Stay in the loop</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "success"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : activity.status === "pending"
                        ? "bg-orange-100 dark:bg-orange-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {activity.status === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : activity.status === "pending" ? (
                    <Clock className="h-4 w-4 text-orange-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </p>
                </div>
                <Badge
                  variant={activity.status === "success" ? "default" : "secondary"}
                  className={`${
                    activity.status === "success"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : activity.status === "pending"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  } border-0`}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Content Based on Role */}
      {(userRole === "HR" || userRole === "Admin") && (
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                <div className="p-2 rounded-xl bg-blue-500">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                Department Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Engineering</span>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">45 employees</span>
                </div>
                <Progress value={75} className="h-3 bg-blue-200 dark:bg-blue-800" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sales</span>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">32 employees</span>
                </div>
                <Progress value={60} className="h-3 bg-blue-200 dark:bg-blue-800" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Marketing</span>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">18 employees</span>
                </div>
                <Progress value={40} className="h-3 bg-blue-200 dark:bg-blue-800" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
                <div className="p-2 rounded-xl bg-green-500">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                Payroll Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Monthly Payroll</span>
                <span className="font-bold text-green-700 dark:text-green-300">$2,450,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Average Salary</span>
                <span className="font-bold text-green-700 dark:text-green-300">$85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Benefits Cost</span>
                <span className="font-bold text-green-700 dark:text-green-300">$85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Benefits Cost</span>
                <span className="font-bold text-green-700 dark:text-green-300">$485,000</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-800 dark:text-purple-200">
                <div className="p-2 rounded-xl bg-purple-500">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Employee Satisfaction</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">4.2/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Retention Rate</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Time to Fill</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">18 days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
