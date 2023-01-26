const sha256 = require("js-sha256");

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(size, numBuckets = 4) {
    this.count = 0;
    this.capacity = size;
    this.data = new Array(size);
    this.data.fill(null);
    this.numBuckets = numBuckets;
  }

  hash(key) {
    let hash = sha256(key);

    return parseInt(hash.slice(0, 8), 16);
  }

  hashMod(key) {
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    // Your code here
  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here
  }
}

module.exports = HashTable;
