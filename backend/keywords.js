//==============================
// Consts
//==============================
export const FRAMEWORK = Object.freeze({
  vue: ['vue', 'vue.js', 'nuxt', 'nuxt.js'],
  angular: ['angular', 'angular.js', 'ng', 'angular-cli', 'ngrx'],
  react: ['react', 'react.js', 'react-native', 'react-dom', 'redux', 'react-router', 'vite'],
  electron: ['electron', 'electron.js', 'electron-builder', 'electron-packager'],
  three: ['three', 'three.js', 'webgl', 'threejs'],
  vanillaJS: ['vanilla javascript', 'vanilla js', 'es6'],
  html: ['dom', 'canvas', 'html'],
  typescript: ['typescript'],
  jsTools: ['eslint', 'babel', 'esmodules'],
  preact: ['preact', 'preact-cli'],
  svelte: ['svelte', 'sveltekit'],
  next: ['next.js', 'nextjs', 'next'],
  i18next: ['i18next', 'internationalization', 'i18n', 'translation', 'localization'],
  ember: ['ember', 'ember.js', 'ember-cli'],
  backbone: ['backbone', 'backbone.js'],
  jquery: ['jquery', 'jquery-ui'],
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
  crossSite: [
    'xss', 'cross-site', 'cross site', 'request forgery', 'csrf', 'xsrf',
    'injection', 'code execution', 'remote execution', 'command execution',
    'payload execution', 'malicious script', 'dom-based', 'innerHTML', 'unsafe eval',
    'bypass csp', 'onerror handler', 'alert box', 'cookie theft',
    'session hijacking', 'unsafe contexts', 'html escaping'
  ],
  denialOfService: [
    'dos', 'denial', 'service', 'redos', 'sanitize-html', 'resource exhaustion',
    'infinite loop', 'hang', 'timeout', 'deadlock', 'memory leak',
    'cpu spike', 'rate limiting', 'high memory usage', 'heap exhaustion',
    'stack overflow', 'thread starvation', 'socket exhaustion',
    'file descriptor exhaustion', 'unbounded resource consumption',
    'regex complexity'
  ],
  bufferOverflow: [
    'buffer overflow', 'stack overflow', 'heap overflow',
    'memory corruption', 'buffer overread', 'buffer overwrite'
  ],
  openRedirect: [
    'open redirect', 'url redirect', 'unsafe redirect', 'navigation',
    'url manipulation'
  ],
  prototypePollution: [
    'prototype pollution', 'property injection', 'object prototype',
    'prototype chain'
  ],
  spoofing: [
    'spoofing', 'identity spoofing', 'authentication bypass',
    'email spoofing', 'url spoofing', 'phishing'
  ],
  crash: [
    'crash', 'crashes', 'hang', 'termination', 'unexpected exit', 'process abort'
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
  asarIntegrity: [
    'asar integrity', 'asar tampering', 'asar manipulation'
  ],
  fileRead: [
    'file read', 'unauthorized file read', 'arbitrary file access',
    'file disclosure', 'file exposure'
  ],
  trojan: [
    'trojan', 'horse', 'backdoor', 'malicious payload'
  ],
  internalProcessCommunication: [
    'ipc', 'internal-process communication', 'message passing',
    'process injection', 'unauthorized ipc'
  ],
  autoupdater: [
    'autoupdater', 'update injection', 'update spoofing',
    'update tampering'
  ],
  privilege: [
    'escalation of privilege', 'privilege escalation', 'vertical privilege',
    'horizontal privilege', 'local privilege', 'remote privilege',
    'elevation of privilege', 'unauthorized privilege'
  ],
  cryptographic: [
    'weak encryption', 'insecure hashing', 'key exposure',
    'cipher downgrade', 'replay attack', 'cryptographic bypass'
  ],
  authentication: [
    'authentication bypass', 'weak authentication', 'password brute force',
    'token hijacking', 'session fixation', 'replay attack'
  ],
  informationDisclosure: [
    'information disclosure', 'data leak', 'data exposure', 'arbitrary read',
    'memory dump', 'sensitive data', 'data disclosure'
  ]
});


export const DEF_GUI_KEYWORDS = [
  'gui',
  'ui',
  'hci',
  'canvas',
  'html',
  'vue',
  'npm',
  'react',
  'angular',
  'flutter',
  'android',
  'jquery',
  'dart',
  'electron',
  'react-native',
  'three.js',
  'babylon',
  'next.js',
  'svelte',
  'ember',
  'preact',
  'webgl',
  'd3',
  'pixi.js',
  'sanitize-html',
  'dompurify',
  'xss-clean',
  'glslify',
  'twgl.js',
  'moderngl',
  'i18next',
  'react-intl',
  'formatjs',
  'react-aria',
  'vue-a11y'
];

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