32121# Blockstream Green Integration Setup

Desktop Wallet
--------------

1. Open Blockstream Green and click the gear icon on the bottom left to open the `App Settings`

   ![BlockStreamGreen App Settings](./assets/greendesktop1.png)

1. Click the `Network` button
1. Toggle the `Connect with Tor` to On (Note: you don't need to connect through a proxy, but optionally can connect to your own if you have [set one up](https://docs.start9.com/0.3.5.x/user-manual/connecting-tor#using-native-apps).)

   ![BlockStreamGreen Network](./assets/greendesktop2.png)

1. Click `< Back`, then click `Custom servers and validation`
1. Now toggle `Choose the Electrum servers you trust` to On to display a `Bitcoin Electrum Server` field.
1. Back in your StartOS web interface, go to `Services > Electrs > Properties` and copy the `Quick Connect URL`
1. Switch back to Blockstream Green and paste it into the `Bitcoin Electrum Server` field, **and remove** `:t`

   ![BlockStreamGreen Electrs](./assets/greendesktop3.png)

1. Click `< Back`, then click `X` to close.

> :bulb: **Note:** The current version of Blockstream Green no longer displays the status of your in-app Tor connection, unlike previous versions. This leaves you uncertain about whether you've completed the steps correctly or if any Tor connectivity issues are due to your server or the in-app Tor connection. In some situations, it may be worth connecting to your local proxy from Step 3, as you can verify that with commands.


Mobile Wallet
--------------

1. Open Blockstream Green and tap `App Settings` on the bottom or bottom right
1. Toggle `Connect with Tor` to On
1. Toggle `Personal Electrum Server` to On to display a `Bitcoin Electrum server` field.
1. Back in your StartOS web interface, go to `Services > Electrs > Properties` and copy the `Quick Connect URL`
1. Switch back to Blockstream Green and paste it into the `Bitcoin Electrum Server` field, **and remove** `:t`
1. Tap `Save`

   ![BlockStreamGreen Electrs](./assets/greenmobile1.png)