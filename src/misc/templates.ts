export const READ_FUNCTIONS_JS: string = `
{{#readFunctions}}
const {{identifier}}_QueryBtn = document.getElementById("{{identifier}}_query_btn");
const {{identifier}}_Outputs = document.getElementById("{{identifier}}_outputs");
{{identifier}}_QueryBtn.addEventListener("click", async () => {
  {{identifier}}_QueryBtn.innerText = "Querying...";
  {{identifier}}_QueryBtn.disabled = "disabled";
  {{identifier}}_Outputs.innerText = "";
 {{#hasInputs}}
  {{#inputs}}
  const {{identifier}}_{{inputName}}_input = document.getElementById("{{identifier}}_{{inputName}}_input").value;
  {{/inputs}}
  if ({{#inputs}}{{identifier}}_{{inputName}}_input.toString().length === 0 || {{/inputs}} false) {
    {{identifier}}_Outputs.innerText = "Invalid input(s)";
    {{identifier}}_QueryBtn.innerText = "Query";
    {{identifier}}_QueryBtn.disabled = "";
    return;
  }
  try {
    const result = await contract.{{name}}({{#inputs}}{{#isArray}}{{identifier}}_{{inputName}}_input.split(","){{/isArray}}{{^isArray}}{{identifier}}_{{inputName}}_input{{/isArray}}, {{/inputs}} {});
  {{/hasInputs}}
  {{^hasInputs}}
  try {
    const result = await contract.{{name}}();
  {{/hasInputs}}
    {{identifier}}_Outputs.innerText = "Query result: " + result.toString();
  } catch (e) {
    {{identifier}}_Outputs.innerText = "Query failed: " + e.message;
  }
  {{identifier}}_QueryBtn.innerText = "Query";
  {{identifier}}_QueryBtn.disabled = "";
});
{{/readFunctions}}
`;

export const WRITE_FUNCTIONS_JS: string = `
{{#writeFunctions}}
const {{identifier}}_ExecuteBtn = document.getElementById("{{identifier}}_execute_btn");
const {{identifier}}_Outputs = document.getElementById("{{identifier}}_outputs");
{{identifier}}_ExecuteBtn.addEventListener("click", async () => {
  {{identifier}}_ExecuteBtn.innerText = "Executing...";
  {{identifier}}_ExecuteBtn.disabled = "disabled";
  {{identifier}}_Outputs.innerText = "";
  {{#hasInputs}}
  {{#inputs}}
  const {{identifier}}_{{inputName}}_input = document.getElementById("{{identifier}}_{{inputName}}_input").value;
  {{/inputs}}
  if ({{#inputs}}{{identifier}}_{{inputName}}_input.toString().length === 0 || {{/inputs}} false) {
    {{identifier}}_Outputs.innerText = "Invalid input(s)";
    {{identifier}}_ExecuteBtn.innerText = "Execute";
    {{identifier}}_ExecuteBtn.disabled = "";
    return;
  }
  try {
    const tx = await contract.{{name}}({{#inputs}}{{#isArray}}{{identifier}}_{{inputName}}_input.split(","){{/isArray}}{{^isArray}}{{identifier}}_{{inputName}}_input{{/isArray}}, {{/inputs}} {});
  {{/hasInputs}}
  {{^hasInputs}}
  try {
    const tx = await contract.{{name}}();
  {{/hasInputs}}
    {{identifier}}_ExecuteBtn.innerText = "Waiting Tx confirm...";
    {{identifier}}_Outputs.innerHTML = 'txHash: <a href="{{&blockchainExplorer}}tx/' + tx.hash + '" target="_blank">' + tx.hash + '</a>';
    await tx.wait();
    {{identifier}}_Outputs.innerHTML = {{identifier}}_Outputs.innerHTML + "<br />&nbsp;&nbsp;" + "Tx confirmed, execute success!";
  } catch (e) {
    {{identifier}}_Outputs.innerText = "Execute failed: " + e.message;
  }
  {{identifier}}_ExecuteBtn.innerText = "Execute";
  {{identifier}}_ExecuteBtn.disabled = "";
});
{{/writeFunctions}}
`;

