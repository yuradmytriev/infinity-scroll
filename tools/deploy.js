import path from 'path';
import fetch from 'node-fetch';
import { spawn } from './lib/cp';
import { makeDir, moveDir, cleanDir } from './lib/fs';
import run from './run';

const remote = {
  name: 'github',
  url: 'https://github.com/<user>/<repo>.git',
  branch: 'gh-pages',
  website: 'https://<user>.github.io/<repo>/',
  static: true,
};

const options = {
  cwd: path.resolve(__dirname, '../build'),
  stdio: ['ignore', 'inherit', 'inherit'],
};


async function deploy() {
  await makeDir('build');
  await spawn('git', ['init', '--quiet'], options);

  let isRemoteExists = false;
  try {
    await spawn(
      'git',
      ['config', '--get', `remote.${remote.name}.url`],
      options,
    );
    isRemoteExists = true;
  } catch (error) {

  }
  await spawn(
    'git',
    ['remote', isRemoteExists ? 'set-url' : 'add', remote.name, remote.url],
    options,
  );

  let isRefExists = false;
  try {
    await spawn(
      'git',
      ['ls-remote', '--quiet', '--exit-code', remote.url, remote.branch],
      options,
    );
    isRefExists = true;
  } catch (error) {
    await spawn('git', ['update-ref', '-d', 'HEAD'], options);
  }
  if (isRefExists) {
    await spawn('git', ['fetch', remote.name], options);
    await spawn(
      'git',
      ['reset', `${remote.name}/${remote.branch}`, '--hard'],
      options,
    );
    await spawn('git', ['clean', '--force'], options);
  }

  process.argv.push('--release');
  if (remote.static) process.argv.push('--static');
  await run(require('./build').default);
  if (process.argv.includes('--static')) {
    await cleanDir('build/*', {
      nosort: true,
      dot: true,
      ignore: ['build/.git', 'build/public'],
    });
    await moveDir('build/public', 'build');
  }

  await spawn('git', ['add', '.', '--all'], options);
  try {
    await spawn('git', ['diff', '--cached', '--exit-code', '--quiet'], options);
  } catch (error) {
    await spawn(
      'git',
      ['commit', '--message', `Update ${new Date().toISOString()}`],
      options,
    );
  }
  await spawn(
    'git',
    ['push', remote.name, `master:${remote.branch}`, '--set-upstream'],
    options,
  );

  const response = await fetch(remote.website);
  console.info(
    `${remote.website} => ${response.status} ${response.statusText}`,
  );
}

export default deploy;
