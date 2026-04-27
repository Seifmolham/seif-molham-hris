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
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Mail,
  Phone,
} from "lucide-react"

interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  experience: string
  salary: { min: number; max: number }
  description: string
  requirements: string[]
  status: "Draft" | "Active" | "Paused" | "Closed"
  applicants: number
  createdAt: string
  deadline: string
}

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  position: string
  experience: number
  location: string
  stage: "Applied" | "Screening" | "Interview" | "Assessment" | "Offer" | "Hired" | "Rejected"
  rating: number
  appliedAt: string
  resumeUrl?: string
  notes: string
}

const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Information Technology",
    location: "Arkan",
    type: "Full-time",
    experience: "3-5 years",
    salary: { min: 18000, max: 25000 },
    description: "We are looking for a skilled Frontend Developer to join our team...",
    requirements: ["React.js", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "Active",
    applicants: 23,
    createdAt: "2024-01-15",
    deadline: "2024-02-15",
  },
  {
    id: "2",
    title: "HR Specialist",
    department: "Human Resources",
    location: "Maadi",
    type: "Full-time",
    experience: "2-4 years",
    salary: { min: 12000, max: 18000 },
    description: "Join our HR team to help manage employee relations and recruitment...",
    requirements: ["HR Management", "Recruitment", "Employee Relations", "HRIS"],
    status: "Active",
    applicants: 15,
    createdAt: "2024-01-20",
    deadline: "2024-02-20",
  },
  {
    id: "3",
    title: "Marketing Manager",
    department: "Marketing",
    location: "New Cairo",
    type: "Full-time",
    experience: "5+ years",
    salary: { min: 20000, max: 30000 },
    description: "Lead our marketing initiatives and drive brand growth...",
    requirements: ["Digital Marketing", "Brand Management", "Analytics", "Team Leadership"],
    status: "Paused",
    applicants: 8,
    createdAt: "2024-01-10",
    deadline: "2024-02-10",
  },
]

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Ahmed Mahmoud",
    email: "ahmed.mahmoud@email.com",
    phone: "+20 123 456 7890",
    position: "Senior Frontend Developer",
    experience: 4,
    location: "Cairo",
    stage: "Interview",
    rating: 4.5,
    appliedAt: "2024-01-18",
    notes: "Strong technical skills, good communication",
  },
  {
    id: "2",
    name: "Nour Hassan",
    email: "nour.hassan@email.com",
    phone: "+20 123 456 7891",
    position: "HR Specialist",
    experience: 3,
    location: "Giza",
    stage: "Screening",
    rating: 4.0,
    appliedAt: "2024-01-22",
    notes: "Relevant experience in recruitment",
  },
  {
    id: "3",
    name: "Omar Farouk",
    email: "omar.farouk@email.com",
    phone: "+20 123 456 7892",
    position: "Senior Frontend Developer",
    experience: 5,
    location: "Alexandria",
    stage: "Offer",
    rating: 4.8,
    appliedAt: "2024-01-16",
    notes: "Excellent candidate, strong portfolio",
  },
]

