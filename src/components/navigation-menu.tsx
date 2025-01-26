import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NavigationMenu() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Virtual Banking
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/learn">
                Learn More
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/docs">
                Docs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

