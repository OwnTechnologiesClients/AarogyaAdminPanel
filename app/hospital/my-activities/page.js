"use client"

import { Layout } from "@/components/layout"

// Sample activities data matching the reference image
const activitiesData = [
  {
    id: 1,
    user: {
      name: "Lesley Grauer",
      avatar: "/chatImg/user.png"
    },
    action: "added new task",
    target: "Hospital Administration",
    timestamp: "4 mins ago"
  },
  {
    id: 2,
    user: {
      name: "Jeffery Lalor",
      avatar: "/chatImg/user.png"
    },
    action: "added",
    target: "Loren Gatlin and Tarah Shropshire to project Patient appointment booking",
    timestamp: "6 mins ago"
  },
  {
    id: 3,
    user: {
      name: "Catherine Manseau",
      avatar: "/chatImg/user.png"
    },
    action: "completed task",
    target: "Appointment booking with payment gateway",
    timestamp: "12 mins ago"
  },
  {
    id: 4,
    user: {
      name: "Bernardo Galaviz",
      avatar: "/chatImg/user.png"
    },
    action: "changed the task name",
    target: "Doctor available module",
    timestamp: "1 day ago"
  },
  {
    id: 5,
    user: {
      name: "Mike Litorus",
      avatar: "/chatImg/user.png"
    },
    action: "added new task",
    target: "Patient and Doctor video conferencing",
    timestamp: "2 days ago"
  },
  {
    id: 6,
    user: {
      name: "Jeffery Lalor",
      avatar: "/chatImg/user.png"
    },
    action: "added",
    target: "Jeffrey Warden and Bernardo Galaviz to the task of Private chat module",
    timestamp: "7 days ago"
  },
  {
    id: 7,
    user: {
      name: "Lesley Grauer",
      avatar: "/chatImg/user.png"
    },
    action: "updated patient record",
    target: "John Doe",
    timestamp: "1 week ago"
  },
  {
    id: 8,
    user: {
      name: "Catherine Manseau",
      avatar: "/chatImg/user.png"
    },
    action: "scheduled appointment",
    target: "Dr. Smith - Cardiology",
    timestamp: "1 week ago"
  },
  {
    id: 9,
    user: {
      name: "Bernardo Galaviz",
      avatar: "/chatImg/user.png"
    },
    action: "created new department",
    target: "Emergency Care",
    timestamp: "2 weeks ago"
  },
  {
    id: 10,
    user: {
      name: "Mike Litorus",
      avatar: "/chatImg/user.png"
    },
    action: "assigned doctor",
    target: "Dr. Johnson to Pediatrics",
    timestamp: "2 weeks ago"
  }
]

export default function HospitalMyActivitiesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Activities</h1>
            <p className="text-gray-700 text-lg">View and manage your hospital activities and tasks</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          <div className="p-6">
            <div className="space-y-4">
              {activitiesData.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Blue bullet point */}
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  
                  {/* User avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 flex-shrink-0">
                    <img 
                      src={activity.user.avatar} 
                      alt={activity.user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center hidden">
                      <span className="text-sm font-semibold text-blue-600">
                        {activity.user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Activity content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900">{activity.user.name}</span>
                        <span className="text-sm text-gray-600">{activity.action}</span>
                        <span className="text-sm font-semibold text-blue-700">**{activity.target}**</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

   
      </div>
    </Layout>
  )
} 