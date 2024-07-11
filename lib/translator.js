import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function translateText(text) {
  try {
    // Escape double quotes in the input text
    const escapedText = text.replace(/"/g, '\\"');
    const { stdout, stderr } = await execAsync(`python translate.py "${escapedText}"`);
    if (stderr) {
      console.error('Python script error:', stderr);
      throw new Error('Translation failed');
    }
    return stdout.trim();
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}