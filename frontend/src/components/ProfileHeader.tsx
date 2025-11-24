import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ProfileHeaderProps {
  name: string
  lastLogin: string
  onClose?: () => void
}

export default function ProfileHeader({ name, lastLogin, onClose }: ProfileHeaderProps) {
  return (
    <div className="bg-bank-700 p-6 rounded-t-3xl relative">
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
        
        <button className="mt-4 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
          Dashboard
        </button>
      </div>
    </div>
  )
}