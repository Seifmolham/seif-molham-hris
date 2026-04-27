"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  GitBranch,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  UserCheck,
  Users,
  Settings,
  Copy,
  Play,
  Pause,
  Edit3,
  ArrowRight,
  ArrowDown,
  Zap,
  Filter,
  Bell,
  MoreHorizontal,
  GripVertical,
  AlertCircle,
  Check,
  X,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Shield,
  ChevronRight,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type ApproverType = "specific_person" | "role" | "department_head" | "direct_manager" | "skip_level_manager" | "hr_business_partner"
type ConditionOperator = "equals" | "greater_than" | "less_than" | "contains" | "in_range"
type ApprovalMode = "any" | "all" | "majority"
type WorkflowStatus = "Active" | "Draft" | "Paused" | "Archived"

interface Approver {
  id: string
  type: ApproverType
  name: string
  fallback?: string
  timeoutDays: number
  timeoutAction: "escalate" | "auto_approve" | "auto_reject" | "notify_hr"
}

interface Condition {
  id: string
  field: string
  operator: ConditionOperator
  value: string
}

interface WorkflowStep {
  id: string
  name: string
  approvers: Approver[]
  approvalMode: ApprovalMode
  conditions: Condition[]
  allowDelegation: boolean
  requireComment: boolean
  notifyOnApproval: string[]
  notifyOnRejection: string[]
  slaHours: number
}

