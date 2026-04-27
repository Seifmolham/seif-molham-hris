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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Clock,
  Search,
  Users,
  CalendarIcon,
  MapPin,
  Smartphone,
  Wifi,
  Plus,
  Download,
  TrendingUp,
  UserCheck,
  Timer,
  BarChart3,
} from "lucide-react"
import { format } from "date-fns"

interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  department: string
  date: string
  checkIn?: string
  checkOut?: string
  workingHours: number
  overtimeHours: number
  status: "Present" | "Absent" | "Late" | "Half Day" | "Remote" | "On Leave"
  location: "Office" | "Remote" | "Field"
  checkInMethod: "Biometric" | "Mobile App" | "Manual" | "Card"
  notes?: string
  breaks: {
    start: string
    end: string
    duration: number
  }[]
}

interface Employee {
  id: string
  name: string
  department: string
  position: string
  workSchedule: {
    startTime: string
    endTime: string
    workingDays: string[]
  }
  attendanceRate: number
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "emp1",
    employeeName: "Ahmed Hassan",
    department: "Engineering",
    date: "2024-02-01",
    checkIn: "09:00",
    checkOut: "18:15",
    workingHours: 8.25,
    overtimeHours: 1.25,
    status: "Present",
    location: "Office",
    checkInMethod: "Biometric",
    breaks: [
      { start: "12:00", end: "13:00", duration: 60 },
      { start: "15:30", end: "15:45", duration: 15 },
    ],
  },
  {
    id: "2",
    employeeId: "emp2",
    employeeName: "Fatima Ali",
    department: "Marketing",
    date: "2024-02-01",
    checkIn: "09:30",
    checkOut: "17:45",
    workingHours: 7.25,
    overtimeHours: 0,
    status: "Late",
    location: "Office",
    checkInMethod: "Mobile App",
    breaks: [{ start: "12:30", end: "13:30", duration: 60 }],
  },
  {
    id: "3",
    employeeId: "emp3",
    employeeName: "Omar Mahmoud",
    department: "Sales",
    date: "2024-02-01",
    checkIn: "08:45",
    checkOut: "18:00",
    workingHours: 8.25,
    overtimeHours: 1.25,
    status: "Present",
    location: "Remote",
    checkInMethod: "Mobile App",
    breaks: [{ start: "12:00", end: "13:00", duration: 60 }],
  },
  {
    id: "4",
    employeeId: "emp4",
    employeeName: "Mona Hassan",
    department: "HR",
    date: "2024-02-01",
    status: "On Leave",
    location: "Office",
    checkInMethod: "Manual",
    workingHours: 0,
    overtimeHours: 0,
    breaks: [],
  },
  {
    id: "5",
    employeeId: "emp5",
    employeeName: "Youssef Ahmed",
    department: "Finance",
    date: "2024-02-01",
    status: "Absent",
    location: "Office",
    checkInMethod: "Biometric",
    workingHours: 0,
    overtimeHours: 0,
    breaks: [],
  },
]

