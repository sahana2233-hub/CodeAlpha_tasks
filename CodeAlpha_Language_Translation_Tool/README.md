# OmniTranslate - Language Translation Tool

A modern, responsive, and feature-rich **Language Translation Tool** built using HTML5, CSS3, and modern JavaScript.

![OmniTranslate Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80)

---

## 🚀 Features

- **Intuitive Dual-Panel Interface**: Clean Google Translate / DeepL-style side-by-side translation layout with quick language selection chips and a searchable 70+ language catalog.
- **Multiple Translation Engines**:
  - **Google Translate (Free Default)**: Works right out of the box with zero API keys or configuration.
  - **MyMemory API (Fallback)**: Automatic fallback if Google Translate is unavailable.
  - **Google Cloud Translation API v2**: Connect your own Google Cloud API key in settings.
  - **Microsoft Azure Translator v3**: Connect your Azure Cognitive Services subscription key.
- **Text-to-Speech (TTS)**: Listen to both input and translated text pronounced with natural, native-accented speech voices using the Web Speech API.
- **Voice Dictation (Speech-to-Text)**: Speak directly into your microphone to populate the text box without typing.
- **One-Click Copy**: Copy translated text or source text to the clipboard with animated toast notifications.
- **Instant Language Swap ($\rightleftharpoons$)**: Swaps source and target languages as well as text content.
- **Live Counters**: Real-time character and word count tracking.
- **Dark / Light Mode**: Beautiful themes with persistent preference storage.
- **Translation History**: Automatically stores recent translations in `localStorage` for quick re-use.
- **Keyboard Shortcuts**:
  - `Ctrl + Enter`: Trigger immediate translation.
  - `Escape`: Clear source text.

---

## 📁 Project Structure

```
language-translation-tool/
├── index.html       # Semantic HTML layout and modals
├── style.css        # Responsive styling and dark/light themes
├── languages.js     # 70+ languages database with voice locale tags
├── app.js           # Translation engines, Web Speech, and UI controller
└── README.md        # Documentation and guide
```

---

## 🖥️ How to Run

No installations (Node.js or Python) are required!

1. Navigate to the project directory:
   ```
   C:\Users\hp\.gemini\antigravity\scratch\language-translation-tool
   ```
2. Double-click **`index.html`** or right-click and choose **Open with > Google Chrome** (or **Microsoft Edge**).
3. Start typing or speaking to translate across 70+ languages!

---

## 🛠️ Configuration (Optional)

Click the **⚙️ (Settings)** icon in the top navigation bar to switch translation engines or add official Google Cloud / Microsoft Azure Translator API keys.
