"use client"

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  Briefcase,
  Calendar,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  FileText,
  BarChart3,
  Target,
  Linkedin,
  Globe,
  Send,
  Award,
  TrendingUp,
  Filter,
  Download,
  ChevronRight,
  ArrowUpRight,
  Zap,
  UserCheck,
  ClipboardList,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

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
  hiringManager: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  source: string[]
}

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  position: string
  experience: number
  location: string
  stage: "Applied" | "Phone Screen" | "Technical" | "Final Interview" | "Offer" | "Hired" | "Rejected"
  rating: number
  appliedAt: string
  source: string
  skills: string[]
  notes: string
  linkedin?: string
  portfolio?: string
  interviewDates: string[]
  scorecard: { criterion: string; score: number }[]
  offerStatus?: "Pending" | "Sent" | "Accepted" | "Declined"
}

interface InterviewSlot {
  id: string
  candidateId: string
  candidateName: string
  position: string
  date: string
  time: string
  type: "Phone Screen" | "Technical" | "Cultural Fit" | "Final" | "Panel"
  interviewer: string
  status: "Scheduled" | "Completed" | "Cancelled" | "No-Show"
  notes: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Information Technology",
    location: "Arkan, Egypt",
    type: "Full-time",
    experience: "3-5 years",
    salary: { min: 18000, max: 25000 },
    description: "We are looking for a skilled Frontend Developer to join our team...",
    requirements: ["React.js", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "Active",
    applicants: 23,
    createdAt: "2024-01-15",
    deadline: "2024-02-15",
    hiringManager: "Sara Ahmed",
    priority: "High",
    source: ["LinkedIn", "Indeed", "Referral"],
  },
  {
    id: "2",
    title: "HR Specialist",
    department: "Human Resources",
    location: "Maadi, Egypt",
    type: "Full-time",
    experience: "2-4 years",
    salary: { min: 12000, max: 18000 },
    description: "Join our HR team to manage employee relations and recruitment...",
    requirements: ["HR Management", "Recruitment", "Employee Relations", "HRIS"],
    status: "Active",
    applicants: 15,
    createdAt: "2024-01-20",
    deadline: "2024-02-20",
    hiringManager: "Mohamed Ali",
    priority: "Medium",
    source: ["LinkedIn", "Wuzzuf"],
  },
  {
    id: "3",
    title: "Marketing Manager",
    department: "Marketing",
    location: "New Cairo, Egypt",
    type: "Full-time",
    experience: "5+ years",
    salary: { min: 20000, max: 30000 },
    description: "Lead our marketing initiatives and drive brand growth...",
    requirements: ["Digital Marketing", "Brand Management", "Analytics", "Team Leadership"],
    status: "Paused",
    applicants: 8,
    createdAt: "2024-01-10",
    deadline: "2024-02-10",
    hiringManager: "Layla Ibrahim",
    priority: "Low",
    source: ["LinkedIn", "Referral"],
  },
  {
    id: "4",
    title: "Data Engineer",
    department: "Technology",
    location: "Cairo, Egypt",
    type: "Full-time",
    experience: "2-4 years",
    salary: { min: 16000, max: 22000 },
    description: "Build and maintain scalable data pipelines and infrastructure...",
    requirements: ["Python", "SQL", "Apache Spark", "AWS", "dbt"],
    status: "Active",
    applicants: 12,
    createdAt: "2024-01-25",
    deadline: "2024-03-01",
    hiringManager: "Omar Farouk",
    priority: "Urgent",
    source: ["LinkedIn", "Stack Overflow", "GitHub"],
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
    stage: "Technical",
    rating: 4.5,
    appliedAt: "2024-01-18",
    source: "LinkedIn",
    skills: ["React", "TypeScript", "Next.js", "CSS"],
    notes: "Strong technical skills, good communication",
    linkedin: "linkedin.com/in/ahmed",
    portfolio: "ahmed.dev",
    interviewDates: ["2024-01-25", "2024-02-01"],
    scorecard: [
      { criterion: "Technical Skills", score: 4 },
      { criterion: "Communication", score: 5 },
      { criterion: "Culture Fit", score: 4 },
      { criterion: "Problem Solving", score: 4 },
    ],
  },
  {
    id: "2",
    name: "Nour Hassan",
    email: "nour.hassan@email.com",
    phone: "+20 123 456 7891",
    position: "HR Specialist",
    experience: 3,
    location: "Giza",
    stage: "Phone Screen",
    rating: 4.0,
    appliedAt: "2024-01-22",
    source: "Wuzzuf",
    skills: ["Recruitment", "HRIS", "Employee Relations", "Payroll"],
    notes: "Relevant experience in recruitment",
    interviewDates: ["2024-01-28"],
    scorecard: [
      { criterion: "HR Knowledge", score: 4 },
      { criterion: "Communication", score: 4 },
      { criterion: "Culture Fit", score: 5 },
      { criterion: "Problem Solving", score: 3 },
    ],
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
    source: "Referral",
    skills: ["React", "Vue", "Node.js", "TypeScript", "GraphQL"],
    notes: "Excellent candidate, strong portfolio",
    linkedin: "linkedin.com/in/omar",
    portfolio: "omarfarouk.io",
    interviewDates: ["2024-01-23", "2024-01-30", "2024-02-05"],
    scorecard: [
      { criterion: "Technical Skills", score: 5 },
      { criterion: "Communication", score: 5 },
      { criterion: "Culture Fit", score: 5 },
      { criterion: "Problem Solving", score: 5 },
    ],
    offerStatus: "Sent",
  },
  {
    id: "4",
    name: "Yasmine Samir",
    email: "yasmine.samir@email.com",
    phone: "+20 123 456 7893",
    position: "Data Engineer",
    experience: 3,
    location: "Cairo",
    stage: "Applied",
    rating: 3.8,
    appliedAt: "2024-01-26",
    source: "LinkedIn",
    skills: ["Python", "SQL", "Apache Kafka", "PostgreSQL"],
    notes: "Promising background, needs technical assessment",
    interviewDates: [],
    scorecard: [],
  },
  {
    id: "5",
    name: "Khaled Mostafa",
    email: "khaled.mostafa@email.com",
    phone: "+20 123 456 7894",
    position: "Senior Frontend Developer",
    experience: 6,
    location: "Cairo",
    stage: "Final Interview",
    rating: 4.3,
    appliedAt: "2024-01-17",
    source: "Indeed",
    skills: ["React", "Angular", "TypeScript", "AWS"],
    notes: "Strong experience, slightly overqualified",
    interviewDates: ["2024-01-24", "2024-02-02", "2024-02-07"],
    scorecard: [
      { criterion: "Technical Skills", score: 5 },
      { criterion: "Communication", score: 4 },
      { criterion: "Culture Fit", score: 3 },
      { criterion: "Problem Solving", score: 5 },
    ],
  },
  {
    id: "6",
    name: "Rania Abdel",
    email: "rania.abdel@email.com",
    phone: "+20 123 456 7895",
    position: "Marketing Manager",
    experience: 7,
    location: "Cairo",
    stage: "Hired",
    rating: 4.9,
    appliedAt: "2024-01-12",
    source: "Referral",
    skills: ["Digital Marketing", "SEO", "SEM", "Brand Strategy", "Analytics"],
    notes: "Outstanding candidate, great leadership potential",
    interviewDates: ["2024-01-19", "2024-01-26", "2024-02-02"],
    scorecard: [
      { criterion: "Marketing Skills", score: 5 },
      { criterion: "Communication", score: 5 },
      { criterion: "Culture Fit", score: 5 },
      { criterion: "Leadership", score: 5 },
    ],
    offerStatus: "Accepted",
  },
]