export const EVENT_JS: string = `
{{#events}}
const {{identifier}}_QueryBtn = document.getElementById("{{identifier}}_query_btn");
{{identifier}}_QueryBtn.addEventListener("click", async () => {
  const filter = contract.filters.{{name}}();
  const events = await contract.queryFilter(filter);
  console.log(">>> '{{name}}' history events inputs=[{{#inputs}}{{inputName}}, {{/inputs}}]");
  events.forEach((event) => {
    const result = contract.interface.decodeEventLog(
      "{{name}}",
      event.data,
      event.topics,
    );
    console.log(
      // "History 'Transfer' Event: [" + result[0] + ", " + result[1] + ", " + result[2] + ", ] blockNumber: " + event.blockNumber,
      "History '{{name}}' Event: [" + {{#inputsIndex}}result[{{.}}] + ", " + {{/inputsIndex}} "] blockNumber: " + event.blockNumber,
    );
  });
});

const {{identifier}}_OnBtn = document.getElementById("{{identifier}}_on_btn");
{{identifier}}_OnBtn.addEventListener("click", async () => {
  console.log("~~~ start listen '{{name}}' event inputs=[{{#inputs}}{{inputName}}, {{/inputs}}]");

  {{identifier}}_OnBtn.innerText = "Listening";
  {{identifier}}_OnBtn.disabled = "disabled";

  await contract.on("{{name}}", ({{#inputs}}{{inputName}}, {{/inputs}}event) => {
    console.log(
      // "New 'Transfer' Event: [" + from + ", " + to + ", " + amount + ", ] blockNumber: " + event.log.blockNumber,
      "New '{{name}}' Event: [" + {{#inputs}}{{inputName}} + ", " + {{/inputs}} "] blockNumber: " + event.log.blockNumber,
    );
  });
});
const {{identifier}}_OffBtn = document.getElementById("{{identifier}}_off_btn");
{{identifier}}_OffBtn.addEventListener("click", async () => {
  console.log("--- stop listen '{{name}}' event");

  {{identifier}}_OnBtn.innerText = "Start Listen New Event";
  {{identifier}}_OnBtn.disabled = "";

  await contract.off("{{name}}");
});
{{/events}}
`;

export const READ_FUNCTIONS_HTML: string = `
{{#readFunctions}}
<div id="{{identifier}}_read_function_div" style="border: 2px solid orange; border-radius: 8px; padding: 16px; margin: 8px">
  <h3 id="{{identifier}}">{{name}}</h3>
  <div id="{{identifier}}_input_div">
  {{#hasInputs}}
    Inputs:<br />
    {{#inputs}}
    &nbsp;&nbsp;<label for="{{identifier}}_{{inputName}}_input">{{inputName}}({{inputType}}): </label>
    <input id="{{identifier}}_{{inputName}}_input" type="text" />{{#isArray}}<span>(split with comma)</span>{{/isArray}}<br />
    {{/inputs}}
  {{/hasInputs}}
  </div>
  <button id="{{identifier}}_query_btn">Query</button>
  <div id="{{identifier}}_output_div">
    Outputs:<br />
    &nbsp;&nbsp;<span id="{{identifier}}_outputs"></span>
  </div>
</div>
{{/readFunctions}}
`;

