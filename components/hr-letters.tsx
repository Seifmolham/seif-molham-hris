"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  FileText,
  Download,
  Eye,
  Edit,
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Printer,
  Archive,
} from "lucide-react"

export function HRLetters() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [activeTab, setActiveTab] = useState("templates")

  const letterTemplates = [
    {
      id: "employment-verification",
      name: "Employment Verification Letter",
      description: "Confirms employee's current employment status and details",
      category: "Verification",
      fields: ["Employee Name", "Position", "Start Date", "Salary", "Employment Status"],
      usage: 45,
      lastUsed: "2024-01-15",
    },
    {
      id: "salary-certificate",
      name: "Salary Certificate",
      description: "Official document stating employee's salary information",
      category: "Financial",
      fields: ["Employee Name", "Position", "Monthly Salary", "Annual Salary", "Benefits"],
      usage: 32,
      lastUsed: "2024-01-14",
    },
    {
      id: "experience-letter",
      name: "Experience Letter",
      description: "Details employee's work experience and performance",
      category: "Experience",
      fields: ["Employee Name", "Position", "Duration", "Responsibilities", "Performance"],
      usage: 28,
      lastUsed: "2024-01-12",
    },
    {
      id: "promotion-letter",
      name: "Promotion Letter",
      description: "Announces employee promotion with new role details",
      category: "Promotion",
      fields: ["Employee Name", "Current Position", "New Position", "Effective Date", "New Salary"],
      usage: 18,
      lastUsed: "2024-01-10",
    },
    {
      id: "warning-letter",
      name: "Warning Letter",
      description: "Formal warning for policy violations or performance issues",
      category: "Disciplinary",
      fields: ["Employee Name", "Issue Description", "Warning Level", "Improvement Plan", "Consequences"],
      usage: 12,
      lastUsed: "2024-01-08",
    },
    {
      id: "resignation-acceptance",
      name: "Resignation Acceptance",
      description: "Acknowledges and accepts employee's resignation",
      category: "Resignation",
      fields: ["Employee Name", "Resignation Date", "Last Working Day", "Handover Details", "Final Settlement"],
      usage: 15,
      lastUsed: "2024-01-06",
    },
    {
      id: "offer-letter",
      name: "Job Offer Letter",
      description: "Formal job offer with terms and conditions",
      category: "Recruitment",
      fields: ["Candidate Name", "Position", "Start Date", "Salary", "Benefits", "Terms"],
      usage: 38,
      lastUsed: "2024-01-16",
    },
    {
      id: "termination-letter",
      name: "Termination Letter",
      description: "Formal notice of employment termination",
      category: "Termination",
      fields: ["Employee Name", "Termination Date", "Reason", "Final Settlement", "Return of Property"],
      usage: 8,
      lastUsed: "2024-01-05",
    },
  ]

  const generatedLetters = [
    {
      id: 1,
      type: "Employment Verification Letter",
      employee: "Sarah Johnson",
      generatedBy: "HR Admin",
      generatedDate: "2024-01-15",
      status: "Sent",
      recipient: "Bank of America",
      purpose: "Loan Application",
    },
    {
      id: 2,
      type: "Salary Certificate",
      employee: "Michael Chen",
      generatedBy: "HR Manager",
      generatedDate: "2024-01-14",
      status: "Draft",
      recipient: "Embassy",
      purpose: "Visa Application",
    },
    {
      id: 3,
      type: "Experience Letter",
      employee: "David Wilson",
      generatedBy: "HR Admin",
      generatedDate: "2024-01-12",
      status: "Sent",
      recipient: "New Employer",
      purpose: "Job Application",
    },
    {
      id: 4,
      type: "Promotion Letter",
      employee: "Lisa Anderson",
      generatedBy: "Department Head",
      generatedDate: "2024-01-10",
      status: "Approved",
      recipient: "Employee",
      purpose: "Internal Promotion",
    },
  ]

  const pendingRequests = [
    {
      id: 1,
      type: "Employment Verification Letter",
      requestedBy: "John Smith",
      requestDate: "2024-01-16",
      purpose: "Mortgage Application",
      priority: "High",
      status: "Pending Review",
    },
    {
      id: 2,
      type: "Salary Certificate",
      requestedBy: "Emma Davis",
      requestDate: "2024-01-15",
      purpose: "Personal Loan",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      type: "Experience Letter",
      requestedBy: "Robert Brown",
      requestDate: "2024-01-14",
      purpose: "New Job Application",
      priority: "Low",
      status: "Pending Approval",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sent
          </Badge>
        )
      case "Draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Edit className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        )
      case "Approved":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "Pending Review":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "In Progress":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "Pending Approval":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending Approval
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/10 opacity-20" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-4 translate-y-4" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Mail className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">HR Letters</h1>
                <p className="text-secondary-foreground/80 text-lg">
                  Automated HR letter generation and template management
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Letter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Generate New Letter</DialogTitle>
                  <DialogDescription>Select a template and fill in the details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Letter Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a letter template" />
                      </SelectTrigger>
                      <SelectContent>
                        {letterTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Chen</SelectItem>
                        <SelectItem value="david">David Wilson</SelectItem>
                        <SelectItem value="lisa">Lisa Anderson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input id="recipient" placeholder="Who will receive this letter?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input id="purpose" placeholder="Purpose of the letter" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Additional Notes</Label>
                    <Textarea id="additional-notes" placeholder="Any additional information or special instructions" />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Generate Letter</Button>
                    <Button variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Letters</CardTitle>
            <Mail className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">234</div>
            <p className="text-xs text-blue-600">Generated this year</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">This Month</CardTitle>
            <Calendar className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">28</div>
            <p className="text-xs text-green-600">Letters generated</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pending Requests</CardTitle>
            <Clock className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">3</div>
            <p className="text-xs text-purple-600">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Templates</CardTitle>
            <FileText className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">8</div>
            <p className="text-xs text-orange-600">Available templates</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="generated" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Generated
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Letter Templates</CardTitle>
              <CardDescription>Manage and customize letter templates for various HR processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {letterTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {template.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{template.usage}</div>
                          <div className="text-xs text-muted-foreground">uses</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="space-y-2">
                        <div className="text-xs font-medium">Required Fields:</div>
                        <div className="flex flex-wrap gap-1">
                          {template.fields.slice(0, 3).map((field, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                          {template.fields.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.fields.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          <Plus className="w-3 h-3 mr-1" />
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Letters Tab */}
        <TabsContent value="generated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Letters</CardTitle>
              <CardDescription>View and manage all generated HR letters</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Letter Type</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedLetters.map((letter) => (
                    <TableRow key={letter.id}>
                      <TableCell className="font-medium">{letter.type}</TableCell>
                      <TableCell>{letter.employee}</TableCell>
                      <TableCell>{letter.generatedBy}</TableCell>
                      <TableCell>{letter.generatedDate}</TableCell>
                      <TableCell>{letter.recipient}</TableCell>
                      <TableCell>{getStatusBadge(letter.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Printer className="w-4 h-4" />
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
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Review and process letter requests from employees</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Letter Type</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.type}</TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{request.purpose}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
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

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Used Templates</CardTitle>
                <CardDescription>Templates ranked by usage frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {letterTemplates
                    .sort((a, b) => b.usage - a.usage)
                    .slice(0, 5)
                    .map((template, index) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{template.name}</div>
                            <div className="text-xs text-muted-foreground">{template.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{template.usage}</div>
                          <div className="text-xs text-muted-foreground">uses</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Letter Generation Trends</CardTitle>
                <CardDescription>Monthly letter generation statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">January 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-sm font-medium">28</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">December 2023</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="text-sm font-medium">23</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">November 2023</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-sm font-medium">20</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">October 2023</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm font-medium">15</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
