import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rmdir } from 'fs/promises'

export const v0_10_8_1 = VersionInfo.of({
  version: '0.10.8:1',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      await rmdir('start9/config.yaml') // @TODO relative path?
    },
    down: IMPOSSIBLE,
  },
})
