"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { 
  Plus,
  Check
} from "lucide-react"

// Sample roles data matching the reference image
const rolesData = [
  "Heart Surgery",
  "Doctor",
  "Labrotories",
  "Pharmacist",
  "Accountant",
  "Reciptionist",
  "Nurse"
]

// Sample modules data matching the reference image
const modulesData = [
  "Patients",
  "Appointments",
  "Reports",
  "Projects",
  "Empolyees",
  "Holidays",
  "Leave Request",
  "Events"
]

// Permission types
const permissionTypes = ["Read", "Write", "Create", "Delete", "Import", "Export"]

export default function HospitalRoleAccessPage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [permissions, setPermissions] = useState({})

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  const handlePermissionChange = (module, permission, checked) => {
    setPermissions(prev => ({
      ...prev,
      [`${module}-${permission}`]: checked
    }))
  }

  const isPermissionChecked = (module, permission) => {
    return permissions[`${module}-${permission}`] || false
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Role Access</h1>
            <p className="text-gray-700 text-lg">Manage user roles and access permissions</p>
          </div>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Roles List */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {rolesData.map((role, index) => (
                    <div
                      key={index}
                      onClick={() => handleRoleSelect(role)}
                      className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                        selectedRole === role
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">{role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissions Table */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Permissions</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Module Permission
                          </th>
                          {permissionTypes.map((permission) => (
                            <th key={permission} className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                              {permission}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {modulesData.map((module, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b border-gray-100">
                              {module}
                            </td>
                            {permissionTypes.map((permission) => (
                              <td key={permission} className="px-4 py-3 text-center border-b border-gray-100">
                                <div className="flex justify-center">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isPermissionChecked(module, permission)}
                                      onChange={(e) => handlePermissionChange(module, permission, e.target.checked)}
                                      className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:after:content-[''] peer-checked:after:absolute peer-checked:after:top-0.5 peer-checked:after:left-0.5 peer-checked:after:w-1 peer-checked:after:h-1 peer-checked:after:bg-white peer-checked:after:rounded-sm peer-checked:after:transform peer-checked:after:scale-100 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all">
                                      {isPermissionChecked(module, permission) && (
                                        <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                                      )}
                                    </div>
                                  </label>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </Layout>
  )
} 