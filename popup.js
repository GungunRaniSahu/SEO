chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getSeoData" }, (response) => {
    if (!response) {
      console.error("No response from content script");
      return;
    }

    document.getElementById('loading').style.display = 'none';
    document.getElementById('seo-results').style.display = 'block';

    document.getElementById("title").textContent = response.title || "N/A";
    document.getElementById("description").textContent = response.description || "N/A";
    document.getElementById("wordCount").textContent = response.wordCount || 0;

    const headingLevels = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };

    response.headings?.forEach(h => {
      const tag = h.tag.toLowerCase();
      if (headingLevels[tag]) {
        headingLevels[tag].push(h.text);
      }
    });

    Object.entries(headingLevels).forEach(([tag, items]) => {
      const container = document.getElementById(`${tag}-list`);
      if (container) {
        container.innerHTML = items.length
          ? items.map(text => `<li>${text}</li>`).join("")
          : "<li><em>No headings found</em></li>";
      }
    });

    const linksList = document.getElementById('internal-links-list');
    linksList.innerHTML = response.internalLinks.length
      ? response.internalLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join("")
      : "<li><em>No internal links found</em></li>";
  });
});

const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleButton.textContent = document.body.classList.contains('dark-mode') ? '🌕 Light Mode' : '🌙 Dark Mode';
});
