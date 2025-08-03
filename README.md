# 🧠 TuringOff - AI Blocker

> A local firewall for your consciousness.

**TuringOff** is a Chrome extension that blocks AI chatbot websites to encourage manual thinking and reduce dependency on artificial intelligence for problem-solving. Because thinking is *still* legal.

## 🎯 Features

- **Smart AI Detection**: Blocks major AI chatbot platforms including OpenAI ChatGPT, Google Gemini, Perplexity AI, Anthropic Claude, and more
- **Toggle Control**: Easy on/off switch via browser popup
- **Humorous Blocking Page**: Custom blocked page with witty messages and Alan Turing quotes
- **Persistent Settings**: Remembers your blocking preferences across browser sessions
- **Lightweight**: Minimal resource usage with efficient background processing

## 🚫 Blocked Platforms

The extension currently blocks access to:

- OpenAI (ChatGPT)
- Google Gemini (including search integration)
- Perplexity AI
- Anthropic Claude
- Microsoft Copilot
- Coze
- LMSYS Chat Arena
- Character AI
- Copy AI
- Replika
- Jasper

## 🛠 Installation

### From Chrome Web Store
1. Visit the [TuringOff Chrome Web Store page](https://chromewebstore.google.com/detail/TuringOff-ai-blocker/gdfghejnpofikgbjgljnacafgflijkbd)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension will appear in your browser toolbar

## 🎮 Usage

1. **Toggle Blocking**: Click the TuringOff icon in your browser toolbar to open the popup
2. **Enable/Disable**: Use the toggle switch to turn AI blocking on or off
3. **Status Monitoring**: The popup shows current blocking status with themed quotes
4. **Blocked Page**: When you try to access a blocked AI site, you'll see a custom page with:
   - Humorous messages about thinking manually
   - Alan Turing quotes for inspiration
   - A "Return to Manual Mode" button that redirects to Stack Overflow

## 🏗 Technical Architecture

### Core Components

- **`background.js`**: Service worker that manages blocking rules using Chrome's declarativeNetRequest API
- **`popup.html/js`**: Browser action popup for controlling the extension
- **`blocked.html/js`**: Custom page shown when AI sites are blocked
- **`manifest.json`**: Extension configuration and permissions

### Key Features

- **Dynamic Rule Management**: Rules are added/removed based on toggle state
- **Regex Filtering**: Special handling for Gemini searches on Google
- **State Persistence**: Uses Chrome storage API to remember settings
- **Resource Blocking**: Blocks multiple resource types (frames, scripts, requests, etc.)

## 🎨 Customization

### Adding New AI Domains
Edit the `AI_DOMAINS` array in `background.js`:

```javascript
const AI_DOMAINS = [
  "openai.com",
  "chatgpt.com",
  // Add your domain here
  "newai-site.com",
];
```

### Custom Messages
Modify `messages.json` to add new sarcastic messages:

```json
{
  "messages": [
    {
      "main": "Your custom main message",
      "subtitle": "Your witty subtitle"
    }
  ]
}
```

### Styling
Update `blocked.html` CSS or `popup.css` to customize the appearance.

## 📋 Permissions

The extension requires these permissions:

- **`declarativeNetRequest`**: To block AI websites
- **`storage`**: To save your blocking preferences

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Ideas for Contributions

- Add support for new AI platforms
- Improve the blocking detection logic
- Enhance the user interface
- Add productivity features (timers, statistics)
- Implement whitelist functionality

## 🐛 Troubleshooting

**Extension not blocking sites?**
- Check if the toggle is enabled in the popup
- Try refreshing the page after enabling
- Verify the extension has proper permissions

**Popup not opening?**
- Check if the extension is enabled in `chrome://extensions/`
- Try reloading the extension

**Custom messages not showing?**
- Ensure `messages.json` is properly formatted
- Check browser console for errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Chrome Web Store Listing](https://chromewebstore.google.com/detail/TuringOff-ai-blocker/gdfghejnpofikgbjgljnacafgflijkbd)

---

*"We can only see a short distance ahead, but we can see plenty there that needs to be done."* — Alan Turing

**TuringOff v1.0** - Proudly analog since 2025.
