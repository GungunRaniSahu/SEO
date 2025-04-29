{
  "manifest_version": 3,
  "name": "SEO Analyzer",
  "description": "Analyze the on-page SEO of any website",
  "version": "1.0",
  "permissions": ["activeTab"],

  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "seo.png",
      "48": "seo.png",
      "128": "seo.png"
    }

  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "16": "seo.png",
    "48": "seo.png",
    "128": "seo.png"
  }
}
