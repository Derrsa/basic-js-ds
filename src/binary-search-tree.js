const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._addNode(this.rootNode, data);
  }

  _addNode(root, data) {
    if (!root) {
      return new Node(data);
    }

    if (data < root.data) {
      root.left = this._addNode(root.left, data);
    } else if (data > root.data) {
      root.right = this._addNode(root.right, data);
    }

    return root;
  }

  has(data) {
    return this._hasNode(this.rootNode, data);
  }

  _hasNode(root, data) {
    if (!root) {
      return false;
    }

    if (data === root.data) {
      return true;
    } else if (data < root.data) {
      return this._hasNode(root.left, data);
    } else {
      return this._hasNode(root.right, data);
    }
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(root, data) {
    if (!root) {
      return null;
    }

    if (data === root.data) {
      return root;
    } else if (data < root.data) {
      return this._findNode(root.left, data);
    } else {
      return this._findNode(root.right, data);
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(root, data) {
    if (!root) {
      return null;
    }

    if (data < root.data) {
      root.left = this._removeNode(root.left, data);
    } else if (data > root.data) {
      root.right = this._removeNode(root.right, data);
    } else {
      // Node with only one child or no child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // Node with two children, get the inorder successor (smallest in the right subtree)
      root.data = this._minValueNode(root.right).data;

      // Delete the inorder successor
      root.right = this._removeNode(root.right, root.data);
    }

    return root;
  }

  _minValueNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  min() {
    return this._minValue(this.rootNode);
  }

  _minValue(node) {
    if (!node) {
      return null;
    }

    let current = node;
    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    return this._maxValue(this.rootNode);
  }

  _maxValue(node) {
    if (!node) {
      return null;
    }

    let current = node;
    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};