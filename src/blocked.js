// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  setupThemeToggle();
});

function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      applyTheme(newTheme);
      saveTheme(newTheme);
    });
  }
}

function initializeTheme() {
  // Get saved theme preference from Chrome storage
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(["theme"], (result) => {
      let savedTheme = result.theme;
      
      if (!savedTheme) {
        savedTheme = detectSystemTheme();
      }
      
      applyTheme(savedTheme);
    });
  } else {
    const savedTheme = detectSystemTheme();
    applyTheme(savedTheme);
  }
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
}

function saveTheme(theme) {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.set({ theme: theme });
  }
}

function thinkManually(){
    // window.history.back();
    window.location.href="https://stackoverflow.com/"
};

document.querySelector('.btn-think-manually').addEventListener('click', thinkManually);

function surrender(){
     document.getElementById("original-icon").hidden = true;
    document.getElementById("fun-icon").hidden = false;
}

document.querySelector('.btn-surrender').addEventListener('click', surrender);

fetch('./messages.json')
  .then(response => response.json())
  .then(res => {
    const messages = res.messages;
    const random = messages[Math.floor(Math.random() * messages.length)];

    document.querySelector("#main-message").innerHTML = random.main;
    document.querySelector("#sarcasm-message").innerHTML = random.subtitle;
  });