interface Workflow {
  id: string
  name: string
  description: string
  triggerEvent: string
  category: string
  status: WorkflowStatus
  steps: WorkflowStep[]
  createdBy: string
  createdAt: string
  lastModified: string
  timesUsed: number
  avgCompletionHours: number
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const approverTypeLabels: Record<ApproverType, string> = {
  specific_person: "Specific Person",
  role: "Role (e.g. HR Manager)",
  department_head: "Department Head",
  direct_manager: "Direct Manager",
  skip_level_manager: "Skip-Level Manager",
  hr_business_partner: "HR Business Partner",
}

const triggerEvents = [
  { value: "leave_request", label: "Leave Request", icon: Calendar },
  { value: "salary_change", label: "Salary Change", icon: DollarSign },
  { value: "promotion", label: "Promotion Request", icon: TrendingUp },
  { value: "hiring_requisition", label: "Hiring Requisition", icon: Users },
  { value: "expense_claim", label: "Expense Claim", icon: FileText },
  { value: "offboarding", label: "Offboarding", icon: UserCheck },
  { value: "policy_exception", label: "Policy Exception", icon: Shield },
  { value: "document_approval", label: "Document Approval", icon: FileText },
  { value: "grade_change", label: "Grade Change", icon: TrendingUp },
  { value: "transfer", label: "Transfer Request", icon: RefreshCw },
  { value: "custom", label: "Custom Trigger", icon: Zap },
]

const conditionFields = [
  "Leave Days Requested",
  "Salary Change Amount",
  "Salary Change Percentage",
  "Employee Level / Grade",
  "Employee Department",
  "Employee Tenure (years)",
  "Request Amount (EGP)",
  "Employee Location",
  "Team Size",
]

const mockWorkflows: Workflow[] = [
  {
    id: "1",
    name: "Leave Request — 5+ Days",
    description: "Triggered when an employee requests 5 or more consecutive leave days",
    triggerEvent: "leave_request",
    category: "Leave & Attendance",
    status: "Active",
    steps: [
      {
        id: "s1",
        name: "Direct Manager Approval",
        approvers: [{ id: "a1", type: "direct_manager", name: "Direct Manager", timeoutDays: 2, timeoutAction: "escalate" }],
        approvalMode: "any",
        conditions: [{ id: "c1", field: "Leave Days Requested", operator: "greater_than", value: "5" }],
        allowDelegation: true,
        requireComment: false,
        notifyOnApproval: ["employee"],
        notifyOnRejection: ["employee"],
        slaHours: 48,
      },
      {
        id: "s2",
        name: "HR Review",
        approvers: [{ id: "a2", type: "hr_business_partner", name: "HR Business Partner", timeoutDays: 1, timeoutAction: "auto_approve" }],
        approvalMode: "any",
        conditions: [],
        allowDelegation: false,
        requireComment: false,
        notifyOnApproval: ["employee", "manager"],
        notifyOnRejection: ["employee", "manager"],
        slaHours: 24,
      },
    ],
    createdBy: "Mohamed Ali",
    createdAt: "2026-01-10",
    lastModified: "2026-03-15",
    timesUsed: 247,
    avgCompletionHours: 18,
  },
  {
    id: "2",
    name: "Salary Change Approval",
    description: "Any salary change requires manager + HR + Finance chain approval",
    triggerEvent: "salary_change",
    category: "Compensation",
    status: "Active",
    steps: [
      {
        id: "s1",
        name: "Line Manager",
        approvers: [{ id: "a1", type: "direct_manager", name: "Direct Manager", timeoutDays: 3, timeoutAction: "escalate" }],
        approvalMode: "any",
        conditions: [],
        allowDelegation: false,
        requireComment: true,
        notifyOnApproval: [],
        notifyOnRejection: ["employee"],
        slaHours: 72,
      },
      {
        id: "s2",
        name: "HR Business Partner",
        approvers: [{ id: "a2", type: "hr_business_partner", name: "HR BP", timeoutDays: 2, timeoutAction: "notify_hr" }],
        approvalMode: "any",
        conditions: [],
        allowDelegation: false,
        requireComment: true,
        notifyOnApproval: [],
        notifyOnRejection: ["employee", "manager"],
        slaHours: 48,
      },
      {
        id: "s3",
        name: "Finance Sign-off",
        approvers: [{ id: "a3", type: "role", name: "Finance Manager", timeoutDays: 3, timeoutAction: "escalate" }],
        approvalMode: "any",
        conditions: [{ id: "c1", field: "Salary Change Amount", operator: "greater_than", value: "5000" }],
        allowDelegation: true,
        requireComment: true,
        notifyOnApproval: ["employee", "manager", "hr"],
        notifyOnRejection: ["employee", "manager"],
        slaHours: 72,
      },
    ],
    createdBy: "Mohamed Ali",
    createdAt: "2026-01-15",
    lastModified: "2026-04-01",
    timesUsed: 89,
    avgCompletionHours: 52,
  },
  {
    id: "3",
    name: "Promotion Fast Track",
    description: "Manager-initiated promotion with skip-level and HR approval",
    triggerEvent: "promotion",
    category: "Talent",
    status: "Active",
    steps: [
      {
        id: "s1",
        name: "Skip-Level Manager",
        approvers: [{ id: "a1", type: "skip_level_manager", name: "Skip-Level", timeoutDays: 5, timeoutAction: "escalate" }],
        approvalMode: "any",
        conditions: [],
        allowDelegation: false,
        requireComment: true,
        notifyOnApproval: [],
        notifyOnRejection: ["manager"],
        slaHours: 120,
      },
      {
        id: "s2",
        name: "HR Approval",
        approvers: [{ id: "a2", type: "hr_business_partner", name: "HR BP", timeoutDays: 3, timeoutAction: "notify_hr" }],
        approvalMode: "any",
        conditions: [],
        allowDelegation: false,
        requireComment: true,
        notifyOnApproval: ["employee", "manager"],
        notifyOnRejection: ["manager"],
        slaHours: 72,
      },
    ],
    createdBy: "HR Team",
    createdAt: "2026-02-01",
    lastModified: "2026-02-01",
    timesUsed: 34,
    avgCompletionHours: 67,
  },
  {
    id: "4",
    name: "Hiring Requisition",
    description: "Open a new headcount — requires department head and finance approval",
    triggerEvent: "hiring_requisition",
    category: "Talent",
    status: "Draft",
    steps: [],
    createdBy: "Sara Ahmed",
    createdAt: "2026-04-10",
    lastModified: "2026-04-10",
    timesUsed: 0,
    avgCompletionHours: 0,
  },
]

const categoryColors: Record<string, string> = {
  "Leave & Attendance": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Compensation: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Talent: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Finance: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Documents: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
}

const statusColors: Record<WorkflowStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  Draft: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
  Paused: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  Archived: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
}

