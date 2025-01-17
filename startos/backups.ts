import { sdk } from './sdk'

export const { createBackup, restoreBackup } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.volumes('main').setOptions({ exclude: ['db'] }), // @TODO relative path?
)
