"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  MessageSquare,
  Laptop,
  Key,
  FileText,
  Calendar,
  Plus,
  ChevronRight,
  Star,
  TrendingDown,
  Briefcase,
  UserMinus,
} from "lucide-react"

interface OffboardingEmployee {
  id: string
  name: string
  department: string
  title: string
  lastDay: string
  reason: "Resignation" | "Retirement" | "Mutual Agreement" | "Redundancy" | "Performance"
  manager: string
  progress: number
  status: "Active" | "Completed" | "Pending"
  checklist: ChecklistItem[]
}

interface ChecklistItem {
  id: string
  task: string
  category: "HR" | "IT" | "Finance" | "Manager" | "Legal"
  completed: boolean
  dueDate: string
  assignee: string
}

interface ExitInterview {
  id: string
  employee: string
  date: string
  interviewer: string
  status: "Scheduled" | "Completed" | "Declined"
  primaryReason: string
  wouldRehire: boolean | null
  nps: number | null
}

const offboardingEmployees: OffboardingEmployee[] = [
  {
    id: "1",
    name: "Khaled Ibrahim",
    department: "Technology",
    title: "Senior Software Engineer",
    lastDay: "2024-02-15",
    reason: "Resignation",
    manager: "Sara Ahmed",
    progress: 65,
    status: "Active",
    checklist: [
      { id: "1", task: "Return laptop and accessories", category: "IT", completed: false, dueDate: "2024-02-15", assignee: "IT Dept" },
      { id: "2", task: "Revoke system access (AD, GitHub, AWS)", category: "IT", completed: false, dueDate: "2024-02-15", assignee: "IT Dept" },
      { id: "3", task: "Knowledge transfer documentation", category: "Manager", completed: true, dueDate: "2024-02-10", assignee: "Sara Ahmed" },
      { id: "4", task: "Handover projects to team", category: "Manager", completed: true, dueDate: "2024-02-12", assignee: "Sara Ahmed" },
      { id: "5", task: "Final payroll processing", category: "Finance", completed: false, dueDate: "2024-02-20", assignee: "Finance Dept" },
      { id: "6", task: "Benefits termination notice", category: "HR", completed: true, dueDate: "2024-02-01", assignee: "HR Dept" },
      { id: "7", task: "Return company ID and access cards", category: "HR", completed: false, dueDate: "2024-02-15", assignee: "HR Dept" },
      { id: "8", task: "Sign non-disclosure agreement", category: "Legal", completed: true, dueDate: "2024-02-05", assignee: "Legal Dept" },
      { id: "9", task: "Exit interview scheduled", category: "HR", completed: true, dueDate: "2024-02-12", assignee: "HR Dept" },
      { id: "10", task: "Reference letter issued", category: "HR", completed: false, dueDate: "2024-02-20", assignee: "HR Dept" },
    ],
  },
  {
    id: "2",
    name: "Dr. Mohamed Farid",
    department: "Finance",
    title: "Finance Director",
    lastDay: "2024-03-31",
    reason: "Retirement",
    manager: "Ahmed Hassan (CEO)",
    progress: 30,
    status: "Active",
    checklist: [
      { id: "1", task: "Succession planning documentation", category: "Manager", completed: true, dueDate: "2024-02-15", assignee: "Ahmed Hassan" },
      { id: "2", task: "Pension fund processing", category: "Finance", completed: false, dueDate: "2024-03-15", assignee: "Finance Dept" },
      { id: "3", task: "Transition documents for new hire", category: "Manager", completed: false, dueDate: "2024-03-01", assignee: "Ahmed Hassan" },
      { id: "4", task: "System access revocation", category: "IT", completed: false, dueDate: "2024-03-31", assignee: "IT Dept" },
    ],
  },
]

const exitInterviews: ExitInterview[] = [
  { id: "1", employee: "Khaled Ibrahim", date: "2024-02-12", interviewer: "Mohamed Ali (HR)", status: "Completed", primaryReason: "Better compensation offer", wouldRehire: true, nps: 8 },
  { id: "2", employee: "Dr. Mohamed Farid", date: "2024-03-20", interviewer: "Sara Ahmed (HR)", status: "Scheduled", primaryReason: "Retirement", wouldRehire: null, nps: null },
]

const attritionReasons = [
  { reason: "Better Compensation", count: 34, pct: 42 },
  { reason: "Career Growth", count: 18, pct: 22 },
  { reason: "Work-Life Balance", count: 12, pct: 15 },
  { reason: "Management Issues", count: 8, pct: 10 },
  { reason: "Relocation", count: 6, pct: 7 },
  { reason: "Other", count: 3, pct: 4 },
]

