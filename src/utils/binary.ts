import { GRID_WIDTH } from "./constants";

/**
 * 将一个二进制数组成的数组拼成二进制字符串，以0b开头
 * @param {Array} array 二进制数0、1组成的数组
 * @param {Number} length 二进制位数
 * @returns {String} 二进制字符串
 */
function getBinaryString(array: number[], length: number) {
  if (!Array.isArray(array)) throw new Error('请传入数组以便转换成表示二进制的字符串!');
  const joinString = array.join('');
  return `0b${joinString.padStart(length, '0')}`;
}

/**
 * 将一个十进制数转换成二进制字符串，开头没有0b
 * @param {Number} decimal 十进制的数
 * @param {Number} length 二进制位数
 * @returns 开头没有0b的二进制字符串
 */
function parse2BinaryString(decimal: number, length: number) {
  return Number(decimal).toString(2).padStart(length, '0');
}

/**
 * 将二进制字符串转换成二进制数组
 * @param {String} binaryString 二进制字符串
 * @returns 二进制数组
 */
function parse2BinaryArray(binaryString: string) {
  return binaryString.split('').map(Number);
}

/**
 * 判断某一行是否全是0
 * @param row 
 */
function isZeroRow(row: number[], length = GRID_WIDTH) {
  return +getBinaryString(row, length) === 0;
}

export {
  parse2BinaryArray,
  getBinaryString,
  parse2BinaryString,
  isZeroRow,
}