/**
 * @name transformKeys
 *
 * @description Transform an object's keys into other keys that are obtained through a callback on each key
 *
 * @param o
 * The object to operate with
 *
 * @param transformCallback
 * The callback function that transforms each key. Must return a string as the keys are going to be strings
 */
export declare function transformKeys(o: Object, transformCallback: (originalKey: string) => string): Object;
