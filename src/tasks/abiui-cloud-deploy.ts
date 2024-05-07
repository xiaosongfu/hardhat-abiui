import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { PLUGIN_NAME, TASK_ABI_UI_CLOUD_DEPLOY } from "../constants";
import { abiuiTaskScope } from "./abiui";

abiuiTaskScope
  .task(TASK_ABI_UI_CLOUD_DEPLOY, "Deploy contract to 'abiui.dev' cloud")
  .addOptionalParam("contract", "Contract name")
  .addOptionalParam("address", "Contract address")
  .setAction(
    async (
      taskArgs: {
        contract: string;
        address: string;
      },
      hre: HardhatRuntimeEnvironment,
    ) => {
      const cfg = hre.config.abiui;
    },
  );
