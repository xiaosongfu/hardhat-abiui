import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { OUTPUT_DIR, PLUGIN_NAME, TASK_ABI_UI_LOCAL } from "../constants";
import fs from "fs";
import Mustache from "mustache";
import { runScript } from "hardhat/internal/util/scripts-runner";
import { readArtifact, readContractAddress } from "../misc/helper";
import {
  EVENT_HTML,
  EVENT_JS,
  INDEX_HTML,
  INDEX_JS,
  READ_FUNCTIONS_HTML,
  READ_FUNCTIONS_JS,
  WRITE_FUNCTIONS_HTML,
  WRITE_FUNCTIONS_JS,
} from "../misc/templates";
import { toHex } from "hardhat/internal/util/bigint";
import { blockchainExplorer, chainRPC } from "../misc/chains";

task(TASK_ABI_UI_LOCAL, "Start the abiui server")
  .addOptionalParam("contract", "Contract name")
  .addOptionalParam("address", "Contract address")
  .addOptionalParam("port", "Listen port")
  .setAction(
    async (
      taskArgs: {
        contract: string;
        address: string;
        port: string;
      },
      hre: HardhatRuntimeEnvironment,
    ) => {
      // read configs from `hardhat.config.ts`
      const cfg = hre.config.abiui;

      // 1 get network
      // command line `network` argument's priority is higher than `defaultNetwork` from `hardhat.config.ts`
      //
      // `31337` is the chainId of default `localhost` network. Reference: https://hardhat.org/hardhat-network/docs/reference#chainid
      // `localhost` network's chainId is not explicitly configured in `hardhat.config.ts`
      // so we use `31337` as default value
      let chainId: number = hre.network.config.chainId ?? 31337;
      let chainName: string = hre.network.name;
      if (hre.network.name === "hardhat") {
        if (cfg.defaultNetwork == null) {
          throw new HardhatPluginError(
            PLUGIN_NAME,
            "please specify network or config `defaultNetwork`",
          );
        }

        chainId = hre.config.networks[cfg.defaultNetwork].chainId ?? 31337;
        chainName = cfg.defaultNetwork;
      }

      // 2 get contract
      // command line `contract` argument's priority is higher than `defaultContract` from `hardhat.config.ts`
      let contract = taskArgs.contract;
      if (contract == null) {
        if (cfg.defaultContract == null) {
          throw new HardhatPluginError(
            PLUGIN_NAME,
            "please specify contract or config `defaultContract`",
          );
        }

        contract = cfg.defaultContract;
      }

      // 3 get contract address
      let contractAddress = taskArgs.address;
      if (contractAddress == null) {
        if (!cfg.enableDeployed) {
          throw new HardhatPluginError(
            PLUGIN_NAME,
            "please specify contract address or config `deployedDir`",
          );
        }

        contractAddress = readContractAddress(
          contract,
          chainName,
          cfg.deployedDir,
        );
      }

      // 4 get contract abi
      const [readFunctions, writeFunctions, events, abi] = await readArtifact(
        hre,
        contract,
      );

      // ----------------- JS -----------------
      const readCodeJS = Mustache.render(READ_FUNCTIONS_JS, {
        readFunctions,
        blockchainExplorer: blockchainExplorer(chainId!),
      });
      const writeCodeJS = Mustache.render(WRITE_FUNCTIONS_JS, {
        writeFunctions,
        blockchainExplorer: blockchainExplorer(chainId!),
      });
      const eventsCodeJS = Mustache.render(EVENT_JS, { events });
      // ----------------- HTML -----------------
      const readCodeHTML = Mustache.render(READ_FUNCTIONS_HTML, {
        readFunctions,
        blockchainExplorer: blockchainExplorer(chainId!),
      });
      const writeCodeHTML = Mustache.render(WRITE_FUNCTIONS_HTML, {
        writeFunctions,
        blockchainExplorer: blockchainExplorer(chainId!),
      });
      const eventsCodeHTML = Mustache.render(EVENT_HTML, { events });

      // generate `index.html` and `index.js`
      const indexHTML = Mustache.render(INDEX_HTML, {
        chainId: toHex(chainId!),
        chainName: chainName,
        chainRPC: chainRPC(chainId!),
        contract,
        abi: JSON.stringify(abi, null, 2),
        contractAddress,
        readCodeJS,
        writeCodeJS,
        eventsCodeJS,
        readCodeHTML,
        writeCodeHTML,
        eventsCodeHTML,
      });
      const indexJS = Mustache.render(INDEX_JS, {
        port: taskArgs.port ?? 3003,
      });

      // create `node_modules/.abiui/<contract>_<network>` dir, if exists, remove it first
      const destDir = `${OUTPUT_DIR}/${contract}_${chainName}`;
      if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true });
      fs.mkdirSync(destDir, { recursive: true });

      // write `index.html` and `index.js` to `node_modules/.abiui/<contract>_<network>` dir
      fs.writeFileSync(`${destDir}/index.html`, indexHTML, {
        flag: "a+",
      });
      fs.writeFileSync(`${destDir}/index.js`, indexJS, {
        flag: "a+",
      });

      // start static http server
      await runScript(`${destDir}/index.js`);
    },
  );

// task alias
task("abiui", "alias of 'abiui-local'")
  .addOptionalParam("contract", "Contract name")
  .addOptionalParam("address", "Contract address")
  .addOptionalParam("port", "Listen port")
  .setAction(
    async (
      taskArgs: {
        contract: string;
        address: string;
        port: string;
      },
      hre: HardhatRuntimeEnvironment,
    ) => {
      await hre.run(TASK_ABI_UI_LOCAL, taskArgs);
    },
  );
