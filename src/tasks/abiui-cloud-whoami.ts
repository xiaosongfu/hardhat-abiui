import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { PLUGIN_NAME, TASK_ABI_UI_CLOUD_WHOAMI } from "../constants";
import { abiuiTaskScope } from "./abiui";

abiuiTaskScope
  .task(TASK_ABI_UI_CLOUD_WHOAMI, "Print who is login to 'abiui.dev' cloud")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // TODO ...
  });
