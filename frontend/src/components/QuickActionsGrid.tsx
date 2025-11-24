interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
  className?: string
}

function QuickAction({ icon: Icon, label, onClick, className = "" }: QuickActionProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <Icon className="w-8 h-8 text-bank-600 mb-2" />
      <span className="text-xs text-gray-700 text-center font-medium leading-tight">
        {label}
      </span>
    </button>
  )
}

interface QuickActionsGridProps {
  actions: Array<{
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick?: () => void
    className?: string
  }>
}

export default function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return (
    <div className="p-4">
      <h3 className="text-gray-600 text-sm font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <QuickAction
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
            className={action.className}
          />
        ))}
      </div>
    </div>
  )
}