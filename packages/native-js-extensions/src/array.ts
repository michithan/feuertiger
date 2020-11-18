/* eslint-disable func-names */
/* eslint-disable no-extend-native */

declare interface Array<T> {
    filterFalsy(): Array<T>;
}

Array.prototype.filterFalsy = function () {
    return this.filter(value => value);
};
