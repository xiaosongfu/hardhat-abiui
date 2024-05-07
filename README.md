## Hardhat ABIUI

#### 1. Install

```
$ npm install --save-dev hardhat-abiui
# or
$ yarn add --dev hardhat-abiui
```

#### 2. Included Commands

- `npx hardhat abiui dev [--network <network>] [--contract <contract>] [--address <address>] [--port <port>]` : start abi-ui server locally.
  * `--netwrok <network>` : optional; the network name, for example `--network localhost`
  * `--contract <contract>` : optional; the contract name, for example `--contract Lock`
  * `--address <address>` : optional; the contract address
  * `--port <port>` : optional; the local server port, default port is `3003`
- `npx hardhat abiui login` : login to `abiui.dev` cloud service.
- `npx hardhat abiui whoami` : print login account.
- `npx hardhat abiui list` : list all contracts which has deployed to `abiui.dev` cloud, you must login.
- `npx hardhat abiui deploy [--network <network>] [--contract <contract>] [--address <address>]` : deploy to `abiui.dev` cloud.
- `npx hardhat abiui delete <id>` : delete the contract which has deployed to `abiui.dev` cloud, `id` parameter is from `abiui list` command's output.

> Notice:
> 1. `[--network <network>] [--contract <contract>] [--address <address>]` parameters are optional, if not set, will use `defaultNetwork` and `defaultContract` and `enableDeployed` in `hardhat.config.ts`(read more at chapter `3. Usage`).
> 2. `npx hardhat abiui deploy` task will deploy to [abiui.dev](https://abiui.dev/) cloud, you can manage your contracts in the web or use cli. 

#### 3. Usage

Load plugin in Hardhat config:

```
require('hardhat-abiui');
# or
import 'hardhat-abiui';
```

Add optional configuration with `abiui` key:

| option          | description                                                                  | optional | type    | default value      |
|-----------------|------------------------------------------------------------------------------|----------|---------|--------------------|
| defaultNetwork  | default network                                                              | true     | string  | ""                 |
| defaultContract | default contract                                                             | true     | string  | ""                 |
| enableDeployed  | `true` means to use `hardhat-deployed-records` plugin saved contract address | true     | boolean | false              |
| deployedDir     | `hardhat-deployed-records` plugin's deployed dir                             | true     | string  | `scripts/deployed` |

> Please notice, those configurations will be replaced by command line parameters, it means command line parameters has higher priority than configurations in `hardhat.config.ts`.

for example:

```
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://gateway.tenderly.co/public/sepolia",
    },
  },
  abiui: {
    defaultNetwork: "sepolia",
    defaultContract: "MMERC20",
    enableDeployed: true,
  }
};

export default config;
```

use `npx hardhat abiui dev` to start a local server.

#### 4. `abiui.dev` cloud service

[TODO]

#### 5. Version History

- v0.1.0 (2024/05/07)
  * init release with only `abiui dev` task
