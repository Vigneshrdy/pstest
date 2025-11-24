import { 
  HomeIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  StarIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  PowerIcon
} from '@heroicons/react/24/outline'

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

const menuItems: SidebarMenuItem[] = [
  { icon: HomeIcon, label: 'Dashboard' },
  { icon: CreditCardIcon, label: 'All Accounts' },
  { icon: ArrowsRightLeftIcon, label: 'Transfers' },
  { icon: DocumentTextIcon, label: 'Bill Payments' },
  { icon: CurrencyDollarIcon, label: 'Forex Remittance' },
  { icon: BanknotesIcon, label: 'Deposits' },
  { icon: DocumentTextIcon, label: 'Cardless Cash Withdrawal' },
  { icon: BuildingLibraryIcon, label: 'Loans' },
  { icon: CreditCardIcon, label: 'Investments' },
  { icon: CreditCardIcon, label: 'Cards' },
  { icon: ShieldCheckIcon, label: 'Service Request' },
  { icon: DocumentTextIcon, label: 'Help / Raise Support Ticket' },
  { icon: StarIcon, label: 'Spend Analyser' },
  { icon: ShieldCheckIcon, label: 'Social Security Schemes' },
  { icon: DocumentTextIcon, label: 'Settings' },
  { icon: BanknotesIcon, label: 'Government Savings Scheme' },
  { icon: StarIcon, label: 'Rate Us Now' },
  { icon: VideoCameraIcon, label: 'Help/ Demo Videos' },
  { icon: ChatBubbleLeftRightIcon, label: 'Communication' },
  { icon: PowerIcon, label: 'Logout' }
]

export default function SidebarNavigation({ isOpen, onClose, activeItem, onItemClick }: SidebarNavigationProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-80 bg-bank-700 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-6">
          <div className="space-y-2">
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