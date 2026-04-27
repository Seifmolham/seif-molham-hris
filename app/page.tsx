"use client"

import { useState } from "react"
import { HRISSidebar } from "@/components/hris-sidebar"
import { Dashboard } from "@/components/dashboard"
import { EmployeeManagement } from "@/components/employee-management"
import { LeaveManagement } from "@/components/leave-management"
import { DepartmentManagement } from "@/components/department-management"
import { OrgChart } from "@/components/org-chart"
import { OnboardingManagement } from "@/components/onboarding-management"
import { PerformanceManagement } from "@/components/performance-management"
import { LearningManagement } from "@/components/learning-management"
import { AttendanceManagement } from "@/components/attendance-management"
import { PayrollManagement } from "@/components/payroll-management"
import { SelfServicePortal } from "@/components/self-service-portal"
import { DocumentManagement } from "@/components/document-management"
import { HRLetters } from "@/components/hr-letters"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

// New modules
import { ATSManagement } from "@/components/ats-management"
import { CompensationManagement } from "@/components/compensation-management"
import { BenefitsManagement } from "@/components/benefits-management"
import { SurveysEngagement } from "@/components/surveys-engagement"
import { WorkforcePlanning } from "@/components/workforce-planning"
import { OffboardingManagement } from "@/components/offboarding-management"
import { CareerDevelopment } from "@/components/career-development"
import { CompanyFeed } from "@/components/company-feed"
import { Recognition } from "@/components/recognition"
import { ChangeOfStatus } from "@/components/change-of-status"
import { WorkflowMaker } from "@/components/workflow-maker"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeProvider } from "@/components/theme-provider"
import { Bell, Settings, ChevronDown, ShieldCheck, UserCog, Users, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserRole = "Employee" | "Manager" | "HR" | "Admin"

type ActiveModule =
  | "dashboard"
  | "company-feed"
  | "employees"
  | "departments"
  | "org-chart"
  | "ats"
  | "recruitment"
  | "onboarding"
  | "offboarding"
  | "career"
  | "performance"
  | "learning"
  | "workforce-planning"
  | "attendance"
  | "leave"
  | "payroll"
  | "compensation"
  | "benefits"
  | "surveys"
  | "recognition"
  | "status-changes"
  | "workflow-maker"
  | "self-service"
  | "documents"
  | "letters"
  | "analytics"
  | "settings"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          <Sun className="h-4 w-4 text-slate-600 dark:text-slate-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 text-slate-600 dark:text-slate-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-primary/10 text-primary font-medium" : ""}>
          <Sun className="h-4 w-4 mr-2" />Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-primary/10 text-primary font-medium" : ""}>
          <Moon className="h-4 w-4 mr-2" />Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function HRISApp() {
  const [userRole, setUserRole] = useState<UserRole>("Admin")
  const [activeModule, setActiveModule] = useState<ActiveModule>("dashboard")

  const getModuleTitle = (module: ActiveModule) => {
    const titles: Record<ActiveModule, string> = {
      dashboard: "Organization Insights",
      "company-feed": "Company Feed",
      employees: "Employee Management",
      departments: "Department Management",
      "org-chart": "Organization Chart",
      ats: "Applicant Tracking System",
      recruitment: "Recruitment",
      onboarding: "Onboarding",
      offboarding: "Offboarding",
      career: "Career Development & Goals",
      performance: "Performance Management",
      learning: "Learning & Development",
      "workforce-planning": "Workforce Planning",
      attendance: "Attendance Management",
      leave: "Leave Management",
      payroll: "Payroll Management",
      compensation: "Compensation & Equity",
      benefits: "Benefits Management",
      surveys: "Surveys & Engagement",
      recognition: "Recognition & Shoutouts",
      "status-changes": "Status Changes",
      "workflow-maker": "Workflow Maker",
      "self-service": "Employee Self Service",
      documents: "Document Management",
      letters: "HR Letters",
      analytics: "Analytics & Reports",
      settings: "System Settings",
    }
    return titles[module] ?? module
  }

  const handleNavigate = (module: string) => {
    setActiveModule(module as ActiveModule)
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />
      case "company-feed":
        return <CompanyFeed />
      case "employees":
        return <EmployeeManagement userRole={userRole} />
      case "departments":
        return <DepartmentManagement />
      case "org-chart":
        return <OrgChart />
      case "ats":
        return <ATSManagement />
      case "recruitment":
        return <ATSManagement />
      case "onboarding":
        return <OnboardingManagement />
      case "offboarding":
        return <OffboardingManagement />
      case "career":
        return <CareerDevelopment />
      case "performance":
        return <PerformanceManagement />
      case "learning":
        return <LearningManagement />
      case "workforce-planning":
        return <WorkforcePlanning />
      case "attendance":
        return <AttendanceManagement />
      case "leave":
        return <LeaveManagement />
      case "payroll":
        return <PayrollManagement />
      case "compensation":
        return <CompensationManagement />
      case "benefits":
        return <BenefitsManagement />
      case "surveys":
        return <SurveysEngagement />
      case "recognition":
        return <Recognition />
      case "status-changes":
        return <ChangeOfStatus />
      case "workflow-maker":
        return <WorkflowMaker />
      case "self-service":
        return <SelfServicePortal />
      case "documents":
        return <DocumentManagement />
      case "letters":
        return <HRLetters />
      case "analytics":
        return <AnalyticsDashboard />
      case "settings":
        return (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-white/10 opacity-20" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-4 translate-y-4" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Settings className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">System Settings</h1>
                    <p className="text-secondary-foreground/80 text-lg">
                      Configure system preferences and administrative settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">System Configuration Panel</h3>
              <p className="text-muted-foreground mb-6">
                Advanced system configuration with role-based access, security settings, and integration management.
              </p>
            </div>
          </div>
        )
      default:
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <HRISSidebar onNavigate={handleNavigate} activeModule={activeModule} userRole={userRole} />
          <SidebarInset className="flex-1 flex flex-col">
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4">
              <SidebarTrigger className="-ml-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-slate-300 dark:bg-slate-600" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveModule("dashboard")
                      }}
                      className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                    >
                      Seif Molham HRIS
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-slate-400" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-slate-900 dark:text-slate-100 font-medium">
                      {getModuleTitle(activeModule)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="ml-auto flex items-center gap-2">
                {/* Role Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 rounded-lg border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {userRole === "Admin" && <ShieldCheck className="h-4 w-4 text-primary" />}
                      {userRole === "HR" && <UserCog className="h-4 w-4 text-primary" />}
                      {userRole === "Manager" && <Users className="h-4 w-4 text-primary" />}
                      {userRole === "Employee" && <User className="h-4 w-4 text-primary" />}
                      <span className="hidden sm:inline">{userRole}</span>
                      <ChevronDown className="h-3 w-3 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="text-xs text-slate-500 font-normal">Switch View</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setUserRole("Admin")}
                      className={userRole === "Admin" ? "bg-primary/10 text-primary font-medium" : ""}
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Admin
                      <span className="ml-auto text-xs text-slate-400">Full access</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setUserRole("HR")}
                      className={userRole === "HR" ? "bg-primary/10 text-primary font-medium" : ""}
                    >
                      <UserCog className="h-4 w-4 mr-2" />
                      HR
                      <span className="ml-auto text-xs text-slate-400">HR modules</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setUserRole("Manager")}
                      className={userRole === "Manager" ? "bg-primary/10 text-primary font-medium" : ""}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manager
                      <span className="ml-auto text-xs text-slate-400">Team view</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => { setUserRole("Employee"); setActiveModule("dashboard") }}
                      className={userRole === "Employee" ? "bg-primary/10 text-primary font-medium" : ""}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Employee
                      <span className="ml-auto text-xs text-slate-400">Self-service</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ThemeToggle />

                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-white text-xs p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  onClick={() => setActiveModule("settings")}
                >
                  <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </Button>
              </div>
            </header>

            <main className="flex-1 overflow-auto">
              <div className="p-6">{renderActiveModule()}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