const mockInterviews: InterviewSlot[] = [
  {
    id: "1",
    candidateId: "1",
    candidateName: "Ahmed Mahmoud",
    position: "Senior Frontend Developer",
    date: "2024-02-05",
    time: "10:00 AM",
    type: "Technical",
    interviewer: "Sara Ahmed",
    status: "Scheduled",
    notes: "Focus on React architecture and state management",
  },
  {
    id: "2",
    candidateId: "3",
    candidateName: "Omar Farouk",
    position: "Senior Frontend Developer",
    date: "2024-02-06",
    time: "2:00 PM",
    type: "Final",
    interviewer: "Ahmed Hassan (CEO)",
    status: "Scheduled",
    notes: "Cultural fit + team intro",
  },
  {
    id: "3",
    candidateId: "2",
    candidateName: "Nour Hassan",
    position: "HR Specialist",
    date: "2024-02-05",
    time: "11:30 AM",
    type: "Phone Screen",
    interviewer: "Mohamed Ali",
    status: "Completed",
    notes: "Good initial impression",
  },
  {
    id: "4",
    candidateId: "5",
    candidateName: "Khaled Mostafa",
    position: "Senior Frontend Developer",
    date: "2024-02-07",
    time: "3:00 PM",
    type: "Panel",
    interviewer: "Sara Ahmed, Omar Farouk",
    status: "Scheduled",
    notes: "Panel with tech team",
  },
]

