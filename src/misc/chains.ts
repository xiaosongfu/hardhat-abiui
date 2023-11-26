// Value: (chainID: [RPC, Explorer])
const chains = new Map<number, [string, string]>()
  .set(1, ["https://eth.llamarpc.com", "https://etherscan.io/tx/"])
  .set(5, [
    "https://rpc.ankr.com/eth_goerli",
    "https://goerli.etherscan.io/tx/",
  ])
  .set(11155111, [
    "https://ethereum-sepolia.publicnode.com",
    "https://sepolia.etherscan.io/tx/",
  ])
  .set(56, ["https://binance.llamarpc.com", "https://bscscan.com/tx/"])
  .set(137, ["https://polygon.llamarpc.com", "https://polygonscan.com/tx/"])
  .set(1284, ["https://rpc.ankr.com/moonbeam", "https://moonscan.io/tx/"])
  .set(10, [
    "https://optimism.llamarpc.com",
    "https://optimistic.etherscan.io/tx/",
  ])
  .set(59144, ["https://1rpc.io/linea", "https://lineascan.build/tx/"])
  .set(42161, ["https://arbitrum.llamarpc.com", "https://arbiscan.io/tx/"]);

export function chainRPC(chainId: number): string {
  const [rpc, _] = chains.get(chainId) || ["", ""];
  return rpc;
}

export function blockchainExplorer(chainId: number): string {
  const [_, explorer] = chains.get(chainId) || ["", ""];
  return explorer;
}
