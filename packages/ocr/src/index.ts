/* eslint-disable no-param-reassign */
import { createWorker, createScheduler } from 'tesseract.js';

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

export const startOcr = async (
    video: HTMLVideoElement,
    handleData: (data: string) => void
): Promise<() => void> => {
    const scheduler = createScheduler();
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    scheduler.addWorker(worker);

    const canvas = document.createElement('canvas');

    const doOCR = async (): Promise<string> => {
        canvas.width = video.width;
        canvas.height = video.height;
        canvas
            ?.getContext('2d')
            ?.drawImage(video, 0, 0, video.width, video.height);

        const {
            data: { text }
        } = await scheduler.addJob('recognize', canvas);

        return text as string;
    };

    const timerId = setInterval(async () => {
        const text = await doOCR();
        handleData(text);
    }, 250);

    const stopOCR = () => {
        clearInterval(timerId);
        worker.terminate();
        canvas.remove();
    };
    return stopOCR;
};
