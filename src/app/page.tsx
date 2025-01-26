'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import NavigationMenu from '@/components/navigation-menu'
import BankLogo from '@/components/bank-logo'
import { toast } from "@/components/ui/use-toast"
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import dynamic from 'next/dynamic'

const PlusCircle = dynamic(() => import('lucide-react').then((mod) => mod.PlusCircle))
const Wallet = dynamic(() => import('lucide-react').then((mod) => mod.Wallet))
const DollarSign = dynamic(() => import('lucide-react').then((mod) => mod.DollarSign))
const Zap = dynamic(() => import('lucide-react').then((mod) => mod.Zap))
const Copy = dynamic(() => import('lucide-react').then((mod) => mod.Copy))

interface VirtualBankAccount {
  id: string;
  vban: string;
  chain: string;
  balance: number;
}

const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', avgTxCost: 0.001 },
  { id: 'polygon', name: 'Polygon', avgTxCost: 0.0001 },
  { id: 'arbitrum', name: 'Arbitrum', avgTxCost: 0.0005 },
  { id: 'optimism', name: 'Optimism', avgTxCost: 0.0003 },
  { id: 'avalanche', name: 'Avalanche', avgTxCost: 0.0002 },
  { id: 'binance', name: 'Binance Smart Chain', avgTxCost: 0.0001 },
  { id: 'fantom', name: 'Fantom', avgTxCost: 0.00005 },
]

export default function OnboardingPage() {
  const [accounts, setAccounts] = useState<VirtualBankAccount[]>([])
  const [selectedChain, setSelectedChain] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openAccount = () => {
    if (selectedChain) {
      const chain = CHAINS.find(c => c.id === selectedChain)!
      const newAccount: VirtualBankAccount = {
        id: Math.random().toString(36).substr(2, 9),
        vban: 'V' + Math.random().toString(36).substr(2, 40),
        chain: chain.name,
        balance: 0
      }
      setAccounts([...accounts, newAccount])
      setSelectedChain(null)
      setIsDialogOpen(false)
    }
  }

  const fundAccount = (accountId: string, amount: number, transactions: number, ethAmount?: number) => {
    setAccounts(accounts.map(account => {
      if (account.id === accountId) {
        const chain = CHAINS.find(c => c.name === account.chain)!
        const ethCost = ethAmount || (transactions * chain.avgTxCost)
        return {
          ...account,
          balance: account.balance + amount - (ethCost * 2000) // Assuming 1 ETH = $2000 for simplicity
        }
      }
      return account
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "The V-IBAN has been copied to your clipboard.",
      })
    }).catch((err) => {
      console.error('Failed to copy: ', err)
      toast({
        title: "Copy failed",
        description: "There was an error copying the V-IBAN. Please try again.",
        variant: "destructive",
      })
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <NavigationMenu />
      <div className="flex-grow flex flex-col justify-center py-12">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Virtual Banking</h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">Experience the future of banking with our virtual accounts. Secure, fast, and borderless.</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="lg" className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white">
                <PlusCircle className="mr-2 h-5 w-5" />
                Open Bank Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Open a New V-Bank Account</DialogTitle>
              </DialogHeader>
              <div className="py-2">
                <Select value={selectedChain || ''} onValueChange={setSelectedChain}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHAINS.map((chain) => (
                      <SelectItem key={chain.id} value={chain.id} className="py-3">
                        <div className="flex items-center space-x-3">
                          <BankLogo chain={chain.name} className="w-6 h-6" />
                          <span>{chain.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button onClick={openAccount} disabled={!selectedChain} className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white">
                  Open Account
                </Button>
              </DialogFooter>
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mt-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Not sure what to pick? <Link href="https://example.com/learn-more" className="underline font-semibold">Learn more</Link>
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 flex justify-center">
          <div className={`grid gap-6 ${
            accounts.length === 1 ? 'grid-cols-1' :
            accounts.length === 2 ? 'grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          } justify-center`}>
            {accounts.map(account => (
              <Card key={account.id} className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <BankLogo chain={account.chain} />
                  <div className="flex-grow">
                    <CardTitle className="text-xl font-bold">{account.chain} V-Bank</CardTitle>
                    <CardDescription className="text-sm flex items-center">
                      V-IBAN: {account.vban}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-2 h-6 w-6"
                              onClick={() => copyToClipboard(account.vban)}
                              aria-label="Copy V-IBAN"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <Wallet className="h-8 w-8 text-blue-500" />
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${account.balance.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white">Fund Account</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Fund Your Account</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const amount = parseFloat(formData.get('amount') as string) || 0
                        const transactions = parseInt(formData.get('transactions') as string) || 0
                        const ethAmount = showAdvanced ? (parseFloat(formData.get('ethAmount') as string) || undefined) : undefined
                        fundAccount(account.id, amount, transactions, ethAmount)
                      }}>
                        <div className="grid gap-6 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="amount" className="text-sm font-medium">Amount ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                              <Input id="amount" name="amount" type="number" step="0.01" min="0" className="pl-10" placeholder="Enter amount" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="transactions" className="text-sm font-medium">Number of Transactions</Label>
                            <div className="relative">
                              <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                              <Input id="transactions" name="transactions" type="number" min="0" className="pl-10" placeholder="Enter number of transactions" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="advanced-mode" className="text-sm font-medium cursor-pointer">Advanced Mode</Label>
                            <Switch id="advanced-mode" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                          </div>
                          {showAdvanced && (
                            <div className="space-y-2">
                              <Label htmlFor="ethAmount" className="text-sm font-medium">ETH Amount</Label>
                              <Input 
                                id="ethAmount" 
                                name="ethAmount" 
                                type="number" 
                                step="0.0001" 
                                min="0" 
                                placeholder="Enter ETH amount"
                                defaultValue={(CHAINS.find(c => c.name === account.chain)?.avgTxCost || 0).toFixed(4)}
                              />
                            </div>
                          )}
                        </div>
                        <DialogFooter className="mt-6">
                          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white">
                            Confirm Transfer
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

