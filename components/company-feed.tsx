"use client"

import { useState } from "react"
import type { ElementType } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Megaphone,
  Heart,
  MessageCircle,
  Share2,
  Pin,
  Plus,
  Search,
  Cake,
  Star,
  Gift,
  PartyPopper,
  Briefcase,
  Bell,
  Globe,
  Users,
  ChevronDown,
  Send,
  Image,
  FileText,
  Video,
  Award,
  Trophy,
  Sparkles,
  Crown,
  TrendingUp,
  Zap,
  ThumbsUp,
  Target,
} from "lucide-react"

// ─── Feed Types ──────────────────────────────────────────────────────────────

interface FeedPost {
  id: string
  author: string
  authorTitle: string
  type: "Announcement" | "Birthday" | "Anniversary" | "NewHire" | "Achievement" | "Update" | "Event"
  content: string
  timestamp: string
  likes: number
  comments: number
  pinned: boolean
  audience: "All" | "Department" | "Team"
  liked: boolean
  media?: string
}

const feedPosts: FeedPost[] = [
  {
    id: "1",
    author: "Ahmed Hassan (CEO)",
    authorTitle: "Chief Executive Officer",
    type: "Announcement",
    content: "🎉 I'm thrilled to announce that we've just closed our Series B funding round of $12M! This is a testament to the incredible work each one of you has done. We'll be sharing a detailed roadmap for what this means for our growth plans in next week's all-hands. Thank you for believing in our mission!",
    timestamp: "2 hours ago",
    likes: 127,
    comments: 34,
    pinned: true,
    audience: "All",
    liked: false,
  },
  {
    id: "2",
    author: "HR Team",
    authorTitle: "Human Resources",
    type: "Birthday",
    content: "🎂 Wishing a very happy birthday to our amazing team members today!\n\n• Sara Ahmed (Technology)\n• Mohamed Khalil (Finance)\n• Layla Ibrahim (Marketing)\n\nJoin us in celebrating them — there's cake in the kitchen! 🍰",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 22,
    pinned: false,
    audience: "All",
    liked: true,
  },
  {
    id: "3",
    author: "HR Team",
    authorTitle: "Human Resources",
    type: "NewHire",
    content: "👋 Please give a warm welcome to our newest team members joining us this week!\n\n• **Rania Abdel** — Marketing Manager (Marketing Dept)\n• **Tarek Sayed** — Data Engineer (Technology Dept)\n• **Dina Mostafa** — HR Coordinator (HR Dept)\n\nWe're so excited to have you on board. Please say hello when you see them around! 🌟",
    timestamp: "1 day ago",
    likes: 156,
    comments: 41,
    pinned: false,
    audience: "All",
    liked: false,
  },
  {
    id: "4",
    author: "Sara Ahmed",
    authorTitle: "Engineering Manager",
    type: "Achievement",
    content: "🚀 Huge shoutout to the entire tech team for shipping the new API platform v2 ahead of schedule! We went from 0 to production in 6 weeks — this is what world-class engineering looks like. Special thanks to Ahmed Hassan and Khaled Omar for the extra miles. 💪",
    timestamp: "2 days ago",
    likes: 203,
    comments: 58,
    pinned: false,
    audience: "All",
    liked: true,
  },
  {
    id: "5",
    author: "HR Team",
    authorTitle: "Human Resources",
    type: "Anniversary",
    content: "🎊 Today we celebrate some incredible work anniversaries!\n\n• **Ahmed Hassan** — 5 years with us! 🌟\n• **Omar Farouk** — 3 years! 🌟\n• **Nour Hassan** — 1 year! 🌟\n\nThank you for your dedication and contributions. We wouldn't be the same without you!",
    timestamp: "3 days ago",
    likes: 174,
    comments: 46,
    pinned: false,
    audience: "All",
    liked: false,
  },
  {
    id: "6",
    author: "Mohamed Ali",
    authorTitle: "Head of People",
    type: "Update",
    content: "📋 **Policy Update: Flexible Work Hours**\n\nStarting February 1st, all employees can choose their core hours between 8 AM – 6 PM, as long as you're available for team syncs. This applies to all departments. Full policy details have been emailed and added to the HR portal. Questions? Drop them in the comments! 👇",
    timestamp: "4 days ago",
    likes: 312,
    comments: 87,
    pinned: false,
    audience: "All",
    liked: true,
  },
  {
    id: "7",
    author: "Events Committee",
    authorTitle: "Team Events",
    type: "Event",
    content: "📅 **Q1 Company Offsite — Save the Date!**\n\nWe're heading to Ain Sokhna for our quarterly offsite on **March 8–9**. Two days of strategy, fun, and team building by the sea! 🌊\n\nRegistration opens Friday. Space is limited to 120 attendees. More details coming soon!",
    timestamp: "5 days ago",
    likes: 241,
    comments: 63,
    pinned: false,
    audience: "All",
    liked: false,
  },
]

