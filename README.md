## Hardhat ABIUI

#### 1. Install

```
$ npm install --save-dev @xiaosongfu/hardhat-abiui
# or
$ yarn add --dev @xiaosongfu/hardhat-abiui
```

#### 2. Included Commands

- `npx hardhat abiui-local [--network <network>] [--contract <contract>] [--address <address>] [--port <port>]` : start abi-ui server locally, this task has alias for shorting: `abiui`.
  * `--netwrok <network>` : optional; the network name, for example `--network localhost`
  * `--contract <contract>` : optional; the contract name
  * `--address <address>` : optional; the contract address
  * `--port <port>` : optional; the local server port, default port is `3003`
- `npx hardhat abiui-login` : login to `abiui.dev` cloud service.
- `npx hardhat abiui-deploy [--network <network>] [--contract <contract>] [--address <address>]` : deploy to `abiui.dev` cloud service.

> Notice:
> 1. `[--network <network>] [--contract <contract>] [--address <address>]` parameters are optional, if not set, will use `defaultNetwork` and `defaultContract` and `enableDeployed` in `hardhat.config.ts(read more at chapter `3. Usage`).
> 2. `npx hardhat abiui-deploy ...` task will deploy to `abiui.dev` cloud service with a temporary link which will be deleted after one week if you are not login. If you are login, the link will be saved in your account and will not be deleted. you can manage your contracts in [abiui.dev](https://abiui.dev/) cloud service. 

#### 3. Usage

Load plugin in Hardhat config:

```
require('@xiaosongfu/hardhat-abiui');
# or
import '@xiaosongfu/hardhat-abiui';
```

Add optional configuration with `abiui` key:

| option          | description                                                                                | optional | type    | default value      |
|-----------------|--------------------------------------------------------------------------------------------|----------|---------|--------------------|
| defaultNetwork  | default network                                                                            | true     | string  | ""                 |
| defaultContract | default contract                                                                           | true     | string  | ""                 |
| enableDeployed  | value is `true` means to use `hardhat-deployed-records` plugin's deployed contract address | true     | boolean | false              |
| deployedDir     | `hardhat-deployed-records` plugin's deployed dir                                           | true     | string  | `scripts/deployed` |

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

#### 4. `abiui.xyz` cloud service

[TODO]

#### 5. Version History

- v0.1.0 (2023/11/26)
  * init release with only `abiui-local` task
