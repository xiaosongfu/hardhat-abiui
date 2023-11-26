import { extendConfig } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

// Import tasks
import "./tasks/abiui-local";
import "./tasks/abiui-login";
import "./tasks/abiui-deploy";
import { DEFAULT_DEPLOYED_DIR } from "./constants";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    // read user config
    const defaultNetwork = userConfig.abiui?.defaultNetwork;
    const defaultContract = userConfig.abiui?.defaultContract;

    const enableDeployed = userConfig.abiui?.enableDeployed ?? false;
    const deployedDir = userConfig.abiui?.deployedDir ?? DEFAULT_DEPLOYED_DIR;

    // inject config fields
    config.abiui = {
      defaultNetwork,
      defaultContract,
      enableDeployed,
      deployedDir,
    };
  },
);
