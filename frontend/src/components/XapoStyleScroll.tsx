'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ScrollSection {
  id: number;
  leftCategory: string;
  leftTitle: string;
  leftDescription: string;
  leftButton: string;
  rightTitle: string;
  rightDescription: string;
  phoneImage: string;
  phoneContent: {
    title: string;
    subtitle?: string;
    mainValue?: string;
    items?: Array<{
      label: string;
      value: string;
      subValue?: string;
    }>;
    buttons?: string[];
  };
}

const XapoStyleScroll = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections: ScrollSection[] = [
    {
      id: 0,
      leftCategory: "EFFORTLESS TRANSACTIONS",
      leftTitle: "BUY, SEND, AND SPEND, LIGHTNING FAST.",
      leftDescription: "Send money instantly across the globe with competitive exchange rates and minimal fees.",
      leftButton: "Learn more",
      rightTitle: "Move your money your way – quickly and securely",
      rightDescription: "Send and spend in Bitcoin, USDC, and USDT stablecoins, or other traditional currencies—all in one app. No FX fees, just fast and secure payments anywhere you go.",
      phoneImage: "/1.jpeg",
      phoneContent: {
        title: "Send",
        subtitle: "Amount you would like to send",
        mainValue: "$ GBP 1,000",
        items: [
          { label: "From USD Account", value: "Use all USD 11,335.00" },
          { label: "Fee", value: "GBP 0.15" },
          { label: "Exchange rate", value: "GBP 1.00 = USD 1.2452" },
          { label: "Total converted", value: "≈ USD 1,245.38" }
        ],
        buttons: ["Continue"]
      }
    },
    {
      id: 1,
      leftCategory: "EARN BITCOIN",
      leftTitle: "EARN INTEREST ON YOUR BITCOIN, PAID EVERY DAY",
      leftDescription: "Watch your wealth grow with competitive interest rates on your crypto holdings.",
      leftButton: "Grow your savings",
      rightTitle: "Grow your wealth every day",
      rightDescription: "Earn 0.5% interest on your BTC holdings and 3.6% on your USD, paid out daily in Bitcoin. Watch your wealth grow in real time.",
      phoneImage: "/2.jpeg",
      phoneContent: {
        title: "Total earned",
        mainValue: "BTC 37,283,091",
        subtitle: "≈ USD 1586.57",
        items: [
          { label: "USD Interest", value: "BTC 2,380,101", subValue: "≈ USD 1652.01" },
          { label: "BTC Interest", value: "BTC 127,456", subValue: "≈ USD 88.67" },
          { label: "Referrals", value: "BTC 130,444", subValue: "≈ USD 90.56" },
          { label: "Cashback", value: "BTC 24,567", subValue: "≈ USD 17.67" }
        ]
      }
    },
    {
      id: 2,
      leftCategory: "SPEND WITH NYORD",
      leftTitle: "YOUR GLOBAL DEBIT CARD",
      leftDescription: "Spend your crypto and fiat currencies anywhere in the world with our premium debit card.",
      leftButton: "Learn more",
      rightTitle: "Earn cashback. No FX fees.",
      rightDescription: "Spend freely with your Nyord debit card wherever you are, with no FX fees and 1% cashback on qualifying purchases.",
      phoneImage: "/3.jpeg",
      phoneContent: {
        title: "Latest transactions",
        items: [
          { label: "AEGEAN AIRLINES TICKETS", value: "-USD 650.00", subValue: "07/03/2025, 10:19" },
          { label: "HEATHROW EXPRESS RAIL", value: "-USD 40.00", subValue: "07/03/2025, 10:16" },
          { label: "DELTA AIRLINES UPGRADE", value: "-USD 99.00", subValue: "07/03/2025, 10:10" },
          { label: "HERTZ CAR RENTAL", value: "-USD 60.00", subValue: "07/03/2025, 10:05" }
        ],
        buttons: ["View all"]
      }
    },
    {
      id: 3,
      leftCategory: "INVEST WITH EASE",
      leftTitle: "YOUR WHOLE INVESTMENT PORTFOLIO, IN ONE PLACE",
      leftDescription: "Diversify your portfolio with stocks, crypto, and traditional assets all in one secure platform.",
      leftButton: "Start investing",
      rightTitle: "Build your financial future",
      rightDescription: "Access global markets, trade cryptocurrencies, and manage your entire investment portfolio with institutional-grade security and competitive fees.",
      phoneImage: "/xavier.jpg",
      phoneContent: {
        title: "Portfolio Overview",
        mainValue: "$125,847.32",
        subtitle: "+$2,847.12 (+2.31%) today",
        items: [
          { label: "Bitcoin", value: "$45,230.12", subValue: "+5.2%" },
          { label: "Ethereum", value: "$28,945.67", subValue: "+3.1%" },
          { label: "US Stocks", value: "$35,671.23", subValue: "+1.8%" },
          { label: "Cash", value: "$16,000.30", subValue: "0.0%" }
        ]
      }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrolled = window.scrollY - containerTop;
      const progress = scrolled / (containerHeight - window.innerHeight);
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
      
      // Calculate which section should be active with smoother transitions
      const sectionProgress = progress * (sections.length - 1);
      const newSection = Math.max(0, Math.min(sections.length - 1, Math.floor(sectionProgress + 0.3)));
      setCurrentSection(newSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const currentData = sections[currentSection];

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black text-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-6"
            key={currentData.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="text-sm text-orange-400 font-medium tracking-wider">
              {currentData.leftCategory}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              {currentData.leftTitle}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentData.leftDescription}
            </p>
            <button className="inline-flex items-center text-white border-b-2 border-white pb-1 hover:border-orange-400 transition-colors">
              {currentData.leftButton}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Navigation Menu with Separators */}
            <div className="space-y-4 pt-8">
              {sections.map((section, index) => (
                <div key={section.id}>
                  <div 
                    className={`text-sm cursor-pointer transition-all duration-700 ${
                      index === currentSection ? 'text-white font-semibold' : 'text-gray-500'
                    }`}
                    onClick={() => setCurrentSection(index)}
                  >
                    {section.leftCategory}
                  </div>
                  {index < sections.length - 1 && (
                    <div className="w-full h-px bg-gray-700 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center Phone Mockup */}
          <motion.div 
            className="flex justify-center"
            key={`phone-${currentData.id}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  
                  {/* Phone Screen Content */}
                  <div className="absolute inset-4 text-white">
                    
                    {/* Status Bar */}
                    <div className="flex justify-end items-center mb-6 text-xs">
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold">{currentData.phoneContent.title}</h3>
                      
                      {currentData.phoneContent.subtitle && (
                        <p className="text-gray-400 text-sm">{currentData.phoneContent.subtitle}</p>
                      )}
                      
                      {currentData.phoneContent.mainValue && (
                        <div className="text-3xl font-bold">{currentData.phoneContent.mainValue}</div>
                      )}

                      {currentData.phoneContent.items && (
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.0, delay: 0.2 }}
                        >
                          {currentData.phoneContent.items.map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="flex justify-between items-center py-3 border-b border-gray-800"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                              <div>
                                <div className="font-medium text-sm">{item.label}</div>
                                {item.subValue && (
                                  <div className="text-xs text-gray-400 mt-1">{item.subValue}</div>
                                )}
                              </div>
                              <div className="font-semibold text-sm">{item.value}</div>
                            </motion.div>
                          ))}
                          
                          {/* Add horizontal separator after items */}
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>
                        </motion.div>
                      )}

                      {currentData.phoneContent.buttons && (
                        <div className="space-y-3 pt-4">
                          {currentData.phoneContent.buttons.map((button, index) => (
                            <button 
                              key={index}
                              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-colors"
                            >
                              {button}
                            </button>
                          ))}
                        </div>
                      )}

                      {currentData.id === 2 && (
                        <div className="mt-6">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 mb-4">
                            <div className="text-xs text-orange-100 mb-1">NYORD BANK</div>
                            <div className="text-xs text-orange-100 mb-8">debit</div>
                            <div className="text-sm text-orange-100">virtual</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <button className="bg-orange-600 text-white py-2 rounded-lg text-xs">Details</button>
                            <button className="bg-gray-700 text-white py-2 rounded-lg text-xs">Freeze</button>
                            <button className="bg-gray-700 text-white py-2 rounded-lg text-xs">Settings</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="space-y-6"
            key={`right-${currentData.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
              {currentData.rightTitle}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentData.rightDescription}
            </p>
          </motion.div>

        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-700 ${
                  index === currentSection ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Background Elements with left/right separators */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          {/* Left side separator lines */}
          <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-white/20 via-white/40 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-white/15 via-white/30 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-1/5 h-px bg-gradient-to-r from-white/10 via-white/25 to-transparent"></div>
          
          {/* Right side separator lines */}
          <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-l from-white/20 via-white/40 to-transparent"></div>
          <div className="absolute top-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-white/15 via-white/30 to-transparent"></div>
          <div className="absolute top-2/3 right-0 w-1/5 h-px bg-gradient-to-l from-white/10 via-white/25 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default XapoStyleScroll;