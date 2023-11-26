import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { TASK_ABI_UI_LOGIN } from "../constants";

task(TASK_ABI_UI_LOGIN, "Login to 'abiui.dev' cloud service")
  .addOptionalParam("contract", "Contract name")
  .addOptionalParam("address", "Contract address")
  .addOptionalParam("port", "Listen port")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // TODO ...
  });