// ─── Step Builder Component ───────────────────────────────────────────────────

function StepCard({
  step,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  step: WorkflowStep
  index: number
  total: number
  onUpdate: (s: WorkflowStep) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  const [expanded, setExpanded] = useState(true)

  const addApprover = () => {
    const newApprover: Approver = {
      id: `a${Date.now()}`,
      type: "direct_manager",
      name: "Direct Manager",
      timeoutDays: 3,
      timeoutAction: "escalate",
    }
    onUpdate({ ...step, approvers: [...step.approvers, newApprover] })
  }

  const removeApprover = (id: string) => {
    onUpdate({ ...step, approvers: step.approvers.filter((a) => a.id !== id) })
  }

  const updateApprover = (id: string, changes: Partial<Approver>) => {
    onUpdate({
      ...step,
      approvers: step.approvers.map((a) => (a.id === id ? { ...a, ...changes } : a)),
    })
  }

  const addCondition = () => {
    const newCond: Condition = { id: `c${Date.now()}`, field: "Leave Days Requested", operator: "greater_than", value: "" }
    onUpdate({ ...step, conditions: [...step.conditions, newCond] })
  }

  const removeCondition = (id: string) => {
    onUpdate({ ...step, conditions: step.conditions.filter((c) => c.id !== id) })
  }

  return (
    <div className="relative">
      {/* Connector line */}
      {index < total - 1 && (
        <div className="absolute left-6 top-full w-0.5 h-5 bg-indigo-200 dark:bg-indigo-800 z-10" />
      )}

      <Card className="rounded-2xl border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-slate-900 shadow-sm">
        {/* Step Header */}
        <div
          className="flex items-center gap-3 p-4 cursor-pointer select-none"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </div>
          <div className="flex-1">
            <Input
              value={step.name}
              onChange={(e) => { e.stopPropagation(); onUpdate({ ...step, name: e.target.value }) }}
              onClick={(e) => e.stopPropagation()}
              className="border-0 p-0 h-auto font-semibold text-base focus-visible:ring-0 bg-transparent"
              placeholder="Step name…"
            />
            <p className="text-xs text-slate-400 mt-0.5">
              {step.approvers.length} approver{step.approvers.length !== 1 ? "s" : ""} · {step.approvalMode === "any" ? "Any one" : step.approvalMode === "all" ? "All must" : "Majority"} approve · SLA {step.slaHours}h
              {step.conditions.length > 0 && ` · ${step.conditions.length} condition${step.conditions.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={onMoveUp} disabled={index === 0}>
              <ChevronUp className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={onMoveDown} disabled={index === total - 1}>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onDelete}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>

        {/* Step Body */}
        {expanded && (
          <CardContent className="pt-0 pb-5 px-5 space-y-5 border-t border-slate-100 dark:border-slate-800">

            {/* Approval Mode & SLA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-slate-500">Approval Mode</Label>
                <Select value={step.approvalMode} onValueChange={(v) => onUpdate({ ...step, approvalMode: v as ApprovalMode })}>
                  <SelectTrigger className="w-44 rounded-xl text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any One Approves</SelectItem>
                    <SelectItem value="all">All Must Approve</SelectItem>
                    <SelectItem value="majority">Majority Approves</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-slate-500">SLA (hours)</Label>
                <Input
                  type="number"
                  value={step.slaHours}
                  onChange={(e) => onUpdate({ ...step, slaHours: Number(e.target.value) })}
                  className="w-28 rounded-xl text-sm h-9"
                />
              </div>
              <div className="flex items-end gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={step.allowDelegation}
                    onCheckedChange={(v) => onUpdate({ ...step, allowDelegation: v })}
                    id={`del-${step.id}`}
                  />
                  <Label htmlFor={`del-${step.id}`} className="text-sm cursor-pointer">Allow Delegation</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={step.requireComment}
                    onCheckedChange={(v) => onUpdate({ ...step, requireComment: v })}
                    id={`comment-${step.id}`}
                  />
                  <Label htmlFor={`comment-${step.id}`} className="text-sm cursor-pointer">Require Comment</Label>
                </div>
              </div>
            </div>

            {/* Approvers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Approvers</Label>
                <Button variant="outline" size="sm" className="rounded-xl h-7 text-xs gap-1" onClick={addApprover}>
                  <Plus className="h-3 w-3" />Add Approver
                </Button>
              </div>
              {step.approvers.map((approver) => (
                <div key={approver.id} className="flex flex-wrap gap-2 items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <UserCheck className="h-4 w-4 text-indigo-500 shrink-0" />
                  <Select
                    value={approver.type}
                    onValueChange={(v) => updateApprover(approver.id, { type: v as ApproverType, name: approverTypeLabels[v as ApproverType] })}
                  >
                    <SelectTrigger className="w-52 rounded-xl text-sm h-8 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.entries(approverTypeLabels) as [ApproverType, string][]).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {approver.type === "specific_person" && (
                    <Input
                      placeholder="Name or email…"
                      value={approver.name}
                      onChange={(e) => updateApprover(approver.id, { name: e.target.value })}
                      className="w-40 rounded-xl text-sm h-8"
                    />
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Timeout:</span>
                    <Input
                      type="number"
                      value={approver.timeoutDays}
                      onChange={(e) => updateApprover(approver.id, { timeoutDays: Number(e.target.value) })}
                      className="w-14 rounded-xl text-sm h-8"
                    />
                    <span className="text-xs text-slate-400">days →</span>
                    <Select
                      value={approver.timeoutAction}
                      onValueChange={(v) => updateApprover(approver.id, { timeoutAction: v as Approver["timeoutAction"] })}
                    >
                      <SelectTrigger className="w-36 rounded-xl text-sm h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="escalate">Escalate</SelectItem>
                        <SelectItem value="auto_approve">Auto-approve</SelectItem>
                        <SelectItem value="auto_reject">Auto-reject</SelectItem>
                        <SelectItem value="notify_hr">Notify HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 ml-auto" onClick={() => removeApprover(approver.id)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              {step.approvers.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-3">No approvers added yet</p>
              )}
            </div>

            {/* Conditions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Conditions <span className="text-slate-400 font-normal normal-case">(step runs only when all conditions are met)</span>
                </Label>
                <Button variant="outline" size="sm" className="rounded-xl h-7 text-xs gap-1" onClick={addCondition}>
                  <Filter className="h-3 w-3" />Add Condition
                </Button>
              </div>
              {step.conditions.map((cond) => (
                <div key={cond.id} className="flex flex-wrap gap-2 items-center p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/40">
                  <Filter className="h-4 w-4 text-amber-500 shrink-0" />
                  <Select value={cond.field} onValueChange={(v) => {
                    const updated = step.conditions.map((c) => c.id === cond.id ? { ...c, field: v } : c)
                    onUpdate({ ...step, conditions: updated })
                  }}>
                    <SelectTrigger className="w-52 rounded-xl text-sm h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionFields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={cond.operator} onValueChange={(v) => {
                    const updated = step.conditions.map((c) => c.id === cond.id ? { ...c, operator: v as ConditionOperator } : c)
                    onUpdate({ ...step, conditions: updated })
                  }}>
                    <SelectTrigger className="w-36 rounded-xl text-sm h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="greater_than">Greater than</SelectItem>
                      <SelectItem value="less_than">Less than</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="in_range">In range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Value…"
                    value={cond.value}
                    onChange={(e) => {
                      const updated = step.conditions.map((c) => c.id === cond.id ? { ...c, value: e.target.value } : c)
                      onUpdate({ ...step, conditions: updated })
                    }}
                    className="w-32 rounded-xl text-sm h-8"
                  />
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 ml-auto" onClick={() => removeCondition(cond.id)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              {step.conditions.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-2">No conditions — this step always runs</p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Arrow between steps */}
      {index < total - 1 && (
        <div className="flex justify-center my-1">
          <ArrowDown className="h-4 w-4 text-indigo-300" />
        </div>
      )}
    </div>
  )
}

// ─── Workflow Builder Panel ───────────────────────────────────────────────────

function WorkflowBuilder({
  workflow,
  onSave,
  onCancel,
}: {
  workflow: Partial<Workflow>
  onSave: (w: Workflow) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(workflow.name ?? "")
  const [description, setDescription] = useState(workflow.description ?? "")
  const [triggerEvent, setTriggerEvent] = useState(workflow.triggerEvent ?? "")
  const [category, setCategory] = useState(workflow.category ?? "Leave & Attendance")
  const [steps, setSteps] = useState<WorkflowStep[]>(workflow.steps ?? [])

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `s${Date.now()}`,
      name: `Step ${steps.length + 1}`,
      approvers: [{ id: `a${Date.now()}`, type: "direct_manager", name: "Direct Manager", timeoutDays: 3, timeoutAction: "escalate" }],
      approvalMode: "any",
      conditions: [],
      allowDelegation: true,
      requireComment: false,
      notifyOnApproval: ["employee"],
      notifyOnRejection: ["employee"],
      slaHours: 48,
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (id: string, updated: WorkflowStep) => {
    setSteps(steps.map((s) => (s.id === id ? updated : s)))
  }

  const deleteStep = (id: string) => setSteps(steps.filter((s) => s.id !== id))

  const moveStep = (idx: number, dir: "up" | "down") => {
    const arr = [...steps]
    const target = dir === "up" ? idx - 1 : idx + 1
    ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
    setSteps(arr)
  }

  const selectedTrigger = triggerEvents.find((t) => t.value === triggerEvent)

  return (
    <div className="space-y-6">
      {/* Builder header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="rounded-xl gap-2" onClick={onCancel}>
            <ChevronRight className="h-4 w-4 rotate-180" />Back
          </Button>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {workflow.id ? "Edit Workflow" : "New Workflow"}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl gap-2">
            <Play className="h-3.5 w-3.5" />Test Run
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2"
            onClick={() => onSave({
              id: workflow.id ?? `w${Date.now()}`,
              name, description, triggerEvent, category, steps,
              status: "Draft",
              createdBy: "Seif Molham",
              createdAt: new Date().toISOString().split("T")[0],
              lastModified: new Date().toISOString().split("T")[0],
              timesUsed: 0,
              avgCompletionHours: 0,
            })}
          >
            <Check className="h-3.5 w-3.5" />Save Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: config */}
        <div className="col-span-1 space-y-4">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4 text-indigo-500" />Workflow Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Workflow Name *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Leave Request Approval" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this workflow handle?" className="rounded-xl resize-none" rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Trigger Event *</Label>
                <Select value={triggerEvent} onValueChange={setTriggerEvent}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="What triggers this?" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerEvents.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        <div className="flex items-center gap-2">
                          <t.icon className="h-4 w-4" />{t.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTrigger && (
                  <div className="flex items-center gap-1.5 mt-1 px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                    <Zap className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="text-xs text-indigo-700 dark:text-indigo-300">Trigger: {selectedTrigger.label}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categoryColors).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-700 bg-indigo-50/50 dark:bg-indigo-900/10">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">Workflow Summary</p>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Steps</span>
                  <span className="font-semibold">{steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Approvers</span>
                  <span className="font-semibold">{steps.reduce((sum, s) => sum + s.approvers.length, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max SLA</span>
                  <span className="font-semibold">{steps.reduce((sum, s) => sum + s.slaHours, 0)}h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: steps */}
        <div className="col-span-2 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Approval Steps</h3>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-1.5" onClick={addStep}>
              <Plus className="h-3.5 w-3.5" />Add Step
            </Button>
          </div>

          {steps.length === 0 && (
            <div className="border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 rounded-2xl p-10 text-center">
              <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 w-fit mx-auto mb-3">
                <GitBranch className="h-8 w-8 text-indigo-500" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No steps yet</p>
              <p className="text-sm text-slate-400 mb-4">Add your first approval step to define who approves this workflow</p>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2" onClick={addStep}>
                <Plus className="h-4 w-4" />Add First Step
              </Button>
            </div>
          )}

          {steps.map((step, idx) => (
            <StepCard
              key={step.id}
              step={step}
              index={idx}
              total={steps.length}
              onUpdate={(updated) => updateStep(step.id, updated)}
              onDelete={() => deleteStep(step.id)}
              onMoveUp={() => moveStep(idx, "up")}
              onMoveDown={() => moveStep(idx, "down")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WorkflowMaker() {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows)
  const [editing, setEditing] = useState<Partial<Workflow> | null>(null)
  const [activeTab, setActiveTab] = useState("workflows")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSave = (w: Workflow) => {
    setWorkflows((prev) => {
      const exists = prev.find((x) => x.id === w.id)
      return exists ? prev.map((x) => (x.id === w.id ? w : x)) : [...prev, w]
    })
    setEditing(null)
  }

  const filteredWorkflows = workflows.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.triggerEvent.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (editing !== null) {
    return (
      <WorkflowBuilder
        workflow={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)" }}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-40 w-20 h-20 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <GitBranch className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Workflow Maker</h1>
              <p className="text-indigo-200 text-lg">Build custom approval flows with a fully configurable approval matrix</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Active Workflows", value: workflows.filter((w) => w.status === "Active").length, icon: Play },
              { label: "Total Workflows", value: workflows.length, icon: GitBranch },
              { label: "Requests This Month", value: "312", icon: CheckCircle },
              { label: "Avg Completion", value: "38h", icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-indigo-200" />
                  <span className="text-indigo-200 text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
            <TabsTrigger value="workflows" className="rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-2">
              <GitBranch className="h-4 w-4" />All Workflows
            </TabsTrigger>
            <TabsTrigger value="templates" className="rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-2">
              <Copy className="h-4 w-4" />Templates
            </TabsTrigger>
            <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-2">
              <Clock className="h-4 w-4" />Activity Log
            </TabsTrigger>
          </TabsList>
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2"
            onClick={() => setEditing({})}
          >
            <Plus className="h-4 w-4" />New Workflow
          </Button>
        </div>

        {/* ── All Workflows ── */}
        <TabsContent value="workflows" className="space-y-4 mt-4">
          {/* Search */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search workflows…"
              className="pl-9 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid gap-4">
            {filteredWorkflows.map((wf) => {
              const trigger = triggerEvents.find((t) => t.value === wf.triggerEvent)
              const TriggerIcon = trigger?.icon ?? Zap
              return (
                <Card key={wf.id} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 shrink-0">
                        <TriggerIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-base">{wf.name}</h3>
                          <Badge className={`text-xs rounded-lg ${statusColors[wf.status]}`}>{wf.status}</Badge>
                          <Badge className={`text-xs rounded-lg ${categoryColors[wf.category] ?? "bg-slate-100 text-slate-600"}`}>{wf.category}</Badge>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{wf.description}</p>

                        {/* Steps visual */}
                        {wf.steps.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap mb-3">
                            {wf.steps.map((step, idx) => (
                              <div key={step.id} className="flex items-center gap-1">
                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center text-[10px]">{idx + 1}</span>
                                  {step.name}
                                  <span className="text-indigo-400">({step.approvers.length})</span>
                                </div>
                                {idx < wf.steps.length - 1 && <ArrowRight className="h-3 w-3 text-slate-300" />}
                              </div>
                            ))}
                          </div>
                        )}
                        {wf.steps.length === 0 && (
                          <p className="text-xs text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />No steps configured yet
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>{wf.steps.length} step{wf.steps.length !== 1 ? "s" : ""}</span>
                          <span>Used {wf.timesUsed} times</span>
                          {wf.avgCompletionHours > 0 && <span>Avg {wf.avgCompletionHours}h to complete</span>}
                          <span>Modified {wf.lastModified}</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs h-8"
                          onClick={() => setEditing(wf)}>
                          <Edit3 className="h-3.5 w-3.5" />Edit
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs h-8">
                          <Copy className="h-3.5 w-3.5" />Clone
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl h-8 w-8 p-0">
                          {wf.status === "Active"
                            ? <Pause className="h-3.5 w-3.5 text-orange-500" />
                            : <Play className="h-3.5 w-3.5 text-green-500" />
                          }
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* ── Templates ── */}
        <TabsContent value="templates" className="space-y-4 mt-4">
          <p className="text-sm text-slate-500">Start from a pre-built template and customize it for your organization.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Simple 1-Step Approval", description: "Single approver, no conditions. Best for low-risk requests.", steps: 1, icon: UserCheck, color: "bg-green-100 dark:bg-green-900/40 text-green-600" },
              { name: "Manager → HR Chain", description: "Sequential: manager approves first, then HR reviews.", steps: 2, icon: ArrowRight, color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600" },
              { name: "Dual Approval (Any)", description: "Two approvers — either one can approve. Good for redundancy.", steps: 1, icon: Users, color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600" },
              { name: "Finance Escalation", description: "Automatic escalation to finance if amount exceeds threshold.", steps: 3, icon: DollarSign, color: "bg-orange-100 dark:bg-orange-900/40 text-orange-600" },
              { name: "Full Promotion Flow", description: "Manager → Skip-level → HR → Compensation committee.", steps: 4, icon: TrendingUp, color: "bg-teal-100 dark:bg-teal-900/40 text-teal-600" },
              { name: "Exception Handling", description: "Conditional branching based on employee grade or department.", steps: 3, icon: GitBranch, color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600" },
            ].map((tmpl) => (
              <Card key={tmpl.name} className="rounded-2xl border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${tmpl.color.split(" ").slice(0, 2).join(" ")}`}>
                      <tmpl.icon className={`h-5 w-5 ${tmpl.color.split(" ").slice(2).join(" ")}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tmpl.name}</h3>
                      <p className="text-sm text-slate-500 mb-3">{tmpl.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{tmpl.steps} step{tmpl.steps !== 1 ? "s" : ""}</span>
                        <Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-xs h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setEditing({ name: tmpl.name, description: tmpl.description, steps: [] })}>
                          <Plus className="h-3 w-3" />Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Activity Log ── */}
        <TabsContent value="activity" className="space-y-3 mt-4">
          {[
            { action: "Workflow activated", workflow: "Leave Request — 5+ Days", by: "Mohamed Ali", time: "2 hours ago", type: "activate" },
            { action: "Step added to workflow", workflow: "Salary Change Approval", by: "Seif Molham", time: "1 day ago", type: "edit" },
            { action: "New workflow created", workflow: "Hiring Requisition", by: "Sara Ahmed", time: "11 days ago", type: "create" },
            { action: "Workflow cloned from template", workflow: "Promotion Fast Track", by: "HR Team", time: "2 months ago", type: "create" },
            { action: "Timeout action updated", workflow: "Leave Request — 5+ Days", by: "Mohamed Ali", time: "3 months ago", type: "edit" },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className={`p-2 rounded-lg shrink-0 ${
                log.type === "activate" ? "bg-green-100 dark:bg-green-900/30" :
                log.type === "create" ? "bg-blue-100 dark:bg-blue-900/30" :
                "bg-slate-100 dark:bg-slate-700"
              }`}>
                {log.type === "activate" ? <Play className="h-4 w-4 text-green-600" />
                  : log.type === "create" ? <Plus className="h-4 w-4 text-blue-600" />
                  : <Edit3 className="h-4 w-4 text-slate-500" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{log.action}</p>
                <p className="text-xs text-slate-500">{log.workflow} · by {log.by}</p>
              </div>
              <p className="text-xs text-slate-400 shrink-0">{log.time}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
