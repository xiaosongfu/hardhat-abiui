import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { PLUGIN_NAME, TASK_ABI_UI_CLOUD_LIST } from "../constants";
import { abiuiTaskScope } from "./abiui";

abiuiTaskScope
  .task(TASK_ABI_UI_CLOUD_LIST, "List contracts deployed at 'abiui.dev' cloud")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // TODO ...
  });
