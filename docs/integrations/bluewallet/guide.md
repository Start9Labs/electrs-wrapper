# BlueWallet Integration Setup

You will need to be running Tor on your iOS or Android device. Find guides to set this up here:

https://start9.com/latest/user-manual/connecting/connecting-tor/tor-os/index

_NOTE_: The macOS release of BlueWallet cannot connect to a Tor service and is therefore not supported.

1. Select the Settings 'kebab' / ellipsis menu at the top right of the app

1. Select `Network`

1. Select `Electrum Server`

1. Fill in your electrs `Hostname` from the StartOS `Services -> electrs -> Properties` page, to BlueWallet's host field

1. Fill in your electrs `Port` from the StartOS `Services -> electrs -> Properties` page, to BlueWallet's port field. 50001 is electrs' default port.

1. Select 'Save'
