export interface ExtractorOptions {
    rowSeparator: string;
    colSeparator: string | null | undefined;
    rowLength: number | null | undefined;
    cleaningRules: Array<Record<string, unknown>>;
}

const createEmptyData = (rowCount: number, rowLength: number): string[][] =>
    Array.from<void, string[]>({ length: rowCount }, () =>
        Array.from<void, string>({ length: rowLength }, () => '')
    );

export class RawDataStructure {
    private options: ExtractorOptions;

    public file: File;

    public rawText = '';

    public cleanText = '';

    public flattData: string[][] = [];

    constructor(options: ExtractorOptions) {
        this.options = options;
    }

    public setOptions(options: ExtractorOptions): void {
        this.options = options;
    }

    public async load(file: File): Promise<void> {
        this.file = file;
        this.rawText = await file.text();
    }

    public async clean(): Promise<void> {
        this.cleanText = this.rawText;
    }

    public async parse(): Promise<void> {
        const { colSeparator: colSeparator, rowSeparator: rowSeparator, rowLength } = this.options;

        if (rowSeparator) {
            const rows = this.cleanText.split(rowSeparator);
            this.flattData = rows.map(row => row.split(colSeparator));
        } else if (rowLength) {
            const flattCells = this.cleanText.split(colSeparator);
            const rowCount = Math.ceil(flattCells.length / rowLength);

            const data: string[][] = createEmptyData(rowCount, rowLength);

            this.flattData = flattCells.reduce((acc, cell, index) => {
                const rowIndex = index % rowLength;
                const colIndex = (index - rowIndex) / rowLength;
                acc[colIndex][rowIndex] = cell;
                return acc;
            }, data);
        }
    }
}
