import React, { createContext, useContext, useEffect, useState } from "react"

import axios from "axios"
import { Systeminformation } from "systeminformation"

interface IMonitoringContext {
  transactions: Transaction[]
  blocks: Block[]
  transactionCount: number
  latestBlockHeight: string
  successRate: number
  systemInfo: MonitoringContextProps[]
}

type IMonitoringProvider = IProvider

const defaultValues: IMonitoringContext = {
  transactions: [],
  blocks: [],
  transactionCount: 0,
  latestBlockHeight: "0",
  successRate: 0,
}

const MonitoringContext = createContext<IMonitoringContext>(defaultValues)

const MonitoringProvider: React.FC<IMonitoringProvider> = ({ children }) => {
  // States
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [transactionCount, setTransactionCount] = useState(0)
  const [latestBlockHeight, setLatestBlockHeight] = useState("0")
  const [successRate, setSuccessRate] = useState(0)
  const [systemInfo, setSystemInfo] = useState<MonitoringContextProps[]>([])

  // Effects
  // Poll transactions x 60 seconds
  // Fetch transactions every 60 seconds
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<{
          success: boolean
          transactions: Transaction[]
        }>("https://kii.backend.kiivalidator.com/transactions")
        const fetchedTransactions = response.data.transactions
        setTransactions(fetchedTransactions)

        // Update transaction count and success rate
        setTransactionCount(fetchedTransactions.length)
        const successfulTransactions = fetchedTransactions.filter((tx) => tx.success).length
        setSuccessRate((successfulTransactions / fetchedTransactions.length) * 100)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()
    const interval = setInterval(fetchTransactions, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fetch blocks every 60 seconds
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get<{
          success: boolean
          blocks: Block[]
        }>("https://a.sentry.testnet.kiivalidator.com/cosmos/base/tendermint/v1beta1/blocks/1516450")
        const fetchedBlocks = response.data.blocks
        setBlocks(fetchedBlocks)

        // Update latest block height
        if (fetchedBlocks.length > 0) {
          setLatestBlockHeight(fetchedBlocks[0].block.header.height)
        }
      } catch (error) {
        console.error("Error fetching blocks:", error)
      }
    }

    fetchBlocks()
    const interval = setInterval(fetchBlocks, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fetch system info every 60 seconds
  useEffect(() => {
    const fetchSystemInfo = async () => {
      if (typeof window !== "undefined" && window.ipc) {
        const info = (await window.ipc.invoke("get-system-info", {})) as MonitoringContextProps
        setSystemInfo((prev) => [...prev, info])
        console.log({ info })
      }
    }

    fetchSystemInfo()
    const interval = setInterval(fetchSystemInfo, 60_000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MonitoringContext.Provider
      value={{
        transactions,
        blocks,
        latestBlockHeight,
        transactionCount,
        successRate,
        systemInfo,
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

// System
interface MonitoringContextProps {
  cpu: Systeminformation.CpuData
  mem: Systeminformation.MemData
  disk: Systeminformation.DisksIoData
  network: Systeminformation.NetworkStatsData
  gpu: Systeminformation.GraphicsData
  currentLoad: Systeminformation.CurrentLoadData
  uptime: Systeminformation.TimeData
}
