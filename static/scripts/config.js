System.config({
  "baseURL": "static/scripts",
  "transpiler": "babel",
  "babelOptions": {
    "stage": 0,
    "loose": "all",
    "nonStandard": true,
    "modules": "system",
    "optional": [
      "es6.spec.blockScoping",
      "es6.spec.symbols",
      "es6.spec.templateLiterals"
    ],
    "sourceMaps": true
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "alt": "npm:alt@0.17.1",
    "babel": "npm:babel-core@5.6.20",
    "babel-runtime": "npm:babel-runtime@5.6.20",
    "classnames": "npm:classnames@2.1.3",
    "core-js": "npm:core-js@0.9.18",
    "react": "npm:react@0.14.0-beta1",
    "react-dom": "npm:react-dom@0.14.0-beta1",
    "react-router": "npm:react-router@1.0.0-beta3",
    "validator": "npm:validator@3.41.2",
    "xhr": "npm:xhr@2.0.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.3.1"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:alt@0.17.1": {
      "flux": "npm:flux@2.0.3",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "transmitter": "npm:transmitter@1.0.2"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.6.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.3.1": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:classnames@2.1.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "through": "npm:through@2.3.8"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:for-each@0.3.2": {
      "is-function": "npm:is-function@1.0.1"
    },
    "npm:global@4.3.0": {
      "min-document": "npm:min-document@2.16.0",
      "process": "npm:process@0.5.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:invariant@2.1.0": {
      "envify": "npm:envify@3.4.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:is-function@1.0.1": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:min-document@2.16.0": {
      "dom-walk": "npm:dom-walk@0.1.1"
    },
    "npm:parse-headers@2.0.0": {
      "for-each": "npm:for-each@0.3.2",
      "trim": "npm:trim@0.0.1"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:react-dom@0.14.0-beta1": {
      "react": "npm:react@0.14.0-beta1"
    },
    "npm:react-router@1.0.0-beta3": {
      "invariant": "npm:invariant@2.1.0",
      "keymirror": "npm:keymirror@0.1.1",
      "qs": "npm:qs@2.4.1",
      "warning": "npm:warning@1.0.2"
    },
    "npm:react@0.14.0-beta1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "envify": "npm:envify@3.4.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:through@2.3.8": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:validator@3.41.2": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:warning@1.0.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:xhr@2.0.3": {
      "global": "npm:global@4.3.0",
      "once": "npm:once@1.1.1",
      "parse-headers": "npm:parse-headers@2.0.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});
