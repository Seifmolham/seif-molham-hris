"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, Edit, Trash2, MoreHorizontal, Users, Building2, User, MapPin } from "lucide-react"

interface Department {
  id: string
  name: string
  description: string
  head: string
  headEmail: string
  location: string
  budget: number
  employeeCount: number
  parentDepartment?: string
  status: "Active" | "Inactive"
  createdAt: string
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Information Technology",
    description: "Responsible for all technology infrastructure and software development",
    head: "Ahmed Hassan",
    headEmail: "ahmed.hassan@company.com",
    location: "Arkan",
    budget: 2500000,
    employeeCount: 45,
    status: "Active",
    createdAt: "2020-01-15",
  },
  {
    id: "2",
    name: "Human Resources",
    description: "Manages employee relations, recruitment, and organizational development",
    head: "Fatima Ali",
    headEmail: "fatima.ali@company.com",
    location: "Maadi",
    budget: 800000,
    employeeCount: 12,
    status: "Active",
    createdAt: "2020-01-15",
  },
  {
    id: "3",
    name: "Finance & Accounting",
    description: "Handles financial planning, accounting, and budget management",
    head: "Mohamed Khaled",
    headEmail: "mohamed.khaled@company.com",
    location: "Downtown",
    budget: 1200000,
    employeeCount: 18,
    status: "Active",
    createdAt: "2020-01-15",
  },
  {
    id: "4",
    name: "Marketing",
    description: "Develops marketing strategies and manages brand communications",
    head: "Sarah Johnson",
    headEmail: "sarah.johnson@company.com",
    location: "New Cairo",
    budget: 1500000,
    employeeCount: 25,
    status: "Active",
    createdAt: "2020-06-01",
  },
]

export function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dept.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department Management</h1>
          <p className="text-muted-foreground">Manage organizational departments and structure</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Create a new department in your organization.</DialogDescription>
            </DialogHeader>
            <DepartmentForm
              onSubmit={() => setIsAddDialogOpen(false)}
              setDepartments={setDepartments}
              departments={departments}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">EGP {(totalBudget / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Annual budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalEmployees / departments.length)}</div>
            <p className="text-xs text-muted-foreground">Employees per department</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search departments..."
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Departments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Departments ({filteredDepartments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{department.name}</div>
                          <div className="text-sm text-muted-foreground">{department.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{department.head}</div>
                            <div className="text-sm text-muted-foreground">{department.headEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {department.location}
                        </div>
                      </TableCell>
                      <TableCell>{department.employeeCount}</TableCell>
                      <TableCell>EGP {(department.budget / 1000000).toFixed(1)}M</TableCell>
                      <TableCell>
                        <Badge variant={department.status === "Active" ? "default" : "secondary"}>
                          {department.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedDepartment(department)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this department?")) {
                                  setDepartments((prev) => prev.filter((d) => d.id !== department.id))
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
        </TabsContent>

        <TabsContent value="hierarchy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organizational Hierarchy</CardTitle>
              <CardDescription>Visual representation of department structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{dept.employeeCount} employees</div>
                        <div className="text-sm text-muted-foreground">{dept.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Analysis</CardTitle>
              <CardDescription>Department budget breakdown and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {((dept.budget / totalBudget) * 100).toFixed(1)}% of total budget
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">EGP {(dept.budget / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-muted-foreground">
                        EGP {Math.round(dept.budget / dept.employeeCount / 1000)}K per employee
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Department Dialog */}
      {selectedDepartment && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
            </DialogHeader>
            <DepartmentForm
              department={selectedDepartment}
              onSubmit={() => {
                setIsEditDialogOpen(false)
                setSelectedDepartment(null)
              }}
              setDepartments={setDepartments}
              departments={departments}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function DepartmentForm({
  department,
  onSubmit,
  setDepartments,
  departments,
}: {
  department?: Department
  onSubmit: () => void
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>
  departments: Department[]
}) {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    description: department?.description || "",
    head: department?.head || "",
    headEmail: department?.headEmail || "",
    location: department?.location || "",
    budget: department?.budget || 0,
    status: department?.status || "Active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (department) {
      // Edit existing department
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === department.id
            ? {
                ...dept,
                ...formData,
              }
            : dept,
        ),
      )
    } else {
      // Add new department
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...formData,
        employeeCount: 0,
        createdAt: new Date().toISOString(),
      }
      setDepartments((prev) => [...prev, newDepartment])
    }

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Department Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
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
          <Label htmlFor="head">Department Head *</Label>
          <Input
            id="head"
            value={formData.head}
            onChange={(e) => setFormData({ ...formData, head: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headEmail">Head Email *</Label>
          <Input
            id="headEmail"
            type="email"
            value={formData.headEmail}
            onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Annual Budget (EGP) *</Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Department description and responsibilities..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit">{department ? "Update Department" : "Add Department"}</Button>
      </div>
    </form>
  )
}
