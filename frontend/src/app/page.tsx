import Link from 'next/link'
import { ArrowRightIcon, ShieldCheckIcon, BoltIcon, CreditCardIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  const features = [
    {
      name: 'Real-Time Transactions',
      description: 'Process transactions instantly with our event-driven architecture powered by RabbitMQ.',
      icon: BoltIcon,
    },
    {
      name: 'Secure Banking',
      description: 'Bank-grade security with JWT authentication, encryption, and fraud detection.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Digital Payments',
      description: 'Send money, pay bills, and manage your finances seamlessly.',
      icon: CreditCardIcon,
    },
    {
      name: 'Advanced Analytics',
      description: 'Get insights into your spending patterns with Elasticsearch-powered analytics.',
      icon: ChartBarIcon,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="navbar px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <CreditCardIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BankFlow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/auth/login" className="btn-outline">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Real-Time Banking
              <span className="block text-primary-600">Architecture</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Experience the future of banking with our event-driven platform. 
              Process transactions instantly, manage accounts securely, and get real-time insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
                Open Account
              </Link>
              <Link href="/demo" className="group inline-flex items-center gap-2 text-lg font-semibold leading-6 text-gray-900">
                View Demo
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-200 to-secondary-200 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Advanced Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for modern banking
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Built with cutting-edge technology stack including Node.js, MongoDB, RabbitMQ, and Elasticsearch.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built with Modern Technology
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform leverages industry-leading technologies for performance, security, and scalability.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {['Next.js', 'Node.js', 'MongoDB', 'RabbitMQ', 'Elasticsearch', 'Redis'].map((tech) => (
              <div key={tech} className="card text-center">
                <p className="text-sm font-medium text-gray-900">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              Join thousands of users who trust our platform for their banking needs.
            </p>
            <div className="mt-10">
              <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BankFlow</span>
            </div>
            <p className="text-gray-400">
              © 2025 Real-Time Banking Architecture. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}