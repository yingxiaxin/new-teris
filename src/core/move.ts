import { getBinaryString, isZeroRow, parse2BinaryArray, parse2BinaryString } from '../utils/binary';
import { GRID_WIDTH, GRID_HEIGHT, Direction } from '../utils/constants';

const BorderMultiplier = {
  [Direction.left]: () => {
    const arr = new Array(GRID_WIDTH).fill(0);
    arr[0] = 1;
    return getBinaryString(arr, GRID_WIDTH);
  },
  [Direction.right]: () => {
    const arr = new Array(GRID_WIDTH).fill(0);
    arr[GRID_WIDTH - 1] = 1;
    return getBinaryString(arr, GRID_WIDTH);
  },
};

// 判断某一行是否在左右侧边界
function isRowAtBorder(row: number[], direction: Direction) {
  // 判断左右
  if (direction === Direction.left || direction === Direction.right) {
    const multiplier = BorderMultiplier[direction]();
    const curBinaryString = getBinaryString(row, GRID_WIDTH);
    if ((+multiplier & +curBinaryString) === 1) {
      return true;
    }
    return false;
  } else {
    // 判断下--尾行是否全为0
    if (isZeroRow(row)) {
      return false;
    }
    return true;
  }
}

// 判断是方块是否在边界了
function isAtBorder(matrix: number[][], direction: Direction) {
  // 左右方向判断
  if (direction === Direction.left || direction === Direction.right) {
    for (let i = 0; i < matrix.length; i++) {
      if (isRowAtBorder(matrix[i], direction)) {
        return true;
      }
    }
    return false;
  } else {
    // 下方向判断
    return isRowAtBorder(matrix[GRID_HEIGHT - 1], direction);
  }
}

// 方块某一行的移动
function virtualRowMove(row: number[], direction: Direction.left | Direction.right) {
  let moveRst;
  if (direction === Direction.left) {
    const binaryString = getBinaryString(row, GRID_WIDTH);
    moveRst = +binaryString << 1;
  } else {
    const binaryString = getBinaryString(row, GRID_WIDTH);
    moveRst = +binaryString >> 1;
  }
  return moveRst;
}

// 虚拟移动，即获得某一行左右移动后该有的位置
function virtualMove(matrix: number[][], direction: Direction) {
  // 移动后的位置
  let rstMatrix: number[][] = [];

  // 左/右
  if (direction === Direction.left || direction === Direction.right) {
    for (let i = 0; i < matrix.length; i++) {
      const curRow = matrix[i];
      // 如果这一行全是0，那么不需要处理，新位置还是全0
      if (isZeroRow(curRow)) {
        rstMatrix[i] = [...curRow];
      } else {
        const moveRst = virtualRowMove(curRow, direction);
        rstMatrix[i] = parse2BinaryArray(parse2BinaryString(moveRst, GRID_WIDTH));
      }
    }
  } else {
    // 下
    rstMatrix = new Array(GRID_WIDTH).fill(0).concat(matrix.slice(0, matrix.length - 1));
  }

  return rstMatrix;
}

/**
 * 判断一个图行是否可以朝某个方向移动，如果不能返回false；如果可以，则返回移动后的新位置
 * @param matrix 俄罗斯方块矩阵
 * @return boolean | number[][]
 */
function canMove(matrix: number[][], pool: number[][], direction: Direction) {
  // 如果可以移动，那么移动后的目标位置
  let targetPosMatrix: number[][] = [];

  // 如果是左右方向的判断，走此分支
  if (direction === Direction.left || direction === Direction.right) {
    for (let i = 0; i < matrix.length; i++) {
      // 方块的当前行
      const curArray = matrix[i];
      // 方块池的当前行
      const poolCurArray = pool[i];

      // 1、判断是否在左右侧边界
      if (isRowAtBorder(curArray, direction)) return false;

      // 2、判断是否跟方块池有交集了
      const virtualRst: number = virtualRowMove(curArray, Direction.left);
      // 如果且运算不等于0，那么说明将要移动到的位置跟方块池有交集，不可移动
      if ((virtualRst! & +getBinaryString(poolCurArray, curArray.length)) !== 0) {
        return false;
      }

      // 3、此行可以移动，那么记录它如果移动了后所在的位置
      targetPosMatrix[i] = parse2BinaryArray(parse2BinaryString(virtualRst, GRID_WIDTH));
    }
    return targetPosMatrix;
  } else {
    // 否则是下方向的判断，走此分支
    // 1、判断是否在下边界
    if (isRowAtBorder(matrix[matrix.length - 1], direction)) return false;

    // 2、判断是否跟方块池有交集--假设它向下移，它与方块池有没有交集(每行分别进行与运算，如果有一行不为0，那么说明有交集，不能移动)
    targetPosMatrix = virtualMove(matrix, Direction.down);

    for (let i = 0; i < targetPosMatrix.length; i++) {
      const virtualCurArray = targetPosMatrix[i];
      const poolCurArray = pool[i];
      if ((+getBinaryString(virtualCurArray, virtualCurArray.length) & +getBinaryString(poolCurArray, poolCurArray.length)) !== 0) {
        return false;
      }
    }
    return targetPosMatrix;
  }
}

export {
  canMove
}