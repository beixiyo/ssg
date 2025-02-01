import { spawn } from 'child_process'
import treeKill from 'tree-kill'


export async function startVitePreview(
  startServerCmd: string,
  startServerArgs: readonly string[],
) {
  return new Promise<VoidFunction>((resolve, reject) => {
    // 启动服务器
    const proc = spawn(startServerCmd, startServerArgs, {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    })

    proc.stdout.on('data', (data) => {
      console.log('Preview server:', data.toString())
      resolve(kill)
    })

    proc.stderr.on('data', (data) => {
      console.error('Preview server error:', data.toString())
      reject(data.toString())
    })

    function kill() {
      const pid = proc.pid
      treeKill(pid, 'SIGTERM', (err) => {
        if (err) {
          console.error(`关闭服务器失败 ${pid}:`, err)
        }
        else {
          console.log(`Process ${pid} 已经关闭`)
        }
      })
    }
  })
}