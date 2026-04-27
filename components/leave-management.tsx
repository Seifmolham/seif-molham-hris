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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Settings,
  TrendingUp,
  Users,
  AlertCircle,
  Download,
} from "lucide-react"

interface LeaveType {
  id: string
  name: string
  description: string
  maxDays: number
  carryForward: boolean
  requiresApproval: boolean
  color: string
  isActive: boolean
}

interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  department: string
  leaveType: string
  startDate: string
  endDate: string
  totalDays: number
  reason: string
  status: "Pending" | "Approved" | "Rejected" | "Cancelled"
  appliedDate: string
  approvedBy?: string
  approvedDate?: string
  rejectionReason?: string
  attachments?: string[]
}

interface LeaveBalance {
  employeeId: string
  employeeName: string
  department: string
  leaveType: string
  allocated: number
  used: number
  remaining: number
  carryForward: number
}

const mockLeaveTypes: LeaveType[] = [
  {
    id: "1",
    name: "Annual Leave",
    description: "Yearly vacation days",
    maxDays: 21,
    carryForward: true,
    requiresApproval: true,
    color: "bg-primary",
    isActive: true,
  },
  {
    id: "2",
    name: "Sick Leave",
    description: "Medical leave for illness",
    maxDays: 10,
    carryForward: false,
    requiresApproval: false,
    color: "bg-red-500",
    isActive: true,
  },
  {
    id: "3",
    name: "Personal Leave",
    description: "Personal time off",
    maxDays: 5,
    carryForward: false,
    requiresApproval: true,
    color: "bg-secondary",
    isActive: true,
  },
  {
    id: "4",
    name: "Maternity Leave",
    description: "Maternity leave for new mothers",
    maxDays: 90,
    carryForward: false,
    requiresApproval: true,
    color: "bg-pink-500",
    isActive: true,
  },
  {
    id: "5",
    name: "Paternity Leave",
    description: "Paternity leave for new fathers",
    maxDays: 14,
    carryForward: false,
    requiresApproval: true,
    color: "bg-blue-500",
    isActive: true,
  },
  {
    id: "6",
    name: "Emergency Leave",
    description: "Emergency situations",
    maxDays: 3,
    carryForward: false,
    requiresApproval: false,
    color: "bg-orange-500",
    isActive: true,
  },
  {
    id: "7",
    name: "Study Leave",
    description: "Educational purposes",
    maxDays: 10,
    carryForward: false,
    requiresApproval: true,
    color: "bg-purple-500",
    isActive: true,
  },
  {
    id: "8",
    name: "Bereavement Leave",
    description: "Loss of family member",
    maxDays: 5,
    carryForward: false,
    requiresApproval: false,
    color: "bg-gray-500",
    isActive: true,
  },
]

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "emp1",
    employeeName: "Ahmed Hassan",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2024-02-15",
    endDate: "2024-02-19",
    totalDays: 5,
    reason: "Family vacation",
    status: "Pending",
    appliedDate: "2024-02-01",
  },
  {
    id: "2",
    employeeId: "emp2",
    employeeName: "Fatima Ali",
    department: "Marketing",
    leaveType: "Sick Leave",
    startDate: "2024-02-05",
    endDate: "2024-02-07",
    totalDays: 3,
    reason: "Medical treatment",
    status: "Approved",
    appliedDate: "2024-02-04",
    approvedBy: "Manager",
    approvedDate: "2024-02-04",
  },
  {
    id: "3",
    employeeId: "emp3",
    employeeName: "Omar Mahmoud",
    department: "Sales",
    leaveType: "Personal Leave",
    startDate: "2024-02-20",
    endDate: "2024-02-21",
    totalDays: 2,
    reason: "Personal matters",
    status: "Rejected",
    appliedDate: "2024-01-30",
    rejectionReason: "Insufficient notice period",
  },
]

const mockLeaveBalances: LeaveBalance[] = [
  {
    employeeId: "emp1",
    employeeName: "Ahmed Hassan",
    department: "Engineering",
    leaveType: "Annual Leave",
    allocated: 21,
    used: 8,
    remaining: 13,
    carryForward: 2,
  },
  {
    employeeId: "emp1",
    employeeName: "Ahmed Hassan",
    department: "Engineering",
    leaveType: "Sick Leave",
    allocated: 10,
    used: 2,
    remaining: 8,
    carryForward: 0,
  },
  {
    employeeId: "emp2",
    employeeName: "Fatima Ali",
    department: "Marketing",
    leaveType: "Annual Leave",
    allocated: 21,
    used: 12,
    remaining: 9,
    carryForward: 1,
  },
]

