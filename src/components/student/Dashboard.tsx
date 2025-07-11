import React from 'react';
import { Calendar, Clock, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Progress } from '@/components/ui/progress';

interface StudentDashboardProps {
  onPageChange: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onPageChange }) => {
  const { user } = useAuth();

  // Mock data - in a real app, this would come from your API
  const attendanceStats = {
    thisMonth: {
      present: 18,
      absent: 2,
      late: 1,
      total: 21,
      rate: 85.7
    },
    thisWeek: {
      present: 4,
      absent: 1,
      late: 0,
      total: 5,
      rate: 80.0
    }
  };

  const recentAttendance = [
    { date: '2024-07-11', status: 'present', time: '09:00 - 16:30' },
    { date: '2024-07-10', status: 'present', time: '09:15 - 16:30' },
    { date: '2024-07-09', status: 'absent', reason: 'Sick' },
    { date: '2024-07-08', status: 'present', time: '09:00 - 16:30' },
    { date: '2024-07-05', status: 'late', time: '10:30 - 16:30' },
  ];

  const upcomingSchedule = [
    { date: '2024-07-12', status: 'available', time: '09:00 - 17:00' },
    { date: '2024-07-15', status: 'available', time: '09:00 - 17:00' },
    { date: '2024-07-16', status: 'unavailable', reason: 'Personal appointment' },
    { date: '2024-07-17', status: 'available', time: '09:00 - 17:00' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'late':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-success bg-success/10';
      case 'absent':
        return 'text-destructive bg-destructive/10';
      case 'late':
        return 'text-warning bg-warning/10';
      case 'available':
        return 'text-success bg-success/10';
      case 'unavailable':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-student to-student/80 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-blue-100 text-lg">
              {user?.class && `${user.class} • `}Student ID: {user?.studentId}
            </p>
            <p className="text-blue-100 mt-2">
              Today is {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="secondary" onClick={() => onPageChange('attendance')}>
              <Clock className="w-5 h-5 mr-2" />
              Mark Attendance
            </Button>
            <Button variant="outline" onClick={() => onPageChange('availability')} className="border-white text-white hover:bg-white hover:text-student">
              <Calendar className="w-5 h-5 mr-2" />
              Set Availability
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-success to-success/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold">{attendanceStats.thisMonth.rate}%</p>
                <p className="text-green-100 text-sm">Attendance Rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Present Days</p>
                <p className="text-3xl font-bold text-success">{attendanceStats.thisMonth.present}</p>
                <p className="text-gray-500 text-sm">This month</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Absent Days</p>
                <p className="text-3xl font-bold text-destructive">{attendanceStats.thisMonth.absent}</p>
                <p className="text-gray-500 text-sm">This month</p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Late Arrivals</p>
                <p className="text-3xl font-bold text-warning">{attendanceStats.thisMonth.late}</p>
                <p className="text-gray-500 text-sm">This month</p>
              </div>
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Attendance */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-student" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Your attendance records for the past week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {record.time || record.reason}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => onPageChange('attendance-history')}
            >
              View Full History
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-student" />
              Upcoming Schedule
            </CardTitle>
            <CardDescription>Your availability for the next few days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSchedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(schedule.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {schedule.time || schedule.reason}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(schedule.status)}`}>
                  {schedule.status}
                </span>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => onPageChange('availability')}
            >
              Manage Availability
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>Your attendance progress for July 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Overall Attendance</span>
                <span className="text-sm font-bold text-student">{attendanceStats.thisMonth.rate}%</span>
              </div>
              <Progress value={attendanceStats.thisMonth.rate} className="h-3" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{attendanceStats.thisMonth.present}</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{attendanceStats.thisMonth.absent}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{attendanceStats.thisMonth.late}</p>
                <p className="text-sm text-gray-600">Late</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};