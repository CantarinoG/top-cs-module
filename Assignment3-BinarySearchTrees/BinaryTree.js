import { Node } from './Node.js';

export class BinaryTree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const middleIndex = Math.floor(sortedArray.length / 2); //middle index of the sorted array
    const newNode = new Node(sortedArray[middleIndex]); //Node with element at the middle
    newNode.leftChild = this.buildTree(sortedArray.slice(0, middleIndex)); //left child receives the level 0 root node from first half of the array
    newNode.rightChild = this.buildTree(sortedArray.slice(middleIndex + 1)); //right child receives the level 0 root node from second half of the array
    //That's recursive, so each sub array gets divided until it's lenght is null and the tree is built with every single element
    return newNode; 
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) return new Node(value);
    if (currentNode.value === value) return;

    if (currentNode.value < value) {
      currentNode.rightChild = this.insert(value, currentNode.rightChild);
    } else {
      currentNode.leftChild = this.insert(value, currentNode.leftChild);
    }
    //That's recursive, so the new value keeps entering in either the left or the right side of the tree until it reaches a leaf node
    return currentNode;
  }

  remove(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;

    if (currentNode.value === value) {
      currentNode = this.removeNodeUtil(currentNode);
    } else if (currentNode.value > value) {
      currentNode.leftChild = this.remove(value, currentNode.leftChild);
    } else {
      currentNode.rightChild = this.remove(value, currentNode.rightChild);
    }
    return currentNode;
  }

  find(value, node = this.root) {
    if (node === null || node.value === value) return node;
    //Base case: stops when node.value === value

    if (node.value < value) {
      return this.find(value, node.rightChild);
    } else {
      return this.find(value, node.leftChild);
    }
    //Uses recursiveness to navigate through the tree until if finds the value, which finishes the recursion
  }

  levelOrder(callbackFn) {
    const queue = [this.root];
    const levelOrderList = [];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callbackFn ? callbackFn(currentNode) : levelOrderList.push(currentNode.value);

      const enqueueList = [
        currentNode?.leftChild,
        currentNode?.rightChild
      ].filter((value) => value);
      queue.push(...enqueueList);
    }
    if (levelOrderList.length > 0) return levelOrderList;
  }

  //The following functions get the values in different orders: LVR, VLR and LRV
  inorder(callbackFn, node = this.root, inorderList = []) {
    if (node === null) return;

    this.inorder(callbackFn, node.leftChild, inorderList);
    callbackFn ? callbackFn(node) : inorderList.push(node.value);
    this.inorder(callbackFn, node.rightChild, inorderList);

    if (inorderList.length > 0) return inorderList;
  }

  preorder(callbackFn, node = this.root, preorderList = []) {
    if (node === null) return;

    callbackFn ? callbackFn(node) : preorderList.push(node.value);
    this.preorder(callbackFn, node.leftChild, preorderList);
    this.preorder(callbackFn, node.rightChild, preorderList);

    if (preorderList.length > 0) return preorderList;
  }

  postorder(callbackFn, node = this.root, postorderList = []) {
    if (node === null) return;

    this.postorder(callbackFn, node.leftChild, postorderList,);
    this.postorder(callbackFn, node.rightChild, postorderList);
    callbackFn ? callbackFn(node) : postorderList.push(node.value);

    if (postorderList.length > 0) return postorderList;
  }

  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.leftChild);
    const rightHeight = this.height(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeVal, node = this.root, edgeCount = 0) {
    if (node === null) return;
    if (node.value === nodeVal) return edgeCount;

    if (node.value < nodeVal) {
      return this.depth(nodeVal, node.rightChild, edgeCount + 1);
    } else {
      return this.depth(nodeVal, node.leftChild, edgeCount + 1);
    }
  }

  isBalanced() {
    return this.testBalance(this.root) !== -1;
  }

  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) { //Fucntion by TheOdinProject
    if (node.rightChild) {
      this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '|   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChild) {
      this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '|   '}`, true)
    }
  }

  testBalance(node) {
    if (node === null) return 0;

    const leftBalance = this.testBalance(node.leftChild);
    const rightBalance = this.testBalance(node.rightChild);
    const diff = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
  }

  inorderNext(node) {
    let currentNode = node;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode;
  }

  removeNodeUtil(node) {
    if (node.leftChild && node.rightChild) {
      const successorNode = this.inorderNext(node.rightChild);
      node.value = successorNode.value;
      node.rightChild = this.remove(successorNode.value, node.rightChild);
      return node;
    } else {
      const replacementNode = node.rightChild || node.leftChild;
      node = null;
      return replacementNode;
    }
  }
}
