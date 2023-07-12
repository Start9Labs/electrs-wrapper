# Sparrow Integration Setup

Note: You will need to be running Tor on your device, find guides to set this up here: https://start9.com/latest/user-manual/connecting/connecting-tor/tor-os/index

1. Open Sparrow and go to "File -> Preferences -> Server," or if you are running for the first time, proceed through the introduction until the screen below. Then select "Configure Server."

   ![Configure Server](./assets/sparrow0.png)

1. On the following screen, select "Private Electrum Server."

   ![Electrum Server](./assets/sparrow1.png)

1. Enter your electrs Hostname and Port (found in StartOS's electrs service page, under "Properties"). Enable "Use Proxy" and then enter "127.0.0.1" for the address and "9050" for the port.

   ![Server Setup](./assets/sparrow2.png)

1. Click "Test Connection."

   ![Test](./assets/sparrow3.png)

1. You should see the success message below, then you may return to your wallet, or proceed to create a new one.

   ![Success](./assets/sparrow4.png)
