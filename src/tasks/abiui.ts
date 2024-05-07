import { scope } from "hardhat/config";
import { TASK_SCOPE_ABI_UI } from "../constants";

export const abiuiTaskScope = scope(TASK_SCOPE_ABI_UI, "'abiui' tasks");