const emailTemplates = [
  {
    id: "1",
    name: "Application Received",
    subject: "We received your application for {{position}}",
    body: "Dear {{candidate_name}},\n\nThank you for applying for the {{position}} role at our company. We have received your application and our team will review it shortly...",
    trigger: "On Apply",
  },
  {
    id: "2",
    name: "Phone Screen Invite",
    subject: "Interview Invitation – {{position}} at Seif Molham Group",
    body: "Dear {{candidate_name}},\n\nWe were impressed with your application and would like to invite you for an initial phone screen...",
    trigger: "Stage Move",
  },
  {
    id: "3",
    name: "Rejection Email",
    subject: "Your Application for {{position}}",
    body: "Dear {{candidate_name}},\n\nThank you for your interest in the {{position}} position. After careful consideration, we have decided to move forward with other candidates...",
    trigger: "Manual",
  },
  {
    id: "4",
    name: "Offer Letter",
    subject: "Job Offer – {{position}} at Seif Molham Group",
    body: "Dear {{candidate_name}},\n\nWe are thrilled to offer you the position of {{position}}. Below you will find the details of your compensation package...",
    trigger: "Manual",
  },
]

const stageColumns = ["Applied", "Phone Screen", "Technical", "Final Interview", "Offer", "Hired", "Rejected"] as const

const sourceData = [
  { source: "LinkedIn", count: 28, hired: 4, percentage: 45 },
  { source: "Referral", count: 12, hired: 5, percentage: 22 },
  { source: "Wuzzuf", count: 10, hired: 1, percentage: 16 },
  { source: "Indeed", count: 7, hired: 1, percentage: 11 },
  { source: "Stack Overflow", count: 3, hired: 0, percentage: 6 },
]

// ─── Helper components ────────────────────────────────────────────────────────

function StageColor(stage: string) {
  const map: Record<string, string> = {
    Applied: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    "Phone Screen": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Technical: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    "Final Interview": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Offer: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    Hired: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  }
  return map[stage] || "bg-gray-100 text-gray-700"
}

function PriorityColor(priority: string) {
  const map: Record<string, string> = {
    Urgent: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  }
  return map[priority] || "bg-gray-100 text-gray-700"
}

// ─── Main Component ───────────────────────────────────────────────────────────

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  location: "",
  stage: "Applied" as Candidate["stage"],
  source: "",
  skills: "",
  rating: "3",
  linkedin: "",
  portfolio: "",
  notes: "",
}

