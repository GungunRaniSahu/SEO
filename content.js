function extractSeoData() {
  const title = document.title;

  const description = document.querySelector('meta[name="description"]')
    ? document.querySelector('meta[name="description"]').content
    : "No description tag found";

  const wordCount = document.body.innerText.trim().split(/\s+/).length;

  const headings = [];
  for (let i = 1; i <= 6; i++) {
    document.querySelectorAll(`h${i}`).forEach(tag => {
      headings.push({
        tag: `h${i}`,
        text: tag.innerText.trim()
      });
    });
  }

  const internalLinks = Array.from(document.querySelectorAll("a"))
    .filter(link => link.href && link.href.includes(window.location.hostname))
    .map(link => link.href);

  return {
    title,
    description,
    wordCount,
    headings,
    internalLinks
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSeoData") {
    const seoData = extractSeoData();
    sendResponse(seoData);
  }
});
