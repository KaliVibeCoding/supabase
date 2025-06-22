import { useState } from 'react'
import { Button } from 'ui'
import { IconDatabase, IconPlus, IconRefreshCw } from 'ui'

interface CustomDatabaseDashboardProps {
  projectRef: string
}

export const CustomDatabaseDashboard = ({ projectRef }: CustomDatabaseDashboardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalTables: 0,
    totalRows: 0,
    totalSchemas: 0,
    lastUpdated: new Date().toISOString()
  })

  const refreshStats = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalTables: Math.floor(Math.random() * 50) + 10,
        totalRows: Math.floor(Math.random() * 10000) + 1000,
        totalSchemas: Math.floor(Math.random() * 10) + 3,
        lastUpdated: new Date().toISOString()
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Custom Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Custom Database Dashboard</h1>
            <p className="text-green-100">
              Enhanced database management interface for project: {projectRef}
            </p>
          </div>
          <IconDatabase className="h-12 w-12 text-green-100" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tables</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTables}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <IconDatabase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rows</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRows.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <IconPlus className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Schemas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSchemas}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <IconDatabase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          <Button
            type="default"
            icon={<IconRefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={refreshStats}
            loading={isLoading}
          >
            Refresh Stats
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button type="primary" className="w-full">
            Create New Table
          </Button>
          <Button type="default" className="w-full">
            Run Migration
          </Button>
          <Button type="default" className="w-full">
            Backup Database
          </Button>
          <Button type="default" className="w-full">
            View Logs
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Migration applied</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">20250622042500_custom_app_schema.sql</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Table created</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">app.user_profiles</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Policy created</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">RLS enabled for app.posts</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">10 minutes ago</span>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date(stats.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default CustomDatabaseDashboard
