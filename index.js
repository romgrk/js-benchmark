import { spawnSync } from 'child_process'

const commands = [
  'node',
  'bun run',
  'gjs -m',
]

commands.map(c => c + ' run-on-engine.js').forEach(command => {
  const [cmd, ...args] = command.split(' ').concat(process.argv.slice(2))

  const version = spawnSync(cmd, ['--version'], {}).stdout.toString().trim().split(' ').at(-1)
  const result = spawnSync(cmd, args, {})

  console.log(`### ${cmd}: ${version} ###`)
  const output =
    result.stdout.toString() +
    result.stderr.toString()

  const text = output.replace(/Gjs-Console-Message: \S+ /gm, '')
  console.log(text)
  console.log()
})
