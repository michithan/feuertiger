/* eslint-disable func-names */
/* eslint-disable no-extend-native */

declare interface Array<T> {
    filterFalsy(): Array<T>;
    first(): T | undefined;
    last(): T | undefined;
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
