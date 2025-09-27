#!/usr/bin/env node
/**
 * Node.js 기반 Git subtree sync 스크립트
 * 사용법: node scripts/sync-subtree.js <name> <pull|push>
 */

// const fs = require('fs');
// const { execSync } = require('child_process');

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
      '명령어에서 <name>과 <action>이 빠졌습니다.: node scripts/sync-subtree.js <name> <pull|push>',
    );
    process.exit(1);
  }

  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(
      `❌ sutree.json 설정 파일을 찾을 수 없습니다: ${CONFIG_FILE}`,
    );
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  const entry = config[name];

  if (!entry) {
    console.error(`❌ No config found for '${name}' in ${CONFIG_FILE}`);
    process.exit(1);
  }

  const remoteName = `${name}`;

  // 원격이 없으면 추가
  try {
    execSync(`git remote get-url ${remoteName}`, { stdio: 'ignore' });
  } catch {
    run(`git remote add ${remoteName} ${entry.url}`);
  }

  //  로직의 문제
  // pull이나 merge를 할 때 --prefix 폴더가 존재하지 않으면 오류 발생
  // 그래서 폴더가 없으면 미리 만들어주거나 subtree add로 추가해주는게 좋음
  if (action === 'pull') {
    run(
      `git subtree pull --prefix=${entry.prefix} ${remoteName} ${entry.branch} --squash`,
    );
  } else if (action === 'push') {
    run(
      `git subtree push --prefix=${entry.prefix} ${remoteName} ${entry.branch}`,
    );
  } else {
    console.error('❌ Invalid action: use pull or push');
    process.exit(1);
  }
}

main();
