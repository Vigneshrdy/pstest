'use client'

import { useState } from 'react'
import { 
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  HandRaisedIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
  CurrencyRupeeIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

import ProfileHeader from '../../components/ProfileHeader'
import AccountSummary from '../../components/AccountSummary'
import QuickActionsGrid from '../../components/QuickActionsGrid'
import QuickLinksGrid from '../../components/QuickLinksGrid'
import SidebarNavigation from '../../components/SidebarNavigation'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard')

  // Sample account data
  const accounts = [
    { 
      type: 'Savings', 
      amount: '₹25,430.50', 
      count: 1, 
      icon: BanknotesIcon 
    },
    { 
      type: 'OD/ CC', 
      amount: '₹0.00', 
      count: 0, 
      icon: CreditCardIcon 
    },
    { 
      type: 'Deposits', 
      amount: '₹1,50,000.00', 
      count: 0, 
      icon: BuildingLibraryIcon 
    },
    { 
      type: 'Loans', 
      amount: '₹0.00', 
      count: 0, 
      icon: HandRaisedIcon 
    }
  ]

  // Quick actions data
  const quickActions = [
    { icon: DevicePhoneMobileIcon, label: 'UPI' },
    { icon: GiftIcon, label: 'Rewards' },
    { icon: DocumentTextIcon, label: 'Open e-Term...' },
    { icon: DocumentTextIcon, label: 'Open OD Against...' },
    { icon: DocumentTextIcon, label: 'Bill Payment...' },
    { icon: UserGroupIcon, label: 'Block all Digital...' },
    { icon: ChartBarIcon, label: 'Wealth Mgmt -...' },
    { icon: PlusIcon, label: 'Apply New Loan' },
    { icon: CreditCardIcon, label: 'Debit Card' },
    { icon: CreditCardIcon, label: 'Credit Card' },
    { icon: ChartBarIcon, label: 'Quick SIP' },
    { icon: DevicePhoneMobileIcon, label: 'Travel Liest...' }
  ]

  // Bottom navigation actions
  const bottomActions = [
    { icon: UserIcon, label: 'Easy Pay' },
    { icon: CurrencyRupeeIcon, label: 'Recharge' },
    { icon: DocumentTextIcon, label: 'Manage Limits' },
    { icon: UserGroupIcon, label: 'Manage Payee' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-yellow-400 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="text-white font-bold">
              <span className="text-sm">eBanking</span>
              <span className="ml-2 text-yellow-300">🏛️</span>
              <span className="ml-1 text-sm">Indian Bank</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-lg">AA</span>
            </button>
            <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
              <BellIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setProfileModalOpen(true)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-3xl w-80 max-w-sm mx-4 overflow-hidden">
            <ProfileHeader 
              name="Mahanti Anusha"
              lastLogin="11 Nov 2025 10:58:35 AM"
              onClose={() => setProfileModalOpen(false)}
            />
            <div className="p-4 bg-bank-700 text-white space-y-2">
              {[
                'All Accounts', 'Transfers', 'Bill Payments', 'Forex Remittance',
                'Deposits', 'Cardless Cash Withdrawal', 'Loans', 'Investments', 'Cards'
              ].map((item, index) => (
                <button 
                  key={index}
                  className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account Summary */}
      <AccountSummary accounts={accounts} />

      {/* Account Actions */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: DocumentTextIcon, label: 'Account Details' },
            { icon: DocumentTextIcon, label: 'Account Statement' },
            { icon: DocumentTextIcon, label: 'm-Passbook' },
            { icon: CurrencyRupeeIcon, label: 'Fund Transfers' }
          ].map((action, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-4 rounded-xl shadow-sm mb-2">
                <action.icon className="w-8 h-8 text-gray-400 mx-auto" />
              </div>
              <span className="text-xs text-gray-600">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsGrid actions={quickActions} />

      {/* Quick Links */}
      <QuickLinksGrid />

      {/* Instant Transfer Section */}
      <div className="p-4 bg-white mx-4 rounded-xl shadow-sm mb-4">
        <h3 className="text-lg font-semibold mb-4">Instant Transfer</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">From Account *</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
              <option>Please Select</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Choose Payee *</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
              <option>Please Select</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount *</label>
            <div className="flex">
              <input 
                type="number" 
                placeholder="0.0"
                className="flex-1 p-3 border border-gray-300 rounded-l-lg"
              />
              <button className="bg-gray-300 px-6 py-3 rounded-r-lg font-medium">
                PAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-blue-600 p-4">
        <div className="grid grid-cols-4 gap-4">
          {bottomActions.map((action, index) => (
            <button key={index} className="text-center">
              <div className="bg-yellow-500 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <SidebarNavigation 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />
    </div>
  )
}
