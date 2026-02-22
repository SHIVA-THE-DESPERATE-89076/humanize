// Utility: synonym dictionary
const synonyms = {
  therefore: ["so", "thus", "hence"],
  utilize: ["use", "apply"],
  AI: ["Artificial Intelligence", "machine intelligence"],
  cannot: ["can't"],
  do: ["carry out", "perform"],
  important: ["crucial", "vital", "key"],
};

// Random choice helper
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Step 1: Synonym substitution
function synonymSwap(text) {
  let result = text;
  for (const [word, replacements] of Object.entries(synonyms)) {
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    result = result.replace(regex, () => randomChoice(replacements));
  }
  return result;
}

// Step 2: Sentence restructuring
function restructureSentences(text) {
  // Break long sentences at commas
  return text.replace(/, which/gi, ". Which")
             .replace(/, and/gi, ". And");
}

// Step 3: Add contractions and informal markers
function addContractions(text) {
  return text.replace(/\bdo not\b/gi, "don't")
             .replace(/\bis not\b/gi, "isn't")
             .replace(/\bare not\b/gi, "aren't")
             .replace(/\bwill not\b/gi, "won't");
}

// Step 4: Inject slight randomness (shuffle sentences)
function shuffleSentences(text) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  for (let i = sentences.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
  }
  return sentences.join(" ");
}

// Main pipeline
function humanizeText(text) {
  let result = synonymSwap(text);
  result = restructureSentences(result);
  result = addContractions(result);
  result = shuffleSentences(result);
  return result;
}

// Hook up to button
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const wordCount = document.getElementById("wordCount");

const humanizeBtn = document.getElementById("humanizeBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

// Word count update
inputText.addEventListener("input", () => {
  const words = inputText.value.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = words.length;
});

// Humanize button
humanizeBtn.addEventListener("click", () => {
  const text = inputText.value;
  if (text.trim() === "") {
    alert("Please enter some text to humanize!");
    return;
  }
  outputText.value = humanizeText(text);
});

// Copy output
copyBtn.addEventListener("click", () => {
  outputText.select();
  document.execCommand("copy");
  alert("Humanized text copied!");
});

// Clear input/output
clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  wordCount.textContent = 0;
});
