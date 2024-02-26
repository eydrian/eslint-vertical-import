import {
  TSESTree,
  ESLintUtils,
  TSESLint,
} from '@typescript-eslint/utils';

const version = require('../package.json').version;
const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/eydrian/eslint-vertical-import/blob/v${ version }/README.md`,
);

export type MessageIds = 'verticalImport';
export const RULE_NAME = 'vertical-import';

type Options = [];

function handleImports(
  context: Readonly<TSESLint.RuleContext<'verticalImport', []>>,
) {
  const sourceCode = context.getSourceCode();
  return (node: TSESTree.ImportDeclaration) => {

    const importStatement = sourceCode.getText(node);
    const aliasImport = new RegExp('import\\s*\\*\\s*as\\s*.*\\sfrom\\s*\'.*\'\;?', 'gm'); // alias imports can be on one line
    const simpleImport = new RegExp('import\\s*\'.*\'\;?', 'gm'); // complete imports can be on one line
    const defaultImport = new RegExp('import\\s+\\w*\\s+from\\s+\'.*\'\;?', 'gm'); // default import can be on one line

    if (!aliasImport.test(importStatement) && !simpleImport.test(importStatement) && !defaultImport.test(importStatement)) {
      const lines = importStatement.split('\n');

      const hasMultipleImportsOnOneLine = hasMultipleImportsOnSign(lines, ',');

      const hasImportsOnFirstLine = hasMultipleImportsOnSign(lines, '{');
      const hasImportsOnLastLine = hasMultipleImportsOnSign(lines, '}');
      if (lines.length < 3 || hasMultipleImportsOnOneLine || hasImportsOnFirstLine || hasImportsOnLastLine) {
        const statement = getImportStatement(importStatement);

        context.report({
          node,
          messageId: 'verticalImport',
          fix: (fixer) => fixer.replaceText(node, statement)
        });
      }
    }
  };
}

function hasMultipleImportsOnSign(lines: string[], sign: string): boolean {
  return lines
  .map(line => line.split(sign)
  .filter(s => s.length > 0))
  .some(line => line.length !== 1);
}


function getImportStatement(importString: string): string {
  const importStatement = importString.split('{');
  const fromStatement = ([] as string[])
    .concat(...importStatement.map(i => i.split('}')));
  const lines = ([] as string[])
    .concat(...fromStatement.map(i => i.split('\n')))
    .filter(s => s.length > 0);
  const statements = ([] as string[])
    .concat(...lines.map(line => line.split(',')))
    .map(s => s.trim())
    .filter(s => s.length > 0);
  const nrStatements = statements.length;

  const importBody = statements.slice(1, nrStatements - 1).map(s => `  ${ s },`);

  const statement = [
    `${ statements[0] } {`,
    ...importBody,
    `} ${ statements[nrStatements - 1] }`,
  ].join('\n');

  return statement;
}

export default createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description:
        `Enforces imports to be vertically aligned.
        To facilitate merge request and reordering of imports, e.g. alphabetically, the imports must be aligned vertically
        `,
      recommended: undefined,
    },
    schema: [],
    fixable: 'code',
    messages: {
      verticalImport: "Imports must be vertically aligned",
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ImportDeclaration: (node: TSESTree.ImportDeclaration) => {
        handleImports(context)(node);
      }
    };
  }
});
