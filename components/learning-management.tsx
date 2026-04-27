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
import {
  Plus,
  Search,
  BookOpen,
  Users,
  Clock,
  Star,
  Play,
  Download,
  Award,
  TrendingUp,
  Eye,
  Edit,
  FileText,
  Video,
  CheckCircle,
  Target,
  BarChart3,
} from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar?: string
  category: "Technical" | "Leadership" | "Compliance" | "Soft Skills" | "Management"
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  totalLessons: number
  completedLessons: number
  enrolled: number
  completed: number
  rating: number
  totalRatings: number
  price: number
  isFree: boolean
  status: "Active" | "Draft" | "Archived"
  thumbnail: string
  tags: string[]
  createdDate: string
  lastUpdated: string
  materials: {
    videos: number
    documents: number
    quizzes: number
    assignments: number
  }
}

interface Enrollment {
  id: string
  courseId: string
  employeeId: string
  employeeName: string
  enrolledDate: string
  completionDate?: string
  progress: number
  status: "In Progress" | "Completed" | "Not Started" | "Dropped"
  lastAccessed: string
  timeSpent: number // in minutes
  certificateIssued: boolean
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced JavaScript & TypeScript",
    description: "Master modern JavaScript and TypeScript for enterprise applications",
    instructor: "Dr. Sarah Wilson",
    instructorAvatar: "/instructor-1.jpg",
    category: "Technical",
    level: "Advanced",
    duration: "8 weeks",
    totalLessons: 45,
    completedLessons: 0,
    enrolled: 156,
    completed: 89,
    rating: 4.8,
    totalRatings: 124,
    price: 299,
    isFree: false,
    status: "Active",
    thumbnail: "/course-js.jpg",
    tags: ["JavaScript", "TypeScript", "Web Development", "Programming"],
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-28",
    materials: {
      videos: 35,
      documents: 12,
      quizzes: 8,
      assignments: 6,
    },
  },
  {
    id: "2",
    title: "Leadership Excellence Program",
    description: "Develop essential leadership skills for modern managers",
    instructor: "Mark Johnson",
    instructorAvatar: "/instructor-2.jpg",
    category: "Leadership",
    level: "Intermediate",
    duration: "6 weeks",
    totalLessons: 24,
    completedLessons: 0,
    enrolled: 89,
    completed: 67,
    rating: 4.6,
    totalRatings: 78,
    price: 199,
    isFree: false,
    status: "Active",
    thumbnail: "/course-leadership.jpg",
    tags: ["Leadership", "Management", "Team Building", "Communication"],
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-25",
    materials: {
      videos: 18,
      documents: 8,
      quizzes: 6,
      assignments: 4,
    },
  },
  {
    id: "3",
    title: "Data Analysis with Python",
    description: "Learn data analysis and visualization using Python and popular libraries",
    instructor: "Lisa Chen",
    instructorAvatar: "/instructor-3.jpg",
    category: "Technical",
    level: "Intermediate",
    duration: "10 weeks",
    totalLessons: 52,
    completedLessons: 0,
    enrolled: 134,
    completed: 78,
    rating: 4.9,
    totalRatings: 156,
    price: 349,
    isFree: false,
    status: "Active",
    thumbnail: "/course-python.jpg",
    tags: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-30",
    materials: {
      videos: 42,
      documents: 15,
      quizzes: 10,
      assignments: 8,
    },
  },
  {
    id: "4",
    title: "Project Management Fundamentals",
    description: "Essential project management skills and methodologies",
    instructor: "David Brown",
    instructorAvatar: "/instructor-4.jpg",
    category: "Management",
    level: "Beginner",
    duration: "4 weeks",
    totalLessons: 16,
    completedLessons: 0,
    enrolled: 67,
    completed: 45,
    rating: 4.4,
    totalRatings: 52,
    price: 0,
    isFree: true,
    status: "Active",
    thumbnail: "/course-pm.jpg",
    tags: ["Project Management", "Agile", "Scrum", "Planning"],
    createdDate: "2024-01-20",
    lastUpdated: "2024-01-27",
    materials: {
      videos: 12,
      documents: 6,
      quizzes: 4,
      assignments: 3,
    },
  },
  {
    id: "5",
    title: "Digital Marketing Mastery",
    description: "Complete guide to digital marketing strategies and tools",
    instructor: "Emma Rodriguez",
    instructorAvatar: "/instructor-5.jpg",
    category: "Management",
    level: "Intermediate",
    duration: "7 weeks",
    totalLessons: 32,
    completedLessons: 0,
    enrolled: 98,
    completed: 56,
    rating: 4.7,
    totalRatings: 89,
    price: 249,
    isFree: false,
    status: "Active",
    thumbnail: "/course-marketing.jpg",
    tags: ["Digital Marketing", "SEO", "Social Media", "Analytics"],
    createdDate: "2024-01-12",
    lastUpdated: "2024-01-29",
    materials: {
      videos: 25,
      documents: 10,
      quizzes: 7,
      assignments: 5,
    },
  },
  {
    id: "6",
    title: "Workplace Communication Skills",
    description: "Improve your professional communication and presentation skills",
    instructor: "James Wilson",
    instructorAvatar: "/instructor-6.jpg",
    category: "Soft Skills",
    level: "Beginner",
    duration: "3 weeks",
    totalLessons: 12,
    completedLessons: 0,
    enrolled: 78,
    completed: 62,
    rating: 4.5,
    totalRatings: 71,
    price: 0,
    isFree: true,
    status: "Active",
    thumbnail: "/course-communication.jpg",
    tags: ["Communication", "Presentation", "Public Speaking", "Interpersonal"],
    createdDate: "2024-01-18",
    lastUpdated: "2024-01-26",
    materials: {
      videos: 9,
      documents: 4,
      quizzes: 3,
      assignments: 2,
    },
  },
]

