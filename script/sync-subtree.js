#!/usr/bin/env node
/**
 * Node.js 기반 Git subtree sync 스크립트
 * 사용법:
 *   node script/sync-subtree.js <name> fetch_merge
 *   node script/sync-subtree.js <name> push
 */

import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'script/config/subtree.json');

function run(cmd) {
  console.log('▶', cmd);
  execSync(cmd, { stdio: 'inherit' });
}

function main() {
  const [, , name, action] = process.argv;

  if (!name || !action) {
    console.error(
      '명령어에 필요한 옵션이 없습니다. 사용법:\n node script/sync-subtree.js <name> <fetch_merge|push>',
    );
    process.exit(1);
  }

  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(
      `❌ subtree.json 설정 파일을 찾을 수 없습니다: ${CONFIG_FILE}`,
    );
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  const entry = config[name];

  if (!entry) {
    console.error(`❌ No config found for '${name}' in ${CONFIG_FILE}`);
    process.exit(1);
  }

  const remoteName = name;
  const branchRef = entry.branch;
  const prefix = entry.prefix;

  // 원격이 없으면 추가
  try {
    execSync(`git remote get-url ${remoteName}`, { stdio: 'ignore' });
  } catch {
    run(`git remote add ${remoteName} ${entry.url}`);
  }

  if (action === 'fetch_merge') {
    if (!fs.existsSync(prefix)) {
      // prefix 디렉터리가 없으면 add
      console.log(`📂 '${prefix}' 디렉토리가 없어 subtree add 실행`);
      run(
        `git subtree add --prefix=${prefix} ${remoteName} ${branchRef} --squash -m "add: initial subtree ${name}"`,
      );
    } else {
      // 있으면 fetch + merge
      run(`git fetch ${remoteName} ${branchRef}`);
      run(
        `git subtree merge --prefix=${prefix} ${remoteName}/${branchRef} --squash -m "merge: update ${prefix} from ${remoteName}/${branchRef}"`,
      );
    }
  } else if (action === 'push') {
    run(`git subtree push --prefix=${prefix} ${remoteName} ${branchRef}`);
  } else {
    console.error('❌ Invalid action: use fetch_merge or push');
    process.exit(1);
  }
}

main();
