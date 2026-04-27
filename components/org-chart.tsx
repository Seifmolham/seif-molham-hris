"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, Building2, User, Mail, Phone, Download, Maximize2 } from "lucide-react"

interface OrgNode {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  avatar?: string
  managerId?: string
  level: number
  directReports: string[]
}

const mockOrgData: OrgNode[] = [
  {
    id: "1",
    name: "Seif Molham",
    position: "Chief Executive Officer",
    department: "Executive",
    email: "seif.molham@company.com",
    phone: "+20 123 456 7890",
    level: 0,
    directReports: ["2", "3", "4", "5"],
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    position: "Chief Technology Officer",
    department: "Information Technology",
    email: "ahmed.hassan@company.com",
    phone: "+20 123 456 7891",
    managerId: "1",
    level: 1,
    directReports: ["6", "7", "8"],
  },
  {
    id: "3",
    name: "Fatima Ali",
    position: "HR Director",
    department: "Human Resources",
    email: "fatima.ali@company.com",
    phone: "+20 123 456 7892",
    managerId: "1",
    level: 1,
    directReports: ["9", "10"],
  },
  {
    id: "4",
    name: "Mohamed Khaled",
    position: "Finance Director",
    department: "Finance",
    email: "mohamed.khaled@company.com",
    phone: "+20 123 456 7893",
    managerId: "1",
    level: 1,
    directReports: ["11", "12"],
  },
  {
    id: "5",
    name: "Sarah Johnson",
    position: "Marketing Director",
    department: "Marketing",
    email: "sarah.johnson@company.com",
    phone: "+20 123 456 7894",
    managerId: "1",
    level: 1,
    directReports: ["13", "14"],
  },
  {
    id: "6",
    name: "Omar Mahmoud",
    position: "Senior Developer",
    department: "Information Technology",
    email: "omar.mahmoud@company.com",
    phone: "+20 123 456 7895",
    managerId: "2",
    level: 2,
    directReports: [],
  },
  {
    id: "7",
    name: "Nour Ahmed",
    position: "DevOps Engineer",
    department: "Information Technology",
    email: "nour.ahmed@company.com",
    phone: "+20 123 456 7896",
    managerId: "2",
    level: 2,
    directReports: [],
  },
  {
    id: "8",
    name: "Youssef Ibrahim",
    position: "UI/UX Designer",
    department: "Information Technology",
    email: "youssef.ibrahim@company.com",
    phone: "+20 123 456 7897",
    managerId: "2",
    level: 2,
    directReports: [],
  },
  {
    id: "9",
    name: "Mona Hassan",
    position: "HR Specialist",
    department: "Human Resources",
    email: "mona.hassan@company.com",
    phone: "+20 123 456 7898",
    managerId: "3",
    level: 2,
    directReports: [],
  },
  {
    id: "10",
    name: "Karim Farouk",
    position: "Recruitment Specialist",
    department: "Human Resources",
    email: "karim.farouk@company.com",
    phone: "+20 123 456 7899",
    managerId: "3",
    level: 2,
    directReports: [],
  },
]

export function OrgChart() {
  const [orgData] = useState<OrgNode[]>(mockOrgData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [viewMode, setViewMode] = useState<"chart" | "list">("chart")

  const departments = [...new Set(orgData.map((node) => node.department))]

  const filteredData = orgData.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || node.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const getNodesByLevel = (level: number) => {
    return filteredData.filter((node) => node.level === level)
  }

  const getDirectReports = (managerId: string) => {
    return orgData.filter((node) => node.managerId === managerId)
  }

  const totalEmployees = orgData.length
  const totalDepartments = departments.length
  const avgTeamSize = Math.round(totalEmployees / totalDepartments)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization Chart</h1>
          <p className="text-muted-foreground">Visual representation of organizational structure and reporting lines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Chart
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            Full Screen
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Across all levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDepartments}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Management Levels</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Organizational levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTeamSize}</div>
            <p className="text-xs text-muted-foreground">Employees per department</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chart">Organization Chart</TabsTrigger>
          <TabsTrigger value="directory">Employee Directory</TabsTrigger>
          <TabsTrigger value="departments">Department View</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          {/* Search and Filters */}
          <Card>
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
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[200px]">
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
              </div>
            </CardContent>
          </Card>

          {/* Organization Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Organizational Structure</CardTitle>
              <CardDescription>Hierarchical view of reporting relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Level 0 - CEO */}
                <div className="flex justify-center">
                  <div className="space-y-4">
                    {getNodesByLevel(0).map((node) => (
                      <OrgNodeCard key={node.id} node={node} />
                    ))}
                  </div>
                </div>

                {/* Level 1 - Directors */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {getNodesByLevel(1).map((node) => (
                      <OrgNodeCard key={node.id} node={node} />
                    ))}
                  </div>
                </div>

                {/* Level 2 - Employees */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {getNodesByLevel(2).map((node) => (
                    <OrgNodeCard key={node.id} node={node} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>Complete list of all employees with contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredData.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={node.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {node.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{node.name}</h3>
                        <p className="text-sm text-muted-foreground">{node.position}</p>
                        <p className="text-sm text-muted-foreground">{node.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" />
                        {node.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" />
                        {node.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-6">
            {departments.map((department) => {
              const deptEmployees = orgData.filter((node) => node.department === department)
              const deptHead = deptEmployees.find((emp) => emp.level === 1)
              const deptMembers = deptEmployees.filter((emp) => emp.level > 1)

              return (
                <Card key={department}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {department}
                    </CardTitle>
                    <CardDescription>{deptEmployees.length} employees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deptHead && (
                        <div>
                          <h4 className="font-medium mb-2">Department Head</h4>
                          <OrgNodeCard node={deptHead} compact />
                        </div>
                      )}
                      {deptMembers.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Team Members</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {deptMembers.map((member) => (
                              <OrgNodeCard key={member.id} node={member} compact />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrgNodeCard({ node, compact = false }: { node: OrgNode; compact?: boolean }) {
  return (
    <Card className={`${compact ? "p-3" : "p-4"} hover:shadow-md transition-shadow cursor-pointer`}>
      <div className="flex items-center gap-3">
        <Avatar className={compact ? "h-8 w-8" : "h-12 w-12"}>
          <AvatarImage src={node.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {node.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${compact ? "text-sm" : ""}`}>{node.name}</h3>
          <p className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>{node.position}</p>
          {!compact && <p className="text-xs text-muted-foreground">{node.department}</p>}
        </div>
      </div>
      {!compact && (
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            {node.email}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            {node.phone}
          </div>
        </div>
      )}
      <div className="mt-2">
        <Badge variant="outline" className="text-xs">
          Level {node.level}
        </Badge>
      </div>
    </Card>
  )
}
