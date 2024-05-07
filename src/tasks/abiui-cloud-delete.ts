import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { PLUGIN_NAME, TASK_ABI_UI_CLOUD_DELETE } from "../constants";
import { abiuiTaskScope } from "./abiui";

abiuiTaskScope
  .task(TASK_ABI_UI_CLOUD_DELETE, "Delete contract from 'abiui.dev' cloud")
  .addParam("id", "'id' is from `abiui list` command's output")
  .setAction(
    async (
      taskArgs: {
        id: string;
      },
      hre: HardhatRuntimeEnvironment,
    ) => {
      const cfg = hre.config.abiui;
    },
  );
