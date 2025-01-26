import { types as T, matches } from "../deps.ts";

const { shape, arrayOf, number, boolean, string } = matches;

const matchProxyConfig = shape({
  users: arrayOf(
    shape(
      {
        name: string,
        'allowed-calls': arrayOf(string),
        password: string,
        'fetch-blocks': boolean,
      },
      ['fetch-blocks'],
    ),
  ),
})

function times<T>(fn: (i: number) => T, amount: number): T[] {
  const answer = new Array(amount)
  for (let i = 0; i < amount; i++) {
    answer[i] = fn(i)
  }
  return answer
}

function randomItemString(input: string) {
  return input[Math.floor(Math.random() * input.length)]
}

const serviceName = 'electrs'
const fullChars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
type Check = {
  currentError(config: T.Config): string | void
  fix(config: T.Config): void
}

const proxyChecks: Array<Check> = [
  {
    currentError(config) {
      if (!matchProxyConfig.test(config)) {
        return 'Config is not the correct shape'
      }
      if (config.users.some((x) => x.name === serviceName)) {
        return
      }
      return `Must have an RPC user named "${serviceName}"`
    },
    fix(config) {
      if (!matchProxyConfig.test(config)) {
        return
      }
      config.users.push({
        name: serviceName,
        'allowed-calls': [],
        password: times(() => randomItemString(fullChars), 22).join(''),
      })
    },
  },
  ...[
    'estimatesmartfee',
    'getblockchaininfo',
    'getblockcount',
    'getmempoolentry',
    'getnetworkinfo',
    'getrawmempool',
    'getrawtransaction',
  ].map(
    (operator): Check => ({
      currentError(config) {
        if (!matchProxyConfig.test(config)) {
          return 'Config is not the correct shape'
        }
        if (
          config.users
            .find((x) => x.name === serviceName)
            ?.['allowed-calls']?.some((x) => x === operator) ??
          false
        ) {
          return
        }
        return `RPC user "${serviceName}" must have "${operator}" enabled`
      },
      fix(config) {
        if (!matchProxyConfig.test(config)) {
          throw new Error('Config is not the correct shape')
        }
        const found = config.users.find((x) => x.name === serviceName)
        if (!found) {
          throw new Error(`No user ${serviceName} found`)
        }
        found['allowed-calls'] = [...(found['allowed-calls'] ?? []), operator]
      },
    }),
  ),
]

const matchBitcoindConfig = shape({
  rpc: shape({
    enable: boolean,
    advanced: shape({
      threads: number,
    }),
  }),
  advanced: shape({
    peers: shape({
      listen: boolean,
    }),
    pruning: shape({
      mode: string,
    }),
  }),
});

const bitcoindChecks: Array<Check> = [
  {
    currentError(config) {
      if (!matchBitcoindConfig.test(config)) {
        return 'Config is not the correct shape'
      }
      if (!config.rpc.enable) {
        return 'Must have RPC enabled'
      }
      return
    },
    fix(config) {
      if (!matchBitcoindConfig.test(config)) {
        return
      }
      config.rpc.enable = true
    },
  },
  {
    currentError(config) {
      if (!matchBitcoindConfig.test(config)) {
        return 'Config is not the correct shape'
      }
      if (!config.advanced.peers.listen) {
        return 'Must have peer interface enabled'
      }
      return
    },
    fix(config) {
      if (!matchBitcoindConfig.test(config)) {
        return
      }
      config.advanced.peers.listen = true
    },
  },
  {
    currentError(config) {
      if (!matchBitcoindConfig.test(config)) {
        return 'Config is not the correct shape'
      }
      if (config.advanced.pruning.mode !== 'disabled') {
        return 'Pruning must be disabled (must be an archival node)'
      }
      return
    },
    fix(config) {
      if (!matchBitcoindConfig.test(config)) {
        return
      }
      config.advanced.pruning.mode = 'disabled'
    },
  },
]

export const dependencies: T.ExpectedExports.dependencies = {
  'btc-rpc-proxy': {
    // deno-lint-ignore require-await
    async check(effects, configInput) {
      effects.info('check btc-rpc-proxy')
      for (const checker of proxyChecks) {
        const error = checker.currentError(configInput)
        if (error) {
          effects.error(`throwing error: ${error}`)
          return { error }
        }
      }
      return { result: null }
    },
    // deno-lint-ignore require-await
    async autoConfigure(effects, configInput) {
      effects.info('autoconfigure btc-rpc-proxy')
      for (const checker of proxyChecks) {
        const error = checker.currentError(configInput)
        if (error) {
          checker.fix(configInput)
        }
      }
      return { result: configInput }
    },
  },
  bitcoind: {
    // deno-lint-ignore require-await
    async check(effects, configInput) {
      effects.info('check bitcoind')
      for (const checker of bitcoindChecks) {
        const error = checker.currentError(configInput)
        if (error) {
          effects.error(`throwing error: ${error}`)
          return { error }
        }
      }
      return { result: null }
    },
    // deno-lint-ignore require-await
    async autoConfigure(effects, configInput) {
      effects.info('autoconfigure bitcoind')
      for (const checker of bitcoindChecks) {
        const error = checker.currentError(configInput)
        if (error) {
          checker.fix(configInput)
        }
      }
      return { result: configInput }
    },
  },
  'bitcoind-testnet': {
    // deno-lint-ignore require-await
    async check(effects, configInput) {
      effects.info('check bitcoind-testnet')
      for (const checker of bitcoindChecks) {
        const error = checker.currentError(configInput)
        if (error) {
          effects.error(`throwing error: ${error}`)
          return { error }
        }
      }
      return { result: null }
    },
    // deno-lint-ignore require-await
    async autoConfigure(effects, configInput) {
      effects.info('autoconfigure bitcoind-testnet')
      for (const checker of bitcoindChecks) {
        const error = checker.currentError(configInput)
        if (error) {
          checker.fix(configInput)
        }
      }
      return { result: configInput }
    },
  },
};
