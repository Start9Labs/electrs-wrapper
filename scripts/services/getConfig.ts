import { types as T, compat } from "../deps.ts";


export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "electrum-tor-address": {
    "name": "Electrum Tor Address",
    "description": "The Tor address for the electrum interface.",
    "type": "pointer",
    "subtype": "package",
    "package-id": "electrs",
    "target": "tor-address",
    "interface": "electrum"
  },
  "bitcoind": {
    "type": "union",
    "name": "Bitcoin Core",
    "description": "The Bitcoin Core node to connect to",
    "tag": {
      "id": "type",
      "name": "Type",
      "variant-names": {
        "internal": "Bitcoin Core",
        "internal-proxy": "Bitcoin Proxy",
      },
      "description": "Options<ul><li>Bitcoin Core: the Bitcoin Core node installed on your Embassy</li><li>Bitcoin Proxy: the Bitcoin Proxy service installed on your Embassy</li></ul>",
    },
    "default": "internal-proxy",
    "variants": {
      "internal": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.username"
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.password"
        }
      },
      "internal-proxy": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for the RPC user allocated to electrs",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": "$.users[?(@.name == \"electrs\")].name"
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for the RPC user allocated to electrs",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": "$.users[?(@.name == \"electrs\")].password"
        }
      }
    }
  },
  "advanced": {
    "type": "object",
    "name": "Advanced",
    "description": "Advanced settings for Bitcoin Proxy",
    "spec": {
      "log-filters": {
        "type": "enum",
        "name": "Log Filters",
        "values": [
          "ERROR",
          "WARN",
          "INFO",
          "DEBUG",
          "TRACE"
        ],
        "value-names": {
          "ERROR": "Error",
          "WARN": "Warning",
          "INFO": "Info",
          "DEBUG": "Debug",
          "TRACE": "Trace"
        },
        "default": "INFO"
      },
      "index-batch-size": {
        "type": "number",
        "name": "Index Batch Size",
        "description": "Maximum number of blocks to request from bitcoind per batch\n",
        "nullable": true,
        "range": "[1,10000]",
        "integral": true,
        "units": "blocks"
      },
      "index-lookup-limit": {
        "type": "number",
        "name": "Index Lookup Limit",
        "description": "Number of transactions to lookup before returning an error, to prevent 'too popular' addresses from causing the RPC server to get stuck (0 - disable the limit)\"\n",
        "nullable": true,
        "range": "[1,10000]",
        "integral": true,
        "units": "transactions"
      }
    }
  }
})
