import { HardhatPluginError } from "hardhat/plugins";
import { PLUGIN_NAME } from "../constants";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import fs from "fs";
import { FormatTypes, Interface } from "@ethersproject/abi";

interface Function {
  name: string;
  hasInputs: boolean;
  inputs: { fn: string; name: string; type: string }[];
  // hasOutputs: boolean; // TODO unused
  // outputs: { fn:string, name: string; type: string }[]; // TODO unused
}

interface Event {
  name: string;
  inputs: { event: string; name: string; type: string }[];
  inputsIndex: number[];
}

export async function readArtifact(
  hre: HardhatRuntimeEnvironment,
  contract: string,
): Promise<[Function[], Function[], Event[], string[]]> {
  const { bytecode, abi } = await hre.artifacts.readArtifact(contract);

  // throw error when contract is **solidity interface**
  if (bytecode === "0x") {
    throw new HardhatPluginError(
      PLUGIN_NAME,
      "Can't interact with solidity interface contract",
    );
  }

  // throw error when contract is **solidity library contract**
  if (abi.length === 0) {
    throw new HardhatPluginError(
      PLUGIN_NAME,
      "Can't interact with solidity library contract",
    );
  }

  const readFunctions: Function[] = [];
  const writeFunctions: Function[] = [];
  const events: Event[] = [];
  for (const element of abi) {
    // => type: constructor event function
    switch (element.type) {
      case "function":
        // =>=> stateMutability: nonpayable payable view pure
        switch (element.stateMutability) {
          case "nonpayable":
          case "payable":
            writeFunctions.push({
              name: element.name,
              hasInputs: element.inputs.length > 0,
              inputs: element.inputs.map((i: any) => {
                return { fn: element.name, name: i.name, type: i.type };
              }),
            });
            break;
          case "view":
          case "pure":
            readFunctions.push({
              name: element.name,
              hasInputs: element.inputs.length > 0,
              inputs: element.inputs.map((i: any) => {
                return { fn: element.name, name: i.name, type: i.type };
              }),
            });
            break;
        }
        break;
      case "event":
        const inputsIndex: number[] = [];
        element.inputs.forEach((i: any, index: number) => {
          inputsIndex.push(index);
        });

        events.push({
          name: element.name,
          inputs: element.inputs.map((i: any) => {
            return { event: element.name, name: i.name, type: i.type };
          }),
          inputsIndex: inputsIndex,
        });
        break;
    }
  }

  return [
    readFunctions,
    writeFunctions,
    events,
    new Interface(abi).format(FormatTypes.full) as string[],
  ];
}

export function readContractAddress(
  contract: string,
  network: string,
  deployedDir: string,
): string {
  const manifest = `${deployedDir}/${network}/contracts.json`;

  if (!fs.existsSync(manifest)) {
    throw new HardhatPluginError(PLUGIN_NAME, `'${manifest}' file not found`);
  }

  const content = fs.readFileSync(manifest, "utf-8");
  let json = JSON.parse(content);

  const result = flatJson(json).find((x) => x[0] === contract);
  if (result == null) {
    throw new HardhatPluginError(
      PLUGIN_NAME,
      `contract ${contract}'s address not found`,
    );
  }

  return result[1];
}

function flatJson(json: any): [string, string][] {
  const result: [string, string][] = [];
  for (const key in json) {
    if (typeof json[key] == "object") {
      const r = flatJson(json[key]);
      result.push(...r);
    } else {
      result.push([key, json[key]]);
    }
  }

  return result;
}
