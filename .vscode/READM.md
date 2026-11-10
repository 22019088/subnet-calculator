# Subnet Calculator

A simple web tool that calculates subnet details from an IP address and a prefix length (CIDR notation).

**Live demo:** [https://github.com/22019088]


## What it does

Enter an IP address such as `192.168.1.0` and a prefix such as `24`, and the tool shows:

- Network address
- Broadcast address
- First and last usable IP addresses
- Number of usable devices

## How to use it

1. Open the live demo, or open `index.html` in your browser.
2. Type an IP address and a prefix (0 to 32).
3. Click **Calculate**.

Example: `192.168.1.0/26` gives broadcast `192.168.1.63` and 62 usable devices.

## How it works

The IP address is converted into one number. The prefix tells the tool how many of the 32 bits belong to the network, so the number of devices is `2^(32 - prefix) - 2`. The two reserved addresses are the network address and the broadcast address. Invalid input shows an error message instead of breaking the page.

## Built with

HTML, CSS and JavaScript.

## What I learned

- How IP addressing and subnetting work
- How CIDR prefixes divide a network into smaller networks
- Validating user input and handling errors
- Using Git and GitHub, and publishing with GitHub Pages

## Author

Tendani Singo, BSc Computer Science graduate.