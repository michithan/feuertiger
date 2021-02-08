/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */

declare interface String {
    remove(subString: string): string;
    toPascalCase(): string;
    toCamelCase(): string;
}

String.prototype.remove = function (subString: string): string {
    return this.replace(subString, '');
};

String.prototype.toPascalCase = function (): string {
    return `${this[0].toUpperCase()}${this.slice(1)}`;
};

String.prototype.toCamelCase = function (): string {
    return `${this[0].toLowerCase()}${this.slice(1)}`;
};
