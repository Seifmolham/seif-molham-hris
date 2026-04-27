"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Search,
  Filter,
  File,
  ImageIcon,
  Video,
  Archive,
  User,
  Shield,
  Star,
  Share,
} from "lucide-react"

export function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("list")

  const documentCategories = [
    { id: "all", name: "All Documents", count: 156, icon: FileText },
    { id: "contracts", name: "Contracts", count: 23, icon: FileText },
    { id: "policies", name: "Policies", count: 18, icon: Shield },
    { id: "forms", name: "Forms", count: 34, icon: File },
    { id: "certificates", name: "Certificates", count: 28, icon: Star },
    { id: "reports", name: "Reports", count: 41, icon: Archive },
    { id: "media", name: "Media", count: 12, icon: ImageIcon },
  ]

  const documents = [
    {
      id: 1,
      name: "Employee Handbook 2024",
      type: "PDF",
      category: "policies",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      uploadedBy: "HR Admin",
      department: "Human Resources",
      version: "v2.1",
      status: "Active",
      downloads: 234,
      lastAccessed: "2024-01-16",
      tags: ["handbook", "policies", "2024"],
      description: "Complete employee handbook with updated policies and procedures",
    },
    {
      id: 2,
      name: "Employment Contract Template",
      type: "DOCX",
      category: "contracts",
      size: "156 KB",
      uploadDate: "2024-01-10",
      uploadedBy: "Legal Team",
      department: "Legal",
      version: "v1.3",
      status: "Active",
      downloads: 89,
      lastAccessed: "2024-01-16",
      tags: ["contract", "template", "employment"],
      description: "Standard employment contract template for new hires",
    },
    {
      id: 3,
      name: "Safety Training Certificate",
      type: "PDF",
      category: "certificates",
      size: "890 KB",
      uploadDate: "2024-01-08",
      uploadedBy: "Safety Officer",
      department: "Operations",
      version: "v1.0",
      status: "Active",
      downloads: 156,
      lastAccessed: "2024-01-15",
      tags: ["safety", "training", "certificate"],
      description: "Workplace safety training completion certificate",
    },
    {
      id: 4,
      name: "Leave Request Form",
      type: "PDF",
      category: "forms",
      size: "245 KB",
      uploadDate: "2024-01-05",
      uploadedBy: "HR Admin",
      department: "Human Resources",
      version: "v2.0",
      status: "Active",
      downloads: 445,
      lastAccessed: "2024-01-16",
      tags: ["leave", "form", "request"],
      description: "Official leave request form for all employees",
    },
    {
      id: 5,
      name: "Q4 Performance Report",
      type: "XLSX",
      category: "reports",
      size: "1.8 MB",
      uploadDate: "2024-01-03",
      uploadedBy: "Analytics Team",
      department: "Management",
      version: "v1.0",
      status: "Confidential",
      downloads: 23,
      lastAccessed: "2024-01-14",
      tags: ["performance", "Q4", "report"],
      description: "Quarterly performance analysis and metrics report",
    },
    {
      id: 6,
      name: "Company Logo Assets",
      type: "ZIP",
      category: "media",
      size: "5.2 MB",
      uploadDate: "2023-12-28",
      uploadedBy: "Marketing Team",
      department: "Marketing",
      version: "v3.1",
      status: "Active",
      downloads: 78,
      lastAccessed: "2024-01-12",
      tags: ["logo", "branding", "assets"],
      description: "Complete set of company logo files in various formats",
    },
  ]

  const recentActivity = [
    { action: "uploaded", document: "Employee Handbook 2024", user: "HR Admin", time: "2 hours ago" },
    { action: "downloaded", document: "Leave Request Form", user: "Sarah Johnson", time: "4 hours ago" },
    { action: "updated", document: "Employment Contract Template", user: "Legal Team", time: "1 day ago" },
    { action: "shared", document: "Safety Training Certificate", user: "Safety Officer", time: "2 days ago" },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "docx":
      case "doc":
        return <File className="w-5 h-5 text-blue-500" />
      case "xlsx":
      case "xls":
        return <File className="w-5 h-5 text-green-500" />
      case "zip":
      case "rar":
        return <Archive className="w-5 h-5 text-purple-500" />
      case "jpg":
      case "png":
      case "gif":
        return <ImageIcon className="w-5 h-5 text-orange-500" />
      case "mp4":
      case "avi":
        return <Video className="w-5 h-5 text-pink-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "Confidential":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Confidential</Badge>
      case "Archived":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Document Management</h1>
                <p className="text-primary-foreground/80 text-lg">Centralized document storage and management system</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload New Document</DialogTitle>
                  <DialogDescription>Add a new document to the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Select File</Label>
                    <Input id="file" type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-name">Document Name</Label>
                    <Input id="doc-name" placeholder="Enter document name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contracts">Contracts</SelectItem>
                        <SelectItem value="policies">Policies</SelectItem>
                        <SelectItem value="forms">Forms</SelectItem>
                        <SelectItem value="certificates">Certificates</SelectItem>
                        <SelectItem value="reports">Reports</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Brief description of the document" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g., policy, handbook, 2024" />
                  </div>
                  <Button className="w-full">Upload Document</Button>
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
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Documents</CardTitle>
            <FileText className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">156</div>
            <p className="text-xs text-blue-600">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Storage Used</CardTitle>
            <Archive className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">2.4 GB</div>
            <p className="text-xs text-green-600">of 10 GB limit</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Downloads</CardTitle>
            <Download className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">1,234</div>
            <p className="text-xs text-purple-600">This month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Active Users</CardTitle>
            <User className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">89</div>
            <p className="text-xs text-orange-600">Accessing documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {documentCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                      <span className="font-medium">{activity.document}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    Showing {filteredDocuments.length} of {documents.length} documents
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {doc.type} • {doc.version}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {documentCategories.find((cat) => cat.id === doc.category)?.name}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.department}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
