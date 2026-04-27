"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  UserPlus,
  Clock,
  CheckCircle,
  Target,
  Award,
  Star,
  MessageSquare,
  User,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Rocket,
  Gauge,
  TrendingUp,
  FileText,
  ClipboardList,
  Plus,
  Copy,
  Download,
  Briefcase,
  Users,
  Heart,
  Settings,
  Trash2,
  Edit,
  Check,
} from "lucide-react"

const jobDescriptionTemplates = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    icon: "💻",
    summary: "Design, develop, and maintain software applications and systems.",
    responsibilities: [
      "Write clean, maintainable, and efficient code",
      "Develop and maintain software applications",
      "Collaborate with cross-functional teams to define and implement new features",
      "Participate in code reviews and contribute to team best practices",
      "Debug and resolve technical issues and bugs",
      "Write technical documentation and specifications",
      "Stay updated with emerging technologies and industry trends",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in one or more programming languages (e.g., JavaScript, Python, Java)",
      "Experience with modern frameworks and libraries",
      "Strong problem-solving and analytical skills",
      "Excellent communication and teamwork abilities",
      "Experience with version control systems (Git)",
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Agile"],
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    category: "Marketing",
    icon: "📢",
    summary: "Lead marketing initiatives to drive brand awareness and revenue growth.",
    responsibilities: [
      "Develop and execute comprehensive marketing strategies",
      "Manage marketing budgets and allocate resources effectively",
      "Lead and mentor marketing team members",
      "Analyze market trends and competitor activities",
      "Oversee digital marketing campaigns across all channels",
      "Collaborate with sales team to align marketing efforts",
      "Track and report on marketing KPIs and ROI",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "5+ years of experience in marketing roles",
      "Proven track record of successful marketing campaigns",
      "Strong analytical and data-driven decision making",
      "Excellent leadership and team management skills",
      "Proficiency in marketing automation tools",
      "Outstanding communication and presentation skills",
    ],
    skills: ["Digital Marketing", "SEO/SEM", "Content Strategy", "Analytics", "Leadership", "Budget Management"],
  },
  {
    id: "hr-specialist",
    title: "HR Specialist",
    category: "Human Resources",
    icon: "👥",
    summary: "Support HR operations and employee lifecycle management.",
    responsibilities: [
      "Manage employee onboarding and offboarding processes",
      "Administer employee benefits and compensation programs",
      "Handle employee relations and resolve workplace issues",
      "Maintain accurate HR records and documentation",
      "Support recruitment and talent acquisition efforts",
      "Ensure compliance with labor laws and regulations",
      "Coordinate training and development programs",
    ],
    requirements: [
      "Bachelor's degree in Human Resources or related field",
      "3+ years of HR experience",
      "Knowledge of labor laws and HR best practices",
      "Experience with HRIS systems",
      "Strong interpersonal and communication skills",
      "Excellent organizational abilities",
      "HR certification (PHR, SHRM-CP) preferred",
    ],
    skills: [
      "Employee Relations",
      "HRIS",
      "Compliance",
      "Recruitment",
      "Benefits Administration",
      "Conflict Resolution",
    ],
  },
  {
    id: "sales-representative",
    title: "Sales Representative",
    category: "Sales",
    icon: "💼",
    summary: "Drive revenue growth through client acquisition and relationship management.",
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build and maintain strong client relationships",
      "Meet or exceed sales targets and quotas",
      "Present products and services to potential clients",
      "Negotiate contracts and close deals",
      "Maintain accurate records in CRM system",
      "Provide market feedback to product teams",
    ],
    requirements: [
      "Bachelor's degree in Business or related field",
      "2+ years of sales experience",
      "Proven track record of meeting sales targets",
      "Excellent negotiation and closing skills",
      "Strong presentation and communication abilities",
      "Self-motivated with a results-driven approach",
      "Experience with CRM software",
    ],
    skills: ["Negotiation", "CRM", "Prospecting", "Presentation", "Relationship Building", "Closing"],
  },
  {
    id: "accountant",
    title: "Accountant",
    category: "Finance",
    icon: "📊",
    summary: "Manage financial records and ensure accurate financial reporting.",
    responsibilities: [
      "Prepare and maintain financial statements and reports",
      "Manage accounts payable and receivable",
      "Perform monthly and year-end closings",
      "Reconcile bank statements and general ledger accounts",
      "Prepare tax returns and ensure compliance",
      "Assist with budgeting and forecasting",
      "Support internal and external audits",
    ],
    requirements: [
      "Bachelor's degree in Accounting or Finance",
      "3+ years of accounting experience",
      "Strong knowledge of GAAP and financial regulations",
      "Proficiency in accounting software (QuickBooks, SAP)",
      "Advanced Excel skills",
      "CPA certification preferred",
      "Strong attention to detail and accuracy",
    ],
    skills: ["Financial Reporting", "GAAP", "Tax Compliance", "Excel", "ERP Systems", "Auditing"],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    category: "Operations",
    icon: "📋",
    summary: "Lead and deliver projects on time, within scope, and budget.",
    responsibilities: [
      "Define project scope, goals, and deliverables",
      "Create and maintain detailed project plans",
      "Coordinate cross-functional teams and resources",
      "Monitor project progress and manage risks",
      "Communicate project status to stakeholders",
      "Ensure quality deliverables and standards",
      "Manage project budgets and timelines",
    ],
    requirements: [
      "Bachelor's degree in Business or related field",
      "5+ years of project management experience",
      "PMP or equivalent certification preferred",
      "Strong knowledge of project management methodologies",
      "Excellent leadership and team coordination skills",
      "Proficiency in project management tools",
      "Outstanding communication and problem-solving abilities",
    ],
    skills: ["Agile/Scrum", "Risk Management", "Stakeholder Management", "MS Project", "Leadership", "Budgeting"],
  },
]

