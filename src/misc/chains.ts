// chains: { chainID: [RPC, Explorer] }
const chains: { [chainId: number]: [string, string] } = {
  1: ["https://eth.llamarpc.com", "https://etherscan.io/"],
  5: ["https://rpc.ankr.com/eth_goerli", "https://goerli.etherscan.io/"],
  11155111: ["https://sepolia.drpc.org", "https://sepolia.etherscan.io/"],
  56: ["https://binance.llamarpc.com", "https://bscscan.com/"],
  137: ["https://polygon.llamarpc.com", "https://polygonscan.com/"],
  1284: ["https://rpc.ankr.com/moonbeam", "https://moonscan.io/"],
  10: ["https://optimism.llamarpc.com", "https://optimistic.etherscan.io/"],
  59144: ["https://1rpc.io/linea", "https://lineascan.build/"],
  42161: ["https://arbitrum.llamarpc.com", "https://arbiscan.io/"],
};

export function chainRPC(chainId: number): string {
  const [rpc, _] = chains[chainId] || ["", ""];
  return rpc;
}

export function blockchainExplorer(chainId: number): string {
  const [_, explorer] = chains[chainId] || ["", ""];
  return explorer;
}
