/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */

declare interface Array<T> {
    filterFalsy(): Array<T>;
    first(): T | undefined;
    last(): T | undefined;
    filterAsync(predicate: (element: T) => Promise<boolean>): Promise<Array<T>>;
}

Array.prototype.filterFalsy = function () {
    return this.filter(value => value);
};

Array.prototype.first = function () {
    return this[0];
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

Array.prototype.filterAsync = async function <T>(
    predicate: (element: T) => Promise<boolean>
): Promise<Array<T>> {
    const filtered: Array<T> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const element of this) {
        // eslint-disable-next-line no-await-in-loop
        const keep = await predicate(element);
        if (keep) {
            filtered.push(element);
        }
    }

    return filtered;
};