const upcomingEvents = [
  { title: "Q1 All-Hands Meeting", date: "Jan 31", type: "Meeting" },
  { title: "Rania & Omar — New Hire Lunch", date: "Feb 2", type: "Social" },
  { title: "Company Offsite — Ain Sokhna", date: "Mar 8-9", type: "Offsite" },
  { title: "Benefits Open Enrollment Ends", date: "Feb 15", type: "Deadline" },
]

const upcomingBirthdays = [
  { name: "Sara Ahmed", date: "Today", dept: "Technology" },
  { name: "Mohamed Khalil", date: "Today", dept: "Finance" },
  { name: "Ahmed Hassan", date: "Jan 29", dept: "Technology" },
  { name: "Layla Ibrahim", date: "Feb 3", dept: "Marketing" },
]

function PostTypeIcon({ type }: { type: FeedPost["type"] }) {
  const map: Record<string, { icon: ElementType; color: string }> = {
    Announcement: { icon: Megaphone, color: "text-blue-500" },
    Birthday: { icon: Cake, color: "text-pink-500" },
    Anniversary: { icon: Star, color: "text-yellow-500" },
    NewHire: { icon: Users, color: "text-green-500" },
    Achievement: { icon: PartyPopper, color: "text-purple-500" },
    Update: { icon: Bell, color: "text-orange-500" },
    Event: { icon: Gift, color: "text-red-500" },
  }
  const { icon: Icon, color } = map[type] || { icon: Bell, color: "text-slate-500" }
  return <Icon className={`h-4 w-4 ${color}`} />
}

function PostTypeBadge({ type }: { type: FeedPost["type"] }) {
  const map: Record<string, string> = {
    Announcement: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Birthday: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    Anniversary: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    NewHire: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Achievement: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Update: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Event: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  }
  return (
    <Badge className={`text-xs rounded-lg px-2 py-0.5 ${map[type] || "bg-slate-100 text-slate-700"}`}>
      {type}
    </Badge>
  )
}

