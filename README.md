## Hardhat ABIUI

#### 1. Install

```
$ npm install --save-dev @xiaosongfu/hardhat-abiui
# or
$ yarn add --dev @xiaosongfu/hardhat-abiui
```

#### 2. Included Commands

- `npx hardhat abiui [--netwrok <network>] [--contract <contract>] [--address <address>] [--port <port>] [--deploy]` : start abi-ui server or deploy to cloud.
  * `--netwrok <network>` :
  * `--contract <contract>` :
  * `--address <address>` :
  * `--port <port>` : local server port
  * `--deploy` : 

#### 3. Usage

Load plugin in Hardhat config:

```
require('@xiaosongfu/hardhat-abiui');
# or
import '@xiaosongfu/hardhat-abiui';
```

Add configuration under `abiUI` key:

| option          | description                                                                             | optional | type    | default value      |
|-----------------|-----------------------------------------------------------------------------------------|----------|---------|--------------------|
| defaultNetwork  | default network                                                                         | true     | string  | ""                 |
| defaultContract | default contract                                                                        | true     | string  | ""                 |
| enableDeployed  | value is `true` means use `hardhat-deployed-records` plugin's deployed contract address | true     | boolean | false              |
| deployedDir     | `hardhat-deployed-records` plugin's deployed dir                                        | true     | string  | `scripts/deployed` |

#### 4. `abiui.xyz` cloud service

[TODO]

#### 5. Version History

- v0.1.0 (2023/11/22)
    - first release
