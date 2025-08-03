const AI_DOMAINS = [
  "openai.com",
  "chatgpt.com",
  "gemini.google",
  "perplexity.ai",
  "anthropic.com",
  "coze.com",
  "copilot.microsoft.com",
  "chat.lmsys.org",
  "character.ai",
  "jasper.ai",
  "replika.com",
  "copy.ai"
];

// Special regex rule for Gemini on Google search
const GOOGLE_GEMINI_REGEX = "google\\.com/search\\?q=.*gemini";

// State toggle for whether AI sites are blocked or not
let isBlockingEnabled = false;

/**
 * Generates blocking rules based on the current extension ID.
 * Each rule redirects AI domains to our custom blocked.html.
 */
function generateRules(extensionId) {
  const rules = [];
  const redirectUrl = `chrome-extension://${extensionId}/blocked.html`;

  // Generate a rule for direct domain blocking
  AI_DOMAINS.forEach((domain, index) => {
    rules.push({
      id: index + 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          url: redirectUrl,
        },
      },
      condition: {
        urlFilter: domain,
        resourceTypes: [
          "main_frame",
          "sub_frame",
          "script",
          "xmlhttprequest",
          "websocket",
          "other",
          "font",
          "image",
          "stylesheet",
        ],
      },
    });
  });

  // Add an extra rule to catch Gemini searches on Google
  rules.push({
    id: AI_DOMAINS.length + 1,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        url: redirectUrl,
      },
    },
    condition: {
      regexFilter: GOOGLE_GEMINI_REGEX,
      resourceTypes: [
        "main_frame",
        "sub_frame",
        "script",
        "xmlhttprequest",
        "websocket",
        "other",
        "font",
        "image",
        "stylesheet",
      ],
    },
  });

  return rules;
}

/**
 * Updates the blocking rules based on the current state.
 * Handles adding/removing rules dynamically using Chrome's declarativeNetRequest API.
 */
async function updateBlocking() {
  const extensionId = chrome.runtime.id;
  if (!extensionId) {
    console.error("TuringOff: Extension ID not available yet.");
    return;
  }

  // Generate rules with the actual extension ID
  const newRules = generateRules(extensionId);

  try {
    // Always clear any existing rules first to prevent duplicates
    const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleIdsToRemove = currentRules.map((rule) => rule.id);
    if (ruleIdsToRemove.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIdsToRemove,
      });
    }

    if (isBlockingEnabled) {
      // Add the new rules
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: newRules,
      });
    }
  } catch (error) {
    console.error("TuringOff: Error updating blocking rules:", error);
  }
}

// Runs on install/update to sync the stored toggle state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("isBlockingEnabled", (data) => {
    if (typeof data.isBlockingEnabled === "boolean") {
      isBlockingEnabled = data.isBlockingEnabled;
    }
    updateBlocking(); // Apply the loaded state
  });
});

// Listen to messages from popup.js to toggle blocking or report current state
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleBlocking") {
    isBlockingEnabled = !isBlockingEnabled;

    chrome.storage.sync.set({ isBlockingEnabled: isBlockingEnabled }, () => {
      updateBlocking();
      sendResponse({ isBlockingEnabled: isBlockingEnabled }); // Send back the new state
    });

    return true; // Needed because response is async
  }

  if (request.action === "getBlockingState") {
    sendResponse({ isBlockingEnabled: isBlockingEnabled });
  }
});

// One-time run in case the service worker is reloaded
updateBlocking();
