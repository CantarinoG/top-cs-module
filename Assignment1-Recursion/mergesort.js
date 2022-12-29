function merge(left, right) {
  const arr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}

function mergeSort(array) {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

const array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
console.log(mergeSort(array)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
