import { 
  EyeIcon, 
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

interface AccountSummaryProps {
  accounts: {
    type: string
    amount: string
    count?: number
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export default function AccountSummary({ accounts }: AccountSummaryProps) {
  const [showBalances, setShowBalances] = useState(false)

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mx-4 -mt-8 relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Account Summary</h3>
        <button 
          onClick={() => setShowBalances(!showBalances)}
          className="flex items-center text-white text-sm bg-white/20 px-3 py-1 rounded-full"
        >
          {showBalances ? (
            <EyeSlashIcon className="w-4 h-4 mr-1" />
          ) : (
            <EyeIcon className="w-4 h-4 mr-1" />
          )}
          {showBalances ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {accounts.map((account, index) => (
          <div key={index} className="text-white">
            <div className="flex items-center mb-2">
              <account.icon className="w-5 h-5 mr-2 text-gray-300" />
              <span className="text-sm text-gray-300">
                {account.type}
                {account.count !== undefined && `(${account.count})`}
              </span>
            </div>
            <p className="text-lg font-semibold">
              {showBalances ? account.amount : '₹XXXX.XX'}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 bg-white/20 rounded-full">
            <ChevronLeftIcon className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-white/20 rounded-full">
            <ChevronRightIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}