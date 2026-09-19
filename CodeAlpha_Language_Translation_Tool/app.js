/**
 * OmniTranslate Neural Pro - Advanced Translation Studio
 * Enterprise & Creative Multilingual Translation Controller
 */

(() => {
  // Category Quick Packs Data
  const CATEGORY_PACKS = {
    everyday: [
      { label: "👋 Nice to meet you", text: "Hello! It is a pleasure to meet you today." },
      { label: "🌟 Thank you", text: "Thank you very much for your wonderful support and assistance!" },
      { label: "☕ Coffee chat", text: "Would you like to grab a cup of coffee together sometime?" },
      { label: "🚀 Productive day", text: "Wishing you a highly productive and fantastic day ahead." }
    ],
    business: [
      { label: "📊 Project report", text: "Please find the updated quarterly project report and deliverables attached." },
      { label: "🤝 Follow-up call", text: "Thank you for the productive discussion. Let us schedule a brief follow-up call next Tuesday." },
      { label: "📈 Strategic roadmap", text: "We are pleased to present our executive strategic roadmap for the upcoming fiscal year." },
      { label: "💼 Review contract", text: "Kindly review the finalized contract terms and let us know if any adjustments are needed." }
    ],
    travel: [
      { label: "✈️ Nearest station", text: "Excuse me, could you please guide me to the nearest metro or train station?" },
      { label: "🏨 Hotel check-in", text: "Good evening, I have a hotel room reservation under my name for two nights." },
      { label: "💳 Card payment", text: "Do you accept credit card or contactless digital payments here?" },
      { label: "🍽️ Local restaurant", text: "Could you recommend a genuine local restaurant with traditional cuisine nearby?" }
    ],
    tech: [
      { label: "💻 Review PR", text: "Please review the latest pull request on GitHub once all automated tests pass." },
      { label: "⚙️ 500 error", text: "The production API server returned a 500 internal server error during deployment." },
      { label: "🔒 Secure keys", text: "Ensure all sensitive API keys and secrets are encrypted in the environment variables." },
      { label: "⚡ Latency drop", text: "The distributed caching layer reduced database query latency by over forty percent." }
    ],
    academic: [
      { label: "📚 Hypothesis", text: "The empirical findings robustly corroborate our primary research hypothesis." },
      { label: "🔬 Evidence", text: "Recent peer-reviewed scientific literature provides substantial supporting evidence." },
      { label: "🎓 Methodology", text: "Further longitudinal investigations are necessary to validate this experimental methodology." },
      { label: "📑 Correlation", text: "The multivariate regression analysis indicates a statistically significant correlation." }
    ]
  };

  // DOM Elements
  const sourceTextEl = document.getElementById("sourceText");
  const targetTextEl = document.getElementById("targetText");
  const sourceSelectEl = document.getElementById("sourceSelect");
  const targetSelectEl = document.getElementById("targetSelect");
  const sourceQuickGroupEl = document.getElementById("sourceQuickGroup");
  const targetQuickGroupEl = document.getElementById("targetQuickGroup");
  const swapBtn = document.getElementById("swapBtn");
  const translateBtn = document.getElementById("translateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const charCountEl = document.getElementById("charCount");
  const wordCountEl = document.getElementById("wordCount");
  const targetWordCountEl = document.getElementById("targetWordCount");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIconSun = document.getElementById("themeIconSun");
  const themeIconMoon = document.getElementById("themeIconMoon");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  const engineSelectEl = document.getElementById("engineSelect");
  const apiKeyGroupEl = document.getElementById("apiKeyGroup");
  const apiKeyInputEl = document.getElementById("apiKeyInput");
  const engineIndicatorText = document.getElementById("engineIndicatorText");
  const historyListEl = document.getElementById("historyList");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const tabHistoryRecent = document.getElementById("tabHistoryRecent");
  const tabHistoryFavorites = document.getElementById("tabHistoryFavorites");
  const favsToggleBtn = document.getElementById("favsToggleBtn");
  const favsCountBadge = document.getElementById("favsCountBadge");
  const copyBtn = document.getElementById("copyBtn");
  const copySourceBtn = document.getElementById("copySourceBtn");
  const starBtn = document.getElementById("starBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const speakSourceBtn = document.getElementById("speakSourceBtn");
  const speakTargetBtn = document.getElementById("speakTargetBtn");
  const micBtn = document.getElementById("micBtn");
  const fileUploadInput = document.getElementById("fileUploadInput");
  const sourceAudioWaves = document.getElementById("sourceAudioWaves");
  const targetAudioWaves = document.getElementById("targetAudioWaves");
  const activeToneIndicator = document.getElementById("activeToneIndicator");
  const promptsListContainer = document.getElementById("promptsListContainer");
  const toastContainer = document.getElementById("toastContainer");

  // Application State
  const state = {
    sourceLang: localStorage.getItem("omni_src_lang") || "auto",
    targetLang: localStorage.getItem("omni_tgt_lang") || "es",
    engine: localStorage.getItem("omni_engine") || "google-free",
    apiKey: localStorage.getItem("omni_api_key") || "",
    theme: localStorage.getItem("omni_theme") || "light",
    tone: localStorage.getItem("omni_tone") || "standard",
    activeCategory: "everyday",
    historyTab: "recent", // 'recent' | 'favorites'
    history: JSON.parse(localStorage.getItem("omni_history") || "[]"),
    favorites: JSON.parse(localStorage.getItem("omni_favs") || "[]"),
    isTranslating: false,
    isListening: false,
    speechRecognition: null,
    debounceTimer: null
  };

  // Init Studio
  function init() {
    initTheme();
    populateLanguageSelects();
    renderQuickTabs();
    initSpeechRecognition();
    renderCategoryPrompts(state.activeCategory);
    renderHistory();
    updateFavsBadge();
    attachEventListeners();
    updateCounts();
    updateEngineDisplay();
    updateToneDisplay();
  }

  // Theme Handling
  function initTheme() {
    const isDark = state.theme === "dark" || (!state.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme(isDark);
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      state.theme = "dark";
      if (themeIconSun) themeIconSun.style.display = "block";
      if (themeIconMoon) themeIconMoon.style.display = "none";
      themeToggleBtn.title = "Switch to Light Mode";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      state.theme = "light";
      if (themeIconSun) themeIconSun.style.display = "none";
      if (themeIconMoon) themeIconMoon.style.display = "block";
      themeToggleBtn.title = "Switch to Dark Mode";
    }
  }

  function toggleTheme() {
    const currentIsDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(!currentIsDark);
    localStorage.setItem("omni_theme", state.theme);
  }

  // Populate Dropdown Menus
  function populateLanguageSelects() {
    sourceSelectEl.innerHTML = "";
    targetSelectEl.innerHTML = "";

    LANGUAGES.forEach(lang => {
      const srcOption = document.createElement("option");
      srcOption.value = lang.code;
      srcOption.textContent = `${lang.name} (${lang.native})`;
      sourceSelectEl.appendChild(srcOption);

      if (!lang.sourceOnly) {
        const tgtOption = document.createElement("option");
        tgtOption.value = lang.code;
        tgtOption.textContent = `${lang.name} (${lang.native})`;
        targetSelectEl.appendChild(tgtOption);
      }
    });

    sourceSelectEl.value = state.sourceLang;
    targetSelectEl.value = state.targetLang;
  }

  // Render Top Quick Access Chips
  function renderQuickTabs() {
    sourceQuickGroupEl.innerHTML = "";
    const autoTab = createTab("auto", "Auto Detect", state.sourceLang === "auto", (code) => setSourceLanguage(code));
    sourceQuickGroupEl.appendChild(autoTab);

    QUICK_LANGUAGES.forEach(item => {
      const tab = createTab(item.code, item.name, state.sourceLang === item.code, (code) => setSourceLanguage(code));
      sourceQuickGroupEl.appendChild(tab);
    });

    targetQuickGroupEl.innerHTML = "";
    QUICK_LANGUAGES.forEach(item => {
      const tab = createTab(item.code, item.name, state.targetLang === item.code, (code) => setTargetLanguage(code));
      targetQuickGroupEl.appendChild(tab);
    });
  }

  function createTab(code, label, isActive, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `lang-chip ${isActive ? "active" : ""}`;
    btn.textContent = label;
    btn.addEventListener("click", () => onClick(code));
    return btn;
  }

  function setSourceLanguage(code) {
    state.sourceLang = code;
    sourceSelectEl.value = code;
    localStorage.setItem("omni_src_lang", code);
    renderQuickTabs();
    if (sourceTextEl.value.trim()) debounceTranslate();
  }

  function setTargetLanguage(code) {
    state.targetLang = code;
    targetSelectEl.value = code;
    localStorage.setItem("omni_tgt_lang", code);
    renderQuickTabs();
    if (sourceTextEl.value.trim()) debounceTranslate();
  }

  // Swap Languages & Text
  function swapLanguages() {
    if (state.sourceLang === "auto") {
      showToast("Select a specific source language before swapping.");
      return;
    }

    swapBtn.classList.add("rotated");
    setTimeout(() => swapBtn.classList.remove("rotated"), 400);

    const tempLang = state.sourceLang;
    state.sourceLang = state.targetLang;
    state.targetLang = tempLang;

    sourceSelectEl.value = state.sourceLang;
    targetSelectEl.value = state.targetLang;
    localStorage.setItem("omni_src_lang", state.sourceLang);
    localStorage.setItem("omni_tgt_lang", state.targetLang);
    renderQuickTabs();

    const targetText = targetTextEl.innerText.trim();
    if (targetText && !targetText.startsWith("Translation will appear")) {
      const srcText = sourceTextEl.value;
      sourceTextEl.value = targetText;
      targetTextEl.innerText = srcText;
      updateCounts();
      debounceTranslate();
    }
  }

  // Category Quick Packs
  function renderCategoryPrompts(category) {
    state.activeCategory = category;
    promptsListContainer.innerHTML = "";
    const items = CATEGORY_PACKS[category] || CATEGORY_PACKS.everyday;

    items.forEach(item => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "prompt-chip";
      chip.textContent = item.label;
      chip.addEventListener("click", () => {
        sourceTextEl.value = item.text;
        updateCounts();
        performTranslation();
        sourceTextEl.focus();
        showToast(`Loaded prompt: ${item.label}`);
      });
      promptsListContainer.appendChild(chip);
    });
  }

  // Tone Switcher
  function updateToneDisplay() {
    const toneBtns = document.querySelectorAll(".tone-btn");
    toneBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tone") === state.tone);
    });
    const toneNames = { standard: "Natural", business: "Business", casual: "Casual", academic: "Academic" };
    activeToneIndicator.textContent = `Tone: ${toneNames[state.tone] || "Natural"}`;
  }

  function setTone(tone) {
    state.tone = tone;
    localStorage.setItem("omni_tone", tone);
    updateToneDisplay();
    showToast(`Translation style set to ${tone.toUpperCase()}`);
    if (sourceTextEl.value.trim()) {
      performTranslation();
    }
  }

  // Translation Service
  async function performTranslation() {
    const text = sourceTextEl.value.trim();
    if (!text) {
      targetTextEl.innerHTML = `<span class="output-placeholder">Translation will appear here instantly...</span>`;
      targetWordCountEl.textContent = "0 words";
      starBtn.style.color = "";
      return;
    }

    setLoading(true);

    try {
      let result = "";

      if (state.engine === "google-free") {
        try {
          result = await translateWithGoogleFree(text, state.sourceLang, state.targetLang);
        } catch (err) {
          console.warn("Google Free API failed, falling back to MyMemory API", err);
          result = await translateWithMyMemory(text, state.sourceLang, state.targetLang);
        }
      } else if (state.engine === "mymemory") {
        result = await translateWithMyMemory(text, state.sourceLang, state.targetLang);
      } else if (state.engine === "google-cloud") {
        if (!state.apiKey) throw new Error("Google Cloud API Key is missing. Check Settings.");
        result = await translateWithGoogleCloud(text, state.sourceLang, state.targetLang, state.apiKey);
      } else if (state.engine === "azure") {
        if (!state.apiKey) throw new Error("Microsoft Azure API Key is missing. Check Settings.");
        result = await translateWithAzure(text, state.sourceLang, state.targetLang, state.apiKey);
      }

      // If tone is academic/business, format cleanly
      if (state.tone === "business" || state.tone === "academic") {
        result = result.trim();
      }

      targetTextEl.innerText = result;
      updateTargetCounts(result);
      addToHistory(text, result, state.sourceLang, state.targetLang);
      checkIfStarred(text, result);
    } catch (error) {
      console.error("Translation Error:", error);
      showToast(`Translation error: ${error.message || "Network Error"}`);
      targetTextEl.innerHTML = `<span style="color:#ef4444;">Translation Error: ${escapeHtml(error.message)}</span>`;
    } finally {
      setLoading(false);
    }
  }

  async function translateWithGoogleFree(text, source, target) {
    const sl = source === "auto" ? "auto" : source;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google API returned ${res.status}`);
    const data = await res.json();
    if (data && data[0]) {
      return data[0].map(item => item[0]).join("");
    }
    throw new Error("Unable to parse translation response");
  }

  async function translateWithMyMemory(text, source, target) {
    const sl = source === "auto" ? "en" : source;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(sl)}|${encodeURIComponent(target)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`MyMemory API returned ${res.status}`);
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    throw new Error(data.responseDetails || "MyMemory translation failed");
  }

  async function translateWithGoogleCloud(text, source, target, key) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`;
    const body = { q: text, target: target, format: "text" };
    if (source !== "auto") body.source = source;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Google Cloud Translation failed");
    return data.data.translations[0].translatedText;
  }

  async function translateWithAzure(text, source, target, key) {
    const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${encodeURIComponent(target)}${source !== "auto" ? `&from=${encodeURIComponent(source)}` : ""}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": key, "Content-Type": "application/json" },
      body: JSON.stringify([{ Text: text }])
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Azure Translator failed");
    return data[0].translations[0].text;
  }

  function debounceTranslate() {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => {
      performTranslation();
    }, 550);
  }

  function setLoading(loading) {
    state.isTranslating = loading;
    if (loading) {
      loadingOverlay.classList.add("active");
      translateBtn.disabled = true;
      translateBtn.style.opacity = "0.75";
    } else {
      loadingOverlay.classList.remove("active");
      translateBtn.disabled = false;
      translateBtn.style.opacity = "1";
    }
  }

  // Character and Word Counter
  function updateCounts() {
    const text = sourceTextEl.value;
    const charLen = text.length;
    const wordLen = text.trim() ? text.trim().split(/\s+/).length : 0;
    charCountEl.textContent = `${charLen} chars`;
    wordCountEl.textContent = `${wordLen} words`;
    clearBtn.style.display = charLen > 0 ? "flex" : "none";
  }

  function updateTargetCounts(text) {
    const wordLen = text.trim() ? text.trim().split(/\s+/).length : 0;
    targetWordCountEl.textContent = `${wordLen} words`;
  }

  // Text-To-Speech (TTS)
  function speak(text, langCode, wavesEl) {
    if (!("speechSynthesis" in window)) {
      showToast("Text-to-speech is not supported by this browser.");
      return;
    }

    if (!text || text.startsWith("Translation will appear")) {
      showToast("No text available to read.");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (wavesEl) wavesEl.classList.remove("active");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const langObj = LANGUAGES.find(l => l.code === langCode);
    const voiceLocale = langObj ? langObj.tts : langCode;
    utterance.lang = voiceLocale;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(voiceLocale.substring(0, 2)));
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onstart = () => {
      if (wavesEl) wavesEl.classList.add("active");
      showToast("Playing pronunciation audio...");
    };
    utterance.onend = () => {
      if (wavesEl) wavesEl.classList.remove("active");
    };
    utterance.onerror = () => {
      if (wavesEl) wavesEl.classList.remove("active");
    };

    window.speechSynthesis.speak(utterance);
  }

  // Speech-To-Text (Voice Dictation)
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      micBtn.style.display = "none";
      return;
    }

    state.speechRecognition = new SpeechRecognition();
    state.speechRecognition.continuous = false;
    state.speechRecognition.interimResults = true;

    state.speechRecognition.onstart = () => {
      state.isListening = true;
      micBtn.classList.add("active");
      if (sourceAudioWaves) sourceAudioWaves.classList.add("active");
      showToast("Listening... Speak clearly into microphone");
    };

    state.speechRecognition.onresult = (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join("");
      sourceTextEl.value = transcript;
      updateCounts();
    };

    state.speechRecognition.onerror = (event) => {
      console.warn("Speech error:", event.error);
      stopListening();
      if (event.error !== "no-speech") showToast(`Microphone error: ${event.error}`);
    };

    state.speechRecognition.onend = () => {
      stopListening();
      if (sourceTextEl.value.trim()) performTranslation();
    };
  }

  function toggleVoiceInput() {
    if (!state.speechRecognition) {
      showToast("Voice dictation is not supported in this browser.");
      return;
    }

    if (state.isListening) {
      state.speechRecognition.stop();
      stopListening();
    } else {
      const langObj = LANGUAGES.find(l => l.code === state.sourceLang);
      state.speechRecognition.lang = (langObj && !langObj.sourceOnly) ? langObj.tts : "en-US";
      try {
        state.speechRecognition.start();
      } catch (err) {
        console.warn(err);
      }
    }
  }

  function stopListening() {
    state.isListening = false;
    micBtn.classList.remove("active");
    if (sourceAudioWaves) sourceAudioWaves.classList.remove("active");
  }

  // Copy to Clipboard with animation
  async function copyToClipboard(text, btnEl) {
    if (!text || text.startsWith("Translation will appear")) {
      showToast("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
      if (btnEl) {
        const originalSvg = btnEl.innerHTML;
        btnEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => { btnEl.innerHTML = originalSvg; }, 1600);
      }
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("Copied to clipboard!");
    }
  }

  // Download Translation as .txt
  function downloadTranslation() {
    const src = sourceTextEl.value.trim();
    const tgt = targetTextEl.innerText.trim();
    if (!tgt || tgt.startsWith("Translation will appear")) {
      showToast("No translation to download.");
      return;
    }

    const content = `====================================================\nOmniTranslate Neural Studio Export\n====================================================\nSource (${state.sourceLang.toUpperCase()}):\n${src}\n\nTranslation (${state.targetLang.toUpperCase()}):\n${tgt}\n\nExported: ${new Date().toLocaleString()}\n====================================================\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `translation_${state.sourceLang}_to_${state.targetLang}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Translation downloaded as text file!");
  }

  // Upload .txt file
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      sourceTextEl.value = event.target.result;
      updateCounts();
      performTranslation();
      showToast(`Imported ${file.name}`);
    };
    reader.readAsText(file);
  }

  // Starred / Favorites Logic
  function toggleStarCurrent() {
    const src = sourceTextEl.value.trim();
    const tgt = targetTextEl.innerText.trim();
    if (!tgt || tgt.startsWith("Translation will appear")) {
      showToast("Translate text first to star it.");
      return;
    }

    const existingIndex = state.favorites.findIndex(f => f.src === src && f.tgt === tgt);
    if (existingIndex >= 0) {
      state.favorites.splice(existingIndex, 1);
      starBtn.style.color = "";
      showToast("Removed from Starred Favorites");
    } else {
      state.favorites.unshift({
        id: Date.now(),
        src,
        tgt,
        srcLang: state.sourceLang,
        tgtLang: state.targetLang,
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
      starBtn.style.color = "#eab308";
      showToast("Saved to Starred Favorites ⭐");
    }

    localStorage.setItem("omni_favs", JSON.stringify(state.favorites));
    updateFavsBadge();
    if (state.historyTab === "favorites") renderHistory();
  }

  function checkIfStarred(src, tgt) {
    const isFav = state.favorites.some(f => f.src === src && f.tgt === tgt);
    starBtn.style.color = isFav ? "#eab308" : "";
  }

  function updateFavsBadge() {
    const count = state.favorites.length;
    favsCountBadge.textContent = count;
    favsCountBadge.style.display = count > 0 ? "flex" : "none";
  }

  // History & Favorites Storage & Rendering
  function addToHistory(sourceText, targetText, srcLang, tgtLang) {
    if (!sourceText || !targetText) return;

    if (state.history.length > 0 && state.history[0].src === sourceText && state.history[0].tgt === targetText) {
      return;
    }

    const newItem = {
      id: Date.now(),
      src: sourceText,
      tgt: targetText,
      srcLang: srcLang,
      tgtLang: tgtLang,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    state.history.unshift(newItem);
    if (state.history.length > 20) state.history.pop();
    localStorage.setItem("omni_history", JSON.stringify(state.history));
    if (state.historyTab === "recent") renderHistory();
  }

  function renderHistory() {
    const items = state.historyTab === "recent" ? state.history : state.favorites;

    if (!items || items.length === 0) {
      const emptyMsg = state.historyTab === "recent"
        ? "Your recent translations will automatically appear here."
        : "No starred phrases yet. Click the ⭐ star button on any translation to save it here!";
      historyListEl.innerHTML = `<div class="hist-empty-state">${emptyMsg}</div>`;
      return;
    }

    historyListEl.innerHTML = "";
    items.forEach(item => {
      const isFav = state.favorites.some(f => f.src === item.src && f.tgt === item.tgt);
      const card = document.createElement("div");
      card.className = "history-card-item";
      card.innerHTML = `
        <div class="hist-top-meta">
          <span>${item.srcLang.toUpperCase()} → ${item.tgtLang.toUpperCase()} • ${item.date}</span>
          <span class="hist-fav-star ${isFav ? "starred" : ""}">⭐</span>
        </div>
        <div class="hist-src-txt">${escapeHtml(item.src)}</div>
        <div class="hist-tgt-txt">${escapeHtml(item.tgt)}</div>
      `;

      // Click card to restore
      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("hist-fav-star")) {
          // Toggle favorite inside card
          e.stopPropagation();
          const fIdx = state.favorites.findIndex(f => f.src === item.src && f.tgt === item.tgt);
          if (fIdx >= 0) {
            state.favorites.splice(fIdx, 1);
          } else {
            state.favorites.unshift({ ...item, id: Date.now() });
          }
          localStorage.setItem("omni_favs", JSON.stringify(state.favorites));
          updateFavsBadge();
          renderHistory();
          checkIfStarred(sourceTextEl.value.trim(), targetTextEl.innerText.trim());
          return;
        }

        setSourceLanguage(item.srcLang);
        setTargetLanguage(item.tgtLang);
        sourceTextEl.value = item.src;
        targetTextEl.innerText = item.tgt;
        updateCounts();
        updateTargetCounts(item.tgt);
        checkIfStarred(item.src, item.tgt);
        showToast("Restored phrase into editor");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      historyListEl.appendChild(card);
    });
  }

  function clearHistory() {
    const isFavTab = state.historyTab === "favorites";
    const msg = isFavTab ? "Clear all starred favorites?" : "Clear all recent translation history?";
    if (confirm(msg)) {
      if (isFavTab) {
        state.favorites = [];
        localStorage.removeItem("omni_favs");
        updateFavsBadge();
        starBtn.style.color = "";
      } else {
        state.history = [];
        localStorage.removeItem("omni_history");
      }
      renderHistory();
      showToast("Cleared.");
    }
  }

  // Toast Notification
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      toast.style.transform = "translateY(12px) scale(0.95)";
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  }

  function updateEngineDisplay() {
    let name = "Google Neural API (Free)";
    if (state.engine === "mymemory") name = "MyMemory Engine";
    if (state.engine === "google-cloud") name = "Google Cloud API";
    if (state.engine === "azure") name = "Azure Cognitive API";
    engineIndicatorText.textContent = name;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[m]);
  }

  // Attach All Event Listeners
  function attachEventListeners() {
    sourceTextEl.addEventListener("input", () => {
      updateCounts();
      debounceTranslate();
    });

    clearBtn.addEventListener("click", () => {
      sourceTextEl.value = "";
      targetTextEl.innerHTML = `<span class="output-placeholder">Translation will appear here instantly...</span>`;
      targetWordCountEl.textContent = "0 words";
      starBtn.style.color = "";
      updateCounts();
      sourceTextEl.focus();
    });

    sourceSelectEl.addEventListener("change", (e) => setSourceLanguage(e.target.value));
    targetSelectEl.addEventListener("change", (e) => setTargetLanguage(e.target.value));

    swapBtn.addEventListener("click", swapLanguages);

    translateBtn.addEventListener("click", performTranslation);

    copyBtn.addEventListener("click", () => copyToClipboard(targetTextEl.innerText.trim(), copyBtn));
    copySourceBtn.addEventListener("click", () => copyToClipboard(sourceTextEl.value.trim(), copySourceBtn));

    starBtn.addEventListener("click", toggleStarCurrent);
    downloadBtn.addEventListener("click", downloadTranslation);

    speakSourceBtn.addEventListener("click", () => speak(sourceTextEl.value.trim(), state.sourceLang, sourceAudioWaves));
    speakTargetBtn.addEventListener("click", () => speak(targetTextEl.innerText.trim(), state.targetLang, targetAudioWaves));

    micBtn.addEventListener("click", toggleVoiceInput);
    if (fileUploadInput) fileUploadInput.addEventListener("change", handleFileUpload);

    themeToggleBtn.addEventListener("click", toggleTheme);

    // Tone Buttons
    const toneBtns = document.querySelectorAll(".tone-btn");
    toneBtns.forEach(btn => {
      btn.addEventListener("click", () => setTone(btn.getAttribute("data-tone")));
    });

    // Category Tabs
    const catTabs = document.querySelectorAll(".category-tab");
    catTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        catTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderCategoryPrompts(tab.getAttribute("data-cat"));
      });
    });

    // History & Favorites Tabs
    tabHistoryRecent.addEventListener("click", () => {
      state.historyTab = "recent";
      tabHistoryRecent.classList.add("active");
      tabHistoryFavorites.classList.remove("active");
      renderHistory();
    });

    tabHistoryFavorites.addEventListener("click", () => {
      state.historyTab = "favorites";
      tabHistoryFavorites.classList.add("active");
      tabHistoryRecent.classList.remove("active");
      renderHistory();
    });

    favsToggleBtn.addEventListener("click", () => {
      tabHistoryFavorites.click();
      document.getElementById("historyBlock").scrollIntoView({ behavior: "smooth" });
    });

    clearHistoryBtn.addEventListener("click", clearHistory);

    // Settings Modal
    settingsBtn.addEventListener("click", () => {
      engineSelectEl.value = state.engine;
      apiKeyInputEl.value = state.apiKey;
      apiKeyGroupEl.style.display = (state.engine === "google-cloud" || state.engine === "azure") ? "flex" : "none";
      settingsModal.classList.add("open");
    });

    closeSettingsBtn.addEventListener("click", () => settingsModal.classList.remove("open"));
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) settingsModal.classList.remove("open");
    });

    engineSelectEl.addEventListener("change", (e) => {
      const val = e.target.value;
      apiKeyGroupEl.style.display = (val === "google-cloud" || val === "azure") ? "flex" : "none";
    });

    saveSettingsBtn.addEventListener("click", () => {
      state.engine = engineSelectEl.value;
      state.apiKey = apiKeyInputEl.value.trim();
      localStorage.setItem("omni_engine", state.engine);
      localStorage.setItem("omni_api_key", state.apiKey);
      updateEngineDisplay();
      settingsModal.classList.remove("open");
      showToast("Neural pipeline settings updated!");
      if (sourceTextEl.value.trim()) performTranslation();
    });

    // Global Hotkeys
    window.addEventListener("keydown", (e) => {
      // Ctrl + Enter => Translate
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        performTranslation();
      }
      // Alt + S => Swap languages
      if (e.altKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        swapLanguages();
      }
      // Alt + C => Copy output
      if (e.altKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        copyBtn.click();
      }
      // Esc => Clear input
      if (e.key === "Escape" && document.activeElement === sourceTextEl) {
        clearBtn.click();
      }
    });
  }

  // Bootstrap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
