import { spawnSync } from 'child_process'

const commands = [
  'node',
  'bun run',
  'gjs -m',
]

commands.map(c => c + ' run.js').forEach(command => {
  const [cmd, ...args] = command.split(' ').concat(process.argv.slice(2))

  const result = spawnSync(cmd, args, {})

  console.log('### ' + cmd + ' ###')
  const output =
    result.stdout.toString() +
    result.stderr.toString()

  const text = output.replace(/Gjs-Console-Message: \S+ /gm, '')
  console.log(text)
  console.log()
})
