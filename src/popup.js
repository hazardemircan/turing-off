document.addEventListener("DOMContentLoaded", () => {
  const version = chrome.runtime.getManifest().version;
  const versionSpan = document.getElementById("versionText");
  if (versionSpan) {
    versionSpan.textContent = `v${version}`;
  }

  const toggleSwitch = document.getElementById("toggleBlocking");
  const statusText = document.getElementById("statusText");
  const statusQuote = document.getElementById("statusQuote");

  // Request the current blocking state from the background script
  chrome.runtime.sendMessage({ action: "getBlockingState" }, (response) => {
    if (response) {
      toggleSwitch.checked = response.isBlockingEnabled;
      updateStatusText(response.isBlockingEnabled);
    }
  });

  // Listen for changes on the toggle switch
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked;
    // Send a message to the background script to toggle blocking
    chrome.runtime.sendMessage({ action: "toggleBlocking" }, (response) => {
      if (response) {
        updateStatusText(response.isBlockingEnabled);
      }
    });
  });

  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled
      ? "Blocking Enabled"
      : "Blocking Disabled";
    statusText.style.color = isEnabled ? "#4CAF50" : "#f44336"; // Green for enabled, red for disabled

    statusQuote.textContent = isEnabled
      ? '"The machines are quiet now. Enjoy the silence."'
      : "“Just say no to neural dependencies.”";
  }
});