export function LeaveManagement() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(mockLeaveTypes)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests)
  const [leaveBalances] = useState<LeaveBalance[]>(mockLeaveBalances)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)
  const [isNewTypeOpen, setIsNewTypeOpen] = useState(false)

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.leaveType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRequests = leaveRequests.length
  const pendingRequests = leaveRequests.filter((r) => r.status === "Pending").length
  const approvedRequests = leaveRequests.filter((r) => r.status === "Approved").length
  const rejectedRequests = leaveRequests.filter((r) => r.status === "Rejected").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-primary text-white"
      case "Pending":
        return "bg-secondary text-white"
      case "Rejected":
        return "bg-red-500 text-white"
      case "Cancelled":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleApproveRequest = (requestId: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "Approved" as const,
              approvedBy: "Current User",
              approvedDate: new Date().toISOString().split("T")[0],
            }
          : req,
      ),
    )
  }

  const handleRejectRequest = (requestId: string, reason: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Rejected" as const, rejectionReason: reason } : req,
      ),
    )
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
              <CalendarIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Leave Management</h1>
              <p className="text-primary-foreground/80 text-lg">Comprehensive leave tracking and approval system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Requests</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{totalRequests}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">This month</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "75%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pending Approval</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{pendingRequests}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Needs attention</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${(pendingRequests / totalRequests) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Approved</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{approvedRequests}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">This month</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(approvedRequests / totalRequests) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Leave Types</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <Settings className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {leaveTypes.filter((t) => t.isActive).length}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Active types</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: "90%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balances">Leave Balances</TabsTrigger>
          <TabsTrigger value="types">Leave Types</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {/* Search and Filters */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leave requests..."
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
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Submit Leave Request</DialogTitle>
                      <DialogDescription>Create a new leave request for approval.</DialogDescription>
                    </DialogHeader>
                    <LeaveRequestForm
                      onSubmit={() => setIsNewRequestOpen(false)}
                      leaveTypes={leaveTypes}
                      setLeaveRequests={setLeaveRequests}
                      leaveRequests={leaveRequests}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Leave Requests ({filteredRequests.length})
                  </CardTitle>
                  <CardDescription>Manage and track all leave requests</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              {request.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{request.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${leaveTypes.find((t) => t.name === request.leaveType)?.color || "bg-gray-500"} text-white border-0`}
                        >
                          {request.leaveType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {new Date(request.startDate).toLocaleDateString()} -{" "}
                            {new Date(request.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">{request.reason}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.totalDays} days</div>
                      </TableCell>
                      <TableCell>{new Date(request.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {request.status === "Pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectRequest(request.id, "Rejected by manager")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balances" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Leave Balances
              </CardTitle>
              <CardDescription>Track employee leave allocations and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from(new Set(leaveBalances.map((b) => b.employeeName))).map((employeeName) => {
                  const employeeBalances = leaveBalances.filter((b) => b.employeeName === employeeName)
                  const employee = employeeBalances[0]

                  return (
                    <Card key={employeeName} className="border border-slate-200 dark:border-slate-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-white">
                              {employee.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{employee.employeeName}</CardTitle>
                            <CardDescription>{employee.department}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {employeeBalances.map((balance) => (
                            <div key={balance.leaveType} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{balance.leaveType}</h4>
                                <Badge
                                  variant="outline"
                                  className={`${leaveTypes.find((t) => t.name === balance.leaveType)?.color || "bg-gray-500"} text-white border-0`}
                                >
                                  {balance.remaining}/{balance.allocated}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Used:</span>
                                  <span className="font-medium">{balance.used} days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Remaining:</span>
                                  <span className="font-medium text-primary">{balance.remaining} days</span>
                                </div>
                                {balance.carryForward > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span>Carry Forward:</span>
                                    <span className="font-medium text-secondary">{balance.carryForward} days</span>
                                  </div>
                                )}
                                <Progress value={(balance.used / balance.allocated) * 100} className="h-2 mt-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Leave Types ({leaveTypes.length})
                  </CardTitle>
                  <CardDescription>Configure available leave types and policies</CardDescription>
                </div>
                <Dialog open={isNewTypeOpen} onOpenChange={setIsNewTypeOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Leave Type
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Leave Type</DialogTitle>
                      <DialogDescription>Add a new leave type to the system.</DialogDescription>
                    </DialogHeader>
                    <LeaveTypeForm
                      onSubmit={() => setIsNewTypeOpen(false)}
                      setLeaveTypes={setLeaveTypes}
                      leaveTypes={leaveTypes}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {leaveTypes.map((type) => (
                  <Card key={type.id} className="border border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 ${type.color} rounded-lg flex items-center justify-center`}>
                          <CalendarIcon className="h-4 w-4 text-white" />
                        </div>
                        <Badge
                          variant={type.isActive ? "default" : "outline"}
                          className={type.isActive ? "bg-primary text-white" : ""}
                        >
                          {type.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Max Days:</span>
                          <span className="font-medium">{type.maxDays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carry Forward:</span>
                          <span className="font-medium">{type.carryForward ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Requires Approval:</span>
                          <span className="font-medium">{type.requiresApproval ? "Yes" : "No"}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {type.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Leave Calendar
              </CardTitle>
              <CardDescription>Visual overview of team leave schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Leave Calendar View</h3>
                <p className="text-muted-foreground mb-4">Interactive calendar showing all team leave schedules</p>
                <Button className="bg-primary hover:bg-primary/90">View Full Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Leave Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Leave Days/Employee</span>
                  <span className="font-medium text-primary">18.5 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Most Popular Leave Type</span>
                  <span className="font-medium text-primary">Annual Leave</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Approval Rate</span>
                  <span className="font-medium text-primary">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peak Leave Month</span>
                  <span className="font-medium text-primary">December</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-secondary" />
                  Department Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { department: "Engineering", usage: 85, color: "bg-primary" },
                  { department: "Marketing", usage: 72, color: "bg-secondary" },
                  { department: "Sales", usage: 68, color: "bg-primary" },
                  { department: "HR", usage: 91, color: "bg-secondary" },
                  { department: "Finance", usage: 76, color: "bg-primary" },
                ].map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <span className="text-sm text-muted-foreground">{dept.usage}%</span>
                    </div>
                    <Progress value={dept.usage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LeaveRequestForm({
  onSubmit,
  leaveTypes,
  setLeaveRequests,
  leaveRequests,
}: {
  onSubmit: () => void
  leaveTypes: LeaveType[]
  setLeaveRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>
  leaveRequests: LeaveRequest[]
}) {
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      employeeId: "current-user",
      employeeName: formData.employeeName,
      department: "Current Department",
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays,
      reason: formData.reason,
      status: "Pending",
      appliedDate: new Date().toISOString().split("T")[0],
    }

    setLeaveRequests([...leaveRequests, newRequest])
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="leaveType">Leave Type *</Label>
        <Select value={formData.leaveType} onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select leave type" />
          </SelectTrigger>
          <SelectContent>
            {leaveTypes
              .filter((t) => t.isActive)
              .map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Reason *</Label>
        <Textarea
          id="reason"
          placeholder="Please provide reason for leave..."
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Submit Request
        </Button>
      </div>
    </form>
  )
}

function LeaveTypeForm({
  onSubmit,
  setLeaveTypes,
  leaveTypes,
}: {
  onSubmit: () => void
  setLeaveTypes: React.Dispatch<React.SetStateAction<LeaveType[]>>
  leaveTypes: LeaveType[]
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxDays: "",
    carryForward: false,
    requiresApproval: true,
    color: "bg-primary",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newType: LeaveType = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      maxDays: Number.parseInt(formData.maxDays),
      carryForward: formData.carryForward,
      requiresApproval: formData.requiresApproval,
      color: formData.color,
      isActive: true,
    }

    setLeaveTypes([...leaveTypes, newType])
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Leave Type Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe this leave type..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxDays">Maximum Days *</Label>
        <Input
          id="maxDays"
          type="number"
          value={formData.maxDays}
          onChange={(e) => setFormData({ ...formData, maxDays: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bg-primary">Primary</SelectItem>
            <SelectItem value="bg-secondary">Secondary</SelectItem>
            <SelectItem value="bg-red-500">Red</SelectItem>
            <SelectItem value="bg-blue-500">Blue</SelectItem>
            <SelectItem value="bg-green-500">Green</SelectItem>
            <SelectItem value="bg-purple-500">Purple</SelectItem>
            <SelectItem value="bg-orange-500">Orange</SelectItem>
            <SelectItem value="bg-pink-500">Pink</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Create Leave Type
        </Button>
      </div>
    </form>
  )
}
