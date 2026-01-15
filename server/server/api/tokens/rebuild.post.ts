import { exec } from 'child_process'
import { resolve } from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)

export default defineEventHandler(async () => {
  // Run from project root (parent of server directory)
  const projectRoot = resolve(process.cwd(), '../')

  try {
    const { stdout, stderr } = await execAsync('tsx scripts/build-tokens.ts', {
      cwd: projectRoot,
      timeout: 30000 // 30 second timeout
    })

    return {
      success: true,
      stdout: stdout || '',
      stderr: stderr || ''
    }
  } catch (error) {
    const execError = error as { stdout?: string; stderr?: string; message?: string; code?: number }

    throw createError({
      statusCode: 500,
      message: 'Failed to rebuild tokens',
      data: {
        stdout: execError.stdout || '',
        stderr: execError.stderr || '',
        error: execError.message || 'Unknown error',
        code: execError.code
      }
    })
  }
})
