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
