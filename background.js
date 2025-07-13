const AI_DOMAINS = [
  "openai.com",
  "chatgpt.com",
  "gemini.google",
  "perplexity.ai",
  "anthropic.com",
  "coze.com",
  "copilot.microsoft.com",
  "chat.lmsys.org",
];

// Special regex rule for Gemini on Google search
const GOOGLE_GEMINI_REGEX = "google\\.com/search\\?q=.*gemini";

let BASE_RULES = [];

let isBlockingEnabled = true;
function generateRules(extensionId) {
  const rules = [];
  const redirectUrl = `chrome-extension://${extensionId}/blocked.html`;

  // Add rules for direct domain blocking
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

  // Add the special Google Gemini search rule
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

// Function to update the blocking state
async function updateBlocking() {
  const currentExtensionId = chrome.runtime.id;
  if (!currentExtensionId) {
    console.error("TuringOff: Extension ID not available yet.");
    return;
  }

  // Generate rules with the actual extension ID
  const newRules = generateRules(currentExtensionId);

  try {
    if (isBlockingEnabled) {
      // First, remove any existing dynamic rules to avoid duplicates or conflicts
      const existingRules =
        await chrome.declarativeNetRequest.getDynamicRules();
      const ruleIdsToRemove = existingRules.map((rule) => rule.id);
      if (ruleIdsToRemove.length > 0) {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: ruleIdsToRemove,
        });
        console.log("TuringOff: Removed existing dynamic rules.");
      }

      // Add the new rules
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: newRules,
      });
      console.log("TuringOff: Enabled blocking rules.");
    } else {
      // Disable: remove all currently active dynamic rules
      const existingRules =
        await chrome.declarativeNetRequest.getDynamicRules();
      const ruleIdsToRemove = existingRules.map((rule) => rule.id);
      if (ruleIdsToRemove.length > 0) {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: ruleIdsToRemove,
        });
        console.log(
          "TuringOff: Disabled blocking rules (removed dynamic rules)."
        );
      }
    }
  } catch (error) {
    console.error("TuringOff: Error updating blocking rules:", error);
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
