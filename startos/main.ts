import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { port } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Electrs!')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  const primaryContainer = await sdk.SubContainer.of(
    effects,
    { id: 'electrs' },
    'primary',
  )

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */

  const syncCheck = sdk.HealthCheck.of(effects, {
    name: 'Sync Progress',
    fn: async () => {
      // @TODO write function
      return { message: 'health check succeeded', result: 'success' }
    },
  })

  const healthReceipts: T.HealthReceipt[] = [syncCheck]

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started, healthReceipts).addDaemon('primary', {
    subcontainer: primaryContainer,
    command: ['electrs'],
    mounts: sdk.Mounts.of()
      .addVolume('main', null, '/data', false)
      .addDependency('bitcoind', 'main', '/.bitcoin', '/.bitcoin', true),
    ready: {
      display: 'Electrum Server',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, port, {
          successMessage: 'Electrum server is ready and accepting connections',
          errorMessage: 'Electrum server is unreachable',
        }),
    },
    requires: [],
  })
})
