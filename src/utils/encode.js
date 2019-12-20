import he from "he";

/**
 * Encodes provaded data string
 * @param {String} data - data to be encoded
 * @return {String} - encoded string
 */
export const encode = (data) => he.encode(data);
