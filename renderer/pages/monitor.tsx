import React, { useEffect, useState } from "react"

import axios from "axios"
import clsx from "clsx"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { MonitoringProvider, useMonitoring } from "../providers/monitoring"

const data = [
  { name: "17:20", transactions: 6.9, pending: 5000, peers: 51, outgoing: 195, incoming: 72 },
  { name: "17:25", transactions: 11.8, pending: 5100, peers: 48, outgoing: 176, incoming: 71 },
  { name: "17:30", transactions: 4.5, pending: 4800, peers: 49, outgoing: 180, incoming: 73 },
  { name: "17:35", transactions: 8.6, pending: 4900, peers: 50, outgoing: 190, incoming: 70 },
  // More data points as needed
]

const NodeMonitoringPage = () => {
  const [debugMode, setDebugMode] = useState(false);

  return (
    <MonitoringProvider>
      <div className="bg-black text-light-1 min-h-screen p-6 bg-dot-white/[0.2]">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-6">Node Monitoring Dashboard</h1>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-6">
            <CurrentBlock />
            <PeerCount />
            <NetworkInfo />
            <DiskActivity />
          </div>
          <div className="col-span-2 space-y-6">
            <TransactionRate />
            <PendingTransactions />
            <TransactionChart />
            <Peers />
            <CpuInfo />
          </div>
        </div>
        <div className="py-4">
          <DiskInfo />
        </div>
      </div>
    </MonitoringProvider>
  );
}

export default NodeMonitoringPage

const Container: React.FC<{ className?: string } & IChildren> = ({ children, className }) => {
  return (
    <div className={clsx("w-full rounded-lg bg-gray-900 p-6 shadow-md", className)}>
      {children}
    </div>
  )
}

const CurrentBlock = () => {
  return (
    <Container>
      <h2 className="text-lg font-semibold text-light-1">Current Block</h2>
      <div className="text-2xl font-bold text-blue-400">14,207,006</div>
      <div>Last Received Block</div>
      <div className="text-2xl font-bold">14,207,006</div>
    </Container>
  )
}

const PeerCount = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Peer Count</h2>
      <div className="mt-6 text-center text-4xl font-bold text-green-400">51</div>
    </Container>
  )
}

const NetworkTraffic = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Network Traffic (bytes/s)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg">Out</h3>
          <div className="text-2xl font-bold text-yellow-300">160 KiB</div>
        </div>
        <div>
          <h3 className="text-lg">In</h3>
          <div className="text-2xl font-bold text-yellow-300">72 KiB</div>
        </div>
      </div>
    </Container>
  )
}

const DiskActivity = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Disk Activity (bytes/s)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg">Read</h3>
          <div className="text-2xl font-bold text-purple-300">103 MiB</div>
        </div>
        <div>
          <h3 className="text-lg">Write</h3>
          <div className="text-2xl font-bold text-purple-300">52.6 MiB</div>
        </div>
      </div>
    </Container>
  )
}

