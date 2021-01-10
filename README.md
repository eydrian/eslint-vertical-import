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
  "plugins": [
    "@typescript-eslint/eslint-plugin",
    "eslint-vertical-import"
  ],
  "rules": {
    "eslint-vertical-import/vertical-import": 2,
  }
```

### known issues
- only works with indent two
- only works with dangling comma enabled
- doesn't work with prettier
- doesn't work for combined import e.g.
```typescript
import lib, { StatementOne, StatementTwo } from 'lib';
// must be written as:
import lib from 'lib';
import {
  StatementOne,
  StatementTwo,
} from 'lib';
```

which is ugly...

Feel free to optimize



## One to support this me?

<a href="https://www.buymeacoffee.com/eydrian" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Please consider supporting me if find this useful:
https://www.buymeacoffee.com/eydrian

### tslint rule
the corresponding tslint rule can be found here: https://github.com/eydrian/tslint-vertical-import