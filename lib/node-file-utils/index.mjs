/**
 * todo refactor to my utils
 */
import {readdirSync,unlinkSync} from 'node:fs'
import {join} from 'node:path'

/**
 * @param folderPath {string} - '/path/to/folder'
 */
export function rmAllFilesFromDir(folderPath){
  try {
    const files = readdirSync(folderPath);
    files.forEach(file => {
      const filePath = join(folderPath, file);
      unlinkSync(filePath);
      // console.debug('Deleted file:', filePath);
    });
  } catch (err) {
    console.error('Error reading folder or deleting files:', err);
  }
}

export default {rmAllFilesFromDir}