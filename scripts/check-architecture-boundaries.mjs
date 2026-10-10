import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'src');
const sourceExtensions = [
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
];
const violations = [];

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(entryPath)));
    } else if (
      entry.isFile() &&
      !entry.name.includes('.test.') &&
      !entry.name.includes('.spec.') &&
      sourceExtensions.some((extension) => entry.name.endsWith(extension))
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

function resolveInternalImport(importer, specifier) {
  let targetBase;

  if (specifier.startsWith('@/')) {
    targetBase = path.join(sourceRoot, specifier.slice(2));
  } else if (specifier.startsWith('@app/')) {
    targetBase = path.join(projectRoot, 'app', specifier.slice(5));
  } else if (specifier.startsWith('.')) {
    targetBase = path.resolve(path.dirname(importer), specifier);
  } else {
    return null;
  }

  const candidates = [
    targetBase,
    ...sourceExtensions.map((extension) => `${targetBase}${extension}`),
    ...sourceExtensions.map((extension) =>
      path.join(targetBase, `index${extension}`),
    ),
  ];

  return candidates.find((candidate) => ts.sys.fileExists(candidate)) ?? null;
}

function classifySource(filePath) {
  const relativePath = path.relative(projectRoot, filePath).split(path.sep);

  if (relativePath[0] !== 'src') {
    return null;
  }

  if (relativePath[1] === 'shared') {
    return { kind: 'shared' };
  }

  if (relativePath[1] !== 'core' || relativePath.length < 4) {
    return null;
  }

  return {
    kind: 'boundary',
    name: relativePath[2],
    layer: relativePath[3],
  };
}

function describeSource(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join('/');
}

function isFrameworkImport(specifier) {
  return /^(react|react-dom|next|@lingui\/|server-only)(\/|$)/.test(specifier);
}

function checkImport(importer, specifier, line) {
  const source = classifySource(importer);
  if (!source) {
    return;
  }

  const targetPath = resolveInternalImport(importer, specifier);
  const target = targetPath ? classifySource(targetPath) : null;
  const importerName = describeSource(importer);
  const targetName = targetPath ? describeSource(targetPath) : specifier;
  let reason;

  if (source.kind === 'shared') {
    if (target?.kind === 'boundary') {
      reason = 'shared modules cannot depend on business boundaries';
    }
  } else if (source.layer === 'domain') {
    if (target?.kind === 'shared') {
      reason =
        'domain modules must remain independent of shared UI and infrastructure';
    } else if (
      target?.kind === 'boundary' &&
      (target.name !== source.name || target.layer !== 'domain')
    ) {
      reason = 'domain modules may only depend on their own domain layer';
    } else if (!target && isFrameworkImport(specifier)) {
      reason =
        'domain modules cannot depend on framework, UI, or i18n packages';
    }
  } else if (source.kind === 'boundary') {
    if (target?.kind === 'boundary' && target.name !== source.name) {
      reason =
        'business boundaries cannot import one another directly; extract shared code to src/shared';
    } else if (target?.kind === 'boundary') {
      const allowedLayers = {
        application: ['application', 'domain'],
        domain: ['domain'],
        infrastructure: ['application', 'domain', 'infrastructure'],
        ui: ['application', 'domain', 'ui'],
      };

      if (!allowedLayers[source.layer]?.includes(target.layer)) {
        reason = `${source.layer} must not depend on the ${target.layer} layer`;
      }
    }
  }

  if (reason) {
    violations.push(
      `${importerName}:${line} imports "${specifier}" (${targetName}): ${reason}`,
    );
  }
}

function collectModuleSpecifiers(sourceFile, node) {
  const found = [];

  if (
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
    node.moduleSpecifier &&
    ts.isStringLiteral(node.moduleSpecifier)
  ) {
    found.push(node.moduleSpecifier);
  } else if (
    ts.isCallExpression(node) &&
    (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
      (ts.isIdentifier(node.expression) &&
        node.expression.text === 'require')) &&
    node.arguments.length > 0 &&
    ts.isStringLiteral(node.arguments[0])
  ) {
    found.push(node.arguments[0]);
  } else if (
    ts.isImportTypeNode(node) &&
    ts.isLiteralTypeNode(node.argument) &&
    ts.isStringLiteral(node.argument.literal)
  ) {
    found.push(node.argument.literal);
  }

  return found.map((specifierNode) => ({
    specifier: specifierNode.text,
    line:
      sourceFile.getLineAndCharacterOfPosition(specifierNode.getStart()).line +
      1,
  }));
}

const sourceFiles = await collectSourceFiles(sourceRoot);

for (const filePath of sourceFiles) {
  const sourceText = await readFile(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') || filePath.endsWith('.jsx')
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS,
  );

  function visit(node) {
    for (const { specifier, line } of collectModuleSpecifiers(
      sourceFile,
      node,
    )) {
      checkImport(filePath, specifier, line);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

if (violations.length > 0) {
  console.error('Architecture boundary violations:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Architecture boundaries verified across ${sourceFiles.length} source files.`,
  );
}
