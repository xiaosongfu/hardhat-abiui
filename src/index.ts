import { extendConfig } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

// Import tasks
import "./tasks/abiui-dev";
import "./tasks/abiui-cloud-login";
import "./tasks/abiui-cloud-whoami";
import "./tasks/abiui-cloud-list";
import "./tasks/abiui-cloud-deploy";
import "./tasks/abiui-cloud-delete";

import { DEFAULT_DEPLOYED_DIR } from "./constants";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const enableDeployed = userConfig.abiui?.enableDeployed ?? false;
    const deployedDir = userConfig.abiui?.deployedDir ?? DEFAULT_DEPLOYED_DIR;

    config.abiui = {
      defaultNetwork: userConfig.abiui?.defaultNetwork,
      defaultContract: userConfig.abiui?.defaultContract,
      enableDeployed,
      deployedDir,
    };
  },
);
