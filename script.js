// Step 1: Synonym substitution with natural choices
function synonymSwap(text) {
  const synonyms = {
    therefore: ["so", "after all"],
    utilize: ["use"],
    AI: ["Artificial Intelligence"],
    cannot: ["can't"],
    important: ["crucial", "key"],
    however: ["but", "still"],
  };

  let result = text;
  for (const [word, replacements] of Object.entries(synonyms)) {
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    result = result.replace(regex, () => replacements[Math.floor(Math.random() * replacements.length)]);
  }
  return result;
}

// Step 2: Sentence restructuring
function restructureSentences(text) {
  // Break long sentences into shorter ones
  return text.replace(/, which/gi, ". Which")
             .replace(/, and/gi, ". And")
             .replace(/; /gi, ". ");
}

// Step 3: Add contractions and casual tone
function addContractions(text) {
  return text.replace(/\bdo not\b/gi, "don't")
             .replace(/\bis not\b/gi, "isn't")
             .replace(/\bare not\b/gi, "aren't")
             .replace(/\bwill not\b/gi, "won't")
             .replace(/\bhave not\b/gi, "haven't");
}

// Step 4: Human markers (filler words, rhetorical questions)
function addHumanMarkers(text) {
  const fillers = ["you know,", "honestly,", "well,", "to be fair,"];
  const sentences = text.split(/(?<=[.!?])\s+/);
  if (sentences.length > 2) {
    const idx = Math.floor(Math.random() * sentences.length);
    sentences[idx] = fillers[Math.floor(Math.random() * fillers.length)] + " " + sentences[idx];
  }
  return sentences.join(" ");
}

// Step 5: Shuffle sentences slightly
function shuffleSentences(text) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  for (let i = sentences.length - 1; i > 0; i--) {
    if (Math.random() > 0.7) { // occasional shuffle
      const j = Math.floor(Math.random() * (i + 1));
      [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
    }
  }
  return sentences.join(" ");
}

// Main pipeline
function humanizeText(text) {
  let result = synonymSwap(text);
  result = restructureSentences(result);
  result = addContractions(result);
  result = addHumanMarkers(result);
  result = shuffleSentences(result);
  return result;
}

// Hook up to UI
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const wordCount = document.getElementById("wordCount");

const humanizeBtn = document.getElementById("humanizeBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

inputText.addEventListener("input", () => {
  const words = inputText.value.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = words.length;
});

humanizeBtn.addEventListener("click", () => {
  const text = inputText.value;
  if (text.trim() === "") {
    alert("Please enter some text to humanize!");
    return;
  }
  outputText.value = humanizeText(text);
});

copyBtn.addEventListener("click", () => {
  outputText.select();
  document.execCommand("copy");
  alert("Humanized text copied!");
});

clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  wordCount.textContent = 0;
});

const progress = document.getElementById("progress");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btnText");
const toast = document.getElementById("toast");
const themeToggle = document.querySelector(".theme-toggle");
const downloadBtn = document.getElementById("downloadBtn");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

inputText.addEventListener("input", () => {
  const words = inputText.value.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = words.length;
  progress.style.width = (words.length / 3000) * 100 + "%";
});

humanizeBtn.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (!text) {
    showToast("Please enter text first!");
    return;
  }

  loader.classList.remove("hidden");
  btnText.textContent = "Processing...";
  
  setTimeout(() => {
    outputText.value = humanizeText(text);
    loader.classList.add("hidden");
    btnText.textContent = "Humanize";
    showToast("Text Humanized Successfully!");
  }, 800);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputText.value);
  showToast("Copied to clipboard!");
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([outputText.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "humanized-text.txt";
  link.click();
  showToast("Downloaded!");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