const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    courseId: "1",
    employeeId: "emp1",
    employeeName: "Ahmed Hassan",
    enrolledDate: "2024-01-20",
    progress: 75,
    status: "In Progress",
    lastAccessed: "2024-02-01",
    timeSpent: 1240,
    certificateIssued: false,
  },
  {
    id: "2",
    courseId: "2",
    employeeId: "emp2",
    employeeName: "Fatima Ali",
    enrolledDate: "2024-01-15",
    completionDate: "2024-01-30",
    progress: 100,
    status: "Completed",
    lastAccessed: "2024-01-30",
    timeSpent: 890,
    certificateIssued: true,
  },
  {
    id: "3",
    courseId: "3",
    employeeId: "emp3",
    employeeName: "Omar Mahmoud",
    enrolledDate: "2024-01-25",
    progress: 45,
    status: "In Progress",
    lastAccessed: "2024-01-31",
    timeSpent: 650,
    certificateIssued: false,
  },
  {
    id: "4",
    courseId: "4",
    employeeId: "emp4",
    employeeName: "Mona Hassan",
    enrolledDate: "2024-01-22",
    completionDate: "2024-01-28",
    progress: 100,
    status: "Completed",
    lastAccessed: "2024-01-28",
    timeSpent: 320,
    certificateIssued: true,
  },
]

