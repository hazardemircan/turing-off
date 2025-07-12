 
 const RULESET_ID = "ruleset_1"

  let isBlockingEnabled = true; // Default to enabled
  
  // Function to update the blocking state
function updateBlocking() {
  if (isBlockingEnabled) {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [RULESET_ID],
      disableRulesetIds: []
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error enabling ruleset:", chrome.runtime.lastError);
      } else {
        console.log("TuringOff: Enabled blocking rules.");
      }
    });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [],
      disableRulesetIds: [RULESET_ID]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error disabling ruleset:", chrome.runtime.lastError);
      } else {
        console.log("TuringOff: Disabled blocking rules.");
      }
    });
  }
}
  
// Load the stored state when the service worker starts
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("isBlockingEnabled", (data) => {
    if (data.isBlockingEnabled !== undefined) {
      isBlockingEnabled = data.isBlockingEnabled;
    }
    updateBlocking(); // Apply the loaded state
  });
});

// Listen for messages from the popup to change the state
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleBlocking") {
    isBlockingEnabled = !isBlockingEnabled;
    chrome.storage.sync.set({ isBlockingEnabled: isBlockingEnabled }, () => {
      updateBlocking();
      sendResponse({ isBlockingEnabled: isBlockingEnabled }); // Send back the new state
    });
    return true; // Indicate that sendResponse will be called asynchronously
  } else if (request.action === "getBlockingState") {
    sendResponse({ isBlockingEnabled: isBlockingEnabled });
  }
});

// Initial setup when the service worker becomes active
updateBlocking();