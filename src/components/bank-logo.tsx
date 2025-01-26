import dynamic from 'next/dynamic'
import React from 'react'

const Circle = dynamic(() => import('lucide-react').then((mod) => mod.Circle))

interface BankLogoProps {
  chain: string;
  className?: string;
}

export default function BankLogo({ chain, className = "w-12 h-12" }: BankLogoProps) {
  const getColor = (chain: string) => {
    switch (chain.toLowerCase()) {
      case 'ethereum':
        return 'text-blue-500'
      case 'polygon':
        return 'text-purple-500'
      case 'arbitrum':
        return 'text-blue-700'
      case 'optimism':
        return 'text-red-500'
      case 'avalanche':
        return 'text-red-600'
      case 'binance smart chain':
        return 'text-yellow-500'
      case 'fantom':
        return 'text-blue-400'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <Circle className={`${className} ${getColor(chain)}`} />
  )
}

