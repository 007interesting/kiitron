// BLOCKS https://b.sentry.testnet.kiivalidator.com/cosmos/base/tendermint/v1beta1/blocks/1499274
// TRANSACTIONS https://kii.backend.kiivalidator.com/transactions

import React, { createContext, useContext, useEffect, useState } from "react"

import axios from "axios"

interface IMonitoringContext {
  transactions: Transaction[]
  blocks: Block[]
}

type IMonitoringProvider = IProvider

const defaultValues: IMonitoringContext = {
  transactions: [],
  blocks: [],
}

const MonitoringContext = createContext<IMonitoringContext>(defaultValues)

const MonitoringProvider: React.FC<IMonitoringProvider> = ({ children }) => {
  // States
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])

  // Effects
  // Poll transactions x 60 seconds
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<{
          success: boolean
          errorMessage?: string
          transactions: Transaction[]
          quantity: number
          page: number
        }>("https://kii.backend.kiivalidator.com/transactions")
        setTransactions(response.data.transactions)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()

    const interval = setInterval(fetchTransactions, 60_000)
    return () => clearInterval(interval)
  }, [])

  // Poll blocks x 60 seconds
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get<{
          success: boolean
          errorMessage?: string
          blocks: Block[]
          quantity: number
          page: number
        }>("https://b.sentry.testnet.kiivalidator.com/cosmos/base/tendermint/v1beta1/blocks")
        setBlocks(response.data.blocks)
      } catch (error) {
        console.error("Error fetching blocks:", error)
      }
    }

    fetchBlocks()
    const interval = setInterval(fetchBlocks, 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <MonitoringContext.Provider
      value={{
        transactions,
        blocks,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  )
}

const useMonitoring = () => {
  const context = useContext(MonitoringContext)

  if (!context) {
    throw new Error(`useMonitoring must be used within a MonitoringProvider`)
  }

  return context
}

export { MonitoringProvider, useMonitoring }

// Transaction
interface Transaction {
  transaction: {
    type: `0x${string}`
    chainId: "0x75bc371"
    nonce: `0x${string}`
    to: `0x${string}`
    gas: `0x${string}`
    gasPrice: `0x${string}`
    maxPriorityFeePerGas: `0x${string}`
    maxFeePerGas: `0x${string}`
    value: `0x${string}`
    input: `0x${string}`
    accessList: []
    v: `0x${string}`
    r: `0x${string}`
    s: `0x${string}`
    yParity: `0x${string}`
    hash: `0x${string}`
  }
  sender: `0x${string}`
  success: boolean
  timestamp: number
  BlockNumber: number
}

// Block
interface Block {
  block_id: {
    hash: string
    part_set_header: {
      total: number
      hash: string
    }
  }
  block: {
    header: {
      version: {
        block: string
        app: string
      }
      chain_id: string
      height: string
      time: string
      last_block_id: {
        hash: string
        part_set_header: {
          total: number
          hash: string
        }
      }
      last_commit_hash: string
      data_hash: string
      validators_hash: string
      next_validators_hash: string
      consensus_hash: string
      app_hash: string
      last_results_hash: string
      evidence_hash: string
      proposer_address: string
    }
    data: {
      txs: string[]
    }
    last_commit: {
      height: string
      round: number
      block_id: {
        hash: string
        part_set_header: {
          total: number
          hash: string
        }
      }
      signatures: Array<{
        block_id_flag: string
        validator_address: string
        timestamp: string
        signature: string
      }>
    }
  }
}
