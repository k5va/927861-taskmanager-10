/**
 * Returns true if object has some Boolean property
 * @param {Object} obj - some object
 * @return {Boolean} - true if object has some Boolean property
 */
export const hasSomeBoolean = (obj) => Object.values(obj).some(Boolean);
