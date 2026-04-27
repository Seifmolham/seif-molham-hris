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
import {
  DollarSign,
  Search,
  Calculator,
  FileText,
  Download,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  CreditCard,
  PieChart,
  BarChart3,
  Smartphone,
} from "lucide-react"

interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  department: string
  position: string
  payPeriod: string
  basicSalary: number
  allowances: {
    housing: number
    transport: number
    medical: number
    other: number
  }
  overtime: {
    hours: number
    rate: number
    amount: number
  }
  deductions: {
    tax: number
    insurance: number
    pension: number
    other: number
  }
  netSalary: number
  status: "Draft" | "Processed" | "Paid" | "On Hold"
  paymentDate?: string
  paymentMethod: "Bank Transfer" | "Cash" | "Check"
}

interface SalaryComponent {
  id: string
  name: string
  type: "Allowance" | "Deduction"
  category: "Fixed" | "Variable" | "Percentage"
  amount?: number
  percentage?: number
  isActive: boolean
  isTaxable: boolean
  description: string
}

const mockPayrollRecords: PayrollRecord[] = [
  {
    id: "1",
    employeeId: "emp1",
    employeeName: "Ahmed Hassan",
    department: "Engineering",
    position: "Senior Developer",
    payPeriod: "2024-01",
    basicSalary: 15000,
    allowances: {
      housing: 3000,
      transport: 800,
      medical: 500,
      other: 200,
    },
    overtime: {
      hours: 10,
      rate: 150,
      amount: 1500,
    },
    deductions: {
      tax: 2100,
      insurance: 450,
      pension: 750,
      other: 100,
    },
    netSalary: 17600,
    status: "Paid",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "2",
    employeeId: "emp2",
    employeeName: "Fatima Ali",
    department: "Marketing",
    position: "Marketing Manager",
    payPeriod: "2024-01",
    basicSalary: 12000,
    allowances: {
      housing: 2400,
      transport: 600,
      medical: 400,
      other: 150,
    },
    overtime: {
      hours: 5,
      rate: 120,
      amount: 600,
    },
    deductions: {
      tax: 1680,
      insurance: 360,
      pension: 600,
      other: 80,
    },
    netSalary: 13430,
    status: "Processed",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "3",
    employeeId: "emp3",
    employeeName: "Omar Mahmoud",
    department: "Sales",
    position: "Sales Representative",
    payPeriod: "2024-02",
    basicSalary: 8000,
    allowances: {
      housing: 1600,
      transport: 400,
      medical: 300,
      other: 100,
    },
    overtime: {
      hours: 8,
      rate: 80,
      amount: 640,
    },
    deductions: {
      tax: 1120,
      insurance: 240,
      pension: 400,
      other: 50,
    },
    netSalary: 9230,
    status: "Draft",
    paymentMethod: "Bank Transfer",
  },
]

const mockSalaryComponents: SalaryComponent[] = [
  {
    id: "1",
    name: "Housing Allowance",
    type: "Allowance",
    category: "Percentage",
    percentage: 20,
    isActive: true,
    isTaxable: false,
    description: "Housing allowance based on basic salary",
  },
  {
    id: "2",
    name: "Transport Allowance",
    type: "Allowance",
    category: "Fixed",
    amount: 800,
    isActive: true,
    isTaxable: false,
    description: "Monthly transport allowance",
  },
  {
    id: "3",
    name: "Medical Insurance",
    type: "Allowance",
    category: "Fixed",
    amount: 500,
    isActive: true,
    isTaxable: false,
    description: "Medical insurance coverage",
  },
  {
    id: "4",
    name: "Income Tax",
    type: "Deduction",
    category: "Percentage",
    percentage: 14,
    isActive: true,
    isTaxable: false,
    description: "Government income tax",
  },
  {
    id: "5",
    name: "Social Insurance",
    type: "Deduction",
    category: "Percentage",
    percentage: 3,
    isActive: true,
    isTaxable: false,
    description: "Social security contribution",
  },
  {
    id: "6",
    name: "Pension Fund",
    type: "Deduction",
    category: "Percentage",
    percentage: 5,
    isActive: true,
    isTaxable: false,
    description: "Retirement pension contribution",
  },
]

