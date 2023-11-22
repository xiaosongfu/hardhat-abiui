export const READ_FUNCTIONS_JS: string = `
{{#readFunctions}}
const {{name}}QueryBtn = document.getElementById("{{name}}_query_btn");
const {{name}}Outputs = document.getElementById("{{name}}_outputs");
{{name}}QueryBtn.addEventListener("click", async () => {
  {{name}}QueryBtn.innerText = "Querying...";
  {{name}}QueryBtn.disabled = "disabled";
  {{name}}Outputs.innerText = "";
 {{#hasInputs}}
  {{#inputs}}
  const {{fn}}_{{name}}_input = document.getElementById("{{fn}}_{{name}}_input").value;
  {{/inputs}}
  if ({{#inputs}}{{fn}}_{{name}}_input.toString().length === 0 || {{/inputs}} false) {
    {{name}}Outputs.innerText = "Invalid input(s)";
    {{name}}QueryBtn.innerText = "Query";
    {{name}}QueryBtn.disabled = "";
    return;
  }
  const result = await contract.{{name}}({{#inputs}}{{fn}}_{{name}}_input, {{/inputs}} {});
  {{/hasInputs}}
  {{^hasInputs}}
  const result = await contract.{{name}}();
  {{/hasInputs}}
  {{name}}Outputs.innerText = "result: " + result.toString();
  {{name}}QueryBtn.innerText = "Query";
  {{name}}QueryBtn.disabled = "";
});
{{/readFunctions}}
`;

export const WRITE_FUNCTIONS_JS: string = `
{{#writeFunctions}}
const {{name}}ExecuteBtn = document.getElementById("{{name}}_execute_btn");
const {{name}}Outputs = document.getElementById("{{name}}_outputs");
{{name}}ExecuteBtn.addEventListener("click", async () => {
  {{name}}ExecuteBtn.innerText = "Executing...";
  {{name}}ExecuteBtn.disabled = "disabled";
  {{name}}Outputs.innerText = "";
  {{#hasInputs}}
  {{#inputs}}
  const {{fn}}_{{name}}_input = document.getElementById("{{fn}}_{{name}}_input").value;
  {{/inputs}}
  if ({{#inputs}}{{fn}}_{{name}}_input.toString().length === 0 || {{/inputs}} false) {
    {{name}}Outputs.innerText = "Invalid input(s)";
    {{name}}ExecuteBtn.innerText = "Execute";
    {{name}}ExecuteBtn.disabled = "";
    return;
  }
  try {
    const tx = await contract.{{name}}({{#inputs}}{{fn}}_{{name}}_input, {{/inputs}} {});
  {{/hasInputs}}
  {{^hasInputs}}
  try {
    const tx = await contract.{{name}}();
  {{/hasInputs}}
    {{name}}ExecuteBtn.innerText = "Waiting Tx confirm...";
    {{name}}Outputs.innerHTML = 'txHash: <a href="{{&blockchainExplorer}}' + tx.hash + '" target="_blank">' + tx.hash + '</a>';
    await tx.wait();
    {{name}}Outputs.innerHTML = {{name}}Outputs.innerHTML + "<br />&nbsp;&nbsp;" + "Tx confirmed, execute success!";
  } catch (e) {
    {{name}}Outputs.innerText = "Tx failed: " + e.message;
  }
  {{name}}ExecuteBtn.innerText = "Execute";
  {{name}}ExecuteBtn.disabled = "";
});
{{/writeFunctions}}
`;

