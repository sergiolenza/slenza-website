import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const checkerPath = path.resolve(
  process.cwd(),
  'scripts/check-architecture-boundaries.mjs',
);
const temporaryDirectories = [];

async function createFixture(files) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'portfolio-boundaries-'));
  temporaryDirectories.push(root);

  for (const [relativePath, contents] of Object.entries(files)) {
    const filePath = path.join(root, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, contents);
  }

  return root;
}

function runChecker(cwd) {
  return spawnSync(process.execPath, [checkerPath], {
    cwd,
    encoding: 'utf8',
  });
}

describe('architecture boundary checker', () => {
  afterEach(async () => {
    await Promise.all(
      temporaryDirectories
        .splice(0)
        .map((directory) => rm(directory, { recursive: true, force: true })),
    );
  });

  it('allows inward layer dependencies and rejects shared-to-boundary imports', async () => {
    const root = await createFixture({
      'src/core/portfolio/domain/model.ts': 'export const value = 1;\n',
      'src/core/portfolio/ui/view.ts':
        "import { value } from '../domain/model';\n",
      'src/shared/ui/shared.ts':
        "import { value } from '@/core/portfolio/domain/model';\n",
    });

    const result = runChecker(root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      'shared modules cannot depend on business boundaries',
    );
    expect(result.stderr).not.toContain(
      'ui must not depend on the domain layer',
    );
  });

  it('rejects domain dependencies on framework packages and UI layers', async () => {
    const root = await createFixture({
      'src/core/portfolio/domain/model.ts':
        "import React from 'react';\nimport { view } from '@/core/portfolio/ui/view';\n",
      'src/core/portfolio/ui/view.ts': 'export const view = true;\n',
    });

    const result = runChecker(root);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      'domain modules cannot depend on framework',
    );
    expect(result.stderr).toContain(
      'domain modules may only depend on their own domain layer',
    );
  });

  it('allows boundary dependencies on shared code and checks relative and alias imports', async () => {
    const root = await createFixture({
      'src/shared/ui/shared.ts': 'export const value = 1;\n',
      'src/core/portfolio/domain/model.ts': 'export const model = true;\n',
      'src/core/portfolio/ui/view.ts':
        "import { model } from '../domain/model';\nimport { value } from '@/shared/ui/shared';\n",
    });

    const result = runChecker(root);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Architecture boundaries verified');
  });
});
