import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  bitcoind: {
    healthChecks: [],
    kind: 'running',
    versionRange: '>=28.1',
  },
}))
