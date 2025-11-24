// 'use client'

// import { useState } from 'react'
// import { 
//   Bars3Icon,
//   BellIcon,
//   MagnifyingGlassIcon,
//   CreditCardIcon,
//   BanknotesIcon,
//   BuildingLibraryIcon,
//   HandRaisedIcon,
//   DevicePhoneMobileIcon,
//   GiftIcon,
//   DocumentTextIcon,
//   UserGroupIcon,
//   ChartBarIcon,
//   UserIcon,
//   CurrencyRupeeIcon,
//   PlusIcon
// } from '@heroicons/react/24/outline'

// import ProfileHeader from '../../components/ProfileHeader'
// import AccountSummary from '../../components/AccountSummary'
// import QuickActionsGrid from '../../components/QuickActionsGrid'
// import QuickLinksGrid from '../../components/QuickLinksGrid'
// import SidebarNavigation from '../../components/SidebarNavigation'

// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [profileModalOpen, setProfileModalOpen] = useState(false)
//   const [activeMenuItem, setActiveMenuItem] = useState('Dashboard')

//   // Sample account data
//   const accounts = [
//     { 
//       type: 'Savings', 
//       amount: '₹25,430.50', 
//       count: 1, 
//       icon: BanknotesIcon 
//     },
//     { 
//       type: 'OD/ CC', 
//       amount: '₹0.00', 
//       count: 0, 
//       icon: CreditCardIcon 
//     },
//     { 
//       type: 'Deposits', 
//       amount: '₹1,50,000.00', 
//       count: 0, 
//       icon: BuildingLibraryIcon 
//     },
//     { 
//       type: 'Loans', 
//       amount: '₹0.00', 
//       count: 0, 
//       icon: HandRaisedIcon 
//     }
//   ]

//   // Quick actions data
//   const quickActions = [
//     { icon: DevicePhoneMobileIcon, label: 'UPI' },
//     { icon: GiftIcon, label: 'Rewards' },
//     { icon: DocumentTextIcon, label: 'Open e-Term...' },
//     { icon: DocumentTextIcon, label: 'Open OD Against...' },
//     { icon: DocumentTextIcon, label: 'Bill Payment...' },
//     { icon: UserGroupIcon, label: 'Block all Digital...' },
//     { icon: ChartBarIcon, label: 'Wealth Mgmt -...' },
//     { icon: PlusIcon, label: 'Apply New Loan' },
//     { icon: CreditCardIcon, label: 'Debit Card' },
//     { icon: CreditCardIcon, label: 'Credit Card' },
//     { icon: ChartBarIcon, label: 'Quick SIP' },
//     { icon: DevicePhoneMobileIcon, label: 'Travel Liest...' }
//   ]

//   // Bottom navigation actions
//   const bottomActions = [
//     { icon: UserIcon, label: 'Easy Pay' },
//     { icon: CurrencyRupeeIcon, label: 'Recharge' },
//     { icon: DocumentTextIcon, label: 'Manage Limits' },
//     { icon: UserGroupIcon, label: 'Manage Payee' }
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation Bar */}
//       <div className="bg-gradient-to-r from-yellow-400 to-blue-600 p-4">
//         <div className="flex items-center justify-between">
//           <button 
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
//           >
//             <Bars3Icon className="w-6 h-6" />
//           </button>
          
//           <div className="flex items-center space-x-2">
//             <div className="text-white font-bold">
//               <span className="text-sm">eBanking</span>
//               <span className="ml-2 text-yellow-300">🏛️</span>
//               <span className="ml-1 text-sm">Indian Bank</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
//               <span className="text-lg">AA</span>
//             </button>
//             <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
//               <MagnifyingGlassIcon className="w-5 h-5" />
//             </button>
//             <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
//               <BellIcon className="w-5 h-5" />
//             </button>
//             <button 
//               onClick={() => setProfileModalOpen(true)}
//               className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <UserIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Profile Modal */}
//       {profileModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
//           <div className="bg-white rounded-3xl w-80 max-w-sm mx-4 overflow-hidden">
//             <ProfileHeader 
//               name="Mahanti Anusha"
//               lastLogin="11 Nov 2025 10:58:35 AM"
//               onClose={() => setProfileModalOpen(false)}
//             />
//             <div className="p-4 bg-bank-700 text-white space-y-2">
//               {[
//                 'All Accounts', 'Transfers', 'Bill Payments', 'Forex Remittance',
//                 'Deposits', 'Cardless Cash Withdrawal', 'Loans', 'Investments', 'Cards'
//               ].map((item, index) => (
//                 <button 
//                   key={index}
//                   className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors"
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Account Summary */}
//       <AccountSummary accounts={accounts} />

