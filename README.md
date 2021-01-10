# eslint-vertical-import

This is a custom [eslint](https://eslint.org) rule that enforces vertical alignment of imports:

```typescript
  import 'library'; // OK
  import * as library from 'library'; // OK

  import { Library } from 'library'; // BAD

  import { Library, SecondLibrary } from 'library'; // BAD

  import {
  SecondLibrary } from 'library'; // BAD

  import { Library,
  SecondLibrary } from 'library'; // BAD

  import {
    Library,
    SecondLibrary,
  } from 'library'; // OK

  import {
    Library,
    SecondLibrary } from 'library'; // BAD

  import { Library,
    SecondLibrary,
  } from 'library'; // BAD
```

### 📝 Install

Install the package with

`npm install eslint-vertical-import --save-dev` (or `yarn add eslint-vertical-import --save-dev`).

Then add the following to your `.eslintrc.js`:

```
  "rulesDirectory": [
    "eslint-vertical-import"
  ],
  "rules": {
    "vertical-import": true
  }
```