function ReasonColor(reason: string) {
  const map: Record<string, string> = {
    Resignation: "bg-orange-100 text-orange-700",
    Retirement: "bg-blue-100 text-blue-700",
    "Mutual Agreement": "bg-purple-100 text-purple-700",
    Redundancy: "bg-red-100 text-red-700",
    Performance: "bg-red-100 text-red-700",
  }
  return map[reason] || "bg-slate-100 text-slate-700"
}

function CategoryColor(cat: string) {
  const map: Record<string, string> = {
    IT: "bg-blue-100 text-blue-700",
    HR: "bg-purple-100 text-purple-700",
    Finance: "bg-green-100 text-green-700",
    Manager: "bg-orange-100 text-orange-700",
    Legal: "bg-red-100 text-red-700",
  }
  return map[cat] || "bg-slate-100 text-slate-700"
}

const emptyInitForm = {
  employeeName: "",
  employeeTitle: "",
  department: "",
  manager: "",
  lastDay: "",
  reason: "" as OffboardingEmployee["reason"] | "",
  notes: "",
}

export function OffboardingManagement() {
  const [activeTab, setActiveTab] = useState("active")
  const [employees, setEmployees] = useState<OffboardingEmployee[]>(offboardingEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState<OffboardingEmployee | null>(offboardingEmployees[0])
  const [showInitiate, setShowInitiate] = useState(false)
  const [initForm, setInitForm] = useState(emptyInitForm)
  const [initErrors, setInitErrors] = useState<Partial<typeof emptyInitForm>>({})

  const validateInit = () => {
    const errs: Partial<typeof emptyInitForm> = {}
    if (!initForm.employeeName.trim()) errs.employeeName = "Employee name is required"
    if (!initForm.lastDay) errs.lastDay = "Last day is required"
    if (!initForm.reason) errs.reason = "Reason is required"
    if (!initForm.manager.trim()) errs.manager = "Manager is required"
    setInitErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleInitiateOffboarding = () => {
    if (!validateInit()) return
    const defaultChecklist: ChecklistItem[] = [
      { id: "1", task: "Return laptop and accessories", category: "IT", completed: false, dueDate: initForm.lastDay, assignee: "IT Dept" },
      { id: "2", task: "Revoke system access", category: "IT", completed: false, dueDate: initForm.lastDay, assignee: "IT Dept" },
      { id: "3", task: "Knowledge transfer documentation", category: "Manager", completed: false, dueDate: initForm.lastDay, assignee: initForm.manager },
      { id: "4", task: "Final payroll processing", category: "Finance", completed: false, dueDate: initForm.lastDay, assignee: "Finance Dept" },
      { id: "5", task: "Benefits termination notice", category: "HR", completed: false, dueDate: initForm.lastDay, assignee: "HR Dept" },
      { id: "6", task: "Return company ID and access cards", category: "HR", completed: false, dueDate: initForm.lastDay, assignee: "HR Dept" },
      { id: "7", task: "Sign non-disclosure agreement", category: "Legal", completed: false, dueDate: initForm.lastDay, assignee: "Legal Dept" },
      { id: "8", task: "Exit interview scheduled", category: "HR", completed: false, dueDate: initForm.lastDay, assignee: "HR Dept" },
    ]
    const newEmployee: OffboardingEmployee = {
      id: String(Date.now()),
      name: initForm.employeeName.trim(),
      department: initForm.department.trim() || "Unknown",
      title: initForm.employeeTitle.trim() || "Employee",
      lastDay: initForm.lastDay,
      reason: initForm.reason as OffboardingEmployee["reason"],
      manager: initForm.manager.trim(),
      progress: 0,
      status: "Active",
      checklist: defaultChecklist,
    }
    setEmployees((prev) => [newEmployee, ...prev])
    setSelectedEmployee(newEmployee)
    setInitForm(emptyInitForm)
    setInitErrors({})
    setShowInitiate(false)
    setActiveTab("active")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <LogOut className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Offboarding Management</h1>
              <p className="text-slate-300 text-lg">Streamline employee exits with checklists and exit interviews</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Active Offboardings", value: "2", icon: Clock },
              { label: "Completed (YTD)", value: "81", icon: CheckCircle },
              { label: "Exit Interviews Done", value: "74", icon: MessageSquare },
              { label: "Attrition Rate", value: "12%", icon: TrendingDown },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-slate-300" />
                  <span className="text-slate-300 text-sm">{stat.label}</span>
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
          <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-slate-700 data-[state=active]:text-white">Active Offboardings</TabsTrigger>
          <TabsTrigger value="checklist" className="rounded-lg data-[state=active]:bg-slate-700 data-[state=active]:text-white">Checklist View</TabsTrigger>
          <TabsTrigger value="exit" className="rounded-lg data-[state=active]:bg-slate-700 data-[state=active]:text-white">Exit Interviews</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-slate-700 data-[state=active]:text-white">Attrition Analytics</TabsTrigger>
        </TabsList>

        {/* ── Active ── */}
        <TabsContent value="active" className="space-y-4">
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-slate-700 hover:bg-slate-800 text-white rounded-xl"
              onClick={() => setShowInitiate(true)}
            >
              <Plus className="h-4 w-4 mr-2" />Initiate Offboarding
            </Button>
          </div>
          <div className="grid gap-4">
            {employees.map((emp) => (
              <Card key={emp.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedEmployee(emp)}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                          {emp.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{emp.name}</h3>
                          <Badge className={`text-xs rounded-lg ${ReasonColor(emp.reason)}`}>{emp.reason}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{emp.title} · {emp.department}</p>
                        <p className="text-xs text-slate-500 mt-1">Manager: {emp.manager} · Last day: <span className="font-medium text-red-500">{emp.lastDay}</span></p>
                      </div>
                    </div>
                    <div className="text-right ml-4 space-y-2">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm text-slate-500">Progress</span>
                        <span className="font-bold">{emp.progress}%</span>
                      </div>
                      <Progress value={emp.progress} className="w-40 h-2" />
                      <p className="text-xs text-slate-400">
                        {emp.checklist.filter((c) => c.completed).length}/{emp.checklist.length} tasks done
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Checklist View ── */}
        <TabsContent value="checklist" className="space-y-4">
          {selectedEmployee && (
            <>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-sm">
                    {selectedEmployee.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedEmployee.name}</p>
                  <p className="text-sm text-slate-500">Last day: {selectedEmployee.lastDay}</p>
                </div>
                <Progress value={selectedEmployee.progress} className="w-48 h-2 ml-4" />
                <span className="text-sm font-medium">{selectedEmployee.progress}%</span>
              </div>
              <div className="space-y-2">
                {["IT", "HR", "Manager", "Finance", "Legal"].map((category) => {
                  const items = selectedEmployee.checklist.filter((c) => c.category === category)
                  if (items.length === 0) return null
                  return (
                    <Card key={category} className="rounded-2xl border-slate-200 dark:border-slate-700">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs rounded-lg ${CategoryColor(category)}`}>{category}</Badge>
                          <span className="text-sm text-slate-500">{items.filter((i) => i.completed).length}/{items.length} done</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <Checkbox checked={item.completed} className="rounded-md" />
                            <span className={`flex-1 text-sm ${item.completed ? "line-through text-slate-400" : ""}`}>{item.task}</span>
                            <span className="text-xs text-slate-400">{item.assignee}</span>
                            <span className="text-xs text-slate-400">{item.dueDate}</span>
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-orange-400" />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </TabsContent>

        {/* ── Exit Interviews ── */}
        <TabsContent value="exit" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-slate-700 hover:bg-slate-800 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Schedule Interview
            </Button>
          </div>
          <div className="grid gap-4">
            {exitInterviews.map((interview) => (
              <Card key={interview.id} className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{interview.employee}</h3>
                        <Badge className={`text-xs rounded-lg ${interview.status === "Completed" ? "bg-green-100 text-green-700" : interview.status === "Scheduled" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                          {interview.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">{interview.date} · {interview.interviewer}</p>
                      {interview.primaryReason && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Reason: {interview.primaryReason}</p>}
                    </div>
                    {interview.status === "Completed" && (
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 mb-1">Would Rehire</p>
                          <Badge className={interview.wouldRehire ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {interview.wouldRehire ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 mb-1">Exit NPS</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{interview.nps}/10</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Analytics ── */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Attrition Reasons</CardTitle>
                <CardDescription>Why employees are leaving — last 12 months</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {attritionReasons.map((reason) => (
                  <div key={reason.reason} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{reason.reason}</span>
                      <span className="font-medium">{reason.count} ({reason.pct}%)</span>
                    </div>
                    <Progress value={reason.pct} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Attrition by Department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { dept: "Technology", rate: 15, count: 35 },
                  { dept: "Sales", rate: 22, count: 34 },
                  { dept: "Operations", rate: 10, count: 31 },
                  { dept: "Marketing", rate: 8, count: 7 },
                  { dept: "Human Resources", rate: 6, count: 3 },
                  { dept: "Finance", rate: 5, count: 3 },
                ].map((dept) => (
                  <div key={dept.dept} className="flex items-center gap-3">
                    <span className="text-sm w-32">{dept.dept}</span>
                    <Progress value={dept.rate} max={25} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-10 text-right">{dept.rate}%</span>
                    <span className="text-xs text-slate-400 w-12 text-right">{dept.count} left</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Initiate Offboarding Dialog ── */}
      <Dialog open={showInitiate} onOpenChange={(open) => { setShowInitiate(open); if (!open) { setInitForm(emptyInitForm); setInitErrors({}) } }}>
        <DialogContent className="max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                <UserMinus className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              Initiate Offboarding
            </DialogTitle>
            <DialogDescription>Start the offboarding process for a departing employee.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Employee details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="ob-name">Employee Name <span className="text-red-500">*</span></Label>
                <Input
                  id="ob-name"
                  placeholder="e.g. Khaled Ibrahim"
                  className="rounded-xl"
                  value={initForm.employeeName}
                  onChange={(e) => setInitForm((f) => ({ ...f, employeeName: e.target.value }))}
                />
                {initErrors.employeeName && <p className="text-xs text-red-500">{initErrors.employeeName}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ob-title">Job Title</Label>
                <Input
                  id="ob-title"
                  placeholder="e.g. Senior Engineer"
                  className="rounded-xl"
                  value={initForm.employeeTitle}
                  onChange={(e) => setInitForm((f) => ({ ...f, employeeTitle: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ob-dept">Department</Label>
                <Input
                  id="ob-dept"
                  placeholder="e.g. Technology"
                  className="rounded-xl"
                  value={initForm.department}
                  onChange={(e) => setInitForm((f) => ({ ...f, department: e.target.value }))}
                />
              </div>
            </div>

            {/* Manager + Last Day */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ob-manager">Reporting Manager <span className="text-red-500">*</span></Label>
                <Input
                  id="ob-manager"
                  placeholder="e.g. Sara Ahmed"
                  className="rounded-xl"
                  value={initForm.manager}
                  onChange={(e) => setInitForm((f) => ({ ...f, manager: e.target.value }))}
                />
                {initErrors.manager && <p className="text-xs text-red-500">{initErrors.manager}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ob-lastday">Last Working Day <span className="text-red-500">*</span></Label>
                <Input
                  id="ob-lastday"
                  type="date"
                  className="rounded-xl"
                  value={initForm.lastDay}
                  onChange={(e) => setInitForm((f) => ({ ...f, lastDay: e.target.value }))}
                />
                {initErrors.lastDay && <p className="text-xs text-red-500">{initErrors.lastDay}</p>}
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <Label htmlFor="ob-reason">Reason for Leaving <span className="text-red-500">*</span></Label>
              <Select value={initForm.reason} onValueChange={(v) => setInitForm((f) => ({ ...f, reason: v as OffboardingEmployee["reason"] }))}>
                <SelectTrigger id="ob-reason" className="rounded-xl">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Resignation">Resignation</SelectItem>
                  <SelectItem value="Retirement">Retirement</SelectItem>
                  <SelectItem value="Mutual Agreement">Mutual Agreement</SelectItem>
                  <SelectItem value="Redundancy">Redundancy</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                </SelectContent>
              </Select>
              {initErrors.reason && <p className="text-xs text-red-500">{initErrors.reason}</p>}
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="ob-notes">Additional Notes</Label>
              <Textarea
                id="ob-notes"
                placeholder="Any context or instructions for the offboarding team..."
                className="rounded-xl resize-none min-h-[72px]"
                value={initForm.notes}
                onChange={(e) => setInitForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>

            {/* Info box */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
              <p>A standard offboarding checklist (IT, HR, Finance, Legal, Manager tasks) will be automatically created and assigned.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                className="flex-1 bg-slate-700 hover:bg-slate-800 text-white rounded-xl"
                onClick={handleInitiateOffboarding}
              >
                <UserMinus className="h-4 w-4 mr-2" />Start Offboarding
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => { setShowInitiate(false); setInitForm(emptyInitForm); setInitErrors({}) }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