const TransactionChart: React.FC = () => {
  const { transactions } = useMonitoring()

  return (
    <Container>
      <ResponsiveContainer
        width="100%"
        height={150}
      >
        <LineChart data={transactions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="block.header.height" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="block.header.time"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

const TransactionRate = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Transaction Rate (tx/s)</h2>
      <ResponsiveContainer
        width="100%"
        height={150}
      >
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#FFA500"
          />
          <CartesianGrid stroke="#444444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

const PendingTransactions = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Pending Transactions</h2>
      <ResponsiveContainer
        width="100%"
        height={150}
      >
        <AreaChart data={data}>
          <Area
            type="monotone"
            dataKey="pending"
            stroke="#FFD700"
            fill="#FFD700"
          />
          <CartesianGrid stroke="#444444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}

const Peers = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Peers</h2>
      <ResponsiveContainer
        width="100%"
        height={150}
      >
        <BarChart data={data}>
          <Bar
            dataKey="peers"
            fill="#32CD32"
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#444444" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

const RPCRequests = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">RPC Requests</h2>
      <ResponsiveContainer
        width="100%"
        height={150}
      >
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#FF1493"
          />
          <CartesianGrid stroke="#444444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

const ChainDataDiskSize = () => {
  return (
    <Container>
      <h2 className="text-xl font-bold">Chain Data Disk Size</h2>
      <ResponsiveContainer
        width="100%"
        height={150}
      >
        <AreaChart data={data}>
          <Area
            type="monotone"
            dataKey="incoming"
            stroke="#DA70D6"
            fill="#DA70D6"
          />
          <CartesianGrid stroke="#444444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}

// *** SYSTEM ***
const CpuInfo: React.FC = () => {
  const { systemInfo } = useMonitoring()

  const [cpuInfo, setCpuInfo] = useState({
    speedMin: Infinity,
    speedMax: 0,
    averageSpeed: 0,
  })

  useEffect(() => {
    const mn = systemInfo[0]?.cpu.speedMin
    const mx = systemInfo[0]?.cpu.speedMax
    const avg = systemInfo[0]?.cpu.speed

    setCpuInfo((prev) => ({
      ...prev,
      speedMin: mn < prev.speedMin ? mn : prev.speedMin,
      speedMax: mx > prev.speedMax ? mx : prev.speedMax,
      averageSpeed: avg,
    }))
  }, [systemInfo])

  return (
    <Container className="">
      <h2 className="mb-4 text-xl font-semibold">CPU Speed</h2>
      <ResponsiveContainer width="100%">
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold">Average Speed</h3>
            <div className="text-2xl font-bold text-green-400">{cpuInfo.averageSpeed} GHz</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Min Speed</h3>
            <div className="text-2xl font-bold text-blue-400">{cpuInfo.speedMin} GHz</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Max Speed</h3>
            <div className="text-2xl font-bold text-red-400">{cpuInfo.speedMax} GHz</div>
          </div>
        </div>
      </ResponsiveContainer>
    </Container>
  )
}

const DiskInfo: React.FC = () => {
  const { systemInfo } = useMonitoring()

  const diskData = systemInfo.map((info) => {
    const disk = info.disk

    return {
      name: new Date(disk.ms).toLocaleTimeString(),
      rx: disk.rIO,
      wx: disk.wIO,
      tx: disk.tIO,
      rx_sec: disk.rIO_sec,
      wx_sec: disk.wIO_sec,
      tx_sec: disk.tIO_sec,
    }
  })

  return (
    <Container className="">
      <h2 className="mb-4 text-xl font-semibold">Disk Activity</h2>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={diskData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rIO_sec"
            stroke="#8884d8"
            name="Read Speed (bytes/s)"
          />
          <Line
            type="monotone"
            dataKey="wIO_sec"
            stroke="#82ca9d"
            name="Write Speed (bytes/s)"
          />
          <Line
            type="monotone"
            dataKey="tIO_sec"
            stroke="#8884d8"
            name="Average Speed (bytes/s)"
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={diskData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rIO"
            stroke="#8884d8"
            name="Reads (bytes)"
          />
          <Line
            type="monotone"
            dataKey="wIO"
            stroke="#82ca9d"
            name="Writes (bytes)"
          />
          <Line
            type="monotone"
            dataKey="tIO"
            stroke="#ffc658"
            name="Total (bytes)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

const NetworkInfo: React.FC = () => {
  const { systemInfo } = useMonitoring()

  const networkData = systemInfo.map((info) => {
    const network = info.network

    return {
      name: new Date(network.ms).toLocaleTimeString(),
      rx: network.rx_bytes,
      tx: network.tx_bytes,
      rx_sec: network.rx_sec,
      tx_sec: network.tx_sec,
    }
  })

  return (
    <Container className="">
      <h2 className="mb-4 text-xl font-semibold">Network Activity</h2>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={networkData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rx_sec"
            stroke="#8884d8"
            name="Download Speed (bytes/s)"
          />
          <Line
            type="monotone"
            dataKey="tx_sec"
            stroke="#82ca9d"
            name="Upload Speed (bytes/s)"
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={networkData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rx"
            stroke="#8884d8"
            name="Downloaded (bytes)"
          />
          <Line
            type="monotone"
            dataKey="tx"
            stroke="#82ca9d"
            name="Uploaded (bytes)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

// const SystemLoadChart: React.FC = () => {
//   const { systemInfo } = useMonitoring()

//   const loadData = systemInfo.map((info) => {
//     const load = info.currentLoad

//     return {
//       name: new Date(info.ms).toLocaleTimeString(),
//       avgLoad: load.avgLoad,
//       currentLoad: load.currentLoad,
//       userLoad: load.currentLoadUser,
//       systemLoad: load.currentLoadSystem,
//       idleLoad: load.currentLoadIdle,
//     }
//   })

//   return (
//     <Container>
//       <h2 className="text-xl font-bold">System Load</h2>
//       <ResponsiveContainer
//         width="100%"
//         height={300}
//       >
//         <LineChart data={loadData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="avgLoad"
//             stroke="#8884d8"
//             name="Average Load"
//           />
//           <Line
//             type="monotone"
//             dataKey="currentLoad"
//             stroke="#82ca9d"
//             name="Current Load"
//           />
//           <Line
//             type="monotone"
//             dataKey="userLoad"
//             stroke="#ffc658"
//             name="User Load"
//           />
//           <Line
//             type="monotone"
//             dataKey="systemLoad"
//             stroke="#ff7300"
//             name="System Load"
//           />
//           <Line
//             type="monotone"
//             dataKey="idleLoad"
//             stroke="#00c49f"
//             name="Idle Load"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </Container>
//   )
// }