export function LearningManagement() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    return matchesSearch && matchesCategory && matchesLevel
  })

  const totalCourses = courses.length
  const activeCourses = courses.filter((c) => c.status === "Active").length
  const totalEnrollments = enrollments.length
  const completionRate = Math.round(
    (enrollments.filter((e) => e.status === "Completed").length / enrollments.length) * 100,
  )

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/10 opacity-20" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-4 translate-y-4" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Learning & Development</h1>
              <p className="text-primary-foreground/80 text-lg">
                Comprehensive training programs and skill development platform
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
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Courses</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{totalCourses}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">{activeCourses} active</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(activeCourses / totalCourses) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Total Enrollments
            </CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <Users className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{totalEnrollments}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">Active learners</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: "78%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">Completion Rate</CardTitle>
            <div className="p-2 rounded-xl bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{completionRate}%</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">+12% this quarter</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${completionRate}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Certificates Issued
            </CardTitle>
            <div className="p-2 rounded-xl bg-secondary/10">
              <Award className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {enrollments.filter((e) => e.certificateIssued).length}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-medium">This month</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: "85%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Course Library</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {/* Search and Filters */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isNewCourseDialogOpen} onOpenChange={setIsNewCourseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Course</DialogTitle>
                      <DialogDescription>Add a new course to the learning platform.</DialogDescription>
                    </DialogHeader>
                    <CourseForm onSubmit={() => setIsNewCourseDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/30" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`${course.isFree ? "bg-secondary" : "bg-primary"} text-white`}>
                      {course.isFree ? "Free" : `$${course.price}`}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="outline" className="bg-white/90">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary text-white">
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.enrolled} enrolled</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground">({course.totalRatings})</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        course.category === "Technical"
                          ? "border-primary text-primary"
                          : course.category === "Leadership"
                            ? "border-secondary text-secondary"
                            : "border-gray-400 text-gray-600"
                      }`}
                    >
                      {course.category}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">{Math.round((course.completed / course.enrolled) * 100)}%</span>
                    </div>
                    <Progress value={(course.completed / course.enrolled) * 100} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleViewCourse(course)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Course
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrollments" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Course Enrollments ({enrollments.length})
              </CardTitle>
              <CardDescription>Track employee progress and course completions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Enrolled Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Certificate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => {
                    const course = courses.find((c) => c.id === enrollment.courseId)
                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {enrollment.employeeName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{enrollment.employeeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{course?.title}</div>
                            <div className="text-sm text-muted-foreground">{course?.instructor}</div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(enrollment.enrolledDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{enrollment.progress}%</span>
                            </div>
                            <Progress value={enrollment.progress} className="h-2 w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {Math.floor(enrollment.timeSpent / 60)}h {enrollment.timeSpent % 60}m
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              enrollment.status === "Completed"
                                ? "default"
                                : enrollment.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              enrollment.status === "Completed"
                                ? "bg-primary text-white"
                                : enrollment.status === "In Progress"
                                  ? "bg-secondary text-white"
                                  : ""
                            }
                          >
                            {enrollment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {enrollment.certificateIssued ? (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not issued</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Learning Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Course Rating</span>
                  <span className="font-medium text-primary">4.7/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Learning Hours</span>
                  <span className="font-medium text-primary">2,847 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Learners</span>
                  <span className="font-medium text-primary">342 employees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Course Completion Rate</span>
                  <span className="font-medium text-primary">78%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Popular Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Technical", enrollments: 456, percentage: 35 },
                  { category: "Leadership", enrollments: 234, percentage: 18 },
                  { category: "Management", enrollments: 189, percentage: 15 },
                  { category: "Soft Skills", enrollments: 167, percentage: 13 },
                  { category: "Compliance", enrollments: 123, percentage: 9 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.enrollments} enrollments</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="instructors" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Course Instructors
              </CardTitle>
              <CardDescription>Manage instructors and their course assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from(new Set(courses.map((c) => c.instructor))).map((instructor, index) => {
                  const instructorCourses = courses.filter((c) => c.instructor === instructor)
                  const totalEnrolled = instructorCourses.reduce((sum, c) => sum + c.enrolled, 0)
                  const avgRating = instructorCourses.reduce((sum, c) => sum + c.rating, 0) / instructorCourses.length

                  return (
                    <Card key={index} className="border border-slate-200 dark:border-slate-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-white">
                              {instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{instructor}</CardTitle>
                            <CardDescription>Course Instructor</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Courses:</span>
                          <span className="font-medium">{instructorCourses.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Enrolled:</span>
                          <span className="font-medium">{totalEnrolled}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{avgRating.toFixed(1)}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Course Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCourse.title}</DialogTitle>
                <DialogDescription className="text-base">{selectedCourse.description}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-primary/50" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Course Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCourse.description}. This comprehensive course covers all essential topics and provides
                      hands-on experience through practical exercises and real-world projects.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Course Materials</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 border rounded-lg">
                        <Video className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{selectedCourse.materials.videos} Videos</div>
                          <div className="text-sm text-muted-foreground">HD Quality</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-lg">
                        <FileText className="h-5 w-5 text-secondary" />
                        <div>
                          <div className="font-medium">{selectedCourse.materials.documents} Documents</div>
                          <div className="text-sm text-muted-foreground">PDF & Text</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{selectedCourse.materials.quizzes} Quizzes</div>
                          <div className="text-sm text-muted-foreground">Interactive</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-lg">
                        <Target className="h-5 w-5 text-secondary" />
                        <div>
                          <div className="font-medium">{selectedCourse.materials.assignments} Assignments</div>
                          <div className="text-sm text-muted-foreground">Practical</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Duration:</span>
                        <span className="font-medium">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Level:</span>
                        <Badge variant="outline">{selectedCourse.level}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Category:</span>
                        <Badge variant="outline">{selectedCourse.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Lessons:</span>
                        <span className="font-medium">{selectedCourse.totalLessons}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Price:</span>
                        <span className="font-medium">
                          {selectedCourse.isFree ? "Free" : `$${selectedCourse.price}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-white">
                            {selectedCourse.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{selectedCourse.instructor}</div>
                          <div className="text-sm text-muted-foreground">Course Instructor</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Enrollment Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Enrolled:</span>
                        <span className="font-medium">{selectedCourse.enrolled}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Completed:</span>
                        <span className="font-medium">{selectedCourse.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{selectedCourse.rating}</span>
                          <span className="text-sm text-muted-foreground">({selectedCourse.totalRatings})</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{Math.round((selectedCourse.completed / selectedCourse.enrolled) * 100)}%</span>
                        </div>
                        <Progress value={(selectedCourse.completed / selectedCourse.enrolled) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-2" />
                      Start Course
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Course
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CourseForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    isFree: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor *</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Level *</Label>
          <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Input
            id="duration"
            placeholder="e.g., 6 weeks"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            disabled={formData.isFree}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Course description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Create Course
        </Button>
      </div>
    </form>
  )
}
