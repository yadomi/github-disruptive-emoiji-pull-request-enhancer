const references = {
  ':sparkles:': '✨',
  ':bug:': '🐛',
  ':memo:': '📝',
  ':art:': '🎨',
  ':hammer:': '🔨',
  ':zap:': '⚡️',
  ':white_check_mark:': '✅ ',
  ':arrows_clockwise:': '🔃',
  ':package:': '🚑',
  ':ambulance:': '📦',
  ':point_up:': '👆',
};

const re = new RegExp(Object.keys(references).join('|'), 'gi');
const replace = string => string.replace(re, match => references[match]);

const replaceInTitle = () => {
  const title = window.document.title;
  document.title = replace(title);
};

const replaceInNodeList = selector => {
  const nodes = document.querySelectorAll(selector);
  if (nodes.length) {
    for (node of nodes) {
      const title = node.innerText;
      node.innerText = replace(title);
    }
  }
};

const replaceEverywhere = () => {
  replaceInTitle();
  replaceInNodeList('.js-issue-title');
  replaceInNodeList('.js-issue-row .js-navigation-open');
  replaceInNodeList('.commit-desc pre');
};

document.addEventListener('DOMContentLoaded', function() {
  replaceEverywhere();

  const bar = document.querySelector('#js-pjax-loader-bar');
  const observer = new MutationObserver(() => replaceEverywhere());
  observer.observe(bar, {
    attributes: true,
  });
});