const mockEmployees: Employee[] = [
  {
    id: "emp1",
    name: "Ahmed Hassan",
    department: "Engineering",
    position: "Senior Developer",
    workSchedule: {
      startTime: "09:00",
      endTime: "17:00",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    attendanceRate: 96,
  },
  {
    id: "emp2",
    name: "Fatima Ali",
    department: "Marketing",
    position: "Marketing Manager",
    workSchedule: {
      startTime: "09:00",
      endTime: "17:00",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    attendanceRate: 92,
  },
]

export function AttendanceManagement() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords)
  const [employees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false)

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || record.department === departmentFilter
    const matchesDate = record.date === format(selectedDate, "yyyy-MM-dd")
    return matchesSearch && matchesStatus && matchesDepartment && matchesDate
  })

  const todayStats = {
    present: attendanceRecords.filter((r) => r.status === "Present" && r.date === format(new Date(), "yyyy-MM-dd"))
      .length,
    late: attendanceRecords.filter((r) => r.status === "Late" && r.date === format(new Date(), "yyyy-MM-dd")).length,
    absent: attendanceRecords.filter((r) => r.status === "Absent" && r.date === format(new Date(), "yyyy-MM-dd"))
      .length,
    remote: attendanceRecords.filter((r) => r.location === "Remote" && r.date === format(new Date(), "yyyy-MM-dd"))
      .length,
    totalEmployees: 1247,
    avgWorkingHours: 8.2,
    totalOvertimeHours: attendanceRecords.reduce((sum, r) => sum + r.overtimeHours, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-primary text-white"
      case "Late":
        return "bg-secondary text-white"
      case "Absent":
        return "bg-red-500 text-white"
      case "Remote":
        return "bg-blue-500 text-white"
      case "On Leave":
        return "bg-gray-500 text-white"
      case "Half Day":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/10 opacity-20" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-4 translate-y-4" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Clock className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
              <p className="text-secondary-foreground/80 text-lg">
                Real-time attendance tracking and workforce analytics
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
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Present Today</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{todayStats.present}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">
                {Math.round((todayStats.present / todayStats.totalEmployees) * 100)}% attendance
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(todayStats.present / todayStats.totalEmployees) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Late Arrivals</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <Timer className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{todayStats.late}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">-5 from yesterday</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${(todayStats.late / todayStats.totalEmployees) * 100 * 10}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Remote Workers</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <Wifi className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{todayStats.remote}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">
                {Math.round((todayStats.remote / todayStats.totalEmployees) * 100)}% remote
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(todayStats.remote / todayStats.totalEmployees) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Overtime Hours</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {todayStats.totalOvertimeHours}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Today</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: "65%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="schedules">Work Schedules</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          {/* Filters */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Manual Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Manual Attendance Entry</DialogTitle>
                      <DialogDescription>Add attendance record manually</DialogDescription>
                    </DialogHeader>
                    <ManualEntryForm onSubmit={() => setIsManualEntryOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    Daily Attendance ({filteredRecords.length})
                  </CardTitle>
                  <CardDescription>Attendance records for {format(selectedDate, "MMMM dd, yyyy")}</CardDescription>
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
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Working Hours</TableHead>
                    <TableHead>Overtime</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              {record.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{record.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{record.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.checkIn && (
                            <>
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{record.checkIn}</span>
                            </>
                          )}
                          {!record.checkIn && record.status !== "On Leave" && record.status !== "Absent" && (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.checkOut && (
                            <>
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{record.checkOut}</span>
                            </>
                          )}
                          {!record.checkOut && record.status !== "On Leave" && record.status !== "Absent" && (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{record.workingHours > 0 ? `${record.workingHours}h` : "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${record.overtimeHours > 0 ? "text-secondary" : ""}`}>
                          {record.overtimeHours > 0 ? `${record.overtimeHours}h` : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.location === "Office" && <MapPin className="h-4 w-4 text-muted-foreground" />}
                          {record.location === "Remote" && <Wifi className="h-4 w-4 text-blue-500" />}
                          {record.location === "Field" && <MapPin className="h-4 w-4 text-secondary" />}
                          <span>{record.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.checkInMethod === "Biometric" && <UserCheck className="h-4 w-4 text-primary" />}
                          {record.checkInMethod === "Mobile App" && <Smartphone className="h-4 w-4 text-blue-500" />}
                          {record.checkInMethod === "Card" && <UserCheck className="h-4 w-4 text-secondary" />}
                          {record.checkInMethod === "Manual" && <UserCheck className="h-4 w-4 text-gray-500" />}
                          <span className="text-sm">{record.checkInMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            Details
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

        <TabsContent value="schedules" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Work Schedules
              </CardTitle>
              <CardDescription>Manage employee work schedules and shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {employees.map((employee) => (
                  <Card key={employee.id} className="border border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-white">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                            <CardDescription>
                              {employee.position} • {employee.department}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Attendance Rate</div>
                          <div className="text-2xl font-bold text-primary">{employee.attendanceRate}%</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Work Hours</Label>
                          <div className="text-lg font-semibold">
                            {employee.workSchedule.startTime} - {employee.workSchedule.endTime}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Working Days</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {employee.workSchedule.workingDays.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day.slice(0, 3)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Attendance Rate</span>
                          <span className="text-sm text-muted-foreground">{employee.attendanceRate}%</span>
                        </div>
                        <Progress value={employee.attendanceRate} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit Schedule
                        </Button>
                        <Button size="sm" variant="outline">
                          View History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Attendance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Daily Attendance</span>
                  <span className="font-medium text-primary">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Punctuality Rate</span>
                  <span className="font-medium text-primary">87.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Remote Work Adoption</span>
                  <span className="font-medium text-primary">23.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Working Hours</span>
                  <span className="font-medium text-primary">8.2 hrs</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { department: "Engineering", attendance: 96, color: "bg-primary" },
                  { department: "Marketing", attendance: 92, color: "bg-secondary" },
                  { department: "Sales", attendance: 89, color: "bg-primary" },
                  { department: "HR", attendance: 95, color: "bg-secondary" },
                  { department: "Finance", attendance: 94, color: "bg-primary" },
                ].map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <span className="text-sm text-muted-foreground">{dept.attendance}%</span>
                    </div>
                    <Progress value={dept.attendance} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Attendance Policies</CardTitle>
                <CardDescription>Configure attendance rules and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Grace Period (minutes)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label>Late Threshold (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label>Half Day Hours</Label>
                  <Input type="number" defaultValue="4" />
                </div>
                <div className="space-y-2">
                  <Label>Full Day Hours</Label>
                  <Input type="number" defaultValue="8" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Save Settings</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Check-in Methods</CardTitle>
                <CardDescription>Configure available check-in methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { method: "Biometric Scanner", enabled: true, icon: UserCheck },
                    { method: "Mobile App", enabled: true, icon: Smartphone },
                    { method: "ID Card", enabled: false, icon: UserCheck },
                    { method: "Manual Entry", enabled: true, icon: UserCheck },
                  ].map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <method.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{method.method}</span>
                      </div>
                      <Badge
                        variant={method.enabled ? "default" : "outline"}
                        className={method.enabled ? "bg-primary text-white" : ""}
                      >
                        {method.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Configure Methods
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ManualEntryForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    employeeName: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employeeName">Employee *</Label>
        <Select
          value={formData.employeeName}
          onValueChange={(value) => setFormData({ ...formData, employeeName: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ahmed Hassan">Ahmed Hassan</SelectItem>
            <SelectItem value="Fatima Ali">Fatima Ali</SelectItem>
            <SelectItem value="Omar Mahmoud">Omar Mahmoud</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date *</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Check In</Label>
          <Input
            id="checkIn"
            type="time"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkOut">Check Out</Label>
          <Input
            id="checkOut"
            type="time"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Late">Late</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="Half Day">Half Day</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          placeholder="Additional notes..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Save Entry
        </Button>
      </div>
    </form>
  )
}
