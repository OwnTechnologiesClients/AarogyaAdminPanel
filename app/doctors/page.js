"use client"

import { Layout } from "@/components/layout"
import { 
  LineChart, 
  Line, 
  Area, 
  AreaChart, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function DoctorsDashboard() {
  // Sample data for appointments chart
  const appointmentsData = [
    { month: 'Jan', appointments: 2.5 },
    { month: 'Feb', appointments: 3.2 },
    { month: 'Mar', appointments: 2.8 },
    { month: 'Apr', appointments: 4.1 },
    { month: 'May', appointments: 3.9 },
    { month: 'Jun', appointments: 5.2 },
    { month: 'Jul', appointments: 4.8 },
    { month: 'Aug', appointments: 6.1 },
    { month: 'Sep', appointments: 5.7 },
    { month: 'Oct', appointments: 7.2 },
    { month: 'Nov', appointments: 6.8 },
    { month: 'Dec', appointments: 7.5 },
  ]

  // Sample data for patient chart
  const patientData = [
    { month: 'Jan', newPatients: 23, returnPatients: 12 },
    { month: 'Feb', newPatients: 42, returnPatients: 42 },
    { month: 'Mar', newPatients: 35, returnPatients: 28 },
    { month: 'Apr', newPatients: 58, returnPatients: 35 },
    { month: 'May', newPatients: 45, returnPatients: 43 },
    { month: 'Jun', newPatients: 22, returnPatients: 38 },
    { month: 'Jul', newPatients: 67, returnPatients: 25 },
    { month: 'Aug', newPatients: 78, returnPatients: 31 },
    { month: 'Sep', newPatients: 89, returnPatients: 45 },
    { month: 'Oct', newPatients: 92, returnPatients: 52 },
    { month: 'Nov', newPatients: 12, returnPatients: 48 },
    { month: 'Dec', newPatients: 105, returnPatients: 16 },
  ]

  // Sample data for income chart
  const incomeData = [
    { category: 'Q1', appointments: 3, surgeries: 2 },
    { category: 'Q2', appointments: 4, surgeries: 3 },
    { category: 'Q3', appointments: 2, surgeries: 4 },
    { category: 'Q4', appointments: 5, surgeries: 1 },
    { category: 'Q5', appointments: 3, surgeries: 3 },
  ]

  // Sample data for patient demographics
  const demographicsData = [
    { name: 'Male', value: 65, color: '#3B82F6' },
    { name: 'Female', value: 25, color: '#F59E0B' },
    { name: 'Kids', value: 10, color: '#EF4444' },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors Dashboard</h1>
          <p className="text-gray-600">Manage doctors and their information</p>
        </div>

        {/* Top Row - Doctor Profile Card and Activity Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Profile Card */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Dr. Demetrius Wright</h2>
                <p className="text-blue-100 mb-4">Gynecologist, MS, MD, MBBS</p>
                <p className="text-blue-100 mb-4">You Have Total 1000+ Appointments This Month</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Book Appointment
                </button>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="space-y-4">
            <div className="bg-purple-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-800">800+</p>
                  <p className="text-sm text-purple-800 font-medium">New Member</p>
                  <p className="text-xs text-purple-700">(10.32%) Up from past week</p>
                </div>
                <div className="text-purple-700">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-800">300+</p>
                  <p className="text-sm text-yellow-800 font-medium">Regular Patient</p>
                  <p className="text-xs text-yellow-700">(08.10%) Up from past week</p>
                </div>
                <div className="text-yellow-700">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
                <p className="text-sm text-gray-600">33% higher than last year</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={appointmentsData}>
                  <defs>
                    <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    fill="url(#appointmentsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patient</h3>
                <p className="text-sm text-gray-600">30% higher than last year</p>
              </div>
              <div className="flex space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700 font-medium">New Patients</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700 font-medium">Return Patients</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="newPatients" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="returnPatients" stroke="#10B981" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row - Reviews, Demographics, and Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Reviews */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Reviews</h3>
            <div className="space-y-4">
              {[
                { 
                  name: "Trisha Norfleet", 
                  review: "I had a very good experience here. I got a best psychiatrist and a therapist. They analysed my case very deeply", 
                  avatar: "TN",
                  rating: 4
                },
                { 
                  name: "Carla Remington", 
                  review: "She is very supportive and suggest well. Good surgeon known past 10 years my mother was renal transplant patient", 
                  avatar: "CR",
                  rating: 5
                },
                { 
                  name: "Dreama Weigel", 
                  review: "One of the finest doctor's I ever met. A very good human being more than a doctor.", 
                  avatar: "DW",
                  rating: 5
                },
              ].map((review, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">{review.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-700 mt-1">{review.review}</p>
                    <div className="flex text-yellow-500 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Demographics */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patients Type</h3>
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
                          <div className="space-y-2">
                {demographicsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{item.value}%</span>
                  </div>
                ))}
              </div>
          </div>

          {/* Awards */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Awards</h3>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">108</div>
              <p className="text-sm text-gray-700 font-medium">Awards received in 2025</p>
            </div>
          </div>
        </div>

        {/* Additional Row - Income Chart and Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Income</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="appointments" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="surgeries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-gray-700 font-medium">Appointments</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-gray-700 font-medium">Surgeries</span>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {[
                { name: "John Smith", message: "To request an urgent appointment due to illness. I hope this message finds you well I am reaching out", avatar: "JS" },
                { name: "Maria Garcia", message: "To request an urgent appointment due to illness. I hope this message finds you well I am reaching out", avatar: "MG" },
              ].map((appointment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-700">{appointment.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">{appointment.name}</h4>
                      <p className="text-sm text-gray-700 mt-1">{appointment.message}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium">
                      Accept
                    </button>
                    <button className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors font-medium">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Pharmacists", value: "3804", icon: "💊", bgColor: "bg-green-100", change: "-40%" },
              { title: "Operations", value: "100", icon: "🔗", bgColor: "bg-orange-100", change: "-20%" },
              { title: "Earnings", value: "20k", icon: "💰", bgColor: "bg-pink-100", change: "-10%" },
              { title: "Total Staffs", value: "80+", icon: "👥", bgColor: "bg-blue-100", change: "-30%" },
            ].map((stat, index) => (
              <div key={index} className={`${stat.bgColor} p-4 rounded-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-700 font-medium">{stat.title}</p>
                  </div>
                  <div className="text-red-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-red-700 font-medium mt-2">({stat.change}) vs last month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
} 