//       {/* Account Actions */}
//       <div className="px-4 mt-6">
//         <div className="grid grid-cols-4 gap-4">
//           {[
//             { icon: DocumentTextIcon, label: 'Account Details' },
//             { icon: DocumentTextIcon, label: 'Account Statement' },
//             { icon: DocumentTextIcon, label: 'm-Passbook' },
//             { icon: CurrencyRupeeIcon, label: 'Fund Transfers' }
//           ].map((action, index) => (
//             <div key={index} className="text-center">
//               <div className="bg-white p-4 rounded-xl shadow-sm mb-2">
//                 <action.icon className="w-8 h-8 text-gray-400 mx-auto" />
//               </div>
//               <span className="text-xs text-gray-600">{action.label}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <QuickActionsGrid actions={quickActions} />

//       {/* Quick Links */}
//       <QuickLinksGrid />

//       {/* Instant Transfer Section */}
//       <div className="p-4 bg-white mx-4 rounded-xl shadow-sm mb-4">
//         <h3 className="text-lg font-semibold mb-4">Instant Transfer</h3>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">From Account *</label>
//             <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
//               <option>Please Select</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Choose Payee *</label>
//             <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
//               <option>Please Select</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Amount *</label>
//             <div className="flex">
//               <input 
//                 type="number" 
//                 placeholder="0.0"
//                 className="flex-1 p-3 border border-gray-300 rounded-l-lg"
//               />
//               <button className="bg-gray-300 px-6 py-3 rounded-r-lg font-medium">
//                 PAY
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="bg-blue-600 p-4">
//         <div className="grid grid-cols-4 gap-4">
//           {bottomActions.map((action, index) => (
//             <button key={index} className="text-center">
//               <div className="bg-yellow-500 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                 <action.icon className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xs text-white">{action.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Sidebar Navigation */}
//       <SidebarNavigation 
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         activeItem={activeMenuItem}
//         onItemClick={setActiveMenuItem}
//       />
//     </div>
//   )
// }

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
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Profile Header Component
interface ProfileHeaderProps {
  name: string
  lastLogin: string
  onClose?: () => void
}

function ProfileHeader({ name, lastLogin, onClose }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-blue-600 p-6 rounded-t-3xl relative">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      )}
      
      <div className="flex flex-col items-center text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-blue-100 text-sm">Last Login {lastLogin}</p>
        
        <button className="mt-4 bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Dashboard
        </button>
      </div>
    </div>
  )
}

// Account Summary Component
interface AccountSummaryProps {
  accounts: {
    type: string
    amount: string
    count?: number
    icon: React.ComponentType<{ className?: string }>
  }[]
}

function AccountSummary({ accounts }: AccountSummaryProps) {
  const [showBalances, setShowBalances] = useState(false)

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mx-4 -mt-8 relative z-10 shadow-lg">
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
              {showBalances ? account.amount : 'XXXX.XX'}
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
          <button className="p-1 bg-white/20 rounded-full">
            <ChevronLeftIcon className="w-3 h-3 text-white" />
          </button>
          <button className="p-1 bg-white/20 rounded-full">
            <ChevronRightIcon className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Quick Actions Component
interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
}

function QuickAction({ icon: Icon, label, onClick }: QuickActionProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
    >
      <Icon className="w-6 h-6 text-gray-600 mb-2" />
      <span className="text-xs text-gray-700 text-center font-medium leading-tight">
        {label}
      </span>
    </button>
  )
}

// Quick Links Component
interface QuickLink {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
}

