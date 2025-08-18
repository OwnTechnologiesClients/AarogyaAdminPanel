"use client"

import { useState } from 'react'
import { Layout } from "@/components/layout"
import { Briefcase, User } from "lucide-react"
import PersonalDetails from './personal-details'
import ProfileBio from './profile-bio'


export default function AddDoctor() {
  const [activeTab, setActiveTab] = useState('personal-details')

  const tabs = [
    { id: 'personal-details', label: 'Personal Details', icon: Briefcase },
    { id: 'profile-bio', label: 'Profile & Bio', icon: User },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal-details':
        return <PersonalDetails />
      case 'profile-bio':
        return <ProfileBio />
      default:
        return <PersonalDetails />
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center cursor-pointer space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {renderTabContent()}
        </div>
      </div>
    </Layout>
  )
} 