export const EVENT_JS: string = `
{{#events}}
const btn{{name}}Query = document.getElementById("{{name}}_query_btn");
    btn{{name}}Query.addEventListener("click", async () => {
      const filter{{name}} = contract.filters.{{name}}();
      const events{{name}} = await contract.queryFilter(filter{{name}});
      console.log(">>> '{{name}}' history events inputs=[{{#inputs}}{{name}}, {{/inputs}}]:");
      events{{name}}.forEach((event) => {
        const result = contract.interface.decodeEventLog(
          "{{name}}",
          event.data,
          event.topics,
        );
        console.log(
          // "History 'Transfer' Event:" + result[0] + ", " + result[1] + ", " + result[2] + ", " + event.blockNumber,
          "History '{{name}}' Event: " + {{#inputsIndex}}result[{{.}}] + ", " + {{/inputsIndex}}event.blockNumber,
        );
      });
    });

    const btn{{name}}On = document.getElementById("{{name}}_on_btn");
    btn{{name}}On.addEventListener("click", async () => {
      console.log("~~~ start listen '{{name}}' event inputs=[{{#inputs}}{{name}}, {{/inputs}}]");

      btn{{name}}On.innerText = "Listening";
      btn{{name}}On.disabled = "disabled";

      await contract.on("{{name}}", ({{#inputs}}{{name}}, {{/inputs}}event) => {
        console.log(
          // "New 'Transfer' Event: " + from + ", " + to + ", " + amount + ", " + event.log.blockNumber,
          "New '{{name}}' Event: " + {{#inputs}}{{name}} + ", " + {{/inputs}}event.log.blockNumber,
        );
      });
    });
    const btn{{name}}Off = document.getElementById("{{name}}_off_btn");
    btn{{name}}Off.addEventListener("click", async () => {
      console.log("--- stop listen '{{name}}' event");

      btn{{name}}On.innerText = "Start Listen New Event";
      btn{{name}}On.disabled = "";

      await contract.off("{{name}}");
    });
{{/events}}
`;

export const READ_FUNCTIONS_HTML: string = `
{{#readFunctions}}
<div id="{{name}}_function_div" style="border: 2px solid orange; border-radius: 8px; padding: 16px; margin: 8px">
  <h3 id="{{name}}">{{name}}</h3>
  <div id="{{name}}_input_div">
  {{#hasInputs}}
    Inputs:<br />
    {{#inputs}}
    &nbsp;&nbsp;<label for="{{fn}}_{{name}}_input">{{name}}({{type}}): </label>
    <input id="{{fn}}_{{name}}_input" type="text" /><br />
    {{/inputs}}
  {{/hasInputs}}
  </div>
  <button id="{{name}}_query_btn">Query</button>
  <div id="{{name}}_output_div">
    Outputs:<br />
    &nbsp;&nbsp;<span id="{{name}}_outputs"></span>
  </div>
</div>
{{/readFunctions}}
`;

export const WRITE_FUNCTIONS_HTML: string = `
{{#writeFunctions}}
<div id="{{name}}_function_div" style="border: 2px solid gold; border-radius: 8px; padding: 16px; margin: 8px">
  <h3 id="{{name}}">{{name}}</h3>
  <div id="{{name}}_input_div">
  {{#hasInputs}}
    Inputs:<br />
    {{#inputs}}
    &nbsp;&nbsp;<label for="{{fn}}_{{name}}_input">{{name}}({{type}}): </label>
    <input id="{{fn}}_{{name}}_input" type="text" /><br />
    {{/inputs}}
  {{/hasInputs}}
  </div>
  <button id="{{name}}_execute_btn">Execute</button>
  <div id="{{name}}_output_div">
    Outputs:<br />
    &nbsp;&nbsp;<span id="{{name}}_outputs"></span>
  </div>
</div>
{{/writeFunctions}}
`;

export const EVENT_HTML: string = `
{{#events}}
<div style="border: 2px solid antiquewhite; border-radius: 8px; padding: 16px; margin: 8px">
  <h3>{{name}}</h3>
  <div>
    <button id="{{name}}_query_btn">Query History Events</button>
  </div>
  <div>
    <button id="{{name}}_on_btn">Start Listen New Event</button>
    <button id="{{name}}_off_btn">Stop Listen New Event</button>
  </div>
</div>
{{/events}}
`;

export const INDEX_HTML: string = `
<html>
  <head>
    <title>{{contract}} at {{chainName}}</title>
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
    
    <h1>Read</h1>

    {{&readCodeHTML}}

    <h1>Write</h1>

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
