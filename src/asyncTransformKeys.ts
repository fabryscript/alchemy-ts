async function _asyncForEach(arr: any[], callback: (...args: any) => any) {
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
}

/**
 * @name transformKeys
 *
 * @description asynchronously transform an object's keys into other keys that are obtained through a callback on each key
 *
 * @param o
 * The object to operate with
 *
 * @param transformCallback
 * The callback function that transforms each key. Must return a string as the keys are going to be strings
 */
 export async function asyncTransformKeys(
  o: Object,
  transformCallback: (originalKey: string) => Promise<string>
): Promise<Object> {
  // length / void obj check, returns an error if object is empty.
  if (o === {}) {
    throw new Error(
      `Object should not be empty, obtained: ${JSON.stringify(o)}`
    );
  }

  let newObject = {};
  let keys: string[] = [];
  let values: any[] = [];

  let newKeys: string[] = [];

  // Keys splitting
  try {
    keys = Object.getOwnPropertyNames(o);
  } catch (e) {
    throw new Error(
      `Error occurred while parsing your object's keys ${JSON.stringify(e)}`
    );
  }

  // Values splitting
  try {
    Object.values(o).forEach((v) => values.push(v));
  } catch (e) {
    throw new Error(
      `Error occurred while parsing your object's values ${JSON.stringify(e)}`
    );
  }

  // Callback applier
  await _asyncForEach(keys, async (k) => {
    newKeys.push(await transformCallback(k))
  })

  /**
   * Defines the new property for the newObject
   * with key k (which is part of newKeys at current index)
   * and a value of the original object at c.i.
   */
  newKeys.forEach((k, i) => {
    Object.defineProperty(newObject, k, {
      value: values[i],
      writable: true,
      enumerable: true,
    });
  });

  return newObject;
}