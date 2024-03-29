import {
  RuleTester,
} from 'eslint';
const parser = require.resolve('@typescript-eslint/parser')


import rule from '../src/verticalImportRule'
import {
  MessageIds,
  RULE_NAME,
} from '../src/verticalImportRule';

const ruleTester = new RuleTester({
  parser,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});

const messageId: MessageIds = 'verticalImport';

ruleTester.run(RULE_NAME, rule as any, {
  valid: [
    // should succeed when imports are properly aligned
    `
import 'library';
import * as library from 'library';
import library from 'library';
import {
  Library,
  SecondLibrary,
} from 'library';
    `,
    // should succeed when when the imports are properly aligned
    `
import {
  ImportOne,
  ImportTwo,
} from 'library';
import {
  ImportThree,
  ImportFour,
} from 'libraryTwo';
    `,
  ],
  invalid: [{
    code: `import { default as library } from 'library';`,
    output: `import {
  default as library,
} from 'library';`,
    errors: [{
      messageId,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 46,
      data: {
        verticalImport: 'Imports must be vertically aligned',
      },
    }],
  }, {
    code: `import { Foo, Bar } from 'library';`,
    output: `import {
  Foo,
  Bar,
} from 'library';`,
    errors: [{
      messageId,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 36,
      data: {
        verticalImport: 'Imports must be vertically aligned',
      },
    }],
  }, {
    code: `
import {
  Foo, Bar,
} from 'library';
`,
  output: `
import {
  Foo,
  Bar,
} from 'library';
`,
    errors: [{
      messageId,
      line: 2,
      column: 1,
      endLine: 4,
      endColumn: 18,
      data: {
        verticalImport: 'Imports must be vertically aligned',
      },
    }],
  }]
})
