import {
  BookmarkIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BanknotesIcon,
  DocumentIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  LockClosedIcon,
  MapIcon,
  PlusIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'

interface QuickLink {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
}

const quickLinks: QuickLink[] = [
  { icon: BookmarkIcon, label: 'National Savings...' },
  { icon: DocumentTextIcon, label: 'Kisan Vikas Patra (KVP)' },
  { icon: CurrencyDollarIcon, label: 'Report Fraud' },
  { icon: DocumentIcon, label: 'Senior Citizens...' },
  { icon: DocumentChartBarIcon, label: 'Expenses' },
  { icon: UserGroupIcon, label: 'Nominee' },
  { icon: BanknotesIcon, label: 'Cash Withdraw...' },
  { icon: CreditCardIcon, label: 'Public Provident...' },
  { icon: LockClosedIcon, label: 'Transaction Lock &...' },
  { icon: DocumentTextIcon, label: 'Pay to Contact' },
  { icon: ClipboardDocumentCheckIcon, label: 'Apply IPO' },
  { icon: MapIcon, label: 'View Site Map' }
]

export default function QuickLinksGrid() {
  return (
    <div className="p-4">
      <h3 className="text-gray-600 text-sm font-medium mb-4">Quick Links</h3>
      <div className="grid grid-cols-4 gap-3">
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={link.onClick}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <link.icon className="w-6 h-6 text-bank-600 mb-2" />
            <span className="text-xs text-gray-700 text-center font-medium leading-tight">
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}