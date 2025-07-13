document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleBlocking');
    const statusText = document.getElementById('statusText');

    // Request the current blocking state from the background script
    chrome.runtime.sendMessage({ action: "getBlockingState" }, (response) => {
        if (response) {
            toggleSwitch.checked = response.isBlockingEnabled;
            updateStatusText(response.isBlockingEnabled);
        }
    });

    // Listen for changes on the toggle switch
    toggleSwitch.addEventListener('change', () => {
        const isEnabled = toggleSwitch.checked;
        // Send a message to the background script to toggle blocking
        chrome.runtime.sendMessage({ action: "toggleBlocking" }, (response) => {
            if (response) {
                updateStatusText(response.isBlockingEnabled);
            }
        });
    });

    function updateStatusText(isEnabled) {
        statusText.textContent = isEnabled ? "Blocking Enabled" : "Blocking Disabled";
        statusText.style.color = isEnabled ? "#4CAF50" : "#f44336"; // Green for enabled, red for disabled
    }
});