//==============================
// Consts
//==============================

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
  prototypePollution: [
    'prototype pollution', 'property injection', 'object prototype',
    'prototype chain'
  ],
  spoofing: [
    'spoofing', 'identity spoofing', 'authentication bypass',
    'email spoofing', 'url spoofing', 'phishing'
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