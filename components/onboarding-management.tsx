"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  Users,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Eye,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  Building,
  Target,
  Award,
  TrendingUp,
} from "lucide-react"

interface OnboardingTask {
  id: string
  title: string
  description: string
  category: "Documentation" | "Training" | "Setup" | "Meeting" | "Compliance"
  assignedTo: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed" | "Overdue"
  priority: "Low" | "Medium" | "High"
  completedDate?: string
  notes?: string
}

interface OnboardingProcess {
  id: string
  employeeName: string
  employeeEmail: string
  employeePhone: string
  position: string
  department: string
  startDate: string
  manager: string
  buddy: string
  status: "Not Started" | "In Progress" | "Completed"
  progress: number
  tasks: OnboardingTask[]
  documents: string[]
  feedback: string[]
  milestones: {
    name: string
    completed: boolean
    date?: string
  }[]
}

const mockOnboardingProcesses: OnboardingProcess[] = [
  {
    id: "1",
    employeeName: "Ahmed Mahmoud",
    employeeEmail: "ahmed.mahmoud@company.com",
    employeePhone: "+20 123 456 7890",
    position: "Senior Developer",
    department: "Information Technology",
    startDate: "2024-02-01",
    manager: "Ahmed Hassan",
    buddy: "Omar Mahmoud",
    status: "In Progress",
    progress: 75,
    documents: ["Contract Signed", "ID Copy", "Medical Certificate", "Bank Details"],
    feedback: ["Great technical skills", "Quick learner", "Integrating well with team"],
    milestones: [
      { name: "Documentation Complete", completed: true, date: "2024-01-30" },
      { name: "IT Setup", completed: true, date: "2024-02-01" },
      { name: "Team Introduction", completed: true, date: "2024-02-01" },
      { name: "Training Program", completed: false },
      { name: "Performance Review", completed: false },
    ],
    tasks: [
      {
        id: "1",
        title: "Complete Employment Contract",
        description: "Sign and submit employment contract and related documents",
        category: "Documentation",
        assignedTo: "HR Team",
        dueDate: "2024-01-30",
        status: "Completed",
        priority: "High",
        completedDate: "2024-01-29",
        notes: "All documents submitted and verified",
      },
      {
        id: "2",
        title: "IT Equipment Setup",
        description: "Provide laptop, access cards, and necessary software",
        category: "Setup",
        assignedTo: "IT Team",
        dueDate: "2024-02-01",
        status: "Completed",
        priority: "High",
        completedDate: "2024-02-01",
        notes: "MacBook Pro, access cards, and all software installed",
      },
      {
        id: "3",
        title: "Office Tour and Introduction",
        description: "Introduce to team members and show office facilities",
        category: "Meeting",
        assignedTo: "Buddy",
        dueDate: "2024-02-01",
        status: "Completed",
        priority: "Medium",
        completedDate: "2024-02-01",
        notes: "Completed office tour, met all team members",
      },
      {
        id: "4",
        title: "Company Orientation Training",
        description: "Complete mandatory company orientation program",
        category: "Training",
        assignedTo: "HR Team",
        dueDate: "2024-02-05",
        status: "In Progress",
        priority: "High",
        notes: "50% completed, attending sessions regularly",
      },
      {
        id: "5",
        title: "Department-specific Training",
        description: "Complete technical training for development team",
        category: "Training",
        assignedTo: "Manager",
        dueDate: "2024-02-10",
        status: "Pending",
        priority: "Medium",
      },
      {
        id: "6",
        title: "Security Clearance",
        description: "Complete security background check and clearance",
        category: "Compliance",
        assignedTo: "Security Team",
        dueDate: "2024-02-08",
        status: "In Progress",
        priority: "High",
        notes: "Background check in progress",
      },
    ],
  },
  {
    id: "2",
    employeeName: "Nour Hassan",
    employeeEmail: "nour.hassan@company.com",
    employeePhone: "+20 123 456 7891",
    position: "HR Specialist",
    department: "Human Resources",
    startDate: "2024-02-15",
    manager: "Fatima Ali",
    buddy: "Mona Hassan",
    status: "Not Started",
    progress: 0,
    documents: [],
    feedback: [],
    milestones: [
      { name: "Documentation Complete", completed: false },
      { name: "IT Setup", completed: false },
      { name: "Team Introduction", completed: false },
      { name: "Training Program", completed: false },
      { name: "Performance Review", completed: false },
    ],
    tasks: [],
  },
]

