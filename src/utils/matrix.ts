/**
 * 对矩阵进行顺时针旋转
 * @param matrix 矩阵
 * @returns 旋转后的新矩阵
 */
export function matrixRotate(matrix: number[][]): number[][] {
  // 在建立新数组时将行和列的数量进行交换
  const newRows = matrix[0].length;
  const newCols = matrix.length;
  const matrix2 = Array.from({ length: newRows }, () => new Array(newCols).fill(0));
  // n为控制新数组列的输入的一个变量
  for (let i = 0, n = matrix.length - 1; i < matrix.length; i++, n--) {
    for (let j = 0; j < matrix[0].length; j++) {
      //当i=0,j=0时,matrix2[0][matrix.length-1]在第一行最后一个元素的位置
      //当i=0,j=1时,matrix2[1][matrix.length-1]在第二行最后一个元素的位置
      //...依次往后推即可发现规律--原数组列的递增就是新数组最后一列行的递增
      matrix2[j][n] = matrix[i][j];
    }
  }
  return matrix2;
}