'use client'

import Link from 'next/link'
import { useState } from 'react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'
import { 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  CreditCardIcon, 
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  CheckIcon,
  StarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <header className="relative z-50">
        <div className="bg-black border-b border-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-white">Nyord</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    <a href="#" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors">Personal</a>
                    <a href="#" className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Business</a>
                    <a href="#" className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Kids & Teens</a>
                    <a href="#" className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Company</a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                  <Link href="/auth/login" className="text-white hover:text-gray-300 px-4 py-2 text-sm font-medium transition-colors">
                    Log in
                  </Link>
                  <Link href="/auth/register" className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200">
                    Sign up
                  </Link>
                </div>
              </div>
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-2"
                >
                  {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <a href="#" className="block text-gray-400 hover:text-white font-medium">Personal</a>
              <a href="#" className="block text-gray-400 hover:text-white font-medium">Business</a>
              <a href="#" className="block text-gray-400 hover:text-white font-medium">Kids & Teens</a>
              <a href="#" className="block text-gray-400 hover:text-white font-medium">Company</a>
              <Link href="/auth/login" className="block text-gray-400 hover:text-white font-medium">Log in</Link>
              <Link href="/auth/register" className="block bg-white text-black text-center py-3 px-6 rounded-full font-medium">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Scroll to Expand */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/1.jpeg"
        bgImageSrc="/rick.jpg"
        title="Change the way you money"
        scrollToExpand="Scroll to explore →"
        textBlend={true}
      >
        <div className="text-center space-y-8">
          <p className="text-lg leading-8 text-gray-600 sm:text-xl max-w-2xl mx-auto">
            Home or away, local or global — move freely between countries and currencies. Sign up for free, in a tap.
          </p>
          <Link 
            href="/auth/register" 
            className="inline-block bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Download the app
          </Link>
        </div>
      </ScrollExpandMedia>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Join 45+ million customers worldwide
          </h2>
          <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto mb-16">
            Trusted by millions across the globe. Banking that works for you, wherever you are.
          </p>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-center">Bank-grade security keeps your money safe</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <GlobeAltIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global</h3>
              <p className="text-gray-600 text-center">Use your card in 150+ countries</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <BoltIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600 text-center">Instant transfers and payments</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <ClockIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600 text-center">Round-the-clock support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Your salary, reimagined
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spend smartly, send quickly, sort your salary automatically, and watch your savings grow — all with Nyord.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Elevate your spend</h3>
              <p className="text-lg text-gray-600 mb-8">
                Earn points on your purchases with one of our premium cards. Then redeem them for 
                cashback, travel rewards, and exclusive experiences.
              </p>
              <Link 
                href="/auth/register" 
                className="inline-flex items-center gap-2 bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
              >
                Start earning
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <CreditCardIcon className="w-16 h-16 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Premium Card</h4>
              <p className="text-lg opacity-90">Get up to 2% cashback on all purchases and exclusive benefits.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Life, meet savings</h3>
              <p className="text-lg text-gray-600 mb-8">
                Grow your money with up to 4.5% AER interest rate on Savings, 
                paid every day. Set goals and watch your money grow automatically.
              </p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
              >
                Explore Savings
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:order-1 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl p-8 text-white">
              <ChartBarIcon className="w-16 h-16 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Smart Savings</h4>
              <p className="text-lg opacity-90">Automatic round-ups and goal-based savings to build your future.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Your money's safe space</h3>
              <p className="text-lg text-gray-600 mb-8">
                With Nyord Secure, you're entering a new era of money security — where our 
                proactive, purpose-built defenses help protect every account, 24/7.
              </p>
              <Link 
                href="#security" 
                className="inline-flex items-center gap-2 bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
              >
                Learn more
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-red-500 rounded-3xl p-8 text-white">
              <ShieldCheckIcon className="w-16 h-16 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Bank-Grade Security</h4>
              <p className="text-lg opacity-90">Multi-layer protection with real-time fraud monitoring and biometric authentication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Explore 2,500+ stocks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Apple to Tesla, invest in some of the biggest and most influential companies 
              in the world, commission-free within your monthly allowance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stocks & ETFs</h3>
              <p className="text-gray-600 mb-6">Invest in fractional shares of your favorite companies starting from just $1.</p>
              <Link href="/auth/register" className="text-black font-semibold hover:text-gray-700 transition-colors">
                Start investing →
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Crypto Trading</h3>
              <p className="text-gray-600 mb-6">Buy, sell, and hold 80+ cryptocurrencies with industry-leading security.</p>
              <Link href="/auth/register" className="text-black font-semibold hover:text-gray-700 transition-colors">
                Trade crypto →
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Commodities</h3>
              <p className="text-gray-600 mb-6">Diversify your portfolio with precious metals like gold and silver.</p>
              <Link href="/auth/register" className="text-black font-semibold hover:text-gray-700 transition-colors">
                Explore commodities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Choose your plan
            </h2>
            <p className="text-xl text-gray-600">
              From basic banking to premium benefits, we have a plan for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard Plan */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-black transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="text-4xl font-bold text-gray-900">Free</div>
                <p className="text-gray-600 mt-2">For the financial basics</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Global spending with fair exchange rates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Budget and analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Instant notifications</span>
                </li>
              </ul>
              
              <Link 
                href="/auth/register" 
                className="block w-full text-center bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors"
              >
                Get Standard
              </Link>
            </div>

            {/* Plus Plan */}
            <div className="bg-black text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Plus</h3>
                <div className="text-4xl font-bold">$3.99</div>
                <p className="text-gray-300 mt-2">Per month</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Everything in Standard</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Better exchange rates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Cashback rewards</span>
                </li>
              </ul>
              
              <Link 
                href="/auth/register" 
                className="block w-full text-center bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Plus
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-purple-500 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="text-4xl font-bold text-gray-900">$9.99</div>
                <p className="text-gray-600 mt-2">Per month</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Everything in Plus</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Premium card benefits</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Travel insurance</span>
                </li>
              </ul>
              
              <Link 
                href="/auth/register" 
                className="block w-full text-center bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors"
              >
                Get Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Join the 45+ million using Nyord
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Download the app and start your financial journey today. 
            It's free to get started, with premium features available when you need them.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/auth/register" 
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-semibold text-lg px-12 py-4 rounded-full transition-all duration-200 hover:scale-105"
            >
              Download the app
            </Link>
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto border border-gray-600 text-white hover:border-white font-semibold text-lg px-12 py-4 rounded-full transition-colors"
            >
              Try web version
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <DevicePhoneMobileIcon className="w-5 h-5" />
              <span>Available on iOS & Android</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5" />
              <span>150+ countries supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Nyord</span>
              </div>
              <p className="text-gray-600 mb-6">
                Change the way you money. Join millions of customers who trust Nyord for their financial needs.
              </p>
              <div className="flex space-x-4">
                {/* Social links placeholder */}
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-900 font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-900 font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-900 font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Personal Account</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Business Account</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cards</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Savings</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Investments</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Press</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Security</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">System Status</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Developer API</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 sm:mb-0">
              © 2025 Nyord. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}