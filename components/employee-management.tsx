"use client"

import type * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  Shield,
  Users,
  UserPlus,
  X,
  TrendingUp,
  ArrowRightLeft,
  GraduationCap,
  UserCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  Filter,
  Car,
  Banknote,
  Heart,
  Pencil,
  Save,
  Lock,
} from "lucide-react"
import type { Employee, MedicalDependent } from "@/types"

// Mock data
const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "Ahmed",
    middleName: "Mohamed",
    lastName: "Hassan",
    fullArabicName: "أحمد محمد حسن",
    nationalId: "29801234567890",
    socialInsuranceNumber: "123456789",
    gender: "Male",
    militaryStatus: "Completed",
    religion: "Muslim",
    maritalStatus: "Married",
    dateOfBirth: "1990-05-15",
    workLocation: "Arkan",
    contractType: "Full-time",
    employmentType: "Insource",
    costCenter: "IT-001",
    socialInsuranceStatus: "Insured",
    employeeStatus: "On-board",
    salary: {
      basicSalary: 15000,
      transportationAllowance: 1500,
      otherAllowances: [
        { name: "Housing", amount: 2000 },
        { name: "Medical", amount: 500 },
      ],
    },
    division: "Technology",
    department: "Information Technology",
    team: "Backend Engineering",
    section: "Platform",
    position: "Senior Developer",
    manager: "Sarah Johnson",
    email: "ahmed.hassan@company.com",
    phone: "+20 123 456 7890",
    address: "123 Main St, Cairo, Egypt",
    hireDate: "2020-03-01",
  },
  {
    id: "2",
    firstName: "Fatima",
    lastName: "Ali",
    fullArabicName: "فاطمة علي",
    nationalId: "29901234567891",
    gender: "Female",
    religion: "Muslim",
    maritalStatus: "Single",
    dateOfBirth: "1992-08-22",
    workLocation: "Maadi",
    contractType: "Full-time",
    employmentType: "Insource",
    costCenter: "HR-001",
    socialInsuranceStatus: "Insured",
    employeeStatus: "On-board",
    salary: {
      basicSalary: 12000,
      transportationAllowance: 1200,
      otherAllowances: [{ name: "Performance", amount: 1000 }],
    },
    division: "Corporate",
    department: "Human Resources",
    team: "HR Operations",
    position: "HR Specialist",
    manager: "Mohamed Khaled",
    email: "fatima.ali@company.com",
    phone: "+20 123 456 7891",
    address: "456 Second St, Cairo, Egypt",
    hireDate: "2021-06-15",
  },
]

