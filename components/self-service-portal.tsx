"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  User,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  Download,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MapPin,
  Building,
  Users,
  Target,
  Award,
} from "lucide-react"

export function SelfServicePortal() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const employeeData = {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Marketing",
    position: "Senior Marketing Manager",
    manager: "Michael Chen",
    joinDate: "2021-03-15",
    employeeType: "Full-time",
    location: "New York Office",
    address: "123 Main St, New York, NY 10001",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    salary: "$85,000",
    benefits: ["Health Insurance", "Dental", "401k", "PTO"],
  }

  const leaveRequests = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-19",
      days: 5,
      status: "Approved",
      reason: "Family vacation",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-01-08",
      endDate: "2024-01-08",
      days: 1,
      status: "Approved",
      reason: "Medical appointment",
    },
    {
      id: 3,
      type: "Personal Leave",
      startDate: "2024-01-25",
      endDate: "2024-01-26",
      days: 2,
      status: "Pending",
      reason: "Personal matters",
    },
  ]

  const payslips = [
    { id: 1, month: "December 2023", grossPay: "$7,083", netPay: "$5,250", deductions: "$1,833", status: "Paid" },
    { id: 2, month: "November 2023", grossPay: "$7,083", netPay: "$5,250", deductions: "$1,833", status: "Paid" },
    { id: 3, month: "October 2023", grossPay: "$7,083", netPay: "$5,250", deductions: "$1,833", status: "Paid" },
  ]

  const attendanceData = [
    { date: "2024-01-15", checkIn: "09:00 AM", checkOut: "05:30 PM", hours: "8.5", status: "Present" },
    { date: "2024-01-14", checkIn: "09:15 AM", checkOut: "05:45 PM", hours: "8.5", status: "Present" },
    { date: "2024-01-13", checkIn: "09:00 AM", checkOut: "05:30 PM", hours: "8.5", status: "Present" },
    { date: "2024-01-12", checkIn: "09:30 AM", checkOut: "05:30 PM", hours: "8.0", status: "Late" },
  ]

  const documents = [
    { id: 1, name: "Employment Contract", type: "Contract", uploadDate: "2021-03-15", size: "2.4 MB" },
    { id: 2, name: "Tax Forms 2023", type: "Tax Document", uploadDate: "2024-01-01", size: "1.2 MB" },
    { id: 3, name: "Performance Review 2023", type: "Review", uploadDate: "2023-12-15", size: "856 KB" },
    { id: 4, name: "Training Certificate", type: "Certificate", uploadDate: "2023-11-20", size: "1.8 MB" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/10 opacity-20" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-4 translate-y-4" />
        <div className="relative">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">SJ</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {employeeData.name}!</h1>
              <p className="text-primary-foreground/80 text-lg mb-2">{employeeData.position}</p>
              <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {employeeData.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {employeeData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  ID: {employeeData.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Leave Balance</CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">18 Days</div>
            <p className="text-xs text-blue-600">Annual leave remaining</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">This Month</CardTitle>
            <Clock className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">168 Hrs</div>
            <p className="text-xs text-green-600">Hours worked</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Performance</CardTitle>
            <Target className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">4.8/5</div>
            <p className="text-xs text-purple-600">Latest review score</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Achievements</CardTitle>
            <Award className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">12</div>
            <p className="text-xs text-orange-600">Certifications earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-fit">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="leave" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Leave
          </TabsTrigger>
          <TabsTrigger value="payroll" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Payroll
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Requests
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and contact information</CardDescription>
              </div>
              <Button
                variant={isEditingProfile ? "secondary" : "outline"}
                onClick={() => setIsEditingProfile(!isEditingProfile)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={employeeData.name} disabled={!isEditingProfile} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={employeeData.email} disabled={!isEditingProfile} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={employeeData.phone} disabled={!isEditingProfile} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue={employeeData.department} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue={employeeData.position} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" defaultValue={employeeData.manager} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue={employeeData.address} disabled={!isEditingProfile} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input id="emergency" defaultValue={employeeData.emergencyContact} disabled={!isEditingProfile} />
              </div>
              {isEditingProfile && (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditingProfile(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Leave Requests</h3>
              <p className="text-sm text-muted-foreground">Manage your leave requests and view balances</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Leave Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit Leave Request</DialogTitle>
                  <DialogDescription>Fill out the form to request time off</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="leave-type">Leave Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="maternity">Maternity Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea id="reason" placeholder="Please provide a reason for your leave request" />
                  </div>
                  <Button className="w-full">Submit Request</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.type}</TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Payroll Information</h3>
            <p className="text-sm text-muted-foreground">View your salary details and download payslips</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employeeData.salary}</div>
                <p className="text-xs text-muted-foreground">Annual salary</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">YTD Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$63,000</div>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {employeeData.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payslips</CardTitle>
              <CardDescription>Download your payslips and view payment history</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell className="font-medium">{payslip.month}</TableCell>
                      <TableCell>{payslip.grossPay}</TableCell>
                      <TableCell>{payslip.deductions}</TableCell>
                      <TableCell className="font-semibold">{payslip.netPay}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{payslip.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Attendance Records</h3>
            <p className="text-sm text-muted-foreground">View your attendance history and working hours</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.hours}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.status === "Present"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">My Documents</h3>
            <p className="text-sm text-muted-foreground">Access your employment documents and certificates</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
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

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Quick Requests</h3>
            <p className="text-sm text-muted-foreground">Submit various HR requests and track their status</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Employment Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Request an employment verification letter</p>
                <Button className="w-full mt-4" size="sm">
                  Request Letter
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Salary Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Request a salary certificate document</p>
                <Button className="w-full mt-4" size="sm">
                  Request Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Reference Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Request a professional reference letter</p>
                <Button className="w-full mt-4" size="sm">
                  Request Reference
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Data Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Request to update personal information</p>
                <Button className="w-full mt-4" size="sm">
                  Update Data
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Overtime Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Submit overtime work request</p>
                <Button className="w-full mt-4" size="sm">
                  Request Overtime
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Training Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Request training or course enrollment</p>
                <Button className="w-full mt-4" size="sm">
                  Request Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