const appraisalTemplates = [
  {
    id: "standard",
    name: "Standard Performance Review",
    description: "Comprehensive annual performance evaluation template",
    icon: ClipboardList,
    color: "bg-blue-500",
    categories: [
      {
        name: "Job Knowledge & Skills",
        weight: 20,
        criteria: [
          { name: "Technical Competency", description: "Demonstrates required technical skills for the role" },
          { name: "Industry Knowledge", description: "Understanding of industry trends and best practices" },
          { name: "Tool Proficiency", description: "Effective use of required tools and systems" },
          { name: "Continuous Learning", description: "Actively seeks to improve skills and knowledge" },
        ],
      },
      {
        name: "Quality of Work",
        weight: 25,
        criteria: [
          { name: "Accuracy", description: "Work is thorough, accurate, and error-free" },
          { name: "Attention to Detail", description: "Demonstrates thoroughness and precision" },
          { name: "Consistency", description: "Maintains high standards across all tasks" },
          { name: "Innovation", description: "Brings creative solutions and improvements" },
        ],
      },
      {
        name: "Productivity & Efficiency",
        weight: 20,
        criteria: [
          { name: "Task Completion", description: "Completes assignments on time" },
          { name: "Resource Management", description: "Uses resources effectively" },
          { name: "Prioritization", description: "Effectively prioritizes tasks and deadlines" },
          { name: "Output Volume", description: "Produces appropriate volume of work" },
        ],
      },
      {
        name: "Communication",
        weight: 15,
        criteria: [
          { name: "Written Communication", description: "Clear and professional written communication" },
          { name: "Verbal Communication", description: "Articulates ideas clearly in discussions" },
          { name: "Active Listening", description: "Listens attentively and responds appropriately" },
          { name: "Feedback Reception", description: "Accepts and acts on constructive feedback" },
        ],
      },
      {
        name: "Teamwork & Collaboration",
        weight: 20,
        criteria: [
          { name: "Team Contribution", description: "Actively contributes to team goals" },
          { name: "Cooperation", description: "Works well with colleagues across departments" },
          { name: "Knowledge Sharing", description: "Shares knowledge and helps others succeed" },
          { name: "Conflict Resolution", description: "Handles disagreements professionally" },
        ],
      },
    ],
  },
  {
    id: "leadership",
    name: "Leadership Performance Review",
    description: "Evaluation template for managers and team leaders",
    icon: Users,
    color: "bg-purple-500",
    categories: [
      {
        name: "Strategic Leadership",
        weight: 25,
        criteria: [
          { name: "Vision Setting", description: "Establishes clear direction and goals" },
          { name: "Strategic Thinking", description: "Makes decisions aligned with organizational strategy" },
          { name: "Change Management", description: "Leads and adapts to organizational changes" },
          { name: "Business Acumen", description: "Understands business drivers and impact" },
        ],
      },
      {
        name: "Team Development",
        weight: 25,
        criteria: [
          { name: "Coaching & Mentoring", description: "Develops team members' skills and careers" },
          { name: "Performance Management", description: "Effectively manages team performance" },
          { name: "Talent Retention", description: "Maintains high team engagement and retention" },
          { name: "Succession Planning", description: "Identifies and develops future leaders" },
        ],
      },
      {
        name: "Decision Making",
        weight: 20,
        criteria: [
          { name: "Analytical Skills", description: "Makes data-driven decisions" },
          { name: "Problem Solving", description: "Effectively resolves complex issues" },
          { name: "Risk Assessment", description: "Identifies and mitigates risks appropriately" },
          { name: "Accountability", description: "Takes responsibility for decisions and outcomes" },
        ],
      },
      {
        name: "Communication & Influence",
        weight: 15,
        criteria: [
          { name: "Executive Presence", description: "Commands respect and inspires confidence" },
          { name: "Stakeholder Management", description: "Builds relationships across all levels" },
          { name: "Presentation Skills", description: "Delivers compelling presentations" },
          { name: "Negotiation", description: "Negotiates effectively for team and organization" },
        ],
      },
      {
        name: "Results Orientation",
        weight: 15,
        criteria: [
          { name: "Goal Achievement", description: "Consistently meets or exceeds targets" },
          { name: "Resource Optimization", description: "Maximizes team output with available resources" },
          { name: "Process Improvement", description: "Continuously improves team processes" },
          { name: "Quality Standards", description: "Maintains high quality standards for deliverables" },
        ],
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Performance Review",
    description: "Specialized evaluation for technical roles",
    icon: Settings,
    color: "bg-green-500",
    categories: [
      {
        name: "Technical Excellence",
        weight: 30,
        criteria: [
          { name: "Code Quality", description: "Writes clean, maintainable, and efficient code" },
          { name: "Architecture Design", description: "Designs scalable and robust solutions" },
          { name: "Technical Documentation", description: "Creates comprehensive technical documentation" },
          { name: "Best Practices", description: "Follows and promotes coding best practices" },
        ],
      },
      {
        name: "Problem Solving",
        weight: 25,
        criteria: [
          { name: "Debugging Skills", description: "Effectively identifies and resolves issues" },
          { name: "Root Cause Analysis", description: "Identifies underlying causes of problems" },
          { name: "Creative Solutions", description: "Develops innovative approaches to challenges" },
          { name: "Technical Research", description: "Researches and evaluates new technologies" },
        ],
      },
      {
        name: "Delivery & Execution",
        weight: 20,
        criteria: [
          { name: "Sprint Commitments", description: "Meets sprint goals and deadlines" },
          { name: "Estimation Accuracy", description: "Provides accurate effort estimates" },
          { name: "Testing Coverage", description: "Ensures adequate test coverage" },
          { name: "Release Quality", description: "Delivers high-quality releases" },
        ],
      },
      {
        name: "Collaboration",
        weight: 15,
        criteria: [
          { name: "Code Reviews", description: "Provides constructive feedback in code reviews" },
          { name: "Knowledge Transfer", description: "Shares technical knowledge with team" },
          { name: "Cross-team Collaboration", description: "Works effectively with other teams" },
          { name: "Mentorship", description: "Guides and supports junior developers" },
        ],
      },
      {
        name: "Growth & Learning",
        weight: 10,
        criteria: [
          { name: "Skill Development", description: "Actively learns new technologies" },
          { name: "Certifications", description: "Pursues relevant certifications" },
          { name: "Community Contribution", description: "Contributes to tech community" },
          { name: "Innovation", description: "Proposes and implements new ideas" },
        ],
      },
    ],
  },
  {
    id: "sales",
    name: "Sales Performance Review",
    description: "Results-focused evaluation for sales teams",
    icon: TrendingUp,
    color: "bg-orange-500",
    categories: [
      {
        name: "Sales Results",
        weight: 35,
        criteria: [
          { name: "Revenue Achievement", description: "Meets or exceeds revenue targets" },
          { name: "New Business", description: "Successfully acquires new clients" },
          { name: "Deal Size", description: "Closes deals at target values" },
          { name: "Pipeline Management", description: "Maintains healthy sales pipeline" },
        ],
      },
      {
        name: "Customer Relationships",
        weight: 25,
        criteria: [
          { name: "Client Satisfaction", description: "Maintains high customer satisfaction" },
          { name: "Account Growth", description: "Expands existing accounts" },
          { name: "Retention Rate", description: "Retains clients and reduces churn" },
          { name: "Relationship Building", description: "Builds long-term partnerships" },
        ],
      },
      {
        name: "Sales Process",
        weight: 20,
        criteria: [
          { name: "CRM Hygiene", description: "Maintains accurate CRM records" },
          { name: "Sales Methodology", description: "Follows established sales process" },
          { name: "Forecasting Accuracy", description: "Provides accurate sales forecasts" },
          { name: "Activity Metrics", description: "Meets activity targets (calls, meetings)" },
        ],
      },
      {
        name: "Product Knowledge",
        weight: 10,
        criteria: [
          { name: "Product Expertise", description: "Deep understanding of products/services" },
          { name: "Competitive Analysis", description: "Knowledge of competitive landscape" },
          { name: "Solution Selling", description: "Matches solutions to customer needs" },
          { name: "Industry Knowledge", description: "Understands customer industries" },
        ],
      },
      {
        name: "Team Contribution",
        weight: 10,
        criteria: [
          { name: "Best Practice Sharing", description: "Shares successful strategies with team" },
          { name: "Collaboration", description: "Works well with sales and support teams" },
          { name: "Mentoring", description: "Helps develop junior sales reps" },
          { name: "Company Culture", description: "Embodies company values" },
        ],
      },
    ],
  },
  {
    id: "customer-service",
    name: "Customer Service Review",
    description: "Service-focused evaluation template",
    icon: Heart,
    color: "bg-pink-500",
    categories: [
      {
        name: "Customer Satisfaction",
        weight: 30,
        criteria: [
          { name: "CSAT Scores", description: "Achieves high customer satisfaction scores" },
          { name: "First Contact Resolution", description: "Resolves issues on first contact" },
          { name: "Response Time", description: "Responds to inquiries promptly" },
          { name: "Customer Feedback", description: "Receives positive customer feedback" },
        ],
      },
      {
        name: "Service Quality",
        weight: 25,
        criteria: [
          { name: "Professionalism", description: "Maintains professional demeanor" },
          { name: "Empathy", description: "Shows understanding and care for customers" },
          { name: "Accuracy", description: "Provides accurate information and solutions" },
          { name: "Follow-through", description: "Ensures complete resolution of issues" },
        ],
      },
      {
        name: "Efficiency",
        weight: 20,
        criteria: [
          { name: "Handle Time", description: "Manages interactions efficiently" },
          { name: "Case Management", description: "Handles multiple cases effectively" },
          { name: "Process Adherence", description: "Follows established procedures" },
          { name: "Documentation", description: "Maintains accurate case documentation" },
        ],
      },
      {
        name: "Product Knowledge",
        weight: 15,
        criteria: [
          { name: "Product Expertise", description: "Deep knowledge of products/services" },
          { name: "Troubleshooting", description: "Effectively diagnoses and resolves issues" },
          { name: "Policy Knowledge", description: "Understands company policies" },
          { name: "System Proficiency", description: "Skilled in support tools and systems" },
        ],
      },
      {
        name: "Team Contribution",
        weight: 10,
        criteria: [
          { name: "Knowledge Sharing", description: "Helps colleagues with challenges" },
          { name: "Escalation Handling", description: "Appropriately escalates complex issues" },
          { name: "Training Participation", description: "Actively participates in training" },
          { name: "Process Improvement", description: "Suggests service improvements" },
        ],
      },
    ],
  },
]

const ratingScales = [
  {
    id: "5-point",
    name: "5-Point Scale",
    options: [
      "1 - Unsatisfactory",
      "2 - Needs Improvement",
      "3 - Meets Expectations",
      "4 - Exceeds Expectations",
      "5 - Outstanding",
    ],
  },
  {
    id: "4-point",
    name: "4-Point Scale",
    options: [
      "1 - Below Expectations",
      "2 - Meets Some Expectations",
      "3 - Meets Expectations",
      "4 - Exceeds Expectations",
    ],
  },
  {
    id: "descriptive",
    name: "Descriptive Scale",
    options: ["Does Not Meet", "Partially Meets", "Meets", "Exceeds", "Far Exceeds"],
  },
]

export function PerformanceManagement() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [activeSection, setActiveSection] = useState<"reviews" | "job-descriptions" | "appraisal-templates">("reviews")

  const [selectedJobTemplate, setSelectedJobTemplate] = useState<any>(null)
  const [jobDescriptions, setJobDescriptions] = useState<any[]>([])
  const [showJobEditor, setShowJobEditor] = useState(false)
  const [editingJob, setEditingJob] = useState<any>({
    title: "",
    department: "",
    location: "",
    summary: "",
    responsibilities: [],
    requirements: [],
    skills: [],
    benefits: [],
    salaryRange: "",
  })

  const [selectedAppraisalTemplate, setSelectedAppraisalTemplate] = useState<any>(null)
  const [customTemplates, setCustomTemplates] = useState<any[]>([])
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>({
    name: "",
    description: "",
    ratingScale: "5-point",
    categories: [],
  })

  const performanceData = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Developer",
      department: "Engineering",
      manager: "John Smith",
      reviewPeriod: "Q4 2024",
      overallScore: 4.2,
      goals: [
        {
          category: "Technical Skills",
          score: 4.5,
          weight: 30,
          feedback: "Excellent coding skills and architecture design",
        },
        {
          category: "Communication",
          score: 4.0,
          weight: 20,
          feedback: "Good team communication, room for improvement in presentations",
        },
        {
          category: "Leadership",
          score: 4.0,
          weight: 25,
          feedback: "Shows leadership potential, mentoring junior developers well",
        },
        {
          category: "Innovation",
          score: 4.5,
          weight: 25,
          feedback: "Consistently brings innovative solutions to complex problems",
        },
      ],
      status: "Completed",
      nextReview: "2025-03-15",
      strengths: ["Technical expertise", "Problem-solving", "Code quality", "Team collaboration"],
      improvements: ["Public speaking", "Cross-functional communication", "Documentation"],
      managerNotes:
        "Sarah is a valuable team member who consistently delivers high-quality work. She has shown great improvement in leadership skills and is ready for more senior responsibilities.",
      employeeComments:
        "I'm excited about the new challenges and appreciate the feedback on communication skills. Looking forward to leading the next project.",
      nextQuarterGoals: [
        "Lead the new microservices architecture project",
        "Mentor 2 junior developers",
        "Complete advanced communication training",
        "Implement automated testing framework",
      ],
      performanceHistory: [
        { quarter: "Q1 2024", score: 3.8 },
        { quarter: "Q2 2024", score: 4.0 },
        { quarter: "Q3 2024", score: 4.1 },
        { quarter: "Q4 2024", score: 4.2 },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Manager",
      department: "Marketing",
      manager: "Lisa Wilson",
      reviewPeriod: "Q4 2024",
      overallScore: 3.8,
      goals: [
        {
          category: "Strategic Planning",
          score: 4.0,
          weight: 35,
          feedback: "Strong strategic thinking and campaign planning",
        },
        {
          category: "Team Management",
          score: 3.5,
          weight: 30,
          feedback: "Good team leadership, needs improvement in delegation",
        },
        {
          category: "Results Achievement",
          score: 4.0,
          weight: 35,
          feedback: "Consistently meets and exceeds campaign targets",
        },
      ],
      status: "In Progress",
      nextReview: "2025-03-20",
      strengths: ["Strategic thinking", "Campaign management", "Data analysis", "Client relations"],
      improvements: ["Team delegation", "Time management", "Budget planning"],
      managerNotes:
        "Michael has shown strong performance in campaign management and strategic planning. Focus needed on team development and delegation skills.",
      employeeComments:
        "I understand the feedback on delegation and am working on empowering my team members more effectively.",
      nextQuarterGoals: [
        "Implement new team delegation framework",
        "Complete leadership development program",
        "Launch Q1 integrated marketing campaign",
        "Improve team productivity by 15%",
      ],
      performanceHistory: [
        { quarter: "Q1 2024", score: 3.5 },
        { quarter: "Q2 2024", score: 3.6 },
        { quarter: "Q3 2024", score: 3.7 },
        { quarter: "Q4 2024", score: 3.8 },
      ],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Sales Representative",
      department: "Sales",
      manager: "David Brown",
      reviewPeriod: "Q4 2024",
      overallScore: 4.6,
      goals: [
        {
          category: "Sales Performance",
          score: 4.8,
          weight: 40,
          feedback: "Outstanding sales results, exceeded targets by 25%",
        },
        {
          category: "Customer Relations",
          score: 4.5,
          weight: 30,
          feedback: "Excellent customer satisfaction scores and retention",
        },
        {
          category: "Product Knowledge",
          score: 4.5,
          weight: 30,
          feedback: "Deep understanding of products and competitive landscape",
        },
      ],
      status: "Completed",
      nextReview: "2025-03-10",
      strengths: ["Sales closing", "Customer relationship building", "Product expertise", "Negotiation"],
      improvements: ["CRM data entry", "Team collaboration", "Presentation skills"],
      managerNotes:
        "Emily is our top performer this quarter. Her customer relationships and sales skills are exceptional. Ready for senior sales role.",
      employeeComments:
        "Thank you for the recognition. I'm excited about the opportunity to take on more senior responsibilities and help train new team members.",
      nextQuarterGoals: [
        "Achieve 30% increase in sales targets",
        "Mentor 3 new sales representatives",
        "Lead key account management program",
        "Complete advanced negotiation training",
      ],
      performanceHistory: [
        { quarter: "Q1 2024", score: 4.2 },
        { quarter: "Q2 2024", score: 4.3 },
        { quarter: "Q3 2024", score: 4.5 },
        { quarter: "Q4 2024", score: 4.6 },
      ],
    },
    {
      id: 4,
      name: "James Wilson",
      position: "HR Specialist",
      department: "Human Resources",
      manager: "Anna Davis",
      reviewPeriod: "Q4 2024",
      overallScore: 4.1,
      goals: [
        {
          category: "Process Improvement",
          score: 4.2,
          weight: 25,
          feedback: "Successfully streamlined onboarding process",
        },
        {
          category: "Employee Relations",
          score: 4.0,
          weight: 35,
          feedback: "Good employee support and conflict resolution",
        },
        { category: "Compliance", score: 4.0, weight: 25, feedback: "Maintains high compliance standards" },
        {
          category: "Training & Development",
          score: 4.2,
          weight: 15,
          feedback: "Effective training program coordination",
        },
      ],
      status: "Pending Manager Review",
      nextReview: "2025-03-25",
      strengths: ["Process optimization", "Employee support", "Compliance knowledge", "Training coordination"],
      improvements: ["Data analysis", "Strategic HR planning", "Technology adoption"],
      managerNotes:
        "James has made significant improvements in process efficiency. Focus on developing strategic HR skills for career advancement.",
      employeeComments:
        "I appreciate the feedback and am eager to develop more strategic HR capabilities. The process improvements have been very rewarding.",
      nextQuarterGoals: [
        "Complete HR analytics certification",
        "Lead employee engagement survey project",
        "Implement new HRIS features",
        "Develop strategic HR dashboard",
      ],
      performanceHistory: [
        { quarter: "Q1 2024", score: 3.8 },
        { quarter: "Q2 2024", score: 3.9 },
        { quarter: "Q3 2024", score: 4.0 },
        { quarter: "Q4 2024", score: 4.1 },
      ],
    },
  ]

  const selectJobTemplate = (template: any) => {
    setEditingJob({
      title: template.title,
      department: template.category,
      location: "",
      summary: template.summary,
      responsibilities: [...template.responsibilities],
      requirements: [...template.requirements],
      skills: [...template.skills],
      benefits: [
        "Competitive salary package",
        "Health insurance",
        "Professional development opportunities",
        "Flexible working hours",
        "Annual bonus",
      ],
      salaryRange: "",
    })
    setShowJobEditor(true)
  }

  const saveJobDescription = () => {
    const newJob = {
      id: Date.now().toString(),
      ...editingJob,
      createdAt: new Date().toISOString(),
      status: "Draft",
    }
    setJobDescriptions([...jobDescriptions, newJob])
    setShowJobEditor(false)
    setEditingJob({
      title: "",
      department: "",
      location: "",
      summary: "",
      responsibilities: [],
      requirements: [],
      skills: [],
      benefits: [],
      salaryRange: "",
    })
  }

  const selectAppraisalTemplate = (template: any) => {
    setEditingTemplate({
      name: `${template.name} - Custom`,
      description: template.description,
      ratingScale: "5-point",
      categories: template.categories.map((cat: any) => ({
        ...cat,
        criteria: cat.criteria.map((c: any) => ({ ...c, selected: true })),
      })),
    })
    setShowTemplateEditor(true)
  }

  const saveCustomTemplate = () => {
    const newTemplate = {
      id: Date.now().toString(),
      ...editingTemplate,
      createdAt: new Date().toISOString(),
      isCustom: true,
    }
    setCustomTemplates([...customTemplates, newTemplate])
    setShowTemplateEditor(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-primary"
    if (score >= 4.0) return "text-primary"
    if (score >= 3.5) return "text-secondary"
    return "text-secondary"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-primary/10 text-primary border-primary/20"
      case "In Progress":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "Pending Manager Review":
        return "bg-secondary/10 text-secondary border-secondary/20"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Complete Performance Chart Component
  const PerformanceChart = ({ employee }: { employee: any }) => {
    const history = employee.performanceHistory
    const maxScore = 5
    const minScore = 0

    return (
      <div className="w-full h-48 p-4">
        <div className="relative h-full">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>5.0</span>
            <span>4.0</span>
            <span>3.0</span>
            <span>2.0</span>
            <span>1.0</span>
          </div>
          <div className="ml-8 h-full relative">
            {[1, 2, 3, 4, 5].map((line) => (
              <div
                key={line}
                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                style={{ top: `${100 - line * 20}%` }}
              />
            ))}
            <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 400 200">
              <polyline
                fill="none"
                stroke="#00C5B3"
                strokeWidth="3"
                points={history
                  .map((item: any, index: number) => `${(index * 400) / (history.length - 1)},${200 - item.score * 40}`)
                  .join(" ")}
              />
              {history.map((item: any, index: number) => (
                <g key={index}>
                  <circle
                    cx={(index * 400) / (history.length - 1)}
                    cy={200 - item.score * 40}
                    r="6"
                    fill="#00C5B3"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={(index * 400) / (history.length - 1)}
                    y={200 - item.score * 40 - 12}
                    textAnchor="middle"
                    className="text-xs font-medium fill-primary"
                  >
                    {item.score}
                  </text>
                </g>
              ))}
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500 transform translate-y-4">
              {history.map((item: any, index: number) => (
                <span key={index}>{item.quarter}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Complete Radar Chart Component
  const RadarChart = ({ employee }: { employee: any }) => {
    const goals = employee.goals
    const size = 200
    const center = size / 2
    const maxRadius = 80
    const levels = 5

    const points = goals.map((goal: any, index: number) => {
      const angle = (Math.PI * 2 * index) / goals.length - Math.PI / 2
      const radius = (goal.score / 5) * maxRadius
      return {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
        labelX: center + Math.cos(angle) * (maxRadius + 20),
        labelY: center + Math.sin(angle) * (maxRadius + 20),
        category: goal.category,
        score: goal.score,
      }
    })

    return (
      <div className="w-full flex justify-center">
        <svg width={size + 80} height={size + 80} viewBox={`0 0 ${size + 80} ${size + 80}`}>
          {Array.from({ length: levels }, (_, i) => (
            <circle
              key={i}
              cx={center + 40}
              cy={center + 40}
              r={(maxRadius * (i + 1)) / levels}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          {goals.map((_: any, index: number) => {
            const angle = (Math.PI * 2 * index) / goals.length - Math.PI / 2
            const endX = center + 40 + Math.cos(angle) * maxRadius
            const endY = center + 40 + Math.sin(angle) * maxRadius
            return (
              <line
                key={index}
                x1={center + 40}
                y1={center + 40}
                x2={endX}
                y2={endY}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )
          })}
          <polygon
            points={points.map((p) => `${p.x + 40},${p.y + 40}`).join(" ")}
            fill="rgba(0, 197, 179, 0.2)"
            stroke="#00C5B3"
            strokeWidth="2"
          />
          {points.map((point, index) => (
            <g key={index}>
              <circle cx={point.x + 40} cy={point.y + 40} r="4" fill="#00C5B3" stroke="white" strokeWidth="2" />
              <text
                x={point.labelX + 40}
                y={point.labelY + 40}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
              >
                {point.category}
              </text>
              <text
                x={point.labelX + 40}
                y={point.labelY + 52}
                textAnchor="middle"
                className="text-xs font-bold fill-primary"
              >
                {point.score}
              </text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  // Complete Bar Chart Component
  const BarChart = ({ data, title }: { data: any[]; title: string }) => {
    const maxValue = Math.max(...data.map((d) => d.value))

    return (
      <div className="w-full h-64 p-4">
        <h4 className="text-sm font-medium mb-4">{title}</h4>
        <div className="h-48 flex items-end gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-center mb-2">
                <div
                  className={`w-full max-w-[40px] rounded-t-md transition-all duration-500 ${
                    index % 2 === 0 ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    minHeight: "4px",
                  }}
                />
              </div>
              <span className="text-xs text-center font-medium">{item.label}</span>
              <span className="text-xs text-gray-500">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-white/20">
              <Target className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Performance Management</h1>
              <p className="text-white/90 text-lg">Track and evaluate employee performance across all departments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b">
        <Button
          variant={activeSection === "reviews" ? "default" : "ghost"}
          className={activeSection === "reviews" ? "bg-primary" : ""}
          onClick={() => setActiveSection("reviews")}
        >
          <Award className="h-4 w-4 mr-2" />
          Performance Reviews
        </Button>
        <Button
          variant={activeSection === "job-descriptions" ? "default" : "ghost"}
          className={activeSection === "job-descriptions" ? "bg-primary" : ""}
          onClick={() => setActiveSection("job-descriptions")}
        >
          <FileText className="h-4 w-4 mr-2" />
          Job Descriptions
        </Button>
        <Button
          variant={activeSection === "appraisal-templates" ? "default" : "ghost"}
          className={activeSection === "appraisal-templates" ? "bg-primary" : ""}
          onClick={() => setActiveSection("appraisal-templates")}
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Appraisal Templates
        </Button>
      </div>

      {activeSection === "job-descriptions" && (
        <div className="space-y-6">
          {!showJobEditor ? (
            <>
              {/* Job Description Templates */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Job Description Templates
                  </CardTitle>
                  <CardDescription>Select a template to create a professional job description quickly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {jobDescriptionTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className="border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => selectJobTemplate(template)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{template.icon}</span>
                            <div>
                              <CardTitle className="text-base group-hover:text-primary transition-colors">
                                {template.title}
                              </CardTitle>
                              <Badge variant="outline" className="text-xs mt-1">
                                {template.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{template.summary}</p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {template.skills.slice(0, 3).map((skill, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {template.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{template.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
                            <Plus className="h-4 w-4 mr-2" />
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Created Job Descriptions */}
              {jobDescriptions.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Created Job Descriptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobDescriptions.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.department}</TableCell>
                            <TableCell>{job.location || "Not specified"}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{job.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {/* Create from Scratch Button */}
              <Button onClick={() => setShowJobEditor(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Job Description from Scratch
              </Button>
            </>
          ) : (
            /* Job Description Editor */
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {editingJob.title ? `Edit: ${editingJob.title}` : "Create Job Description"}
                    </CardTitle>
                    <CardDescription>Fill in the details to create a professional job description</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setShowJobEditor(false)}>
                    Cancel
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input
                      value={editingJob.title}
                      onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department *</Label>
                    <Select
                      value={editingJob.department}
                      onValueChange={(value) => setEditingJob({ ...editingJob, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={editingJob.location}
                      onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                      placeholder="e.g., Cairo, Egypt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Input
                      value={editingJob.salaryRange}
                      onChange={(e) => setEditingJob({ ...editingJob, salaryRange: e.target.value })}
                      placeholder="e.g., 15,000 - 25,000 EGP"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Job Summary *</Label>
                  <Textarea
                    value={editingJob.summary}
                    onChange={(e) => setEditingJob({ ...editingJob, summary: e.target.value })}
                    placeholder="Brief overview of the role..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Responsibilities</Label>
                  <div className="space-y-2">
                    {editingJob.responsibilities.map((resp: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={resp}
                          onChange={(e) => {
                            const updated = [...editingJob.responsibilities]
                            updated[index] = e.target.value
                            setEditingJob({ ...editingJob, responsibilities: updated })
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updated = editingJob.responsibilities.filter((_: any, i: number) => i !== index)
                            setEditingJob({ ...editingJob, responsibilities: updated })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingJob({
                          ...editingJob,
                          responsibilities: [...editingJob.responsibilities, ""],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Responsibility
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Requirements</Label>
                  <div className="space-y-2">
                    {editingJob.requirements.map((req: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={req}
                          onChange={(e) => {
                            const updated = [...editingJob.requirements]
                            updated[index] = e.target.value
                            setEditingJob({ ...editingJob, requirements: updated })
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updated = editingJob.requirements.filter((_: any, i: number) => i !== index)
                            setEditingJob({ ...editingJob, requirements: updated })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingJob({
                          ...editingJob,
                          requirements: [...editingJob.requirements, ""],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Skills (comma-separated)</Label>
                  <Input
                    value={editingJob.skills.join(", ")}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Benefits</Label>
                  <div className="space-y-2">
                    {editingJob.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) => {
                            const updated = [...editingJob.benefits]
                            updated[index] = e.target.value
                            setEditingJob({ ...editingJob, benefits: updated })
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updated = editingJob.benefits.filter((_: any, i: number) => i !== index)
                            setEditingJob({ ...editingJob, benefits: updated })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingJob({
                          ...editingJob,
                          benefits: [...editingJob.benefits, ""],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowJobEditor(false)}>
                  Cancel
                </Button>
                <Button onClick={saveJobDescription} className="bg-primary hover:bg-primary/90">
                  <Check className="h-4 w-4 mr-2" />
                  Save Job Description
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {activeSection === "appraisal-templates" && (
        <div className="space-y-6">
          {!showTemplateEditor ? (
            <>
              {/* Pre-built Appraisal Templates */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Performance Appraisal Templates
                  </CardTitle>
                  <CardDescription>
                    Choose from professionally designed templates with ready assessment criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {appraisalTemplates.map((template) => {
                      const Icon = template.icon
                      return (
                        <Card
                          key={template.id}
                          className="border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${template.color} text-white`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <CardTitle className="text-base group-hover:text-primary transition-colors">
                                  {template.name}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">Categories:</p>
                              <div className="flex flex-wrap gap-1">
                                {template.categories.map((cat, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {cat.name} ({cat.weight}%)
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${template.color} text-white`}>
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    {template.name}
                                  </DialogTitle>
                                  <DialogDescription>{template.description}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 mt-4">
                                  {template.categories.map((category, catIndex) => (
                                    <div key={catIndex} className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-lg">{category.name}</h4>
                                        <Badge variant="secondary">{category.weight}% Weight</Badge>
                                      </div>
                                      <div className="grid gap-2">
                                        {category.criteria.map((criterion, critIndex) => (
                                          <div
                                            key={critIndex}
                                            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                                          >
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">
                                              {critIndex + 1}
                                            </div>
                                            <div>
                                              <p className="font-medium">{criterion.name}</p>
                                              <p className="text-sm text-muted-foreground">{criterion.description}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="flex-1 bg-primary hover:bg-primary/90"
                              onClick={() => selectAppraisalTemplate(template)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Use Template
                            </Button>
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Templates */}
              {customTemplates.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Custom Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Categories</TableHead>
                          <TableHead>Rating Scale</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customTemplates.map((template) => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium">{template.name}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{template.description}</TableCell>
                            <TableCell>{template.categories.length} categories</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {ratingScales.find((s) => s.id === template.ratingScale)?.name}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(template.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {/* Create from Scratch Button */}
              <Button
                onClick={() => {
                  setEditingTemplate({
                    name: "",
                    description: "",
                    ratingScale: "5-point",
                    categories: [],
                  })
                  setShowTemplateEditor(true)
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Template
              </Button>
            </>
          ) : (
            /* Appraisal Template Editor */
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      {editingTemplate.name ? `Edit: ${editingTemplate.name}` : "Create Appraisal Template"}
                    </CardTitle>
                    <CardDescription>Customize the assessment criteria for your performance reviews</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setShowTemplateEditor(false)}>
                    Cancel
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Template Name *</Label>
                    <Input
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                      placeholder="e.g., Engineering Team Review"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating Scale</Label>
                    <Select
                      value={editingTemplate.ratingScale}
                      onValueChange={(value) => setEditingTemplate({ ...editingTemplate, ratingScale: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingScales.map((scale) => (
                          <SelectItem key={scale.id} value={scale.id}>
                            {scale.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingTemplate.description}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                    placeholder="Brief description of this template..."
                    rows={2}
                  />
                </div>

                {/* Categories and Criteria */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg">Assessment Categories</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingTemplate({
                          ...editingTemplate,
                          categories: [
                            ...editingTemplate.categories,
                            { name: "", weight: 20, criteria: [{ name: "", description: "", selected: true }] },
                          ],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </div>

                  {editingTemplate.categories.map((category: any, catIndex: number) => (
                    <Card key={catIndex} className="border">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <Input
                            value={category.name}
                            onChange={(e) => {
                              const updated = [...editingTemplate.categories]
                              updated[catIndex].name = e.target.value
                              setEditingTemplate({ ...editingTemplate, categories: updated })
                            }}
                            placeholder="Category name (e.g., Technical Skills)"
                            className="flex-1"
                          />
                          <div className="flex items-center gap-2">
                            <Label className="text-sm whitespace-nowrap">Weight %</Label>
                            <Input
                              type="number"
                              value={category.weight}
                              onChange={(e) => {
                                const updated = [...editingTemplate.categories]
                                updated[catIndex].weight = Number.parseInt(e.target.value) || 0
                                setEditingTemplate({ ...editingTemplate, categories: updated })
                              }}
                              className="w-20"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updated = editingTemplate.categories.filter((_: any, i: number) => i !== catIndex)
                              setEditingTemplate({ ...editingTemplate, categories: updated })
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {category.criteria.map((criterion: any, critIndex: number) => (
                          <div key={critIndex} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
                            <Checkbox
                              checked={criterion.selected}
                              onCheckedChange={(checked) => {
                                const updated = [...editingTemplate.categories]
                                updated[catIndex].criteria[critIndex].selected = checked
                                setEditingTemplate({ ...editingTemplate, categories: updated })
                              }}
                            />
                            <div className="flex-1 grid gap-2">
                              <Input
                                value={criterion.name}
                                onChange={(e) => {
                                  const updated = [...editingTemplate.categories]
                                  updated[catIndex].criteria[critIndex].name = e.target.value
                                  setEditingTemplate({ ...editingTemplate, categories: updated })
                                }}
                                placeholder="Criterion name"
                                className="text-sm"
                              />
                              <Input
                                value={criterion.description}
                                onChange={(e) => {
                                  const updated = [...editingTemplate.categories]
                                  updated[catIndex].criteria[critIndex].description = e.target.value
                                  setEditingTemplate({ ...editingTemplate, categories: updated })
                                }}
                                placeholder="Description"
                                className="text-sm"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updated = [...editingTemplate.categories]
                                updated[catIndex].criteria = updated[catIndex].criteria.filter(
                                  (_: any, i: number) => i !== critIndex,
                                )
                                setEditingTemplate({ ...editingTemplate, categories: updated })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = [...editingTemplate.categories]
                            updated[catIndex].criteria.push({ name: "", description: "", selected: true })
                            setEditingTemplate({ ...editingTemplate, categories: updated })
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Criterion
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Total Weight Display */}
                <div className="flex items-center justify-end gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Total Weight:</span>
                  <Badge
                    variant={
                      editingTemplate.categories.reduce((sum: number, cat: any) => sum + cat.weight, 0) === 100
                        ? "default"
                        : "destructive"
                    }
                  >
                    {editingTemplate.categories.reduce((sum: number, cat: any) => sum + cat.weight, 0)}%
                  </Badge>
                  {editingTemplate.categories.reduce((sum: number, cat: any) => sum + cat.weight, 0) !== 100 && (
                    <span className="text-xs text-destructive">Must equal 100%</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowTemplateEditor(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={saveCustomTemplate}
                  className="bg-primary hover:bg-primary/90"
                  disabled={editingTemplate.categories.reduce((sum: number, cat: any) => sum + cat.weight, 0) !== 100}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {activeSection === "reviews" && (
        <>
          {/* Performance Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="h-3 w-3" />
                  +3 from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="h-3 w-3" />
                  +24 this quarter
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Star className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2</div>
                <div className="flex items-center gap-1 text-xs text-secondary">
                  <TrendingUp className="h-3 w-3" />
                  +0.3 improvement
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Target className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <div className="flex items-center gap-1 text-xs text-secondary">
                  <TrendingUp className="h-3 w-3" />
                  +5% this quarter
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  title=""
                  data={[
                    { label: "1.0-1.9", value: 2 },
                    { label: "2.0-2.9", value: 8 },
                    { label: "3.0-3.9", value: 45 },
                    { label: "4.0-4.9", value: 65 },
                    { label: "5.0", value: 12 },
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-secondary" />
                  Review Status
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-40 h-40">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#00C5B3"
                      strokeWidth="20"
                      strokeDasharray="283 377"
                      transform="rotate(-90 80 80)"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#FF5000"
                      strokeWidth="20"
                      strokeDasharray="94 377"
                      strokeDashoffset="-283"
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">75%</span>
                    <span className="text-xs text-gray-500">Completed</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-sm">Pending</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Performance Reviews Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Employee Performance Reviews
                  </CardTitle>
                  <CardDescription>Detailed performance assessments and scores</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <UserPlus className="h-4 w-4 mr-2" />
                      New Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Performance Review</DialogTitle>
                      <DialogDescription>Set up a new performance review for an employee</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">Employee</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Select Employee</option>
                            <option>John Doe - Software Engineer</option>
                            <option>Jane Smith - Marketing Manager</option>
                            <option>Mike Johnson - Sales Rep</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Review Period</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Q1 2025</option>
                            <option>Q2 2025</option>
                            <option>Q3 2025</option>
                            <option>Q4 2025</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Review Type</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Annual Review</option>
                          <option>Quarterly Review</option>
                          <option>Probation Review</option>
                          <option>Mid-Year Review</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Goals & Objectives</label>
                        <textarea
                          className="w-full p-2 border rounded-md h-24"
                          placeholder="Enter performance goals and objectives..."
                        ></textarea>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-primary hover:bg-primary/90">Create Review</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Review Period</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder-user-${employee.id}.jpg`} />
                            <AvatarFallback className="bg-primary text-white">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.reviewPeriod}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getScoreColor(employee.overallScore)}`}>
                            {employee.overallScore}
                          </span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.round(employee.overallScore)
                                    ? "text-secondary fill-secondary"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(employee.status)}`}>{employee.status}</Badge>
                      </TableCell>
                      <TableCell>{employee.nextReview}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(employee)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={`/placeholder-user-${employee.id}.jpg`} />
                                  <AvatarFallback className="bg-primary text-white">
                                    {employee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-xl font-bold">{employee.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {employee.position} - {employee.department}
                                  </div>
                                </div>
                              </DialogTitle>
                              <DialogDescription>
                                Performance review details for {employee.reviewPeriod}
                              </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="goals">Goals & Scores</TabsTrigger>
                                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                                <TabsTrigger value="development">Development</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Gauge className="h-5 w-5 text-primary" />
                                        Overall Performance
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex items-center justify-center mb-4">
                                        <div className="relative w-24 h-24">
                                          <svg className="w-24 h-24 transform -rotate-90">
                                            <circle
                                              cx="48"
                                              cy="48"
                                              r="40"
                                              stroke="#e5e7eb"
                                              strokeWidth="8"
                                              fill="none"
                                            />
                                            <circle
                                              cx="48"
                                              cy="48"
                                              r="40"
                                              stroke="#00C5B3"
                                              strokeWidth="8"
                                              fill="none"
                                              strokeDasharray={`${(employee.overallScore / 5) * 251.2} 251.2`}
                                            />
                                          </svg>
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-primary">
                                              {employee.overallScore}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        Performance Trend
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <PerformanceChart employee={employee} />
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>

                              <TabsContent value="goals" className="space-y-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <Target className="h-5 w-5 text-primary" />
                                      Performance Radar
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <RadarChart employee={employee} />
                                  </CardContent>
                                </Card>

                                {employee.goals.map((goal: any, index: number) => (
                                  <Card key={index}>
                                    <CardHeader>
                                      <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                                            {index + 1}
                                          </div>
                                          {goal.category}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                          <span className={`text-xl font-bold ${getScoreColor(goal.score)}`}>
                                            {goal.score}/5.0
                                          </span>
                                          <Badge variant="outline">{goal.weight}% weight</Badge>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="mb-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-primary rounded-full transition-all duration-500"
                                          style={{ width: `${(goal.score / 5) * 100}%` }}
                                        />
                                      </div>
                                      <p className="text-sm text-gray-600">{goal.feedback}</p>
                                    </CardContent>
                                  </Card>
                                ))}
                              </TabsContent>

                              <TabsContent value="feedback" className="space-y-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <MessageSquare className="h-5 w-5 text-primary" />
                                      Manager Feedback
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="bg-primary/5 p-4 rounded-lg">
                                      <p className="text-sm">{employee.managerNotes}</p>
                                      <div className="mt-2 text-xs text-gray-500">
                                        {employee.manager} - Manager - {employee.reviewPeriod}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <User className="h-5 w-5 text-secondary" />
                                      Employee Comments
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="bg-secondary/5 p-4 rounded-lg">
                                      <p className="text-sm">{employee.employeeComments}</p>
                                      <div className="mt-2 text-xs text-gray-500">
                                        {employee.name} - {employee.position} - {employee.reviewPeriod}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent value="development" className="space-y-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <Rocket className="h-5 w-5 text-primary" />
                                      Next Quarter Goals
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-3">
                                      {employee.nextQuarterGoals.map((goal: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium flex-shrink-0 mt-0.5">
                                            {index + 1}
                                          </div>
                                          <span className="text-sm">{goal}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
