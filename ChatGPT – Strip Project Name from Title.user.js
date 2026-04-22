// ==UserScript==
// @name         ChatGPT – Strip Project Name from Title
// @namespace    https://github.com/mrbrownjeremy
// @version      1.1
// @description  Removes the ChatGPT project name prefix from the page title on project pages
// @author       Jeremy
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Matches any ChatGPT project URL (project home or chat within a project)
  const PROJECT_URL_RE = /\/g\/g-p-/;

  /**
   * On project pages, the title format is:
   *   "{Project Name} - {Chat Title}"
   *
   * Strip everything up to and including the first " - " separator.
   * If there's no separator, the title is just the project name (e.g. on
   * the project home page with no active chat) — leave it alone.
   */
  function stripProjectPrefix() {
    if (!PROJECT_URL_RE.test(window.location.pathname)) return;

    const sep = ' - ';
    const idx = document.title.indexOf(sep);
    if (idx === -1) return; // No separator — nothing to strip

    document.title = document.title.slice(idx + sep.length);
  }

  // Run once on load
  stripProjectPrefix();

  // Re-run whenever ChatGPT updates the title dynamically
  const titleEl = document.querySelector('title') || document.head;
  new MutationObserver(stripProjectPrefix).observe(titleEl, {
    subtree: true,
    characterData: true,
    childList: true,
  });

})();