function extractSeoData() {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')
      ? document.querySelector('meta[name="description"]').content
      : "No description tag found";
    const wordCount = document.body.innerText.split(" ").length;
  
    const headings = [];
    for (let i = 1; i <= 6; i++) {
      const headingTags = document.querySelectorAll(`h${i}`);
      headingTags.forEach(tag => {
        headings.push(tag.innerText);
      });
    }
  
    const internalLinks = [];
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach(link => {
      if (link.href && link.href.includes(window.location.hostname)) {
        internalLinks.push(link.href);
      }
    });

    return {
      title,
      description,
      wordCount,
      headings,
      internalLinks,
    };
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSeoData") {
      const seoData = extractSeoData();
      sendResponse(seoData);
    }
  });
  