export const WRITE_FUNCTIONS_HTML: string = `
{{#writeFunctions}}
<div id="{{identifier}}_write_function_div" style="border: 2px solid gold; border-radius: 8px; padding: 16px; margin: 8px">
  <h3 id="{{identifier}}">{{name}}</h3>
  <div id="{{identifier}}_input_div">
  {{#hasInputs}}
    Inputs:<br />
    {{#inputs}}
    &nbsp;&nbsp;<label for="{{identifier}}_{{inputName}}_input">{{inputName}}({{inputType}}): </label>
    <input id="{{identifier}}_{{inputName}}_input" type="text" />{{#isArray}}<span>(split with comma)</span>{{/isArray}}<br />
    {{/inputs}}
  {{/hasInputs}}
  </div>
  <button id="{{identifier}}_execute_btn">Execute</button>
  <div id="{{identifier}}_output_div">
    Outputs:<br />
    &nbsp;&nbsp;<span id="{{identifier}}_outputs"></span>
  </div>
</div>
{{/writeFunctions}}
`;

export const EVENT_HTML: string = `
{{#events}}
<div id="{{identifier}}_event_div" style="border: 2px solid antiquewhite; border-radius: 8px; padding: 16px; margin: 8px">
  <h3>{{name}}</h3>
  <div>
    <button id="{{identifier}}_query_btn">Query History Events</button>
  </div>
  <div>
    <button id="{{identifier}}_on_btn">Start Listen New Event</button>
    <button id="{{identifier}}_off_btn">Stop Listen New Event</button>
  </div>
</div>
{{/events}}
`;

export const INDEX_HTML: string = `
<html>
  <head>
    <title>{{contractName}} at {{chainName}}</title>
  </head>
  <script async type="module">
    import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.8.0/ethers.min.js";

    let currentAccount = null;
    let mustChainId = "{{chainId}}";

    // 1 Connecting to Ethereum
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }

    // 2 Switch chain
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: mustChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: mustChainId,
                chainName: "{{chainName}}",
                rpcUrls: ["{{&chainRPC}}"],
              },
            ],
          });
        } catch (addError) {
          console.error("add chain error: ", addError);
        }
      } else if (switchError.code === 4001) {
          alert("switch chain request rejected");
      }
      console.error("switch chain error: ", switchError);
    }

    // 3 Get account
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          alert("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    currentAccount = accounts[0];
    document.getElementById("account").innerText = "Connected: " + currentAccount;

    // 4 Listen account change event
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length === 0) {
        alert("Please connect to MetaMask.");
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        window.location.reload();
      }
    });
    
    // 5. Listen chain change event
    window.ethereum.on("chainChanged", function (chainId) {
      if (chainId !== mustChainId) {
        alert("Please switch to {{chainName}} chain.");
        window.location.reload();
      }
    });

    // +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++
    // +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++

    // Instantiate contract
    const ADDR = "{{contractAddress}}";
    const ABI = {{&abi}};
    const contract = new ethers.Contract(ADDR, ABI, signer);
    
    // Read functions
    {{&readCodeJS}}
    
    // Write functions
    {{&writeCodeJS}}
    
    // Events
    {{&eventsCodeJS}}
  </script>
  <body>
    <div><h3>Network: {{chainName}}</h3></div>
    <div><h3 id="account">Waiting for connect wallet...</h3></div>
    <div><h3>ContractName: {{contractName}}</h3></div>
    <div><h3>ContractAddress: <a href="{{&blockchainExplorer}}address/{{contractAddress}}" target="_blank">{{contractAddress}}</a></h3></div>
    
    <h1>Read Functions</h1>

    {{&readCodeHTML}}

    <h1>Write Functions</h1>

    {{&writeCodeHTML}}
    
    <h1>Events</h1>
    
    {{&eventsCodeHTML}}
  </body>
</html>
`;

export const INDEX_JS: string = `
const http = require("http");
const fs = require("fs").promises;

const requestListener = function (req, res) {
  fs.readFile(__dirname + "/index.html")
    .then((contents) => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
    });
};

const server = http.createServer(requestListener);

let port = 3003;
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    port += 1;
    server.listen(port, "localhost");
  }
});

server.listen(port, "localhost", () => {
  console.log("Server is running on http://localhost:" + port);
});
`;
