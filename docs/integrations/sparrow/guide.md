# Sparrow Integration Setup

Note: At least on Linux and MacOS, you will need to NOT be running a native Tor on your device for Sparrow to connect to a .onion address.  Please shut down Tor if it is running:

    Linux: sudo systemctl stop tor
    
    MacOS: sudo brew services stop tor

1. Open Sparrow and go to "File -> Preferences -> Server," or if you are running for the first time, proceed through the introduction until the screen below.  Then select "Configure Server."

    ![Configure Server](./assets/sparrow0.png)

1. On the following screen, select "Private Electrum Server."

    ![Electrum Server](./assets/sparrow1.png)
    
1. Enter your electrs Tor address (found in your Embassy's electrs service page, under "Interfaces"), removing the "http://" prefix.  Sparrow ships with Tor built in, and it will detect whether it needs to employ it or not once you enter a .onion hostname into the Electrum server URL text field.  Please ensure that "Use Proxy" is disabled at first.

    ![Server Setup](./assets/sparrow2.png)

1. Click "Test Connection."  Sparrow may or may not automatically enable the ``Use Proxy`` option.
    
    ![Test](./assets/sparrow3.png)

1. You should see a success message similar to the one below, then you may return to your wallet, or proceed to create a new one.

    ![Success](./assets/sparrow4.png)