export function RecruitmentManagement() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings)
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)
  const [isCandidateDialogOpen, setIsCandidateDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")

  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === "all" || candidate.stage === stageFilter
    return matchesSearch && matchesStage
  })

  const totalJobs = jobPostings.length
  const activeJobs = jobPostings.filter((job) => job.status === "Active").length
  const totalCandidates = candidates.length
  const avgTimeToHire = 18 // Mock data

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruitment & Hiring</h1>
          <p className="text-muted-foreground">Manage job postings, candidates, and hiring pipeline</p>
        </div>
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
              <DialogDescription>Create a new job posting to attract candidates.</DialogDescription>
            </DialogHeader>
            <JobPostingForm
              onSubmit={() => setIsJobDialogOpen(false)}
              setJobPostings={setJobPostings}
              jobPostings={jobPostings}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">{activeJobs} active positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCandidates}</div>
            <p className="text-xs text-muted-foreground">In hiring pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidates.filter((c) => c.stage === "Interview").length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTimeToHire} days</div>
            <p className="text-xs text-muted-foreground">Company average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="pipeline">Hiring Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search job postings..."
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
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Job Postings */}
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription>
                        {job.department} • {job.location} • {job.type}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          job.status === "Active"
                            ? "default"
                            : job.status === "Paused"
                              ? "secondary"
                              : job.status === "Closed"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {job.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedJob(job)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Experience Required</p>
                      <p className="text-sm text-muted-foreground">{job.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Salary Range</p>
                      <p className="text-sm text-muted-foreground">
                        EGP {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Applications</p>
                      <p className="text-sm text-muted-foreground">{job.applicants} candidates</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Screening">Screening</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidates Table */}
          <Card>
            <CardHeader>
              <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-muted-foreground">{candidate.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.experience} years</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            candidate.stage === "Hired"
                              ? "default"
                              : candidate.stage === "Rejected"
                                ? "destructive"
                                : candidate.stage === "Offer"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {candidate.stage}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{candidate.rating}</span>
                          <span className="text-xs text-muted-foreground">/5</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(candidate.appliedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedCandidate(candidate)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Move to Next Stage
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
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

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Pipeline</CardTitle>
              <CardDescription>Track candidates through each stage of the hiring process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {["Applied", "Screening", "Interview", "Assessment", "Offer", "Hired", "Rejected"].map((stage) => {
                  const stageCandidates = candidates.filter((c) => c.stage === stage)
                  return (
                    <div key={stage} className="space-y-3">
                      <div className="text-center">
                        <h3 className="font-medium">{stage}</h3>
                        <p className="text-sm text-muted-foreground">{stageCandidates.length} candidates</p>
                      </div>
                      <div className="space-y-2">
                        {stageCandidates.map((candidate) => (
                          <Card key={candidate.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Application Rate</span>
                  <span className="font-medium">15.2 per day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Interview Rate</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Offer Acceptance Rate</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Time to Fill</span>
                  <span className="font-medium">18 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobPostings
                  .sort((a, b) => b.applicants - a.applicants)
                  .slice(0, 3)
                  .map((job) => (
                    <div key={job.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{job.applicants}</p>
                        <p className="text-sm text-muted-foreground">applicants</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedJob.title}</DialogTitle>
              <DialogDescription>
                {selectedJob.department} • {selectedJob.location}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Job Type</Label>
                  <p className="text-sm">{selectedJob.type}</p>
                </div>
                <div>
                  <Label>Experience Required</Label>
                  <p className="text-sm">{selectedJob.experience}</p>
                </div>
                <div>
                  <Label>Salary Range</Label>
                  <p className="text-sm">
                    EGP {selectedJob.salary.min.toLocaleString()} - {selectedJob.salary.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Applications</Label>
                  <p className="text-sm">{selectedJob.applicants} candidates</p>
                </div>
              </div>
              <div>
                <Label>Job Description</Label>
                <p className="text-sm mt-1">{selectedJob.description}</p>
              </div>
              <div>
                <Label>Requirements</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedJob.requirements.map((req, index) => (
                    <Badge key={index} variant="outline">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Candidate Details Dialog */}
      {selectedCandidate && (
        <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedCandidate.name}</DialogTitle>
              <DialogDescription>Candidate Profile</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {selectedCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedCandidate.name}</h3>
                  <p className="text-muted-foreground">{selectedCandidate.position}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{selectedCandidate.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Experience</Label>
                  <p className="text-sm">{selectedCandidate.experience} years</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-sm">{selectedCandidate.location}</p>
                </div>
                <div>
                  <Label>Current Stage</Label>
                  <Badge>{selectedCandidate.stage}</Badge>
                </div>
                <div>
                  <Label>Rating</Label>
                  <p className="text-sm">{selectedCandidate.rating}/5</p>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <p className="text-sm mt-1">{selectedCandidate.notes}</p>
              </div>
              <div className="flex gap-2">
                <Button>Schedule Interview</Button>
                <Button variant="outline">Download Resume</Button>
                <Button variant="outline">Send Email</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function JobPostingForm({
  onSubmit,
  setJobPostings,
  jobPostings,
}: {
  onSubmit: () => void
  setJobPostings: React.Dispatch<React.SetStateAction<JobPosting[]>>
  jobPostings: JobPosting[]
}) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    minSalary: 0,
    maxSalary: 0,
    description: "",
    requirements: "",
    deadline: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newJob: JobPosting = {
      id: Date.now().toString(),
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type as any,
      experience: formData.experience,
      salary: { min: formData.minSalary, max: formData.maxSalary },
      description: formData.description,
      requirements: formData.requirements.split(",").map((req) => req.trim()),
      status: "Draft",
      applicants: 0,
      createdAt: new Date().toISOString(),
      deadline: formData.deadline,
    }

    setJobPostings([...jobPostings, newJob])
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
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
          <Label htmlFor="type">Job Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Required *</Label>
          <Input
            id="experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            placeholder="e.g., 3-5 years"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Application Deadline *</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minSalary">Min Salary (EGP) *</Label>
          <Input
            id="minSalary"
            type="number"
            value={formData.minSalary}
            onChange={(e) => setFormData({ ...formData, minSalary: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxSalary">Max Salary (EGP) *</Label>
          <Input
            id="maxSalary"
            type="number"
            value={formData.maxSalary}
            onChange={(e) => setFormData({ ...formData, maxSalary: Number(e.target.value) })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed job description..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements (comma-separated) *</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="React.js, TypeScript, Next.js, Tailwind CSS"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit">Create Job Posting</Button>
      </div>
    </form>
  )
}
