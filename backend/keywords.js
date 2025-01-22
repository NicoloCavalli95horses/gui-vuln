//==============================
// Consts
//==============================
export const DEF_GUI_KEYWORDS = Object.freeze({
  gui: ['gui', 'hci'],
  vue: ['vue', 'vue.js', 'nuxt', 'nuxt.js', 'vue-a11y'],
  angular: ['angular', 'angular.js', 'angular-cli', 'ngrx'],
  react: ['react', 'react.js', 'react-native', 'react-dom', 'redux', 'react-router', 'vite', 'react-intl', 'react-aria'],
  electron: ['electron', 'electron.js', 'electron-builder', 'electron-packager'],
  three: ['three', 'three.js', 'webgl', 'threejs', 'babylon', 'moderngl'],
  vanillaJS: ['vanilla javascript', 'vanilla js', 'es6'],
  html: ['dom', 'canvas', 'html'],
  typescript: ['typescript'],
  jsTools: ['eslint', 'babel', 'esmodules'],
  preact: ['preact', 'preact-cli'],
  svelte: ['svelte', 'sveltekit'],
  flutter: ['flutter', 'dart'],
  next: ['next.js', 'nextjs', 'next'],
  i18next: ['i18next', 'internationalization', 'i18n', 'translation', 'localization'],
  ember: ['ember', 'ember.js', 'ember-cli'],
  backbone: ['backbone', 'backbone.js'],
  jquery: ['jquery', 'jquery-ui'],
  d3: ['d3'],
  pixi: ['pixi.js'],
  alpine: ['alpine', 'alpine.js', 'alpinejs'],
  meteor: ['meteor', 'meteor.js'],
  lit: ['lit', 'lit-element', 'lit-html'],
  polymer: ['polymer', 'polymer.js'],
  astro: ['astro', 'astro.js'],
  quasar: ['quasar', 'quasar framework'],
  solid: ['solid', 'solid.js', 'solidjs'],
  stencil: ['stencil', 'stencil.js'],
  mithril: ['mithril', 'mithril.js'],
  backbone: ['backbone', 'backbone.js'],
  css: [
    'css', 'css3', 'stylesheet', 'cascading', 'web styling',
    'media queries', 'responsive design', 'container queries',
    'keyframes', 'bootstrap', 'tailwind', 'bulma',
    'semantic-ui', 'uikit', 'ant-design', 'chakra-ui',
    'sass', 'scss', 'less', 'stylus', 'postcss',
    'css variables', 'blend modes',
    'devtools', 'css-in-js', 'styled-components',
    'tailwind jit', 'stylelint'
  ]
});


export const CVE_KEYWORDS = Object.freeze({
  guiIssues: [
    'gui', 'user interface', 'graphical user interface',
    'visual glitch', 'ui inconsistency', 'ui bypass', 'ui redress',
    'clickjacking', 'hover hijacking', 'mouse event injection',
    'keylogging', 'overlay attack', 'event spoofing', 'ui freezing',
    'drag and drop exploit', 'clipboard hijacking', 'focus stealing',
    'malicious tooltip', 'pop-up', 'dialog abuse', 'ui event listener'
  ],
  crossSite: [
    'xss', 'cross-site', 'cross site', 'request forgery', 'csrf', 'xsrf',
    'injection', 'code execution', 'remote execution', 'command execution',
    'payload execution', 'malicious script', 'dom-based', 'innerHTML', 'unsafe eval',
    'bypass csp', 'onerror handler', 'alert box', 'cookie theft',
    'session hijacking', 'unsafe contexts', 'html escaping'
  ],
  denialOfService: [
    'dos', 'denial', 'service', 'redos', 'sanitize-html', 'resource exhaustion', 'dompurify',
    'infinite loop', 'hang', 'timeout', 'deadlock', 'memory leak',
    'cpu spike', 'rate limiting', 'high memory usage', 'heap exhaustion',
    'stack overflow', 'thread starvation', 'socket exhaustion',
    'file descriptor exhaustion', 'unbounded resource consumption',
    'regex complexity', 'xss-clean',
  ],
  bufferOverflow: [
    'buffer overflow', 'stack overflow', 'heap overflow',
    'memory corruption', 'buffer overread', 'buffer overwrite'
  ],
  openRedirect: [
    'open redirect', 'url redirect', 'unsafe redirect', 'navigation',
    'url manipulation'
  ],
  clickjacking: [
    "clickjacking",
    "ui-keylogger",
    "click hijacking",
    "hidden elements",
    "redress attack",
    "invisible overlay",
    "transparent overlay",
    "invisible frame",
    "transparent frame",
    "malicious framing",
    "frame busting",
    "cursor hijacking",
    "interface manipulation",
    "overlay attack",
    "embedded frames"
  ],
  tabnabbing: [
    "tabnabbing",
    "tab hijacking",
    "tab spoofing",
    "tab-based phishing",
    "tab switching",
    "tab manipulation",
    "tab stealing",
    "inactive tab attack",
    "malicious tab",
    "phishing tabs",
    "tab takeover",
    "tabbed browsing attack",
    "fake tabs",
    "tab impersonation",
    "tab reload attack"
  ],
  prototypePollution: [
    "prototype pollution",
    "property injection",
    "object prototype",
    "prototype chain",
    "prototype tampering",
    "prototype inheritance",
    "object property injection",
    "polluted prototype",
    "javascript prototype",
    "prototype poisoning",
    "object chain manipulation",
    "prototype manipulation",
    "unsafe merge",
    "malicious property overwrite",
    "object mutation",
    "prototype modification",
    "object property pollution",
    "insecure object property",
    "prototype traversal"
  ],
  spoofing: [
    'spoofing', 'identity spoofing', 'authentication bypass',
    'email spoofing', 'url spoofing'
  ],
  crash: [
    'crash', 'crashes', 'hang', 'termination', 'unexpected exit', 'process abort',
    'ui freeze', 'unresponsive ui'
  ],
  directoryTraversal: [
    'directory traversal', 'path traversal', 'file inclusion',
    'absolute path', 'relative path', 'unauthorized file access'
  ],
  smuggling: [
    'smuggling', 'http request smuggling', 'response smuggling',
    'protocol injection'
  ],
  contentSecurityPolicy: [
    'csp', 'content security', 'csp bypass', 'policy bypass',
    'script-src bypass'
  ],
  cachePoisoning: [
    'cache poisoning', 'dns cache', 'response poisoning', 'cache pollution'
  ],
  contextIsolationBypass: [
    'context isolation', 'context bypass', 'isolation bypass',
    'sandbox escape'
  ],
  fileRead: [
    'file read', 'unauthorized file read', 'arbitrary file access',
    'file disclosure', 'file exposure'
  ],
  internalProcessCommunication: [
    'ipc', 'internal-process communication', 'message passing',
    'process injection', 'unauthorized ipc'
  ],
  privilege: [
    'escalation of privilege', 'privilege escalation', 'vertical privilege',
    'horizontal privilege', 'local privilege', 'remote privilege',
    'elevation of privilege', 'unauthorized privilege'
  ],
  informationDisclosure: [
    'information disclosure', 'data leak', 'data exposure', 'arbitrary read',
    'memory dump', 'sensitive data', 'data disclosure'
  ]
});


export const FOLDER_NAMES = [
  'AlmaLinux',
  'Alpine',
  'Android',
  'GIT',
  'Go',
  'Hex',
  'JavaScript',
  'Maven',
  'npm',
  'NuGet',
  'PyPI',
  'RubyGems',
  'Wolfi'
];