function QuickLinksGrid() {
  const quickLinks: QuickLink[] = [
    { icon: DocumentTextIcon, label: 'National Savings...' },
    { icon: DocumentTextIcon, label: 'Kisan Vikas Patra (KVP)' },
    { icon: DocumentTextIcon, label: 'Report Fraud' },
    { icon: UserIcon, label: 'Senior Citizens...' },
    { icon: ChartBarIcon, label: 'Expenses' },
    { icon: UserGroupIcon, label: 'Nominee' },
    { icon: BanknotesIcon, label: 'Cash Withdraw...' },
    { icon: BuildingLibraryIcon, label: 'Public Provident...' },
    { icon: CreditCardIcon, label: 'Transaction Lock &...' },
    { icon: DocumentTextIcon, label: 'Pay to Contact' },
    { icon: PlusIcon, label: 'Apply IPO' },
    { icon: DocumentTextIcon, label: 'View Site Map' }
  ]

  return (
    <div className="p-4 bg-white mx-4 rounded-xl shadow-sm mb-4">
      <h3 className="text-gray-600 text-sm font-medium mb-4">Quick Links</h3>
      <div className="grid grid-cols-4 gap-3">
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={link.onClick}
            className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <link.icon className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs text-gray-700 text-center font-medium leading-tight">
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Sidebar Navigation Component
interface SidebarMenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
  isActive?: boolean
}

interface SidebarNavigationProps {
  isOpen: boolean
  onClose?: () => void
  activeItem?: string
  onItemClick?: (item: string) => void
}

function SidebarNavigation({ isOpen, onClose, activeItem, onItemClick }: SidebarNavigationProps) {
  const menuItems: SidebarMenuItem[] = [
    { icon: DocumentTextIcon, label: 'All Accounts' },
    { icon: DocumentTextIcon, label: 'Transfers' },
    { icon: DocumentTextIcon, label: 'Bill Payments' },
    { icon: CurrencyRupeeIcon, label: 'Forex Remittance' },
    { icon: BuildingLibraryIcon, label: 'Deposits' },
    { icon: DocumentTextIcon, label: 'Cardless Cash Withdrawal' },
    { icon: HandRaisedIcon, label: 'Loans' },
    { icon: ChartBarIcon, label: 'Investments' },
    { icon: CreditCardIcon, label: 'Cards' },
    { icon: DocumentTextIcon, label: 'Service Request' },
    { icon: DocumentTextIcon, label: 'Help / Raise Support Ticket' },
    { icon: ChartBarIcon, label: 'Spend Analyser' },
    { icon: DocumentTextIcon, label: 'Social Security Schemes' },
    { icon: DocumentTextIcon, label: 'Settings' },
    { icon: BuildingLibraryIcon, label: 'Government Savings Scheme' },
    { icon: GiftIcon, label: 'Rate Us Now' },
    { icon: DevicePhoneMobileIcon, label: 'Help/ Demo Videos' },
    { icon: UserGroupIcon, label: 'Communication' },
    { icon: XMarkIcon, label: 'Logout' }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-blue-600 to-blue-800 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-lg">🏛️</span>
              </div>
              <span className="text-xl font-bold text-white">Indian Bank</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  onItemClick?.(item.label)
                  if (item.label === 'Logout') {
                    // Handle logout
                    console.log('Logout clicked')
                  }
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeItem === item.label 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard')

  // Sample account data
  const accounts = [
    { 
      type: 'Savings', 
      amount: 'XXXX.XX', 
      count: 1, 
      icon: BanknotesIcon 
    },
    { 
      type: 'Deposits', 
      amount: 'XXXX.XX', 
      count: 0, 
      icon: BuildingLibraryIcon 
    },
    { 
      type: 'OD/ CC', 
      amount: 'XXXX.XX', 
      count: 0, 
      icon: CreditCardIcon 
    },
    { 
      type: 'Loans', 
      amount: 'XXXX.XX', 
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
    { icon: ChartBarIcon, label: 'Wealth Mgmt ...' },
    { icon: PlusIcon, label: 'Apply New Loan' },
    { icon: CreditCardIcon, label: 'Debit Card' },
    { icon: CreditCardIcon, label: 'Credit Card' },
    { icon: ChartBarIcon, label: 'Quick SIP' },
    { icon: DevicePhoneMobileIcon, label: 'Travel Liest' }
  ]

  // Bottom navigation actions
  const bottomActions = [
    { icon: UserIcon, label: 'Easy Pay' },
    { icon: CurrencyRupeeIcon, label: 'Recharge' },
    { icon: DocumentTextIcon, label: 'Manage Limits' },
    { icon: UserGroupIcon, label: 'Manage Payee' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
              <span className="text-lg font-bold">AA</span>
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
          <div className="bg-white rounded-3xl w-80 max-w-sm mx-4 overflow-hidden shadow-2xl">
            <ProfileHeader 
              name="Mahanti Anusha"
              lastLogin="11 Nov 2025 10:58:35 AM"
              onClose={() => setProfileModalOpen(false)}
            />
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white space-y-0">
              {[
                'All Accounts', 'Transfers', 'Bill Payments', 'Forex Remittance',
                'Deposits', 'Cardless Cash Withdrawal', 'Loans', 'Investments', 'Cards'
              ].map((item, index) => (
                <button 
                  key={index}
                  className="w-full text-left p-4 hover:bg-white/10 transition-colors border-b border-blue-500 last:border-b-0"
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
            { icon: DocumentTextIcon, label: 'Statement' },
            { icon: DocumentTextIcon, label: 'Account\nm-Passbook' },
            { icon: CurrencyRupeeIcon, label: 'Fund\nTransfers' }
          ].map((action, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-3 rounded-xl shadow-sm mb-2 border border-gray-100">
                <action.icon className="w-6 h-6 text-gray-600 mx-auto" />
              </div>
              <span className="text-xs text-gray-600 whitespace-pre-line">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-gray-600 text-sm font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <QuickAction
              key={index}
              icon={action.icon}
              label={action.label}
            />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <QuickLinksGrid />

      {/* Instant Transfer Section */}
      <div className="p-4 bg-white mx-4 rounded-xl shadow-sm mb-4">
        <h3 className="text-lg font-semibold mb-4">Instant Transfer</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">From Account *</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm">
              <option>Please Select</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Choose Payee *</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm">
              <option>Please Select</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount *</label>
            <div className="flex">
              <input 
                type="number" 
                placeholder="0.0"
                className="flex-1 p-3 border border-gray-300 rounded-l-lg text-sm"
              />
              <button className="bg-gray-300 px-6 py-3 rounded-r-lg font-medium text-sm">
                PAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 p-4 border-t border-blue-500">
        <div className="grid grid-cols-4 gap-4">
          {bottomActions.map((action, index) => (
            <button key={index} className="text-center">
              <div className="bg-yellow-500 p-2 rounded-full w-10 h-10 mx-auto mb-1 flex items-center justify-center">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-white font-medium">{action.label}</span>
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