function PostCard({ post, onLike }: { post: FeedPost; onLike: (id: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 text-sm">
              {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{post.author}</p>
              <PostTypeBadge type={post.type} />
            </div>
            <p className="text-xs text-slate-500">{post.authorTitle} · {post.timestamp}</p>
          </div>
        </div>
        <PostTypeIcon type={post.type} />
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
        {post.content}
      </p>
      <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? "text-red-500" : "text-slate-500 hover:text-red-500"}`}
        >
          <Heart className={`h-4 w-4 ${post.liked ? "fill-red-500" : ""}`} />
          {post.likes}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors">
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors ml-auto">
          <Share2 className="h-4 w-4" />Share
        </button>
      </div>
    </div>
  )
}

// ─── Recognition Types ────────────────────────────────────────────────────────

interface Shoutout {
  id: string
  from: string
  fromTitle: string
  to: string
  toTitle: string
  message: string
  value: "Innovation" | "Teamwork" | "Excellence" | "Leadership" | "Customer Focus" | "Ownership"
  points: number
  timestamp: string
  likes: number
  liked: boolean
}

interface AwardItem {
  id: string
  name: string
  description: string
  icon: ElementType
  color: string
  recipients: string[]
  frequency: string
}

interface LeaderboardEntry {
  rank: number
  name: string
  department: string
  points: number
  shoutoutsReceived: number
  shoutoutsGiven: number
  badges: string[]
}

const shoutouts: Shoutout[] = [
  {
    id: "1",
    from: "Sara Ahmed", fromTitle: "Engineering Manager",
    to: "Ahmed Hassan", toTitle: "Senior Software Engineer",
    message: "Ahmed went above and beyond this week to debug a critical production issue at 11 PM on a Friday. He not only fixed the bug but documented the root cause and created preventive measures. This is what ownership looks like. 🙌",
    value: "Ownership", points: 50, timestamp: "2 hours ago", likes: 34, liked: false,
  },
  {
    id: "2",
    from: "Mohamed Ali", fromTitle: "Head of People",
    to: "Nour Hassan", toTitle: "Marketing Manager",
    message: "Nour's rebranding campaign exceeded all expectations — we hit 40% more engagement than our best quarter ever. Her creativity and dedication are truly inspiring to the whole team!",
    value: "Excellence", points: 75, timestamp: "1 day ago", likes: 56, liked: true,
  },
  {
    id: "3",
    from: "Ahmed Hassan", fromTitle: "Senior Software Engineer",
    to: "Yasmine Samir", toTitle: "Data Engineer",
    message: "Yasmine joined the team 3 months ago and has already built 3 data pipelines that the whole company relies on. Her initiative in proposing the new ETL architecture saved us weeks of work. So happy to have her on our team! 🚀",
    value: "Innovation", points: 60, timestamp: "2 days ago", likes: 42, liked: false,
  },
  {
    id: "4",
    from: "Layla Ibrahim", fromTitle: "Marketing Director",
    to: "Omar Farouk", toTitle: "Finance Analyst",
    message: "Omar's budget analysis for Q1 was exceptionally clear and helped leadership make confident decisions fast. He also proactively flagged a discrepancy that saved us from a costly mistake. Outstanding work! 💡",
    value: "Excellence", points: 50, timestamp: "3 days ago", likes: 28, liked: false,
  },
  {
    id: "5",
    from: "Sara Ahmed", fromTitle: "Engineering Manager",
    to: "Team", toTitle: "Technology Department",
    message: "To the whole tech team — shipping v2 in 6 weeks while maintaining zero critical bugs is a feat I've never seen before. Every single one of you showed up, stayed late, and delivered. I am so proud to lead this team. 🏆",
    value: "Teamwork", points: 100, timestamp: "4 days ago", likes: 89, liked: true,
  },
]

const awards: AwardItem[] = [
  { id: "1", name: "Employee of the Month", description: "Recognizing exceptional performance and company values", icon: Crown, color: "text-yellow-500", recipients: ["Ahmed Hassan"], frequency: "Monthly" },
  { id: "2", name: "Innovation Award", description: "For bringing creative solutions to challenging problems", icon: Zap, color: "text-blue-500", recipients: ["Yasmine Samir", "Tarek Sayed"], frequency: "Quarterly" },
  { id: "3", name: "Team Player Award", description: "Going above and beyond to support colleagues", icon: Users, color: "text-green-500", recipients: ["Sara Ahmed"], frequency: "Quarterly" },
  { id: "4", name: "Rising Star", description: "Outstanding performance by a new team member", icon: Star, color: "text-purple-500", recipients: ["Rania Abdel"], frequency: "Quarterly" },
  { id: "5", name: "Customer Champion", description: "Exceptional dedication to customer success", icon: Heart, color: "text-red-500", recipients: ["Nour Hassan"], frequency: "Monthly" },
]

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Ahmed Hassan", department: "Technology", points: 1240, shoutoutsReceived: 18, shoutoutsGiven: 12, badges: ["🏆", "⚡", "🌟"] },
  { rank: 2, name: "Nour Hassan", department: "Marketing", points: 1180, shoutoutsReceived: 16, shoutoutsGiven: 14, badges: ["🎯", "💡"] },
  { rank: 3, name: "Sara Ahmed", department: "Technology", points: 1050, shoutoutsReceived: 12, shoutoutsGiven: 22, badges: ["👥", "🌟"] },
  { rank: 4, name: "Omar Farouk", department: "Finance", points: 920, shoutoutsReceived: 10, shoutoutsGiven: 8, badges: ["⭐"] },
  { rank: 5, name: "Yasmine Samir", department: "Technology", points: 860, shoutoutsReceived: 14, shoutoutsGiven: 6, badges: ["🚀", "💡"] },
  { rank: 6, name: "Rania Abdel", department: "Marketing", points: 780, shoutoutsReceived: 11, shoutoutsGiven: 9, badges: ["🌟"] },
  { rank: 7, name: "Khaled Mostafa", department: "Technology", points: 710, shoutoutsReceived: 8, shoutoutsGiven: 7, badges: ["⭐"] },
]

function ValueBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    Innovation: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Teamwork: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Excellence: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Leadership: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    "Customer Focus": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    Ownership: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  }
  return <Badge className={`text-xs rounded-lg ${map[value] || "bg-slate-100 text-slate-700"}`}>{value}</Badge>
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CompanyFeed() {
  // Feed state
  const [posts, setPosts] = useState<FeedPost[]>(feedPosts)
  const [newPost, setNewPost] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("All")

  // Recognition state
  const [shoutoutPosts, setShoutoutPosts] = useState<Shoutout[]>(shoutouts)
  const [recognitionTab, setRecognitionTab] = useState("shoutouts")
  const [recipient, setRecipient] = useState("")
  const [recValue, setRecValue] = useState("")
  const [recMessage, setRecMessage] = useState("")

  // Top-level tab
  const [mainTab, setMainTab] = useState("feed")

  const toggleFeedLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    )
  }

  const toggleShoutoutLike = (id: string) => {
    setShoutoutPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
    )
  }

  const filtered = typeFilter === "All" ? posts : posts.filter((p) => p.type === typeFilter)
  const pinned = filtered.filter((p) => p.pinned)
  const rest = filtered.filter((p) => !p.pinned)
  const totalPointsGiven = shoutoutPosts.reduce((s, p) => s + p.points, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Globe className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Company Feed</h1>
              <p className="text-fuchsia-100 text-lg">Announcements, celebrations, recognition, and company updates</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              { label: "Posts This Month", value: "47", icon: Megaphone },
              { label: "Total Reactions", value: "2.4K", icon: Heart },
              { label: "Shoutouts Given", value: shoutoutPosts.length.toString(), icon: Award },
              { label: "Upcoming Birthdays", value: "3", icon: Cake },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-fuchsia-200" />
                  <span className="text-fuchsia-200 text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tabs: Feed | Recognition */}
      <Tabs value={mainTab} onValueChange={setMainTab}>
        <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          <TabsTrigger value="feed" className="rounded-lg data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white gap-2">
            <Globe className="h-4 w-4" />Company Feed
          </TabsTrigger>
          <TabsTrigger value="recognition" className="rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white gap-2">
            <Award className="h-4 w-4" />Recognition
          </TabsTrigger>
        </TabsList>

        {/* ══ FEED TAB ══ */}
        <TabsContent value="feed" className="mt-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="col-span-2 space-y-4">
              {/* Compose */}
              <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 text-sm">
                        SM
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Share an update, announcement, or celebrate a win…"
                        className="rounded-xl resize-none border-slate-200 dark:border-slate-700 min-h-[80px]"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[
                            { icon: Image, label: "Photo" },
                            { icon: Video, label: "Video" },
                            { icon: FileText, label: "Document" },
                          ].map(({ icon: Icon, label }) => (
                            <Button key={label} variant="ghost" size="sm" className="text-slate-500 hover:text-fuchsia-600 rounded-xl h-8 px-2 text-xs gap-1">
                              <Icon className="h-4 w-4" />{label}
                            </Button>
                          ))}
                        </div>
                        <Button size="sm" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl gap-2" disabled={!newPost.trim()}>
                          <Send className="h-4 w-4" />Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {["All", "Announcement", "Birthday", "Anniversary", "NewHire", "Achievement", "Event", "Update"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      typeFilter === t
                        ? "bg-fuchsia-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Pinned Posts */}
              {pinned.map((post) => (
                <Card key={post.id} className="rounded-2xl border-fuchsia-200 dark:border-fuchsia-900 bg-fuchsia-50/50 dark:bg-fuchsia-900/10">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 text-xs text-fuchsia-600 dark:text-fuchsia-400 mb-3 font-medium">
                      <Pin className="h-3 w-3" />Pinned
                    </div>
                    <PostCard post={post} onLike={toggleFeedLike} />
                  </CardContent>
                </Card>
              ))}

              {/* Feed Posts */}
              {rest.map((post) => (
                <Card key={post.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <PostCard post={post} onLike={toggleFeedLike} />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Upcoming Birthdays */}
              <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Cake className="h-4 w-4 text-pink-500" />Upcoming Birthdays
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingBirthdays.map((b) => (
                    <div key={b.name} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 text-xs">
                          {b.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{b.name}</p>
                        <p className="text-xs text-slate-400">{b.dept}</p>
                      </div>
                      <Badge className={`text-xs rounded-lg ${b.date === "Today" ? "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300" : "bg-slate-100 text-slate-600"}`}>
                        {b.date}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Gift className="h-4 w-4 text-red-500" />Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.title} className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                        <Bell className="h-3 w-3 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">{event.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Employee Handbook", "IT Request Portal", "Expense Claims", "Book a Meeting Room", "Office Map"].map((link) => (
                    <button key={link} className="w-full text-left text-sm text-fuchsia-600 dark:text-fuchsia-400 hover:underline flex items-center gap-1">
                      <ChevronDown className="h-3 w-3 rotate-[-90deg]" />{link}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ══ RECOGNITION TAB ══ */}
        <TabsContent value="recognition" className="mt-4 space-y-6">
          {/* Recognition stats banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-6 text-white shadow-lg">
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Shoutouts This Month", value: shoutoutPosts.length.toString(), icon: Sparkles },
                { label: "Points Distributed", value: totalPointsGiven.toLocaleString(), icon: Star },
                { label: "Active Awards", value: awards.length.toString(), icon: Trophy },
                { label: "Participation Rate", value: "78%", icon: TrendingUp },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <stat.icon className="h-3.5 w-3.5 text-yellow-200" />
                    <span className="text-yellow-200 text-xs">{stat.label}</span>
                  </div>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recognition sub-tabs */}
          <Tabs value={recognitionTab} onValueChange={setRecognitionTab}>
            <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
              <TabsTrigger value="shoutouts" className="rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Sparkles className="h-4 w-4 mr-2" />Shoutouts
              </TabsTrigger>
              <TabsTrigger value="awards" className="rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Trophy className="h-4 w-4 mr-2" />Awards
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Crown className="h-4 w-4 mr-2" />Leaderboard
              </TabsTrigger>
            </TabsList>

            {/* ── Shoutouts ── */}
            <TabsContent value="shoutouts" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  {shoutoutPosts.map((post) => (
                    <Card key={post.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 shrink-0">
                            <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 text-sm">
                              {post.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="font-semibold text-sm">{post.from}</span>
                              <span className="text-slate-400 text-sm">→</span>
                              <span className="font-semibold text-sm text-orange-600 dark:text-orange-400">{post.to}</span>
                              <ValueBadge value={post.value} />
                              <Badge className="text-xs rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                                +{post.points} pts
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-400">{post.fromTitle} · {post.timestamp}</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{post.message}</p>
                            <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                              <button
                                onClick={() => toggleShoutoutLike(post.id)}
                                className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? "text-red-500" : "text-slate-500 hover:text-red-500"}`}
                              >
                                <Heart className={`h-4 w-4 ${post.liked ? "fill-red-500" : ""}`} />
                                {post.likes}
                              </button>
                              <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-500 transition-colors">
                                <ThumbsUp className="h-4 w-4" />Celebrate
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Give Shoutout Panel */}
                <div className="space-y-4">
                  <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-500" />Give a Shoutout
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Select value={recipient} onValueChange={setRecipient}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Who are you recognizing?" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Ahmed Hassan", "Sara Ahmed", "Nour Hassan", "Omar Farouk", "Yasmine Samir", "Rania Abdel"].map((name) => (
                            <SelectItem key={name} value={name}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={recValue} onValueChange={setRecValue}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Company value" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Innovation", "Teamwork", "Excellence", "Leadership", "Customer Focus", "Ownership"].map((v) => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea
                        placeholder="Tell the team what they did…"
                        className="rounded-xl resize-none"
                        rows={4}
                        value={recMessage}
                        onChange={(e) => setRecMessage(e.target.value)}
                      />
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2"
                        disabled={!recipient || !recValue || !recMessage.trim()}
                      >
                        <Send className="h-4 w-4" />Send Shoutout (+50 pts)
                      </Button>
                    </CardContent>
                  </Card>

                  {/* My Points */}
                  <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl font-bold text-orange-500 mb-1">850</div>
                      <p className="text-sm text-slate-500">Your recognition points</p>
                      <Progress value={85} className="mt-3 h-2" />
                      <p className="text-xs text-slate-400 mt-1">150 pts to next level</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* ── Awards ── */}
            <TabsContent value="awards" className="space-y-4 mt-4">
              <div className="flex justify-end">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />Create Award
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {awards.map((award) => (
                  <Card key={award.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-900/40">
                          <award.icon className={`h-6 w-6 ${award.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{award.name}</h3>
                            <Badge variant="secondary" className="text-xs rounded-lg">{award.frequency}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{award.description}</p>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Recent recipients</p>
                            <div className="flex -space-x-2">
                              {award.recipients.map((r) => (
                                <Avatar key={r} className="h-7 w-7 border-2 border-white dark:border-slate-900">
                                  <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 text-xs">
                                    {r.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{award.recipients.join(", ")}</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl shrink-0">
                          Nominate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ── Leaderboard ── */}
            <TabsContent value="leaderboard" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {leaderboard.slice(0, 3).map((entry, idx) => (
                  <Card key={entry.name} className={`rounded-2xl border-2 ${idx === 0 ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20" : idx === 1 ? "border-slate-300 bg-slate-50 dark:bg-slate-800" : "border-orange-300 bg-orange-50 dark:bg-orange-900/20"}`}>
                    <CardContent className="p-5 text-center">
                      <div className="text-3xl mb-2">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                      <Avatar className="h-14 w-14 mx-auto mb-3">
                        <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                          {entry.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-bold">{entry.name}</p>
                      <p className="text-xs text-slate-500 mb-2">{entry.department}</p>
                      <p className="text-2xl font-bold text-orange-500">{entry.points.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">points</p>
                      <div className="flex justify-center gap-1 mt-2">
                        {entry.badges.map((b, i) => <span key={i} className="text-lg">{b}</span>)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  {leaderboard.map((entry) => (
                    <div key={entry.name} className={`flex items-center gap-4 p-4 border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${entry.rank <= 3 ? "bg-orange-50/50 dark:bg-orange-900/10" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        entry.rank === 1 ? "bg-yellow-400 text-white" :
                        entry.rank === 2 ? "bg-slate-300 text-white dark:bg-slate-600" :
                        entry.rank === 3 ? "bg-orange-400 text-white" :
                        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}>
                        {entry.rank}
                      </div>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 text-sm">
                          {entry.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs text-slate-500">{entry.department}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-xs text-slate-400">Received</p>
                        <p className="font-semibold text-sm">{entry.shoutoutsReceived}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-xs text-slate-400">Given</p>
                        <p className="font-semibold text-sm">{entry.shoutoutsGiven}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {entry.badges.map((b, i) => <span key={i}>{b}</span>)}
                      </div>
                      <div className="text-right w-20">
                        <p className="font-bold text-orange-500">{entry.points.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">pts</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
