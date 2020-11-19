/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */

declare interface String {
    remove(subString: string): string;
    toPascalCase(): string;
}

String.prototype.remove = function (subString: string): string {
    return this.replace(subString, '');
};

String.prototype.toPascalCase = function (): string {
    return `${this.toUpperCase()}${this.slice(1)}`;
};
