import { createWorker } from 'tesseract.js';

// eslint-disable-next-line import/prefer-default-export
export const ocr = async (image: string): Promise<string> => {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(image);
    await worker.terminate();
    const { text } = data;
    return text;
};
