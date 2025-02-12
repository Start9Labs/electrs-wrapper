import { compat, types as T } from "../deps.ts";

export const migration: T.ExpectedExports.migration =
  compat.migrations.fromMapping(
    {
      "0.9.14.2": {
        up: compat.migrations.updateConfig(
          (config: any) => {
            return {
              "electrum-tor-address": config["electrum-tor-address"],
              ...config.bitcoind,
              ...config.advanced,
            };
          },
          true,
          { version: "0.9.14.2", type: "up" }
        ),
        down: compat.migrations.updateConfig(
          (config: any) => {
            return {
              "electrum-tor-address": config["electrum-tor-address"],
              bitcoind: {
                user: config.user,
                password: config.password,
              },
              advanced: {
                "log-filters": config["log-filters"],
                "index-batch-size": config["index-batch-size"],
                "index-lookup-limit": config["index-lookup-limit"],
              },
            };
          },
          true,
          { version: "0.9.14.2", type: "down" }
        ),
      },
      "0.10.8.1": {
        up: compat.migrations.updateConfig(
          (config: any) => {
            switch (config.type) {
              case "internal-proxy":
                config.type = "bitcoind-proxy";
                break;
              default:
                config.type = "bitcoind";
                break;
            }
            config.bitcoind = {
              type: config.type,
              username: config.user,
              password: config.password,
            };

            delete config.user;
            delete config.password;

            return config;
          },
          true,
          { version: "0.10.8.1", type: "up" }
        ),
        down: compat.migrations.updateConfig(
          (config: any) => {
            switch (config.bitcoind.type) {
              case "bitcoind-proxy":
                config.type = "internal-proxy";
                break;
              default:
                config.type = "internal";
                break;
            }
            config.user = config.bitcoind.username;
            config.password = config.bitcoind.password;

            delete config.bitcoind;

            return config;
          },
          true,
          { version: "0.10.8.1", type: "down" }
        ),
      },
    },
    "0.10.9.1"
  );