export function EmployeeManagement({ userRole = "Admin" }: { userRole?: string }) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nationalId.includes(searchTerm)

    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.employeeStatus === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const departments = [...new Set(employees.map((emp) => emp.department))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
          <p className="text-muted-foreground">Manage and view all employee information</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Mock import functionality
              console.log("Import employees")
              alert("Import functionality would open file picker")
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Mock export functionality
              console.log("Export employees")
              alert("Export functionality would download CSV")
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the employee's information. All fields marked with * are required.
                </DialogDescription>
              </DialogHeader>
              <EmployeeForm
                onSubmit={() => setIsAddDialogOpen(false)}
                setEmployees={setEmployees}
                employees={employees}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="On-board">On-board</SelectItem>
                <SelectItem value="Resigned">Resigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.profileImage || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.workLocation}</TableCell>
                  <TableCell>
                    <Badge variant={employee.employeeStatus === "On-board" ? "default" : "secondary"}>
                      {employee.employeeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(employee.hireDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this employee?")) {
                              setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id))
                              alert("Employee deleted successfully")
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Employee Details Dialog */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
            </DialogHeader>
            <EmployeeDetails employee={selectedEmployee} userRole={userRole} />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Employee Dialog */}
      {selectedEmployee && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={() => {
                setIsEditDialogOpen(false)
                setSelectedEmployee(null)
              }}
              setEmployees={setEmployees}
              employees={employees}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// ─── Shared status history data (keyed by employee first+last name) ───────────
type ChangeType = "Promotion" | "Transfer" | "Salary Change" | "Grade Change" | "Manager Requested Promotion" | "Manager Requested Salary Adjustment"

interface StatusChange {
  id: string
  changeType: ChangeType
  effectiveDate: string
  requestedBy: string
  requestedByTitle: string
  status: "Completed" | "Pending Approval" | "Rejected"
  details: { from: string; to: string; reason: string; notes?: string }
  approvedBy?: string
  approvedDate?: string
}

const employeeStatusHistory: Record<string, StatusChange[]> = {
  "Ahmed Hassan": [
    {
      id: "1",
      changeType: "Promotion",
      effectiveDate: "2026-04-01",
      requestedBy: "Sara Ahmed",
      requestedByTitle: "Engineering Manager",
      status: "Completed",
      details: {
        from: "Senior Software Engineer (L5)",
        to: "Principal Engineer (L6)",
        reason: "Exceptional performance over 3 review cycles, led migration of API platform v2",
        notes: "Salary increased from EGP 42,000 to EGP 55,000/month",
      },
      approvedBy: "Mohamed Ali (Head of People)",
      approvedDate: "2026-03-15",
    },
    {
      id: "h2",
      changeType: "Salary Change",
      effectiveDate: "2024-04-01",
      requestedBy: "Sara Ahmed",
      requestedByTitle: "Engineering Manager",
      status: "Completed",
      details: {
        from: "EGP 35,000 / month",
        to: "EGP 42,000 / month",
        reason: "Annual merit review — top performer rating for FY2023",
      },
      approvedBy: "Mohamed Ali (Head of People)",
      approvedDate: "2024-03-20",
    },
    {
      id: "h3",
      changeType: "Grade Change",
      effectiveDate: "2023-01-01",
      requestedBy: "HR Team",
      requestedByTitle: "Human Resources",
      status: "Completed",
      details: {
        from: "L4 — Mid-Senior Engineer",
        to: "L5 — Senior Engineer",
        reason: "Bi-annual grade review — passed senior engineer evaluation",
      },
      approvedBy: "Mohamed Ali (Head of People)",
      approvedDate: "2022-12-20",
    },
    {
      id: "h4",
      changeType: "Transfer",
      effectiveDate: "2021-06-01",
      requestedBy: "Ahmed Hassan (CEO)",
      requestedByTitle: "Chief Executive Officer",
      status: "Completed",
      details: {
        from: "Technology — Mobile Squad",
        to: "Technology — Backend Squad",
        reason: "Strategic reorg — backend team needed senior leadership",
      },
      approvedBy: "Mohamed Ali (Head of People)",
      approvedDate: "2021-05-25",
    },
  ],
  "Fatima Ali": [
    {
      id: "f1",
      changeType: "Salary Change",
      effectiveDate: "2026-01-01",
      requestedBy: "Mohamed Ali",
      requestedByTitle: "Head of People",
      status: "Completed",
      details: {
        from: "EGP 10,500 / month",
        to: "EGP 12,000 / month",
        reason: "Annual merit increase — exceeded all HR KPIs for FY2025",
      },
      approvedBy: "Ahmed Hassan (CEO)",
      approvedDate: "2025-12-15",
    },
    {
      id: "f2",
      changeType: "Manager Requested Promotion",
      effectiveDate: "2026-06-01",
      requestedBy: "Mohamed Ali",
      requestedByTitle: "Head of People",
      status: "Pending Approval",
      details: {
        from: "HR Specialist (G3)",
        to: "Senior HR Specialist (G4)",
        reason: "Fatima single-handedly managed the onboarding for 45 new hires in Q1 with zero escalations",
        notes: "Recommended salary band: EGP 14,000–16,000/month",
      },
    },
    {
      id: "f3",
      changeType: "Grade Change",
      effectiveDate: "2022-06-15",
      requestedBy: "HR Team",
      requestedByTitle: "Human Resources",
      status: "Completed",
      details: {
        from: "G2 — Associate",
        to: "G3 — Specialist",
        reason: "End of probation period — performance rated Exceeds Expectations",
      },
      approvedBy: "Mohamed Ali (Head of People)",
      approvedDate: "2022-06-10",
    },
  ],
}

const changeTypeConfig: Record<ChangeType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  Promotion: { icon: TrendingUp, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", label: "Promotion" },
  Transfer: { icon: ArrowRightLeft, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", label: "Transfer" },
  "Salary Change": { icon: DollarSign, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", label: "Salary Change" },
  "Grade Change": { icon: GraduationCap, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", label: "Grade Change" },
  "Manager Requested Promotion": { icon: UserCheck, color: "text-teal-600", bg: "bg-teal-100 dark:bg-teal-900/30", label: "Mgr: Promotion Request" },
  "Manager Requested Salary Adjustment": { icon: DollarSign, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/30", label: "Mgr: Salary Request" },
}

const statusConfig = {
  Completed: { color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  "Pending Approval": { color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", icon: Clock },
  Rejected: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
}

const MONTHS = [
  { label: "January", value: "1" }, { label: "February", value: "2" }, { label: "March", value: "3" },
  { label: "April", value: "4" }, { label: "May", value: "5" }, { label: "June", value: "6" },
  { label: "July", value: "7" }, { label: "August", value: "8" }, { label: "September", value: "9" },
  { label: "October", value: "10" }, { label: "November", value: "11" }, { label: "December", value: "12" },
]
const YEARS = Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => String(2020 + i))

function isWithinCustomRange(dateStr: string, fromMonth: string, fromYear: string, toMonth: string, toYear: string): boolean {
  const d = new Date(dateStr)
  const dVal = d.getFullYear() * 12 + d.getMonth() + 1
  if (fromYear && fromMonth) {
    const fromVal = Number(fromYear) * 12 + Number(fromMonth)
    if (dVal < fromVal) return false
  }
  if (toYear && toMonth) {
    const toVal = Number(toYear) * 12 + Number(toMonth)
    if (dVal > toVal) return false
  }
  return true
}

function EmployeeDetails({ employee, userRole = "Employee" }: { employee: Employee; userRole?: string }) {
  const benefitAllowances = [
    ...(employee.carAllowance?.enrolled && employee.carAllowance.monthlyAmount ? [{ name: "Car Allowance", amount: employee.carAllowance.monthlyAmount }] : []),
    ...(employee.mobileAllowance?.enrolled && employee.mobileAllowance.monthlyAmount ? [{ name: "Mobile Allowance", amount: employee.mobileAllowance.monthlyAmount }] : []),
  ]
  const totalSalary =
    employee.salary.basicSalary +
    employee.salary.transportationAllowance +
    employee.salary.otherAllowances.reduce((sum, allowance) => sum + allowance.amount, 0) +
    benefitAllowances.reduce((sum, a) => sum + a.amount, 0)

  const employeeKey = `${employee.firstName} ${employee.lastName}`
  const allHistory = employeeStatusHistory[employeeKey] ?? []

  // Additional benefits state (Admin-managed)
  const [benefitsData, setBenefitsData] = useState({
    companyCar: {
      enrolled: employee.companyCar?.enrolled ?? false,
      model: employee.companyCar?.model ?? "",
      plateNumber: employee.companyCar?.plateNumber ?? "",
    },
    carAllowance: {
      enrolled: employee.carAllowance?.enrolled ?? false,
      monthlyAmount: employee.carAllowance?.monthlyAmount ?? 0,
    },
    lifeInsurance: {
      enrolled: employee.lifeInsurance?.enrolled ?? false,
      provider: employee.lifeInsurance?.provider ?? "",
      coverageAmount: employee.lifeInsurance?.coverageAmount ?? 0,
    },
    mobileDevice: {
      enrolled: employee.mobileDevice?.enrolled ?? false,
      model: employee.mobileDevice?.model ?? "",
      number: employee.mobileDevice?.number ?? "",
    },
    mobileAllowance: {
      enrolled: employee.mobileAllowance?.enrolled ?? false,
      monthlyAmount: employee.mobileAllowance?.monthlyAmount ?? 0,
    },
  })
  const [editingBenefits, setEditingBenefits] = useState(false)
  const [benefitsDraft, setBenefitsDraft] = useState(benefitsData)
  const isAdmin = userRole === "Admin"

  // History tab filter state
  const [historyTypeFilter, setHistoryTypeFilter] = useState<string>("All")
  const [historyFromMonth, setHistoryFromMonth] = useState<string>("")
  const [historyFromYear, setHistoryFromYear] = useState<string>("")
  const [historyToMonth, setHistoryToMonth] = useState<string>("")
  const [historyToYear, setHistoryToYear] = useState<string>("")

  const hasHistoryDateFilter = !!(historyFromMonth && historyFromYear) || !!(historyToMonth && historyToYear)

  const history = allHistory.filter((h) => {
    const matchType = historyTypeFilter === "All" || h.changeType === historyTypeFilter
    const matchPeriod = isWithinCustomRange(h.effectiveDate, historyFromMonth, historyFromYear, historyToMonth, historyToYear)
    return matchType && matchPeriod
  })

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="employment">Employment</TabsTrigger>
        <TabsTrigger value="salary">Salary</TabsTrigger>
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="history" className="relative">
          History
          {history.some((h) => h.status === "Pending Approval") && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500" />
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <p className="text-sm">
              {employee.firstName} {employee.middleName} {employee.lastName}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Arabic Name</Label>
            <p className="text-sm">{employee.fullArabicName}</p>
          </div>
          <div className="space-y-2">
            <Label>National ID</Label>
            <p className="text-sm">{employee.nationalId}</p>
          </div>
          {employee.nationalIdExpiry && (
            <div className="space-y-2">
              <Label>National ID Expiry Date</Label>
              <div className="flex items-center gap-2">
                <p className="text-sm">{new Date(employee.nationalIdExpiry).toLocaleDateString()}</p>
                {(() => {
                  const today = new Date()
                  const expiry = new Date(employee.nationalIdExpiry)
                  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                  if (daysLeft < 0) return <Badge variant="destructive">Expired</Badge>
                  if (daysLeft <= 30) return <Badge variant="destructive">Expires in {daysLeft}d</Badge>
                  if (daysLeft <= 90) return <Badge className="bg-orange-500 hover:bg-orange-600">Expires in {daysLeft}d</Badge>
                  return null
                })()}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Gender</Label>
            <p className="text-sm">{employee.gender}</p>
          </div>
          {employee.militaryStatus && (
            <div className="space-y-2">
              <Label>Military Status</Label>
              <p className="text-sm">{employee.militaryStatus}</p>
            </div>
          )}
          {employee.militaryCertificateExpiry && (
            <div className="space-y-2">
              <Label>Military Certificate Expiry Date</Label>
              <div className="flex items-center gap-2">
                <p className="text-sm">{new Date(employee.militaryCertificateExpiry).toLocaleDateString()}</p>
                {(() => {
                  const today = new Date()
                  const expiry = new Date(employee.militaryCertificateExpiry)
                  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                  if (daysLeft < 0) return <Badge variant="destructive">Expired</Badge>
                  if (daysLeft <= 30) return <Badge variant="destructive">Expires in {daysLeft}d</Badge>
                  if (daysLeft <= 90) return <Badge className="bg-orange-500 hover:bg-orange-600">Expires in {daysLeft}d</Badge>
                  return null
                })()}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Religion</Label>
            <p className="text-sm">{employee.religion}</p>
          </div>
          <div className="space-y-2">
            <Label>Marital Status</Label>
            <p className="text-sm">{employee.maritalStatus}</p>
          </div>
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <p className="text-sm">{new Date(employee.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {employee.email}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <p className="text-sm flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {employee.phone}
            </p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Address</Label>
            <p className="text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {employee.address}
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="employment" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Division</Label>
            <p className="text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {employee.division}
            </p>
          </div>
          {employee.department && (
            <div className="space-y-2">
              <Label>Department</Label>
              <p className="text-sm">{employee.department}</p>
            </div>
          )}
          {employee.team && (
            <div className="space-y-2">
              <Label>Team</Label>
              <p className="text-sm">{employee.team}</p>
            </div>
          )}
          {employee.section && (
            <div className="space-y-2">
              <Label>Section</Label>
              <p className="text-sm">{employee.section}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label>Position</Label>
            <p className="text-sm">{employee.position}</p>
          </div>
          <div className="space-y-2">
            <Label>Manager</Label>
            <p className="text-sm">{employee.manager}</p>
          </div>
          <div className="space-y-2">
            <Label>Work Location</Label>
            <p className="text-sm">{employee.workLocation}</p>
          </div>
          <div className="space-y-2">
            <Label>Contract Type</Label>
            <p className="text-sm">{employee.contractType}</p>
          </div>
          <div className="space-y-2">
            <Label>Employment Type</Label>
            <p className="text-sm">{employee.employmentType}</p>
          </div>
          {employee.outsourceCompany && (
            <div className="space-y-2">
              <Label>Outsource Company</Label>
              <p className="text-sm">{employee.outsourceCompany}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label>Cost Center</Label>
            <p className="text-sm">{employee.costCenter}</p>
          </div>
          <div className="space-y-2">
            <Label>Social Insurance Status</Label>
            <p className="text-sm">{employee.socialInsuranceStatus}</p>
          </div>
          <div className="space-y-2">
            <Label>Employee Status</Label>
            <Badge variant={employee.employeeStatus === "On-board" ? "default" : "secondary"}>
              {employee.employeeStatus}
            </Badge>
          </div>
          <div className="space-y-2">
            <Label>Hire Date</Label>
            <p className="text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(employee.hireDate).toLocaleDateString()}
            </p>
          </div>
          {employee.exitDate && (
            <div className="space-y-2">
              <Label>Exit Date</Label>
              <p className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(employee.exitDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="salary" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Salary Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Basic Salary</span>
                <span className="font-medium">EGP {employee.salary.basicSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Transportation</span>
                <span className="font-medium">EGP {employee.salary.transportationAllowance.toLocaleString()}</span>
              </div>
              {employee.salary.otherAllowances.map((allowance, index) => (
                <div key={index} className="flex justify-between">
                  <span>{allowance.name}</span>
                  <span className="font-medium">EGP {allowance.amount.toLocaleString()}</span>
                </div>
              ))}
              {benefitAllowances.map((allowance, index) => (
                <div key={`benefit-${index}`} className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span className="flex items-center gap-1">
                    {allowance.name}
                    <Badge variant="outline" className="text-[10px] h-4 px-1 border-emerald-300 text-emerald-600 dark:border-emerald-700 dark:text-emerald-400">Benefit</Badge>
                  </span>
                  <span className="font-medium">EGP {allowance.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Monthly Salary</span>
                <span>EGP {totalSalary.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="benefits" className="space-y-6">
        {/* Medical Insurance */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-sm">Medical Insurance</h3>
          </div>
          {employee.medicalInsuranceProvider && employee.medicalInsuranceProvider !== "None" ? (
            <div className="flex items-center gap-3">
              <div className="rounded-lg border px-4 py-3 bg-blue-50 dark:bg-blue-950/30 flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">{employee.medicalInsuranceProvider}</p>
                  <p className="text-xs text-muted-foreground">Active medical coverage</p>
                </div>
                {employee.medicalInsuranceProvider === "Bupa" && (
                  <Badge className="bg-orange-500 hover:bg-orange-600 ml-2">+ Additional Cost</Badge>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No medical insurance enrolled.</p>
          )}
        </div>

        {/* Dependents */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-sm">Medical Dependents</h3>
            {employee.medicalDependents && employee.medicalDependents.length > 0 && (
              <Badge variant="secondary">{employee.medicalDependents.length} registered</Badge>
            )}
          </div>
          {employee.medicalDependents && employee.medicalDependents.length > 0 ? (
            <div className="space-y-2">
              {employee.medicalDependents.map((dep) => (
                <div key={dep.id} className="rounded-lg border px-4 py-3 flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {dep.relationship === "Wife" ? "W" : dep.relationship === "Husband" ? "H" : "C"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dep.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {dep.relationship}
                      {dep.dateOfBirth && ` · Born ${new Date(dep.dateOfBirth).toLocaleDateString()}`}
                      {dep.nationalId && ` · ID: ${dep.nationalId}`}
                    </p>
                  </div>
                  <Badge variant={dep.relationship === "Child" ? "secondary" : "default"}>
                    {dep.relationship}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No dependents registered.</p>
          )}
        </div>

        {/* Additional Benefits — Admin-managed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-emerald-600" />
              <h3 className="font-semibold text-sm">Additional Benefits</h3>
            </div>
            {isAdmin ? (
              editingBenefits ? (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs text-slate-500"
                    onClick={() => { setBenefitsDraft(benefitsData); setEditingBenefits(false) }}
                  >
                    <X className="h-3 w-3 mr-1" />Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => { setBenefitsData(benefitsDraft); setEditingBenefits(false) }}
                  >
                    <Save className="h-3 w-3 mr-1" />Save
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  onClick={() => { setBenefitsDraft(benefitsData); setEditingBenefits(true) }}
                >
                  <Pencil className="h-3 w-3 mr-1" />Manage
                </Button>
              )
            ) : (
              <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Lock className="h-3 w-3" />
                <span>Admin only</span>
              </div>
            )}
          </div>

          {/* Benefit cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Company Car */}
            <div className={`rounded-xl border p-4 space-y-3 ${
              (editingBenefits ? benefitsDraft.companyCar.enrolled : benefitsData.companyCar.enrolled)
                ? "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    (editingBenefits ? benefitsDraft.companyCar.enrolled : benefitsData.companyCar.enrolled)
                      ? "bg-violet-100 dark:bg-violet-900/40"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}>
                    <Car className={`h-4 w-4 ${
                      (editingBenefits ? benefitsDraft.companyCar.enrolled : benefitsData.companyCar.enrolled)
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-slate-400"
                    }`} />
                  </div>
                  <span className="text-sm font-medium">Company Car</span>
                </div>
                {editingBenefits ? (
                  <button
                    onClick={() => setBenefitsDraft(d => ({ ...d, companyCar: { ...d.companyCar, enrolled: !d.companyCar.enrolled } }))}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      benefitsDraft.companyCar.enrolled ? "bg-violet-500" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      benefitsDraft.companyCar.enrolled ? "translate-x-4" : "translate-x-1"
                    }`} />
                  </button>
                ) : (
                  <Badge variant={benefitsData.companyCar.enrolled ? "default" : "secondary"} className={`text-xs ${benefitsData.companyCar.enrolled ? "bg-violet-500 hover:bg-violet-600" : ""}`}>
                    {benefitsData.companyCar.enrolled ? "Active" : "Not Enrolled"}
                  </Badge>
                )}
              </div>
              {editingBenefits && benefitsDraft.companyCar.enrolled && (
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs text-slate-500">Car Model</Label>
                    <Input
                      value={benefitsDraft.companyCar.model}
                      onChange={e => setBenefitsDraft(d => ({ ...d, companyCar: { ...d.companyCar, model: e.target.value } }))}
                      placeholder="e.g. Toyota Corolla"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Plate Number</Label>
                    <Input
                      value={benefitsDraft.companyCar.plateNumber}
                      onChange={e => setBenefitsDraft(d => ({ ...d, companyCar: { ...d.companyCar, plateNumber: e.target.value } }))}
                      placeholder="e.g. ABC 1234"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>
                </div>
              )}
              {!editingBenefits && benefitsData.companyCar.enrolled && (benefitsData.companyCar.model || benefitsData.companyCar.plateNumber) && (
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {benefitsData.companyCar.model && <p><span className="text-slate-400">Model:</span> {benefitsData.companyCar.model}</p>}
                  {benefitsData.companyCar.plateNumber && <p><span className="text-slate-400">Plate:</span> {benefitsData.companyCar.plateNumber}</p>}
                </div>
              )}
              {!editingBenefits && !benefitsData.companyCar.enrolled && (
                <p className="text-xs text-slate-400">Not assigned</p>
              )}
            </div>

            {/* Car Allowance */}
            <div className={`rounded-xl border p-4 space-y-3 ${
              (editingBenefits ? benefitsDraft.carAllowance.enrolled : benefitsData.carAllowance.enrolled)
                ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    (editingBenefits ? benefitsDraft.carAllowance.enrolled : benefitsData.carAllowance.enrolled)
                      ? "bg-amber-100 dark:bg-amber-900/40"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}>
                    <Banknote className={`h-4 w-4 ${
                      (editingBenefits ? benefitsDraft.carAllowance.enrolled : benefitsData.carAllowance.enrolled)
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-400"
                    }`} />
                  </div>
                  <span className="text-sm font-medium">Car Allowance</span>
                </div>
                {editingBenefits ? (
                  <button
                    onClick={() => setBenefitsDraft(d => ({ ...d, carAllowance: { ...d.carAllowance, enrolled: !d.carAllowance.enrolled } }))}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      benefitsDraft.carAllowance.enrolled ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      benefitsDraft.carAllowance.enrolled ? "translate-x-4" : "translate-x-1"
                    }`} />
                  </button>
                ) : (
                  <Badge variant={benefitsData.carAllowance.enrolled ? "default" : "secondary"} className={`text-xs ${benefitsData.carAllowance.enrolled ? "bg-amber-500 hover:bg-amber-600" : ""}`}>
                    {benefitsData.carAllowance.enrolled ? "Active" : "Not Enrolled"}
                  </Badge>
                )}
              </div>
              {editingBenefits && benefitsDraft.carAllowance.enrolled && (
                <div>
                  <Label className="text-xs text-slate-500">Monthly Amount (EGP)</Label>
                  <Input
                    type="number"
                    value={benefitsDraft.carAllowance.monthlyAmount}
                    onChange={e => setBenefitsDraft(d => ({ ...d, carAllowance: { ...d.carAllowance, monthlyAmount: Number(e.target.value) } }))}
                    placeholder="e.g. 2000"
                    className="h-7 text-xs mt-0.5"
                  />
                </div>
              )}
              {!editingBenefits && benefitsData.carAllowance.enrolled && benefitsData.carAllowance.monthlyAmount ? (
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Monthly:</span> EGP {benefitsData.carAllowance.monthlyAmount.toLocaleString()}
                </p>
              ) : !editingBenefits && !benefitsData.carAllowance.enrolled ? (
                <p className="text-xs text-slate-400">Not assigned</p>
              ) : null}
            </div>

            {/* Life Insurance */}
            <div className={`rounded-xl border p-4 space-y-3 ${
              (editingBenefits ? benefitsDraft.lifeInsurance.enrolled : benefitsData.lifeInsurance.enrolled)
                ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    (editingBenefits ? benefitsDraft.lifeInsurance.enrolled : benefitsData.lifeInsurance.enrolled)
                      ? "bg-rose-100 dark:bg-rose-900/40"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}>
                    <Heart className={`h-4 w-4 ${
                      (editingBenefits ? benefitsDraft.lifeInsurance.enrolled : benefitsData.lifeInsurance.enrolled)
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-slate-400"
                    }`} />
                  </div>
                  <span className="text-sm font-medium">Life Insurance</span>
                </div>
                {editingBenefits ? (
                  <button
                    onClick={() => setBenefitsDraft(d => ({ ...d, lifeInsurance: { ...d.lifeInsurance, enrolled: !d.lifeInsurance.enrolled } }))}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      benefitsDraft.lifeInsurance.enrolled ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      benefitsDraft.lifeInsurance.enrolled ? "translate-x-4" : "translate-x-1"
                    }`} />
                  </button>
                ) : (
                  <Badge variant={benefitsData.lifeInsurance.enrolled ? "default" : "secondary"} className={`text-xs ${benefitsData.lifeInsurance.enrolled ? "bg-rose-500 hover:bg-rose-600" : ""}`}>
                    {benefitsData.lifeInsurance.enrolled ? "Active" : "Not Enrolled"}
                  </Badge>
                )}
              </div>
              {editingBenefits && benefitsDraft.lifeInsurance.enrolled && (
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs text-slate-500">Provider</Label>
                    <Input
                      value={benefitsDraft.lifeInsurance.provider}
                      onChange={e => setBenefitsDraft(d => ({ ...d, lifeInsurance: { ...d.lifeInsurance, provider: e.target.value } }))}
                      placeholder="e.g. MetLife"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Coverage Amount (EGP)</Label>
                    <Input
                      type="number"
                      value={benefitsDraft.lifeInsurance.coverageAmount}
                      onChange={e => setBenefitsDraft(d => ({ ...d, lifeInsurance: { ...d.lifeInsurance, coverageAmount: Number(e.target.value) } }))}
                      placeholder="e.g. 500000"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>
                </div>
              )}
              {!editingBenefits && benefitsData.lifeInsurance.enrolled && (benefitsData.lifeInsurance.provider || benefitsData.lifeInsurance.coverageAmount) && (
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {benefitsData.lifeInsurance.provider && <p><span className="text-slate-400">Provider:</span> {benefitsData.lifeInsurance.provider}</p>}
                  {benefitsData.lifeInsurance.coverageAmount ? <p><span className="text-slate-400">Coverage:</span> EGP {benefitsData.lifeInsurance.coverageAmount.toLocaleString()}</p> : null}
                </div>
              )}
              {!editingBenefits && !benefitsData.lifeInsurance.enrolled && (
                <p className="text-xs text-slate-400">Not assigned</p>
              )}
            </div>

            {/* Mobile Device */}
            <div className={`rounded-xl border p-4 space-y-3 ${
              (editingBenefits ? benefitsDraft.mobileDevice.enrolled : benefitsData.mobileDevice.enrolled)
                ? "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    (editingBenefits ? benefitsDraft.mobileDevice.enrolled : benefitsData.mobileDevice.enrolled)
                      ? "bg-sky-100 dark:bg-sky-900/40" : "bg-slate-200 dark:bg-slate-700"
                  }`}>
                    <Phone className={`h-4 w-4 ${
                      (editingBenefits ? benefitsDraft.mobileDevice.enrolled : benefitsData.mobileDevice.enrolled)
                        ? "text-sky-600 dark:text-sky-400" : "text-slate-400"
                    }`} />
                  </div>
                  <span className="text-sm font-medium">Mobile Device</span>
                </div>
                {editingBenefits ? (
                  <button
                    onClick={() => setBenefitsDraft(d => ({ ...d, mobileDevice: { ...d.mobileDevice, enrolled: !d.mobileDevice.enrolled } }))}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      benefitsDraft.mobileDevice.enrolled ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      benefitsDraft.mobileDevice.enrolled ? "translate-x-4" : "translate-x-1"
                    }`} />
                  </button>
                ) : (
                  <Badge variant={benefitsData.mobileDevice.enrolled ? "default" : "secondary"} className={`text-xs ${benefitsData.mobileDevice.enrolled ? "bg-sky-500 hover:bg-sky-600" : ""}`}>
                    {benefitsData.mobileDevice.enrolled ? "Active" : "Not Enrolled"}
                  </Badge>
                )}
              </div>
              {editingBenefits && benefitsDraft.mobileDevice.enrolled && (
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs text-slate-500">Device Model</Label>
                    <Input value={benefitsDraft.mobileDevice.model} onChange={e => setBenefitsDraft(d => ({ ...d, mobileDevice: { ...d.mobileDevice, model: e.target.value } }))} placeholder="e.g. iPhone 15" className="h-7 text-xs mt-0.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Phone Number</Label>
                    <Input value={benefitsDraft.mobileDevice.number} onChange={e => setBenefitsDraft(d => ({ ...d, mobileDevice: { ...d.mobileDevice, number: e.target.value } }))} placeholder="e.g. +20 100 000 0000" className="h-7 text-xs mt-0.5" />
                  </div>
                </div>
              )}
              {!editingBenefits && benefitsData.mobileDevice.enrolled && (benefitsData.mobileDevice.model || benefitsData.mobileDevice.number) && (
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                  {benefitsData.mobileDevice.model && <p><span className="text-slate-400">Model:</span> {benefitsData.mobileDevice.model}</p>}
                  {benefitsData.mobileDevice.number && <p><span className="text-slate-400">Number:</span> {benefitsData.mobileDevice.number}</p>}
                </div>
              )}
              {!editingBenefits && !benefitsData.mobileDevice.enrolled && <p className="text-xs text-slate-400">Not assigned</p>}
            </div>

            {/* Mobile Allowance */}
            <div className={`rounded-xl border p-4 space-y-3 ${
              (editingBenefits ? benefitsDraft.mobileAllowance.enrolled : benefitsData.mobileAllowance.enrolled)
                ? "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    (editingBenefits ? benefitsDraft.mobileAllowance.enrolled : benefitsData.mobileAllowance.enrolled)
                      ? "bg-teal-100 dark:bg-teal-900/40" : "bg-slate-200 dark:bg-slate-700"
                  }`}>
                    <Banknote className={`h-4 w-4 ${
                      (editingBenefits ? benefitsDraft.mobileAllowance.enrolled : benefitsData.mobileAllowance.enrolled)
                        ? "text-teal-600 dark:text-teal-400" : "text-slate-400"
                    }`} />
                  </div>
                  <span className="text-sm font-medium">Mobile Allowance</span>
                </div>
                {editingBenefits ? (
                  <button
                    onClick={() => setBenefitsDraft(d => ({ ...d, mobileAllowance: { ...d.mobileAllowance, enrolled: !d.mobileAllowance.enrolled } }))}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      benefitsDraft.mobileAllowance.enrolled ? "bg-teal-500" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      benefitsDraft.mobileAllowance.enrolled ? "translate-x-4" : "translate-x-1"
                    }`} />
                  </button>
                ) : (
                  <Badge variant={benefitsData.mobileAllowance.enrolled ? "default" : "secondary"} className={`text-xs ${benefitsData.mobileAllowance.enrolled ? "bg-teal-500 hover:bg-teal-600" : ""}`}>
                    {benefitsData.mobileAllowance.enrolled ? "Active" : "Not Enrolled"}
                  </Badge>
                )}
              </div>
              {editingBenefits && benefitsDraft.mobileAllowance.enrolled && (
                <div>
                  <Label className="text-xs text-slate-500">Monthly Amount (EGP)</Label>
                  <Input type="number" value={benefitsDraft.mobileAllowance.monthlyAmount} onChange={e => setBenefitsDraft(d => ({ ...d, mobileAllowance: { ...d.mobileAllowance, monthlyAmount: Number(e.target.value) } }))} placeholder="e.g. 500" className="h-7 text-xs mt-0.5" />
                </div>
              )}
              {!editingBenefits && benefitsData.mobileAllowance.enrolled && benefitsData.mobileAllowance.monthlyAmount ? (
                <p className="text-xs text-slate-600 dark:text-slate-300"><span className="text-slate-400">Monthly:</span> EGP {benefitsData.mobileAllowance.monthlyAmount.toLocaleString()}</p>
              ) : !editingBenefits && !benefitsData.mobileAllowance.enrolled ? (
                <p className="text-xs text-slate-400">Not assigned</p>
              ) : null}
            </div>

          </div>
        </div>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <div className="text-center py-8 text-muted-foreground">
          <p>No documents uploaded yet.</p>
          <Button className="mt-4">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </TabsContent>

      {/* ── History Tab ── */}
      <TabsContent value="history" className="space-y-4">
        {/* Summary strip — always shows all-time totals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Changes", value: allHistory.length, icon: Activity, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" },
            { label: "Promotions", value: allHistory.filter((h) => h.changeType === "Promotion" || h.changeType === "Manager Requested Promotion").length, icon: TrendingUp, color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
            { label: "Salary Changes", value: allHistory.filter((h) => h.changeType === "Salary Change" || h.changeType === "Manager Requested Salary Adjustment").length, icon: DollarSign, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
            { label: "Pending", value: allHistory.filter((h) => h.status === "Pending Approval").length, icon: Clock, color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-3 flex items-center gap-3 ${stat.color.split(" ").slice(1).join(" ")} border border-slate-100 dark:border-slate-800`}>
              <stat.icon className={`h-5 w-5 shrink-0 ${stat.color.split(" ")[0]}`} />
              <div>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <Select value={historyTypeFilter} onValueChange={setHistoryTypeFilter}>
            <SelectTrigger className="w-52 rounded-xl h-8 text-sm border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
              <SelectValue placeholder="Change Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Promotion">Promotion</SelectItem>
              <SelectItem value="Transfer">Transfer</SelectItem>
              <SelectItem value="Salary Change">Salary Change</SelectItem>
              <SelectItem value="Grade Change">Grade Change</SelectItem>
              <SelectItem value="Manager Requested Promotion">Mgr: Promotion Request</SelectItem>
              <SelectItem value="Manager Requested Salary Adjustment">Mgr: Salary Request</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">From</span>
            <Select value={historyFromMonth} onValueChange={setHistoryFromMonth}>
              <SelectTrigger className="w-28 rounded-xl h-8 text-sm border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={historyFromYear} onValueChange={setHistoryFromYear}>
              <SelectTrigger className="w-20 rounded-xl h-8 text-sm border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">To</span>
            <Select value={historyToMonth} onValueChange={setHistoryToMonth}>
              <SelectTrigger className="w-28 rounded-xl h-8 text-sm border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={historyToYear} onValueChange={setHistoryToYear}>
              <SelectTrigger className="w-20 rounded-xl h-8 text-sm border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(historyTypeFilter !== "All" || hasHistoryDateFilter) && (
            <button
              onClick={() => {
                setHistoryTypeFilter("All")
                setHistoryFromMonth(""); setHistoryFromYear("")
                setHistoryToMonth(""); setHistoryToYear("")
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 ml-1"
            >
              <X className="h-3 w-3" />Clear filters
            </button>
          )}
          <span className="ml-auto text-xs text-slate-400">
            Showing {history.length} of {allHistory.length} event{allHistory.length !== 1 ? "s" : ""}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Activity className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No changes match your filters</p>
            <p className="text-sm mt-1">Try adjusting the type or period filter above</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

            <div className="space-y-4">
              {history.map((change, idx) => {
                const typeConf = changeTypeConfig[change.changeType]
                const statusConf = statusConfig[change.status]
                const TypeIcon = typeConf.icon
                const StatusIcon = statusConf.icon
                const isFirst = idx === 0

                return (
                  <div key={change.id} className="relative pl-14">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-4 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm z-10 ${typeConf.bg}`}>
                      <TypeIcon className={`h-4 w-4 ${typeConf.color}`} />
                    </div>

                    <div className={`rounded-2xl border p-4 shadow-sm transition-all ${
                      isFirst
                        ? "border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-900/10"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    }`}>
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isFirst && (
                            <Badge className="text-xs rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                              Most Recent
                            </Badge>
                          )}
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${typeConf.bg} ${typeConf.color}`}>
                            <TypeIcon className="h-3.5 w-3.5" />
                            {typeConf.label}
                          </div>
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConf.color}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {change.status}
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">
                          Effective {new Date(change.effectiveDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>

                      {/* From → To */}
                      <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide font-medium">From</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{change.details.from}</p>
                        </div>
                        <ArrowRightLeft className="h-4 w-4 text-slate-300 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide font-medium">To</p>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{change.details.to}</p>
                        </div>
                      </div>

                      {/* Reason */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                        {change.details.reason}
                      </p>
                      {change.details.notes && (
                        <p className="text-xs text-slate-500 italic mb-2">{change.details.notes}</p>
                      )}

                      {/* Footer: requested by / approved by */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[9px] bg-slate-200 dark:bg-slate-700">
                              {change.requestedBy.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-500">
                            Requested by <strong className="text-slate-700 dark:text-slate-300">{change.requestedBy}</strong>
                            <span className="text-slate-400"> · {change.requestedByTitle}</span>
                          </span>
                        </div>
                        {change.approvedBy && (
                          <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Approved by {change.approvedBy}
                            {change.approvedDate && (
                              <span className="text-slate-400"> on {new Date(change.approvedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                            )}
                          </span>
                        )}
                        {change.status === "Pending Approval" && (
                          <span className="text-xs text-orange-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />Awaiting approval
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Timeline start marker */}
              <div className="relative pl-14">
                <div className="absolute left-0 top-3 w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900">
                  <Calendar className="h-4 w-4 text-slate-400" />
                </div>
                <div className="py-3">
                  <p className="text-sm text-slate-400">
                    Joined on <strong className="text-slate-600 dark:text-slate-300">{new Date(employee.hireDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong>
                    {" — "}{employee.position} · {employee.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

function EmployeeForm({
  employee,
  onSubmit,
  setEmployees,
  employees,
}: {
  employee?: Employee
  onSubmit: () => void
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
  employees: Employee[]
}) {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || "",
    middleName: employee?.middleName || "",
    lastName: employee?.lastName || "",
    fullArabicName: employee?.fullArabicName || "",
    nationalId: employee?.nationalId || "",
    nationalIdExpiry: employee?.nationalIdExpiry || "",
    socialInsuranceNumber: employee?.socialInsuranceNumber || "",
    gender: employee?.gender || "",
    militaryStatus: employee?.militaryStatus || "",
    militaryCertificateExpiry: employee?.militaryCertificateExpiry || "",
    religion: employee?.religion || "",
    maritalStatus: employee?.maritalStatus || "",
    dateOfBirth: employee?.dateOfBirth || "",
    workLocation: employee?.workLocation || "",
    contractType: employee?.contractType || "",
    employmentType: employee?.employmentType || "",
    outsourceCompany: employee?.outsourceCompany || "",
    costCenter: employee?.costCenter || "",
    socialInsuranceStatus: employee?.socialInsuranceStatus || "",
    employeeStatus: employee?.employeeStatus || "On-board",
    exitDate: employee?.exitDate || "",
    division: employee?.division || "",
    department: employee?.department || "",
    team: employee?.team || "",
    section: employee?.section || "",
    position: employee?.position || "",
    manager: employee?.manager || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    address: employee?.address || "",
    hireDate: employee?.hireDate || "",
    basicSalary: employee?.salary?.basicSalary || 0,
    transportationAllowance: employee?.salary?.transportationAllowance || 0,
    medicalInsuranceProvider: employee?.medicalInsuranceProvider || "",
    companyCarEnrolled: employee?.companyCar?.enrolled ?? false,
    companyCarModel: employee?.companyCar?.model ?? "",
    companyCarPlate: employee?.companyCar?.plateNumber ?? "",
    carAllowanceEnrolled: employee?.carAllowance?.enrolled ?? false,
    carAllowanceAmount: employee?.carAllowance?.monthlyAmount ?? 0,
    lifeInsuranceEnrolled: employee?.lifeInsurance?.enrolled ?? false,
    lifeInsuranceProvider: employee?.lifeInsurance?.provider ?? "",
    lifeInsuranceCoverage: employee?.lifeInsurance?.coverageAmount ?? 0,
    mobileDeviceEnrolled: employee?.mobileDevice?.enrolled ?? false,
    mobileDeviceModel: employee?.mobileDevice?.model ?? "",
    mobileDeviceNumber: employee?.mobileDevice?.number ?? "",
    mobileAllowanceEnrolled: employee?.mobileAllowance?.enrolled ?? false,
    mobileAllowanceAmount: employee?.mobileAllowance?.monthlyAmount ?? 0,
  })

  const [dependents, setDependents] = useState<MedicalDependent[]>(employee?.medicalDependents || [])

  const addDependent = () => {
    setDependents((prev) => [
      ...prev,
      { id: String(Date.now()), name: "", relationship: "Child" as const, dateOfBirth: "", nationalId: "" },
    ])
  }

  const removeDependent = (id: string) => {
    setDependents((prev) => prev.filter((d) => d.id !== id))
  }

  const updateDependent = (id: string, field: keyof MedicalDependent, value: string) => {
    setDependents((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (employee) {
      // Editing existing employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employee.id
            ? {
                ...emp,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                fullArabicName: formData.fullArabicName,
                nationalId: formData.nationalId,
                nationalIdExpiry: formData.nationalIdExpiry,
                socialInsuranceNumber: formData.socialInsuranceNumber,
                gender: formData.gender,
                militaryStatus: formData.militaryStatus,
                militaryCertificateExpiry: formData.gender === "Male" ? formData.militaryCertificateExpiry : undefined,
                religion: formData.religion,
                maritalStatus: formData.maritalStatus,
                dateOfBirth: formData.dateOfBirth,
                workLocation: formData.workLocation,
                contractType: formData.contractType,
                employmentType: formData.employmentType,
                outsourceCompany: formData.outsourceCompany,
                costCenter: formData.costCenter,
                socialInsuranceStatus: formData.socialInsuranceStatus,
                employeeStatus: formData.employeeStatus,
                exitDate: formData.exitDate,
                division: formData.division,
                department: formData.department || undefined,
                team: formData.team || undefined,
                section: formData.section || undefined,
                position: formData.position,
                manager: formData.manager,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                hireDate: formData.hireDate,
                salary: {
                  basicSalary: formData.basicSalary,
                  transportationAllowance: formData.transportationAllowance,
                  otherAllowances: [
                    ...emp.salary.otherAllowances.filter(a => a.name !== "Car Allowance" && a.name !== "Mobile Allowance"),
                    ...(formData.carAllowanceEnrolled && formData.carAllowanceAmount ? [{ name: "Car Allowance", amount: formData.carAllowanceAmount }] : []),
                    ...(formData.mobileAllowanceEnrolled && formData.mobileAllowanceAmount ? [{ name: "Mobile Allowance", amount: formData.mobileAllowanceAmount }] : []),
                  ],
                },
                medicalInsuranceProvider: formData.medicalInsuranceProvider || undefined,
                medicalDependents: dependents.length > 0 ? dependents : undefined,
                companyCar: formData.companyCarEnrolled ? { enrolled: true, model: formData.companyCarModel, plateNumber: formData.companyCarPlate } : { enrolled: false },
                carAllowance: formData.carAllowanceEnrolled ? { enrolled: true, monthlyAmount: formData.carAllowanceAmount } : { enrolled: false },
                lifeInsurance: formData.lifeInsuranceEnrolled ? { enrolled: true, provider: formData.lifeInsuranceProvider, coverageAmount: formData.lifeInsuranceCoverage } : { enrolled: false },
                mobileDevice: formData.mobileDeviceEnrolled ? { enrolled: true, model: formData.mobileDeviceModel, number: formData.mobileDeviceNumber } : { enrolled: false },
                mobileAllowance: formData.mobileAllowanceEnrolled ? { enrolled: true, monthlyAmount: formData.mobileAllowanceAmount } : { enrolled: false },
              }
            : emp,
        ),
      )
      alert("Employee updated successfully")
    } else {
      // Adding a new employee
      const newEmployee: Employee = {
        id: String(Date.now()), // Generate a unique ID
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        fullArabicName: formData.fullArabicName,
        nationalId: formData.nationalId,
        nationalIdExpiry: formData.nationalIdExpiry,
        socialInsuranceNumber: formData.socialInsuranceNumber,
        gender: formData.gender,
        militaryStatus: formData.militaryStatus,
        militaryCertificateExpiry: formData.gender === "Male" ? formData.militaryCertificateExpiry : undefined,
        religion: formData.religion,
        maritalStatus: formData.maritalStatus,
        dateOfBirth: formData.dateOfBirth,
        workLocation: formData.workLocation,
        contractType: formData.contractType,
        employmentType: formData.employmentType,
        outsourceCompany: formData.outsourceCompany,
        costCenter: formData.costCenter,
        socialInsuranceStatus: formData.socialInsuranceStatus,
        employeeStatus: formData.employeeStatus,
        exitDate: formData.exitDate,
        department: formData.department,
        position: formData.position,
        manager: formData.manager,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        hireDate: formData.hireDate,
        salary: {
          basicSalary: formData.basicSalary,
          transportationAllowance: formData.transportationAllowance,
          otherAllowances: [
            ...(formData.carAllowanceEnrolled && formData.carAllowanceAmount ? [{ name: "Car Allowance", amount: formData.carAllowanceAmount }] : []),
            ...(formData.mobileAllowanceEnrolled && formData.mobileAllowanceAmount ? [{ name: "Mobile Allowance", amount: formData.mobileAllowanceAmount }] : []),
          ],
        },
        medicalInsuranceProvider: formData.medicalInsuranceProvider || undefined,
        medicalDependents: dependents.length > 0 ? dependents : undefined,
        companyCar: formData.companyCarEnrolled ? { enrolled: true, model: formData.companyCarModel, plateNumber: formData.companyCarPlate } : { enrolled: false },
        carAllowance: formData.carAllowanceEnrolled ? { enrolled: true, monthlyAmount: formData.carAllowanceAmount } : { enrolled: false },
        lifeInsurance: formData.lifeInsuranceEnrolled ? { enrolled: true, provider: formData.lifeInsuranceProvider, coverageAmount: formData.lifeInsuranceCoverage } : { enrolled: false },
        mobileDevice: formData.mobileDeviceEnrolled ? { enrolled: true, model: formData.mobileDeviceModel, number: formData.mobileDeviceNumber } : { enrolled: false },
        mobileAllowance: formData.mobileAllowanceEnrolled ? { enrolled: true, monthlyAmount: formData.mobileAllowanceAmount } : { enrolled: false },
      }
      setEmployees((prev) => [...prev, newEmployee])
      alert("Employee added successfully")
    }

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullArabicName">Full Arabic Name *</Label>
              <Input
                id="fullArabicName"
                value={formData.fullArabicName}
                onChange={(e) => setFormData({ ...formData, fullArabicName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID *</Label>
              <Input
                id="nationalId"
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalIdExpiry">National ID Expiry Date</Label>
              <Input
                id="nationalIdExpiry"
                type="date"
                value={formData.nationalIdExpiry}
                onChange={(e) => setFormData({ ...formData, nationalIdExpiry: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialInsuranceNumber">Social Insurance Number</Label>
              <Input
                id="socialInsuranceNumber"
                value={formData.socialInsuranceNumber}
                onChange={(e) => setFormData({ ...formData, socialInsuranceNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.gender === "Male" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="militaryStatus">Military Status</Label>
                  <Select
                    value={formData.militaryStatus}
                    onValueChange={(value) => setFormData({ ...formData, militaryStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select military status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Exempted">Exempted</SelectItem>
                      <SelectItem value="Postponed">Postponed</SelectItem>
                      <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="militaryCertificateExpiry">Military Certificate Expiry Date</Label>
                  <Input
                    id="militaryCertificateExpiry"
                    type="date"
                    value={formData.militaryCertificateExpiry}
                    onChange={(e) => setFormData({ ...formData, militaryCertificateExpiry: e.target.value })}
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Select value={formData.religion} onValueChange={(value) => setFormData({ ...formData, religion: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Muslim">Muslim</SelectItem>
                  <SelectItem value="Christian">Christian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Division — required */}
            <div className="space-y-2">
              <Label htmlFor="division">Division <span className="text-red-500">*</span></Label>
              <Input
                id="division"
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                placeholder="e.g. Technology"
                required
              />
            </div>

            {/* Department — optional */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
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
                </SelectContent>
              </Select>
            </div>

            {/* Team — optional */}
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Input
                id="team"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                placeholder="e.g. Backend Engineering"
              />
            </div>

            {/* Section — optional */}
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                placeholder="e.g. Platform"
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
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workLocation">Work Location *</Label>
              <Select
                value={formData.workLocation}
                onValueChange={(value) => setFormData({ ...formData, workLocation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select work location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arkan">Arkan</SelectItem>
                  <SelectItem value="Maadi">Maadi</SelectItem>
                  <SelectItem value="New Cairo">New Cairo</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractType">Contract Type *</Label>
              <Select
                value={formData.contractType}
                onValueChange={(value) => setFormData({ ...formData, contractType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Consultant">Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type *</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Insource">Insource</SelectItem>
                  <SelectItem value="Outsource">Outsource</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.employmentType === "Outsource" && (
              <div className="space-y-2">
                <Label htmlFor="outsourceCompany">Outsource Company</Label>
                <Input
                  id="outsourceCompany"
                  value={formData.outsourceCompany}
                  onChange={(e) => setFormData({ ...formData, outsourceCompany: e.target.value })}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="costCenter">Cost Center *</Label>
              <Input
                id="costCenter"
                value={formData.costCenter}
                onChange={(e) => setFormData({ ...formData, costCenter: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialInsuranceStatus">Social Insurance Status</Label>
              <Select
                value={formData.socialInsuranceStatus}
                onValueChange={(value) => setFormData({ ...formData, socialInsuranceStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Insured">Insured</SelectItem>
                  <SelectItem value="Business Owner">Business Owner</SelectItem>
                  <SelectItem value="Not Insured">Not Insured</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeStatus">Employee Status</Label>
              <Select
                value={formData.employeeStatus}
                onValueChange={(value) => setFormData({ ...formData, employeeStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On-board">On-board</SelectItem>
                  <SelectItem value="Resigned">Resigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.employeeStatus === "Resigned" && (
              <div className="space-y-2">
                <Label htmlFor="exitDate">Exit Date</Label>
                <Input
                  id="exitDate"
                  type="date"
                  value={formData.exitDate}
                  onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date *</Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basicSalary">Basic Salary (EGP) *</Label>
              <Input
                id="basicSalary"
                type="number"
                value={formData.basicSalary}
                onChange={(e) => setFormData({ ...formData, basicSalary: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportationAllowance">Transportation Allowance (EGP)</Label>
              <Input
                id="transportationAllowance"
                type="number"
                value={formData.transportationAllowance}
                onChange={(e) => setFormData({ ...formData, transportationAllowance: Number(e.target.value) })}
              />
            </div>
          </div>
        </TabsContent>

        {/* ── BENEFITS TAB ──────────────────────────────────── */}
        <TabsContent value="benefits" className="space-y-6">

          {/* Medical Insurance Provider */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-sm">Medical Insurance</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medicalInsuranceProvider">Insurance Provider</Label>
                <Select
                  value={formData.medicalInsuranceProvider}
                  onValueChange={(value) => setFormData({ ...formData, medicalInsuranceProvider: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">No Insurance</SelectItem>
                    <SelectItem value="Allianz">Allianz</SelectItem>
                    <SelectItem value="Bupa">
                      <div className="flex items-center gap-2">
                        Bupa
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-xs ml-1">+ Additional Cost</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="MetLife">MetLife</SelectItem>
                    <SelectItem value="AXA">AXA</SelectItem>
                    <SelectItem value="GlobeMed">GlobeMed</SelectItem>
                  </SelectContent>
                </Select>
                {formData.medicalInsuranceProvider === "Bupa" && (
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    ⚠ Bupa requires an additional monthly contribution from the employee.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dependents */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-sm">Medical Dependents</h3>
                {dependents.length > 0 && (
                  <Badge variant="secondary">{dependents.length} added</Badge>
                )}
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addDependent}
                className="flex items-center gap-1"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Add Dependent
              </Button>
            </div>

            {dependents.length === 0 && (
              <div className="rounded-lg border border-dashed border-muted-foreground/30 py-8 text-center text-sm text-muted-foreground">
                No dependents added yet. Click &quot;Add Dependent&quot; to add a spouse or children.
              </div>
            )}

            <div className="space-y-3">
              {dependents.map((dep, index) => (
                <div key={dep.id} className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Dependent {index + 1}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeDependent(dep.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Full Name *</Label>
                      <Input
                        value={dep.name}
                        onChange={(e) => updateDependent(dep.id, "name", e.target.value)}
                        placeholder="Dependent full name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Relationship *</Label>
                      <Select
                        value={dep.relationship}
                        onValueChange={(value) => updateDependent(dep.id, "relationship", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wife">Wife</SelectItem>
                          <SelectItem value="Husband">Husband</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={dep.dateOfBirth || ""}
                        onChange={(e) => updateDependent(dep.id, "dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>National ID</Label>
                      <Input
                        value={dep.nationalId || ""}
                        onChange={(e) => updateDependent(dep.id, "nationalId", e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-emerald-600" />
              <h3 className="font-semibold text-sm">Additional Benefits</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Company Car */}
              <div className={`rounded-xl border p-4 space-y-3 transition-colors ${
                formData.companyCarEnrolled
                  ? "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${formData.companyCarEnrolled ? "bg-violet-100 dark:bg-violet-900/40" : "bg-slate-200 dark:bg-slate-700"}`}>
                      <Car className={`h-4 w-4 ${formData.companyCarEnrolled ? "text-violet-600 dark:text-violet-400" : "text-slate-400"}`} />
                    </div>
                    <span className="text-sm font-medium">Company Car</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, companyCarEnrolled: !formData.companyCarEnrolled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${formData.companyCarEnrolled ? "bg-violet-500" : "bg-slate-300 dark:bg-slate-600"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${formData.companyCarEnrolled ? "translate-x-4" : "translate-x-1"}`} />
                  </button>
                </div>
                {formData.companyCarEnrolled && (
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-slate-500">Car Model</Label>
                      <Input
                        value={formData.companyCarModel}
                        onChange={e => setFormData({ ...formData, companyCarModel: e.target.value })}
                        placeholder="e.g. Toyota Corolla"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Plate Number</Label>
                      <Input
                        value={formData.companyCarPlate}
                        onChange={e => setFormData({ ...formData, companyCarPlate: e.target.value })}
                        placeholder="e.g. ABC 1234"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Car Allowance */}
              <div className={`rounded-xl border p-4 space-y-3 transition-colors ${
                formData.carAllowanceEnrolled
                  ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${formData.carAllowanceEnrolled ? "bg-amber-100 dark:bg-amber-900/40" : "bg-slate-200 dark:bg-slate-700"}`}>
                      <Banknote className={`h-4 w-4 ${formData.carAllowanceEnrolled ? "text-amber-600 dark:text-amber-400" : "text-slate-400"}`} />
                    </div>
                    <span className="text-sm font-medium">Car Allowance</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, carAllowanceEnrolled: !formData.carAllowanceEnrolled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${formData.carAllowanceEnrolled ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-600"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${formData.carAllowanceEnrolled ? "translate-x-4" : "translate-x-1"}`} />
                  </button>
                </div>
                {formData.carAllowanceEnrolled && (
                  <div>
                    <Label className="text-xs text-slate-500">Monthly Amount (EGP)</Label>
                    <Input
                      type="number"
                      value={formData.carAllowanceAmount}
                      onChange={e => setFormData({ ...formData, carAllowanceAmount: Number(e.target.value) })}
                      placeholder="e.g. 2000"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>
                )}
              </div>

              {/* Life Insurance */}
              <div className={`rounded-xl border p-4 space-y-3 transition-colors ${
                formData.lifeInsuranceEnrolled
                  ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${formData.lifeInsuranceEnrolled ? "bg-rose-100 dark:bg-rose-900/40" : "bg-slate-200 dark:bg-slate-700"}`}>
                      <Heart className={`h-4 w-4 ${formData.lifeInsuranceEnrolled ? "text-rose-600 dark:text-rose-400" : "text-slate-400"}`} />
                    </div>
                    <span className="text-sm font-medium">Life Insurance</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, lifeInsuranceEnrolled: !formData.lifeInsuranceEnrolled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${formData.lifeInsuranceEnrolled ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-600"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${formData.lifeInsuranceEnrolled ? "translate-x-4" : "translate-x-1"}`} />
                  </button>
                </div>
                {formData.lifeInsuranceEnrolled && (
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-slate-500">Provider</Label>
                      <Input
                        value={formData.lifeInsuranceProvider}
                        onChange={e => setFormData({ ...formData, lifeInsuranceProvider: e.target.value })}
                        placeholder="e.g. MetLife"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Coverage Amount (EGP)</Label>
                      <Input
                        type="number"
                        value={formData.lifeInsuranceCoverage}
                        onChange={e => setFormData({ ...formData, lifeInsuranceCoverage: Number(e.target.value) })}
                        placeholder="e.g. 500000"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Device */}
              <div className={`rounded-xl border p-4 space-y-3 transition-colors ${
                formData.mobileDeviceEnrolled
                  ? "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${formData.mobileDeviceEnrolled ? "bg-sky-100 dark:bg-sky-900/40" : "bg-slate-200 dark:bg-slate-700"}`}>
                      <Phone className={`h-4 w-4 ${formData.mobileDeviceEnrolled ? "text-sky-600 dark:text-sky-400" : "text-slate-400"}`} />
                    </div>
                    <span className="text-sm font-medium">Mobile Device</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mobileDeviceEnrolled: !formData.mobileDeviceEnrolled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${formData.mobileDeviceEnrolled ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${formData.mobileDeviceEnrolled ? "translate-x-4" : "translate-x-1"}`} />
                  </button>
                </div>
                {formData.mobileDeviceEnrolled && (
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-slate-500">Device Model</Label>
                      <Input
                        value={formData.mobileDeviceModel}
                        onChange={e => setFormData({ ...formData, mobileDeviceModel: e.target.value })}
                        placeholder="e.g. iPhone 15"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Phone Number</Label>
                      <Input
                        value={formData.mobileDeviceNumber}
                        onChange={e => setFormData({ ...formData, mobileDeviceNumber: e.target.value })}
                        placeholder="e.g. +20 100 000 0000"
                        className="h-7 text-xs mt-0.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Allowance */}
              <div className={`rounded-xl border p-4 space-y-3 transition-colors ${
                formData.mobileAllowanceEnrolled
                  ? "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${formData.mobileAllowanceEnrolled ? "bg-teal-100 dark:bg-teal-900/40" : "bg-slate-200 dark:bg-slate-700"}`}>
                      <Banknote className={`h-4 w-4 ${formData.mobileAllowanceEnrolled ? "text-teal-600 dark:text-teal-400" : "text-slate-400"}`} />
                    </div>
                    <span className="text-sm font-medium">Mobile Allowance</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mobileAllowanceEnrolled: !formData.mobileAllowanceEnrolled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${formData.mobileAllowanceEnrolled ? "bg-teal-500" : "bg-slate-300 dark:bg-slate-600"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${formData.mobileAllowanceEnrolled ? "translate-x-4" : "translate-x-1"}`} />
                  </button>
                </div>
                {formData.mobileAllowanceEnrolled && (
                  <div>
                    <Label className="text-xs text-slate-500">Monthly Amount (EGP)</Label>
                    <Input
                      type="number"
                      value={formData.mobileAllowanceAmount}
                      onChange={e => setFormData({ ...formData, mobileAllowanceAmount: Number(e.target.value) })}
                      placeholder="e.g. 500"
                      className="h-7 text-xs mt-0.5"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit">{employee ? "Update Employee" : "Add Employee"}</Button>
      </div>
    </form>
  )
}