export function ATSManagement() {
  const [activeTab, setActiveTab] = useState("pipeline")
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates)
  const [jobPostings] = useState<JobPosting[]>(mockJobPostings)
  const [interviews] = useState<InterviewSlot[]>(mockInterviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [stageFilter, setStageFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [showAddCandidate, setShowAddCandidate] = useState(false)
  const [addForm, setAddForm] = useState(emptyForm)
  const [addErrors, setAddErrors] = useState<Partial<typeof emptyForm>>({})

  const validateAdd = () => {
    const errs: Partial<typeof emptyForm> = {}
    if (!addForm.name.trim()) errs.name = "Name is required"
    if (!addForm.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addForm.email)) errs.email = "Invalid email"
    if (!addForm.phone.trim()) errs.phone = "Phone is required"
    if (!addForm.position.trim()) errs.position = "Position is required"
    if (!addForm.experience) errs.experience = "Experience is required"
    if (!addForm.location.trim()) errs.location = "Location is required"
    if (!addForm.source.trim()) errs.source = "Source is required"
    setAddErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleAddCandidate = () => {
    if (!validateAdd()) return
    const newCandidate: Candidate = {
      id: String(Date.now()),
      name: addForm.name.trim(),
      email: addForm.email.trim(),
      phone: addForm.phone.trim(),
      position: addForm.position.trim(),
      experience: Number(addForm.experience) || 0,
      location: addForm.location.trim(),
      stage: addForm.stage,
      rating: Number(addForm.rating) || 3,
      appliedAt: new Date().toISOString().split("T")[0],
      source: addForm.source.trim(),
      skills: addForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
      notes: addForm.notes.trim(),
      linkedin: addForm.linkedin.trim() || undefined,
      portfolio: addForm.portfolio.trim() || undefined,
      interviewDates: [],
      scorecard: [],
    }
    setCandidates((prev) => [newCandidate, ...prev])
    setAddForm(emptyForm)
    setAddErrors({})
    setShowAddCandidate(false)
  }

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === "all" || c.stage === stageFilter
    const matchesSource = sourceFilter === "all" || c.source === sourceFilter
    return matchesSearch && matchesStage && matchesSource
  })

  const getCandidatesForStage = (stage: string) => filteredCandidates.filter((c) => c.stage === stage)

  const totalApplicants = candidates.length
  const hired = candidates.filter((c) => c.stage === "Hired").length
  const inProgress = candidates.filter((c) => !["Hired", "Rejected"].includes(c.stage)).length
  const avgRating = (candidates.reduce((s, c) => s + c.rating, 0) / candidates.length).toFixed(1)

  const moveCandidate = (candidateId: string, newStage: Candidate["stage"]) => {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c)))
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <UserCheck className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Applicant Tracking System</h1>
              <p className="text-purple-100 text-lg">Manage your full hiring pipeline end-to-end</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[
              { label: "Total Applicants", value: totalApplicants, icon: Users },
              { label: "In Pipeline", value: inProgress, icon: Clock },
              { label: "Hired This Cycle", value: hired, icon: CheckCircle },
              { label: "Avg. Rating", value: avgRating, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-purple-200" />
                  <span className="text-purple-200 text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
            <TabsTrigger value="pipeline" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <ClipboardList className="h-4 w-4 mr-2" />Pipeline
            </TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Briefcase className="h-4 w-4 mr-2" />Job Postings
            </TabsTrigger>
            <TabsTrigger value="candidates" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />All Candidates
            </TabsTrigger>
            <TabsTrigger value="interviews" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />Interviews
            </TabsTrigger>
            <TabsTrigger value="templates" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Mail className="h-4 w-4 mr-2" />Email Templates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />Analytics
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
              onClick={() => setShowAddCandidate(true)}
            >
              <UserCheck className="h-4 w-4 mr-2" />Add Candidate
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />New Job
            </Button>
          </div>
        </div>

        {/* ── Pipeline Tab ── */}
        <TabsContent value="pipeline" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search candidates…"
                className="pl-9 rounded-xl border-slate-200 dark:border-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-36 rounded-xl border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Wuzzuf">Wuzzuf</SelectItem>
                <SelectItem value="Indeed">Indeed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {stageColumns.map((stage) => {
                const stageCandidates = getCandidatesForStage(stage)
                return (
                  <div key={stage} className="w-64 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{stage}</span>
                        <Badge variant="secondary" className="text-xs rounded-full px-2">
                          {stageCandidates.length}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3 min-h-[200px] bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3">
                      {stageCandidates.map((candidate) => (
                        <Card
                          key={candidate.id}
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-slate-200 dark:border-slate-700 rounded-xl"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                    {candidate.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm leading-tight">{candidate.name}</p>
                                  <p className="text-xs text-slate-500">{candidate.experience}y exp</p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {stageColumns
                                    .filter((s) => s !== stage)
                                    .map((s) => (
                                      <DropdownMenuItem
                                        key={s}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          moveCandidate(candidate.id, s as Candidate["stage"])
                                        }}
                                      >
                                        Move to {s}
                                      </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{candidate.position}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={`h-3 w-3 ${s <= Math.round(candidate.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-600"}`}
                                  />
                                ))}
                              </div>
                              <Badge className={`text-xs px-1.5 py-0.5 rounded-md ${StageColor(stage)}`} variant="secondary">
                                {candidate.source}
                              </Badge>
                            </div>
                            {candidate.offerStatus && (
                              <Badge className="text-xs w-full justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                                Offer {candidate.offerStatus}
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      {stageCandidates.length === 0 && (
                        <div className="flex items-center justify-center h-20 text-slate-400 text-xs">
                          No candidates
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* ── Job Postings Tab ── */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4">
            {jobPostings.map((job) => (
              <Card key={job.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge className={`text-xs rounded-lg ${PriorityColor(job.priority)}`}>{job.priority}</Badge>
                        <Badge
                          className={`text-xs rounded-lg ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : job.status === "Paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.type}</span>
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{job.hiringManager}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.requirements.slice(0, 4).map((req) => (
                          <Badge key={req} variant="secondary" className="rounded-lg text-xs">{req}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-purple-600 font-medium">
                          EGP {job.salary.min.toLocaleString()} – {job.salary.max.toLocaleString()}
                        </span>
                        <span className="text-slate-500">Deadline: {job.deadline}</span>
                        <div className="flex gap-1">
                          {job.source.map((s) => (
                            <Badge key={s} variant="outline" className="text-xs rounded-md">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2 ml-4">
                      <div className="text-3xl font-bold text-purple-600">{job.applicants}</div>
                      <div className="text-sm text-slate-500">Applicants</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setSelectedJob(job)}>
                          <Eye className="h-4 w-4 mr-1" />View
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── All Candidates Tab ── */}
        <TabsContent value="candidates" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search candidates…" className="pl-9 rounded-xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-44 rounded-xl">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stageColumns.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl ml-auto"
              onClick={() => setShowAddCandidate(true)}
            >
              <Plus className="h-4 w-4 mr-2" />Add Candidate
            </Button>
          </div>
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 dark:border-slate-700">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-sm">
                            {candidate.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{candidate.name}</p>
                          <p className="text-xs text-slate-500">{candidate.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{candidate.position}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs rounded-lg ${StageColor(candidate.stage)}`}>{candidate.stage}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{candidate.source}</TableCell>
                    <TableCell className="text-sm">{candidate.experience}y</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{candidate.appliedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => setSelectedCandidate(candidate)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ── Interviews Tab ── */}
        <TabsContent value="interviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Upcoming Interviews</h3>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />Schedule Interview
            </Button>
          </div>
          <div className="grid gap-4">
            {interviews.map((interview) => (
              <Card key={interview.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/40">
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{interview.candidateName}</p>
                          <Badge className="text-xs rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                            {interview.type}
                          </Badge>
                          <Badge
                            className={`text-xs rounded-lg ${
                              interview.status === "Scheduled"
                                ? "bg-blue-100 text-blue-700"
                                : interview.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {interview.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{interview.position}</p>
                        <p className="text-xs text-slate-500 mt-1">{interview.notes}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-purple-600">{interview.date}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{interview.time}</p>
                      <p className="text-xs text-slate-500">with {interview.interviewer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Calendar View */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {["Mon Feb 5", "Tue Feb 6", "Wed Feb 7", "Thu Feb 8", "Fri Feb 9"].map((day, idx) => (
                  <div key={day} className="space-y-2">
                    <div className="text-center text-xs font-medium text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                      {day}
                    </div>
                    {idx === 0 && (
                      <>
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900">
                          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">10:00 AM</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">Ahmed M. – Technical</p>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900">
                          <p className="text-xs font-medium text-purple-700 dark:text-purple-300">11:30 AM</p>
                          <p className="text-xs text-purple-600 dark:text-purple-400">Nour H. – Phone</p>
                        </div>
                      </>
                    )}
                    {idx === 1 && (
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900">
                        <p className="text-xs font-medium text-green-700 dark:text-green-300">2:00 PM</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Omar F. – Final</p>
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900">
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-300">3:00 PM</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">Khaled M. – Panel</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Email Templates Tab ── */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Email Templates</h3>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />New Template
            </Button>
          </div>
          <div className="grid gap-4">
            {emailTemplates.map((template) => (
              <Card key={template.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-purple-500" />
                        <h4 className="font-semibold">{template.name}</h4>
                        <Badge variant="secondary" className="text-xs rounded-lg">{template.trigger}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">Subject: {template.subject}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">{template.body}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="h-4 w-4 mr-1" />Preview
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                        <Send className="h-4 w-4 mr-1" />Use
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Analytics Tab ── */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Time to Hire", value: "18 days", change: "-3 days vs last month", icon: Clock, color: "purple" },
              { title: "Offer Acceptance Rate", value: "87%", change: "+5% vs last month", icon: CheckCircle, color: "green" },
              { title: "Cost per Hire", value: "EGP 3,200", change: "-EGP 400 vs last month", icon: TrendingUp, color: "blue" },
            ].map((kpi) => (
              <Card key={kpi.title} className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{kpi.title}</span>
                    <div className={`p-2 rounded-xl bg-${kpi.color}-100 dark:bg-${kpi.color}-900/40`}>
                      <kpi.icon className={`h-4 w-4 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />{kpi.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Source Effectiveness */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base">Source Effectiveness</CardTitle>
              <CardDescription>Applications and hires by source channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourceData.map((src) => (
                  <div key={src.source} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{src.source}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">{src.count} applied</span>
                        <span className="text-green-600 font-medium">{src.hired} hired</span>
                      </div>
                    </div>
                    <Progress value={src.percentage} className="h-2 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Funnel */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-base">Hiring Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stageColumns.map((stage, idx) => {
                  const count = candidates.filter((c) => c.stage === stage).length
                  const maxCount = candidates.length
                  const pct = Math.round((count / maxCount) * 100)
                  return (
                    <div key={stage} className="flex items-center gap-3">
                      <div className="w-32 text-sm text-right text-slate-600 dark:text-slate-400">{stage}</div>
                      <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg flex items-center px-3 text-white text-xs font-medium transition-all duration-500"
                          style={{
                            width: `${Math.max(pct, 5)}%`,
                            background: `hsl(${270 - idx * 25}, 70%, 55%)`,
                          }}
                        >
                          {count}
                        </div>
                      </div>
                      <div className="w-10 text-sm text-slate-500 text-right">{pct}%</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Add Candidate Dialog ── */}
      <Dialog open={showAddCandidate} onOpenChange={(open) => { setShowAddCandidate(open); if (!open) { setAddForm(emptyForm); setAddErrors({}) } }}>
        <DialogContent className="max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40">
                <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              Add New Candidate
            </DialogTitle>
            <DialogDescription>Manually add a candidate to the pipeline. Fill in as much detail as you have.</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Personal Info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Personal Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ac-name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="ac-name"
                    placeholder="e.g. Ahmed Mahmoud"
                    className="rounded-xl"
                    value={addForm.name}
                    onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                  />
                  {addErrors.name && <p className="text-xs text-red-500">{addErrors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="ac-email"
                    type="email"
                    placeholder="ahmed@example.com"
                    className="rounded-xl"
                    value={addForm.email}
                    onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  {addErrors.email && <p className="text-xs text-red-500">{addErrors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-phone">Phone <span className="text-red-500">*</span></Label>
                  <Input
                    id="ac-phone"
                    placeholder="+20 123 456 7890"
                    className="rounded-xl"
                    value={addForm.phone}
                    onChange={(e) => setAddForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                  {addErrors.phone && <p className="text-xs text-red-500">{addErrors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-location">Location <span className="text-red-500">*</span></Label>
                  <Input
                    id="ac-location"
                    placeholder="e.g. Cairo"
                    className="rounded-xl"
                    value={addForm.location}
                    onChange={(e) => setAddForm((f) => ({ ...f, location: e.target.value }))}
                  />
                  {addErrors.location && <p className="text-xs text-red-500">{addErrors.location}</p>}
                </div>
              </div>
            </div>

            {/* Role Info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Role & Pipeline</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ac-position">Applying For <span className="text-red-500">*</span></Label>
                  <Select value={addForm.position} onValueChange={(v) => setAddForm((f) => ({ ...f, position: v }))}>
                    <SelectTrigger id="ac-position" className="rounded-xl">
                      <SelectValue placeholder="Select or type a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobPostings.map((j) => (
                        <SelectItem key={j.id} value={j.title}>{j.title}</SelectItem>
                      ))}
                      <SelectItem value="__other__">Other / Not listed</SelectItem>
                    </SelectContent>
                  </Select>
                  {addForm.position === "__other__" && (
                    <Input
                      placeholder="Enter position title"
                      className="rounded-xl mt-1.5"
                      onChange={(e) => setAddForm((f) => ({ ...f, position: e.target.value }))}
                    />
                  )}
                  {addErrors.position && <p className="text-xs text-red-500">{addErrors.position}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-stage">Initial Stage</Label>
                  <Select value={addForm.stage} onValueChange={(v) => setAddForm((f) => ({ ...f, stage: v as Candidate["stage"] }))}>
                    <SelectTrigger id="ac-stage" className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stageColumns.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-exp">Years of Experience <span className="text-red-500">*</span></Label>
                  <Input
                    id="ac-exp"
                    type="number"
                    min={0}
                    max={40}
                    placeholder="e.g. 4"
                    className="rounded-xl"
                    value={addForm.experience}
                    onChange={(e) => setAddForm((f) => ({ ...f, experience: e.target.value }))}
                  />
                  {addErrors.experience && <p className="text-xs text-red-500">{addErrors.experience}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-source">Source <span className="text-red-500">*</span></Label>
                  <Select value={addForm.source} onValueChange={(v) => setAddForm((f) => ({ ...f, source: v }))}>
                    <SelectTrigger id="ac-source" className="rounded-xl">
                      <SelectValue placeholder="How did you find them?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Wuzzuf">Wuzzuf</SelectItem>
                      <SelectItem value="Indeed">Indeed</SelectItem>
                      <SelectItem value="Stack Overflow">Stack Overflow</SelectItem>
                      <SelectItem value="GitHub">GitHub</SelectItem>
                      <SelectItem value="Direct">Direct Approach</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {addErrors.source && <p className="text-xs text-red-500">{addErrors.source}</p>}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <Label>Initial Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setAddForm((f) => ({ ...f, rating: String(s) }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 transition-colors ${
                        s <= Number(addForm.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-200 dark:text-slate-600 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-slate-500 ml-1">{addForm.rating} / 5</span>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <Label htmlFor="ac-skills">Skills <span className="text-slate-400 font-normal text-xs">(comma-separated)</span></Label>
              <Input
                id="ac-skills"
                placeholder="e.g. React, TypeScript, Node.js"
                className="rounded-xl"
                value={addForm.skills}
                onChange={(e) => setAddForm((f) => ({ ...f, skills: e.target.value }))}
              />
              {addForm.skills && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {addForm.skills.split(",").filter(s => s.trim()).map((s, i) => (
                    <Badge key={i} variant="secondary" className="rounded-lg text-xs">{s.trim()}</Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Optional Links</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ac-linkedin" className="flex items-center gap-1.5">
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </Label>
                  <Input
                    id="ac-linkedin"
                    placeholder="linkedin.com/in/username"
                    className="rounded-xl"
                    value={addForm.linkedin}
                    onChange={(e) => setAddForm((f) => ({ ...f, linkedin: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ac-portfolio" className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" /> Portfolio / Website
                  </Label>
                  <Input
                    id="ac-portfolio"
                    placeholder="portfolio.dev"
                    className="rounded-xl"
                    value={addForm.portfolio}
                    onChange={(e) => setAddForm((f) => ({ ...f, portfolio: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="ac-notes">Notes</Label>
              <Textarea
                id="ac-notes"
                placeholder="Initial impressions, referral context, anything relevant…"
                className="rounded-xl min-h-[80px] resize-none"
                value={addForm.notes}
                onChange={(e) => setAddForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                onClick={handleAddCandidate}
              >
                <UserCheck className="h-4 w-4 mr-2" />Add to Pipeline
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => { setShowAddCandidate(false); setAddForm(emptyForm); setAddErrors({}) }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Candidate Detail Dialog ── */}
      <Dialog open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          {selectedCandidate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-lg">
                      {selectedCandidate.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl">{selectedCandidate.name}</p>
                    <p className="text-sm font-normal text-slate-500">{selectedCandidate.position}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Mail className="h-4 w-4" />{selectedCandidate.email}</p>
                    <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Phone className="h-4 w-4" />{selectedCandidate.phone}</p>
                    <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><MapPin className="h-4 w-4" />{selectedCandidate.location}</p>
                    {selectedCandidate.linkedin && (
                      <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Linkedin className="h-4 w-4" />{selectedCandidate.linkedin}</p>
                    )}
                    {selectedCandidate.portfolio && (
                      <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Globe className="h-4 w-4" />{selectedCandidate.portfolio}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Badge className={`${StageColor(selectedCandidate.stage)} rounded-lg`}>{selectedCandidate.stage}</Badge>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Source: {selectedCandidate.source}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Applied: {selectedCandidate.appliedAt}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= Math.round(selectedCandidate.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-600"}`} />
                      ))}
                      <span className="text-sm ml-1">{selectedCandidate.rating}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="rounded-lg">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {selectedCandidate.scorecard.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-3">Scorecard</p>
                    <div className="space-y-2">
                      {selectedCandidate.scorecard.map((item) => (
                        <div key={item.criterion} className="flex items-center gap-3">
                          <span className="text-sm w-36 text-slate-600 dark:text-slate-400">{item.criterion}</span>
                          <Progress value={item.score * 20} className="flex-1 h-2" />
                          <span className="text-sm font-medium w-8 text-right">{item.score}/5</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCandidate.notes && (
                  <div>
                    <p className="text-sm font-semibold mb-1">Notes</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">{selectedCandidate.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                    <Calendar className="h-4 w-4 mr-2" />Schedule Interview
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Mail className="h-4 w-4 mr-2" />Send Email
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <FileText className="h-4 w-4 mr-2" />Offer Letter
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
