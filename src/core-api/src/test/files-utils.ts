import fs from 'fs'
import path from 'path'

export function file(name: string) {
  return fs.createReadStream(path.join(__dirname, '..', 'assets', name))
}
