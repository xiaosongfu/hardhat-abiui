// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";

declare module "hardhat/types/config" {
  export interface ABIuiUserConfig {
    defaultNetwork?: string;
    defaultContract?: string;

    enableDeployed?: boolean;
    deployedDir?: string;
  }

  export interface ABIuiConfig {
    defaultNetwork?: string;
    defaultContract?: string;

    enableDeployed: boolean;
    deployedDir: string;
  }

  export interface HardhatUserConfig {
    abiui?: ABIuiUserConfig;
  }

  export interface HardhatConfig {
    abiui: ABIuiConfig;
  }
}