export function OnboardingManagement() {
  const [onboardingProcesses, setOnboardingProcesses] = useState<OnboardingProcess[]>(mockOnboardingProcesses)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewProcessDialogOpen, setIsNewProcessDialogOpen] = useState(false)
  const [selectedProcess, setSelectedProcess] = useState<OnboardingProcess | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredOnboarding = onboardingProcesses.filter((process) => {
    const matchesSearch =
      process.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || process.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalOnboarding = onboardingProcesses.length
  const activeOnboarding = onboardingProcesses.filter((p) => p.status === "In Progress").length
  const completedOnboarding = onboardingProcesses.filter((p) => p.status === "Completed").length
  const avgProgress = Math.round(
    onboardingProcesses.reduce((sum, p) => sum + p.progress, 0) / onboardingProcesses.length,
  )

  const handleViewDetails = (process: OnboardingProcess) => {
    setSelectedProcess(process)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/10 opacity-20" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-4 translate-y-4" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Onboarding & Offboarding</h1>
              <p className="text-primary-foreground/80 text-lg">
                Comprehensive employee onboarding and offboarding management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Onboarding</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{totalOnboarding}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">{activeOnboarding} active processes</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(activeOnboarding / totalOnboarding) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Completed</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <CheckCircle className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{completedOnboarding}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">This month</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${(completedOnboarding / totalOnboarding) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Avg. Progress</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{avgProgress}%</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">Completion rate</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${avgProgress}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pending Tasks</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <AlertCircle className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {onboardingProcesses.reduce((sum, p) => sum + p.tasks.filter((t) => t.status === "Pending").length, 0)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Across all processes</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: "65%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="onboarding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="space-y-4">
          {/* Search and Filters */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search onboarding processes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isNewProcessDialogOpen} onOpenChange={setIsNewProcessDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Process
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Start New Onboarding Process</DialogTitle>
                      <DialogDescription>Create a new onboarding process for a new employee.</DialogDescription>
                    </DialogHeader>
                    <OnboardingForm
                      onSubmit={() => setIsNewProcessDialogOpen(false)}
                      setOnboardingProcesses={setOnboardingProcesses}
                      onboardingProcesses={onboardingProcesses}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Processes */}
          <div className="grid gap-4">
            {filteredOnboarding.map((process) => (
              <Card key={process.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-white">
                          {process.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{process.employeeName}</CardTitle>
                        <CardDescription>
                          {process.position} • {process.department}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Start: {new Date(process.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Manager: {process.manager}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Buddy: {process.buddy}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        process.status === "Completed"
                          ? "default"
                          : process.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        process.status === "Completed"
                          ? "bg-primary text-white"
                          : process.status === "In Progress"
                            ? "bg-secondary text-white"
                            : ""
                      }
                    >
                      {process.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-muted-foreground">{process.progress}%</span>
                      </div>
                      <Progress value={process.progress} className="h-2" />
                    </div>

                    {process.tasks.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Recent Tasks ({process.tasks.length})</h4>
                        <div className="space-y-2">
                          {process.tasks.slice(0, 3).map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Checkbox checked={task.status === "Completed"} />
                                <div>
                                  <p className="font-medium text-sm">{task.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {task.category} • Due: {new Date(task.dueDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  task.status === "Completed"
                                    ? "default"
                                    : task.status === "In Progress"
                                      ? "secondary"
                                      : task.status === "Overdue"
                                        ? "destructive"
                                        : "outline"
                                }
                                className={
                                  task.status === "Completed"
                                    ? "bg-primary text-white"
                                    : task.status === "In Progress"
                                      ? "bg-secondary text-white"
                                      : ""
                                }
                              >
                                {task.status}
                              </Badge>
                            </div>
                          ))}
                          {process.tasks.length > 3 && (
                            <p className="text-sm text-muted-foreground text-center">
                              +{process.tasks.length - 3} more tasks
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(process)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Send Reminder
                      </Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Task
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offboarding" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Offboarding Processes</CardTitle>
              <CardDescription>Manage employee departures and exit procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Active Offboarding</h3>
                <p className="text-muted-foreground mb-4">No employees are currently in the offboarding process.</p>
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Offboarding Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Onboarding Templates</CardTitle>
              <CardDescription>Pre-configured templates for different roles and departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Software Developer", tasks: 12, duration: "2 weeks", color: "bg-primary" },
                  { name: "Sales Representative", tasks: 8, duration: "1 week", color: "bg-secondary" },
                  { name: "HR Specialist", tasks: 10, duration: "10 days", color: "bg-primary" },
                  { name: "Marketing Manager", tasks: 15, duration: "3 weeks", color: "bg-secondary" },
                  { name: "Finance Analyst", tasks: 9, duration: "1.5 weeks", color: "bg-primary" },
                  { name: "General Employee", tasks: 6, duration: "1 week", color: "bg-secondary" },
                ].map((template, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center mb-2`}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Tasks:</span>
                          <span className="font-medium">{template.tasks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{template.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className={`flex-1 ${template.color} hover:opacity-90`}>
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Onboarding Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Completion Time</span>
                  <span className="font-medium text-primary">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium text-primary">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Employee Satisfaction</span>
                  <span className="font-medium text-primary">4.6/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time to Productivity</span>
                  <span className="font-medium text-primary">18 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Recent Completions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "John Smith", position: "Developer", date: "2024-01-28", rating: 5 },
                  { name: "Lisa Johnson", position: "Designer", date: "2024-01-25", rating: 4 },
                  { name: "Mike Wilson", position: "Analyst", date: "2024-01-22", rating: 5 },
                ].map((completion, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{completion.name}</p>
                      <p className="text-sm text-muted-foreground">{completion.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{new Date(completion.date).toLocaleDateString()}</p>
                      <div className="flex">
                        {[...Array(completion.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed View Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedProcess && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">
                      {selectedProcess.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-bold">{selectedProcess.employeeName}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedProcess.position} • {selectedProcess.department}
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription>Comprehensive onboarding details and progress tracking</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Employee Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedProcess.employeeEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedProcess.employeePhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedProcess.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Start Date: {new Date(selectedProcess.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Progress Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">{selectedProcess.progress}%</span>
                          </div>
                          <Progress value={selectedProcess.progress} className="h-3" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {selectedProcess.tasks.filter((t) => t.status === "Completed").length}
                            </div>
                            <div className="text-xs text-muted-foreground">Completed Tasks</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-secondary">
                              {selectedProcess.tasks.filter((t) => t.status === "Pending").length}
                            </div>
                            <div className="text-xs text-muted-foreground">Pending Tasks</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Tasks ({selectedProcess.tasks.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProcess.tasks.map((task) => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{task.title}</div>
                                  <div className="text-sm text-muted-foreground">{task.description}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{task.category}</Badge>
                              </TableCell>
                              <TableCell>{task.assignedTo}</TableCell>
                              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    task.status === "Completed"
                                      ? "default"
                                      : task.status === "In Progress"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className={
                                    task.status === "Completed"
                                      ? "bg-primary text-white"
                                      : task.status === "In Progress"
                                        ? "bg-secondary text-white"
                                        : ""
                                  }
                                >
                                  {task.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    task.priority === "High"
                                      ? "destructive"
                                      : task.priority === "Medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {task.priority}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {selectedProcess.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="font-medium">{doc}</span>
                            </div>
                            <Badge className="bg-primary text-white">Submitted</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback & Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedProcess.feedback.map((feedback, index) => (
                          <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageSquare className="h-4 w-4 text-primary" />
                              <span className="font-medium">Manager Feedback</span>
                            </div>
                            <p className="text-sm">{feedback}</p>
                          </div>
                        ))}
                        <div className="mt-4">
                          <Label htmlFor="new-feedback">Add New Feedback</Label>
                          <Textarea id="new-feedback" placeholder="Enter your feedback..." className="mt-2" />
                          <Button className="mt-2 bg-primary hover:bg-primary/90">Add Feedback</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Onboarding Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedProcess.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                            <div
                              className={`w-4 h-4 rounded-full ${milestone.completed ? "bg-primary" : "bg-gray-300"}`}
                            />
                            <div className="flex-1">
                              <div className="font-medium">{milestone.name}</div>
                              {milestone.date && (
                                <div className="text-sm text-muted-foreground">
                                  Completed: {new Date(milestone.date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            {milestone.completed && <CheckCircle className="h-5 w-5 text-primary" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OnboardingForm({
  onSubmit,
  setOnboardingProcesses,
  onboardingProcesses,
}: {
  onSubmit: () => void
  setOnboardingProcesses: React.Dispatch<React.SetStateAction<OnboardingProcess[]>>
  onboardingProcesses: OnboardingProcess[]
}) {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeEmail: "",
    employeePhone: "",
    position: "",
    department: "",
    startDate: "",
    manager: "",
    buddy: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProcess: OnboardingProcess = {
      id: Date.now().toString(),
      ...formData,
      status: "Not Started",
      progress: 0,
      tasks: [],
      documents: [],
      feedback: [],
      milestones: [
        { name: "Documentation Complete", completed: false },
        { name: "IT Setup", completed: false },
        { name: "Team Introduction", completed: false },
        { name: "Training Program", completed: false },
        { name: "Performance Review", completed: false },
      ],
    }

    setOnboardingProcesses([...onboardingProcesses, newProcess])
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employeeName">Employee Name *</Label>
          <Input
            id="employeeName"
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeEmail">Employee Email *</Label>
          <Input
            id="employeeEmail"
            type="email"
            value={formData.employeeEmail}
            onChange={(e) => setFormData({ ...formData, employeeEmail: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeePhone">Phone Number</Label>
          <Input
            id="employeePhone"
            value={formData.employeePhone}
            onChange={(e) => setFormData({ ...formData, employeePhone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Information Technology">Information Technology</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manager">Manager *</Label>
          <Input
            id="manager"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buddy">Onboarding Buddy</Label>
          <Input
            id="buddy"
            value={formData.buddy}
            onChange={(e) => setFormData({ ...formData, buddy: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Start Onboarding Process
        </Button>
      </div>
    </form>
  )
}
