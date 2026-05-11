"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  ArrowRightLeft,
  DollarSign,
  GraduationCap,
  UserCheck,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Activity,
  BarChart3,
  Users,
  Calendar,
  X,
} from "lucide-react"

type ChangeType =
  | "Promotion"
  | "Transfer"
  | "Salary Change"
  | "Grade Change"
  | "Manager Requested Promotion"
  | "Manager Requested Salary Adjustment"

interface StatusChange {
  id: string
  employee: string
  employeeTitle: string
  department: string
  changeType: ChangeType
  effectiveDate: string
  requestedBy: string
  requestedByTitle: string
  status: "Completed" | "Pending Approval" | "Rejected"
  details: {
    from: string
    to: string
    reason: string
    notes?: string
  }
  approvedBy?: string
  approvedDate?: string
  timestamp: string
}