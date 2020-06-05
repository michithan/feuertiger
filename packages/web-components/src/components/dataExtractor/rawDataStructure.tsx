export interface ExtractorOptions {
    rowSeprator: string;
    colSeperator: string | null | undefined;
    rowLength: number | null | undefined;
    splitBySeparator: boolean;
}

const createEmptyData = (rowCount: number, rowLength: number): string[][] =>
    Array.from<void, string[]>({ length: rowCount }, () =>
        Array.from<void, string>({ length: rowLength }, () => '')
    );

export class RawDataStructure {
    options: ExtractorOptions;

    data: string[][] = [];

    text: string = '';

    constructor(options: ExtractorOptions) {
        this.options = options;
    }

    parse = async (file: File) => {
        this.text = await file.text();
        const { colSeperator, rowSeprator, rowLength } = this.options;

        if (rowSeprator) {
            const rows = this.text.split(rowSeprator);
            this.data = rows.map((row) => row.split(colSeperator));
        } else if (rowLength) {
            const flattCells = this.text.split(colSeperator);
            const rowCount = Math.ceil(flattCells.length / rowLength);

            const data: string[][] = createEmptyData(rowCount, rowLength);

            this.data = flattCells.reduce((acc, cell, index) => {
                const rowIndex = index % rowLength;
                const colIndex = (index - rowIndex) / rowLength;
                acc[colIndex][rowIndex] = cell;
                return acc;
            }, data);
        }
    };
}