export function PayrollManagement() {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords)
  const [salaryComponents, setSalaryComponents] = useState<SalaryComponent[]>(mockSalaryComponents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [isNewPayrollOpen, setIsNewPayrollOpen] = useState(false)
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)

  const filteredRecords = payrollRecords.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesPeriod = periodFilter === "all" || record.payPeriod === periodFilter
    return matchesSearch && matchesStatus && matchesPeriod
  })

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netSalary, 0)
  const processedPayroll = payrollRecords.filter((r) => r.status === "Processed" || r.status === "Paid").length
  const pendingPayroll = payrollRecords.filter((r) => r.status === "Draft").length
  const avgSalary = Math.round(totalPayroll / payrollRecords.length)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-primary text-white"
      case "Processed":
        return "bg-secondary text-white"
      case "Draft":
        return "bg-gray-500 text-white"
      case "On Hold":
        return "bg-red-500 text-white"
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
              <DollarSign className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Payroll Management</h1>
              <p className="text-secondary-foreground/80 text-lg">
                Comprehensive salary processing and compensation management
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
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Payroll</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              ${totalPayroll.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">This month</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Processed</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <CheckCircle className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{processedPayroll}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Employees paid</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${(processedPayroll / payrollRecords.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pending</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{pendingPayroll}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">Awaiting processing</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(pendingPayroll / payrollRecords.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Avg. Salary</CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              ${avgSalary.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Per employee</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: "70%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payroll" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payroll">Payroll Processing</TabsTrigger>
          <TabsTrigger value="components">Salary Components</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-4">
          {/* Search and Filters */}
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Processed">Processed</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Periods</SelectItem>
                    <SelectItem value="2024-02">Feb 2024</SelectItem>
                    <SelectItem value="2024-01">Jan 2024</SelectItem>
                    <SelectItem value="2023-12">Dec 2023</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isNewPayrollOpen} onOpenChange={setIsNewPayrollOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Process Payroll
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Process Monthly Payroll</DialogTitle>
                      <DialogDescription>Generate payroll for the selected period.</DialogDescription>
                    </DialogHeader>
                    <PayrollProcessForm onSubmit={() => setIsNewPayrollOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Payroll Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Payroll Records ({filteredRecords.length})
                  </CardTitle>
                  <CardDescription>Manage employee salary processing and payments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Calculator className="h-4 w-4 mr-2" />
                    Bulk Process
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
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
                            <div className="text-sm text-muted-foreground">{record.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{record.payPeriod}</div>
                        <div className="text-sm text-muted-foreground">{record.department}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${record.basicSalary.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-primary">
                          $
                          {(
                            record.allowances.housing +
                            record.allowances.transport +
                            record.allowances.medical +
                            record.allowances.other +
                            record.overtime.amount
                          ).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">+${record.overtime.amount} OT</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-red-600">
                          $
                          {(
                            record.deductions.tax +
                            record.deductions.insurance +
                            record.deductions.pension +
                            record.deductions.other
                          ).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Tax: ${record.deductions.tax}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-lg">${record.netSalary.toLocaleString()}</div>
                        {record.paymentDate && (
                          <div className="text-sm text-muted-foreground">
                            Paid: {new Date(record.paymentDate).toLocaleDateString()}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            Payslip
                          </Button>
                          {record.status === "Draft" && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Process
                            </Button>
                          )}
                          {record.status === "Processed" && (
                            <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                              Pay
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Salary Components ({salaryComponents.length})
                  </CardTitle>
                  <CardDescription>Configure allowances and deductions</CardDescription>
                </div>
                <Dialog open={isComponentDialogOpen} onOpenChange={setIsComponentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Component
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Salary Component</DialogTitle>
                      <DialogDescription>Add a new allowance or deduction component.</DialogDescription>
                    </DialogHeader>
                    <ComponentForm onSubmit={() => setIsComponentDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">Allowances</h3>
                  <div className="space-y-3">
                    {salaryComponents
                      .filter((c) => c.type === "Allowance")
                      .map((component) => (
                        <Card key={component.id} className="border border-slate-200 dark:border-slate-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{component.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={component.isActive ? "default" : "outline"}
                                  className={component.isActive ? "bg-primary text-white" : ""}
                                >
                                  {component.isActive ? "Active" : "Inactive"}
                                </Badge>
                                {component.isTaxable && (
                                  <Badge variant="outline" className="text-xs">
                                    Taxable
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm">
                                <span className="font-medium">
                                  {component.category === "Fixed" && component.amount && `$${component.amount}`}
                                  {component.category === "Percentage" &&
                                    component.percentage &&
                                    `${component.percentage}%`}
                                  {component.category === "Variable" && "Variable"}
                                </span>
                                <span className="text-muted-foreground ml-2">({component.category})</span>
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  {component.isActive ? "Disable" : "Enable"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-secondary">Deductions</h3>
                  <div className="space-y-3">
                    {salaryComponents
                      .filter((c) => c.type === "Deduction")
                      .map((component) => (
                        <Card key={component.id} className="border border-slate-200 dark:border-slate-700">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{component.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={component.isActive ? "default" : "outline"}
                                  className={component.isActive ? "bg-secondary text-white" : ""}
                                >
                                  {component.isActive ? "Active" : "Inactive"}
                                </Badge>
                                {component.isTaxable && (
                                  <Badge variant="outline" className="text-xs">
                                    Taxable
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm">
                                <span className="font-medium">
                                  {component.category === "Fixed" && component.amount && `$${component.amount}`}
                                  {component.category === "Percentage" &&
                                    component.percentage &&
                                    `${component.percentage}%`}
                                  {component.category === "Variable" && "Variable"}
                                </span>
                                <span className="text-muted-foreground ml-2">({component.category})</span>
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  {component.isActive ? "Disable" : "Enable"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
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
                  Payroll Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Monthly Payroll</span>
                  <span className="font-medium text-primary">${totalPayroll.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Salary</span>
                  <span className="font-medium text-primary">${avgSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Tax Deductions</span>
                  <span className="font-medium text-primary">
                    ${payrollRecords.reduce((sum, r) => sum + r.deductions.tax, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overtime Payments</span>
                  <span className="font-medium text-primary">
                    ${payrollRecords.reduce((sum, r) => sum + r.overtime.amount, 0).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-secondary" />
                  Department Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from(new Set(payrollRecords.map((r) => r.department))).map((department) => {
                  const deptRecords = payrollRecords.filter((r) => r.department === department)
                  const deptTotal = deptRecords.reduce((sum, r) => sum + r.netSalary, 0)
                  const percentage = Math.round((deptTotal / totalPayroll) * 100)

                  return (
                    <div key={department} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{department}</span>
                        <span className="text-sm text-muted-foreground">
                          ${deptTotal.toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
                <CardDescription>Configure payroll processing parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pay Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="egp">EGP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Overtime Rate Multiplier</Label>
                  <Input type="number" defaultValue="1.5" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label>Tax Year Start</Label>
                  <Select defaultValue="january">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Save Settings</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure available payment options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { method: "Bank Transfer", enabled: true, icon: CreditCard },
                    { method: "Cash Payment", enabled: false, icon: DollarSign },
                    { method: "Check Payment", enabled: true, icon: FileText },
                    { method: "Digital Wallet", enabled: false, icon: Smartphone },
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
                  Configure Payment Methods
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PayrollProcessForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    period: "",
    department: "",
    includeOvertime: true,
    includeBonuses: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="period">Pay Period *</Label>
        <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024-02">February 2024</SelectItem>
            <SelectItem value="2024-01">January 2024</SelectItem>
            <SelectItem value="2023-12">December 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
          <SelectTrigger>
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Process Payroll
        </Button>
      </div>
    </form>
  )
}

function ComponentForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    amount: "",
    percentage: "",
    description: "",
    isTaxable: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Component Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Allowance">Allowance</SelectItem>
              <SelectItem value="Deduction">Deduction</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fixed">Fixed Amount</SelectItem>
              <SelectItem value="Percentage">Percentage</SelectItem>
              <SelectItem value="Variable">Variable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {formData.category === "Fixed" && (
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </div>
      )}
      {formData.category === "Percentage" && (
        <div className="space-y-2">
          <Label htmlFor="percentage">Percentage *</Label>
          <Input
            id="percentage"
            type="number"
            step="0.1"
            value={formData.percentage}
            onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
            required
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Create Component
        </Button>
      </div>
    </form>
  )
}
