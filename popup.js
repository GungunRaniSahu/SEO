
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSeoData" }, (response) => {
      document.getElementById("title").textContent = `${response.title}`;
      document.getElementById("description").textContent = ` ${response.description}`;
      document.getElementById("wordCount").textContent = `  ${response.wordCount}`;
      document.getElementById("headings").textContent = ` ${response.headings.join(", ")}`;
      document.getElementById("internalLinks").textContent = `  ${response.internalLinks.length}`;
    });
  });
  