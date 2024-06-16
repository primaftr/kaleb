module.exports = {
  "root": true,
  "ignorePatterns": ["**/*", "node_modules/**"],
  "extends": ["prettier"],
  "plugins": ["@nx", "simple-import-sort", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ],
        "simple-import-sort/imports": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "argsIgnorePattern": "^_"
          }
        ]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@nx/typescript", "plugin:security/recommended"],
      "rules": {
        "@typescript-eslint/no-explicit-any": ["off"],
        "security/detect-object-injection": ["off"],
        "security/detect-non-literal-fs-filename": ["off"],
        "simple-import-sort/imports": "error",
        "object-shorthand": ["error", "always"],
        "no-useless-rename": ["error"]
      }
    },
    {
      "files": ["*.js", "*.jsx"],
      "extends": ["plugin:@nx/javascript", "plugin:security/recommended"],
      "rules": {
        "simple-import-sort/imports": "error"
      }
    },
    {
      "files": "*.json",
      "parser": "jsonc-eslint-parser",
      "rules": {}
    }
  ]
}
