export interface MedicalDependent {
  id: string
  name: string
  relationship: "Wife" | "Husband" | "Child"
  dateOfBirth?: string
  nationalId?: string
}

export interface Employee {
  id: string
  firstName: string
  middleName?: string
  lastName: string
  fullArabicName: string
  nationalId: string
  nationalIdExpiry?: string
  socialInsuranceNumber?: string
  gender: "Male" | "Female"
  militaryStatus?: "Completed" | "Exempted" | "Postponed" | "Not Applicable"
  militaryCertificateExpiry?: string
  religion: string
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed"
  dateOfBirth: string
  workLocation: string
  contractType: "Full-time" | "Part-time" | "Consultant"
  employmentType: "Insource" | "Outsource"
  outsourceCompany?: string
  costCenter: string
  socialInsuranceStatus: "Insured" | "Business Owner" | "Not Insured"
  employeeStatus: "On-board" | "Resigned"
  exitDate?: string
  salary: {
    basicSalary: number
    transportationAllowance: number
    otherAllowances: { name: string; amount: number }[]
  }
  division: string
  department?: string
  team?: string
  section?: string
  position: string
  manager?: string
  email: string
  phone: string
  address: string
  hireDate: string
  profileImage?: string
  medicalInsuranceProvider?: string
  medicalDependents?: MedicalDependent[]
  companyCar?: { enrolled: boolean; model?: string; plateNumber?: string }
  carAllowance?: { enrolled: boolean; monthlyAmount?: number }
  lifeInsurance?: { enrolled: boolean; provider?: string; coverageAmount?: number }
  mobileDevice?: { enrolled: boolean; model?: string; number?: string }
  mobileAllowance?: { enrolled: boolean; monthlyAmount?: number }
}

export interface Department {
  id: string
  name: string
  description: string
  head: string
  parentDepartment?: string
  employees: string[]
  createdAt: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  type: "Annual" | "Sick" | "Maternity" | "Emergency" | "Personal"
  startDate: string
  endDate: string
  days: number
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  approvedBy?: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  role: "Employee" | "Manager" | "HR" | "Admin"
  employeeId?: string
  permissions: string[]
}

export interface JobRequisition {
  id: string
  title: string
  department: string
  description: string
  requirements: string[]
  status: "Draft" | "Open" | "Closed" | "On Hold"
  requestedBy: string
  createdAt: string
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  position: string
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected"
  resume?: string
  notes: string
}

export interface PerformanceReview {
  id: string
  employeeId: string
  reviewerId: string
  period: string
  type: "Self" | "Manager" | "360"
  goals: { goal: string; rating: number; comments: string }[]
  overallRating: number
  status: "Draft" | "Submitted" | "Completed"
}

export interface Course {
  id: string
  title: string
  description: string
  type: "Online" | "Classroom" | "External"
  duration: number
  instructor: string
  enrolledEmployees: string[]
}

export interface Document {
  id: string
  employeeId: string
  type: string
  name: string
  url: string
  expiryDate?: string
  uploadedAt: string
}
