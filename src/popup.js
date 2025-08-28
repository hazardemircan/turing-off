document.addEventListener("DOMContentLoaded", () => {
  const version = chrome.runtime.getManifest().version;
  const versionSpan = document.getElementById("versionText");
  if (versionSpan) {
    versionSpan.textContent = `v${version}`;
  }

  const toggleSwitch = document.getElementById("toggleBlocking");
  const statusText = document.getElementById("statusText");
  const statusQuote = document.getElementById("statusQuote");
  const themeToggle = document.getElementById("themeToggle");

  initializeTheme();

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    applyTheme(newTheme);
    saveTheme(newTheme);
  });

  function initializeTheme() {
    chrome.storage.sync.get(["theme"], (result) => {
      let savedTheme = result.theme;
      
      if (!savedTheme) {
        savedTheme = detectSystemTheme();
        saveTheme(savedTheme);
      }
      
      applyTheme(savedTheme);
    });
  }

  function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    } else {
      return "light";
    }
  }

  function applyTheme(theme) {
    const themeIcon = document.getElementById("themeIcon");
    
    if (theme === "light") {
      document.body.classList.add("light-mode");
      if (themeIcon) themeIcon.src = "./icons/dark-mode-icon.png";
    } else {
      document.body.classList.remove("light-mode");
      if (themeIcon) themeIcon.src = "./icons/light-mode-icon.png";
    }
    
    const currentStatus = statusText.textContent;
    const isEnabled = currentStatus === "Blocking Enabled";
    updateStatusTextColor(isEnabled);
  }

  function saveTheme(theme) {
    chrome.storage.sync.set({ theme: theme });
  }

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

  function updateStatusTextColor(isEnabled) {
    const isLightMode = document.body.classList.contains("light-mode");
    const greenColor = isLightMode ? "#08CB00" : "#4CAF50";
    const redColor = isLightMode ? "#d32f2f" : "#f44336";
    
    statusText.style.color = isEnabled ? greenColor : redColor;
  }

  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled
      ? "Blocking Enabled"
      : "Blocking Disabled";
    
    updateStatusTextColor(isEnabled);

    statusQuote.textContent = isEnabled
      ? '"The machines are quiet now. Enjoy the silence."'
      : '"Just say no to neural dependencies."';
  }
});
