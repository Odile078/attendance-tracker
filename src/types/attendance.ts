export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type AvailabilityStatus = 'available' | 'unavailable';
export type AbsenceReason = 'sick' | 'personal' | 'emergency' | 'family' | 'other';

export interface TimeSlot {
  id: string;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: AttendanceStatus;
  timeSlots: TimeSlot[];
  actualArrivalTime?: string;
  actualDepartureTime?: string;
  reason?: string;
  absenceReason?: AbsenceReason;
  notes?: string;
  markedAt: Date;
  markedBy: string; // User ID who marked the attendance
  isManualEntry: boolean;
}

export interface AvailabilityRecord {
  id: string;
  studentId: string;
  date: Date;
  status: AvailabilityStatus;
  timeSlots: TimeSlot[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSummary {
  studentId: string;
  month: number;
  year: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendanceRate: number;
}

export interface DailyAttendanceOverview {
  date: Date;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateStudents: number;
  attendanceRate: number;
  students: {
    id: string;
    name: string;
    status: AttendanceStatus;
    timeSlots: TimeSlot[];
  }[];
}