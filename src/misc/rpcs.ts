const rpcs = new Map<number, string>()
  .set(1, "https://eth.llamarpc.com")
  .set(5, "https://rpc.ankr.com/eth_goerli")
  .set(11155111, "https://ethereum-sepolia.publicnode.com")
  .set(56, "https://binance.llamarpc.com")
  .set(137, "https://polygon.llamarpc.com")
  .set(1284, "https://rpc.ankr.com/moonbeam")
  .set(10, "https://optimism.llamarpc.com")
  .set(59144, "https://1rpc.io/linea")
  .set(42161, "https://arbitrum.llamarpc.com");

const explorers = new Map<number, string>()
  .set(1, "https://etherscan.io/tx/")
  .set(5, "https://goerli.etherscan.io/tx/")
  .set(11155111, "https://sepolia.etherscan.io/tx/")
  .set(56, "https://bscscan.com/tx/")
  .set(137, "https://polygonscan.com/tx/")
  .set(1284, "https://moonscan.io/tx/")
  .set(10, "https://optimistic.etherscan.io/tx/")
  .set(59144, "https://lineascan.build/tx/")
  .set(42161, "https://arbiscan.io/tx/");

export function chainRPC(chainId: number): string {
  return rpcs.get(chainId) || "";
}

export function blockchainExplorer(chainId: number): string {
  return explorers.get(chainId) || "";
}
