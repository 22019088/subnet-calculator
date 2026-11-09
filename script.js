const ipInput = document.getElementById("ip");
const prefixInput = document.getElementById("prefix");
const button = document.getElementById("calculate");
const errorBox = document.getElementById("error");
const resultsBox = document.getElementById("results");

// Turns "192.168.1.0" into one big number. Returns null if it isn't a valid IP.
function ipToNumber(ip) {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;

  let number = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return null;
    const value = Number(part);
    if (value > 255) return null;
    number = number * 256 + value;
  }
  return number;
}

// Turns the big number back into something like "192.168.1.0".
function numberToIp(number) {
  return [
    Math.floor(number / 16777216) % 256,
    Math.floor(number / 65536) % 256,
    Math.floor(number / 256) % 256,
    number % 256
  ].join(".");
}

function calculate() {
  errorBox.textContent = "";
  resultsBox.innerHTML = "";

  const ipNumber = ipToNumber(ipInput.value);
  const prefix = Number(prefixInput.value);

  if (ipNumber === null) {
    errorBox.textContent = "Enter a valid IP address, like 192.168.1.0.";
    return;
  }
  if (prefixInput.value === "" || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    errorBox.textContent = "Enter a prefix between 0 and 32.";
    return;
  }

  const hostBits = 32 - prefix;
  const totalAddresses = Math.pow(2, hostBits);
  const network = Math.floor(ipNumber / totalAddresses) * totalAddresses;
  const broadcast = network + totalAddresses - 1;
  const usable = Math.max(totalAddresses - 2, 0);

  let firstUsable = "n/a";
  let lastUsable = "n/a";
  if (totalAddresses > 2) {
    firstUsable = numberToIp(network + 1);
    lastUsable = numberToIp(broadcast - 1);
  }

  resultsBox.innerHTML =
    "<p><strong>Network address:</strong> " + numberToIp(network) + "</p>" +
    "<p><strong>Broadcast address:</strong> " + numberToIp(broadcast) + "</p>" +
    "<p><strong>First usable:</strong> " + firstUsable + "</p>" +
    "<p><strong>Last usable:</strong> " + lastUsable + "</p>" +
    "<p><strong>Usable devices:</strong> " + usable + "</p>";
}

button.addEventListener("click", calculate);