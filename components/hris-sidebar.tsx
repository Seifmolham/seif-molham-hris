"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Users,
  Building2,
  MapIcon as Sitemap,
  GraduationCap,
  Target,
  BookOpen,
  Clock,
  Calendar,
  DollarSign,
  User,
  FileText,
  Mail,
  BarChart3,
  Settings,
  ChevronDown,
  Bell,
  LogOut,
  UserCog,
  UserCheck,
  Heart,
  Globe,
  Award,
  TrendingUp,
  Layers,
  MessageSquare,
  UserMinus,
  Briefcase,
} from "lucide-react"

type UserRole = "Employee" | "Manager" | "HR" | "Admin"

interface HRISSidebarProps {
  onNavigate: (module: string) => void
  activeModule: string
  userRole?: UserRole
}

const navigationItems = [
  {
    title: "Overview",
    items: [
      { title: "Organization Insights", icon: LayoutDashboard, key: "dashboard", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
      { title: "Company Feed", icon: Globe, key: "company-feed", badge: "3", roles: ["Employee", "Manager", "HR", "Admin"] },
    ],
  },
  {
    title: "Core HR",
    items: [
      { title: "Employees", icon: Users, key: "employees", badge: "1,247", roles: ["Manager", "HR", "Admin"] },
      { title: "Departments", icon: Building2, key: "departments", badge: null, roles: ["HR", "Admin"] },
      { title: "Org Chart", icon: Sitemap, key: "org-chart", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
    ],
  },
  {
    title: "Talent",
    items: [
      { title: "ATS / Recruiting", icon: UserCheck, key: "ats", badge: "45", roles: ["HR", "Admin"] },
      { title: "Onboarding", icon: GraduationCap, key: "onboarding", badge: "8", roles: ["Manager", "HR", "Admin"] },
      { title: "Offboarding", icon: UserMinus, key: "offboarding", badge: "2", roles: ["HR", "Admin"] },
      { title: "Career & Goals", icon: TrendingUp, key: "career", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
      { title: "Performance", icon: Target, key: "performance", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
      { title: "Learning", icon: BookOpen, key: "learning", badge: "12", roles: ["Employee", "Manager", "HR", "Admin"] },
    ],
  },
  {
    title: "Workforce",
    items: [
      { title: "Workforce Planning", icon: Layers, key: "workforce-planning", badge: null, roles: ["HR", "Admin"] },
      { title: "Attendance", icon: Clock, key: "attendance", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
      { title: "Leave", icon: Calendar, key: "leave", badge: "15", roles: ["Employee", "Manager", "HR", "Admin"] },
    ],
  },
  {
    title: "Compensation",
    items: [
      { title: "Payroll", icon: DollarSign, key: "payroll", badge: null, roles: ["HR", "Admin"] },
      { title: "Compensation & Equity", icon: Briefcase, key: "compensation", badge: null, roles: ["HR", "Admin"] },
      { title: "Benefits", icon: Heart, key: "benefits", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
    ],
  },
  {
    title: "People & Culture",
    items: [
      { title: "Surveys & Engagement", icon: MessageSquare, key: "surveys", badge: null, roles: ["HR", "Admin"] },
      { title: "Self Service", icon: User, key: "self-service", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
    ],
  },
  {
    title: "Documents & Reports",
    items: [
      { title: "Status Changes", icon: Award, key: "status-changes", badge: null, roles: ["Manager", "HR", "Admin"] },
      { title: "Workflow Maker", icon: MessageSquare, key: "workflow-maker", badge: null, roles: ["HR", "Admin"] },
      { title: "Documents", icon: FileText, key: "documents", badge: "45", roles: ["Employee", "Manager", "HR", "Admin"] },
      { title: "HR Letters", icon: Mail, key: "letters", badge: null, roles: ["Employee", "Manager", "HR", "Admin"] },
      { title: "Analytics", icon: BarChart3, key: "analytics", badge: null, roles: ["HR", "Admin"] },
    ],
  },
]

export function HRISSidebar({ onNavigate, activeModule, userRole = "Admin" }: HRISSidebarProps) {
  const roleBadgeColor: Record<UserRole, string> = {
    Admin: "bg-red-100 text-red-700",
    HR: "bg-blue-100 text-blue-700",
    Manager: "bg-amber-100 text-amber-700",
    Employee: "bg-green-100 text-green-700",
  }

  return (
    <Sidebar className="border-r-0 bg-white dark:bg-slate-900">
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#00C5B3" }}>
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 truncate">Valu HRIS</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">People Platform</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadgeColor[userRole]}`}>
            {userRole}
          </span>
          <span className="text-xs text-slate-400">Seif Molham</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {navigationItems.map((group) => {
          const visibleItems = group.items.filter((item) => item.roles.includes(userRole))
          if (visibleItems.length === 0) return null
          return (
            <SidebarGroup key={group.title} className="mb-2">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        onClick={() => onNavigate(item.key)}
                        isActive={activeModule === item.key}
                        className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          activeModule === item.key
                            ? "bg-primary text-white shadow-md"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className={`ml-auto text-xs px-1.5 py-0.5 ${
                              activeModule === item.key ? "bg-white/20 text-white" : "bg-secondary text-white"
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 dark:border-slate-700 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-white text-sm" style={{ background: "#00C5B3" }}>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">Seif Molham</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <UserCog className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate("settings")}>
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
