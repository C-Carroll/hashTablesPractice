const sha256 = require("js-sha256");

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity);
    this.data.fill(null);
  }

  hash(key) {
    let hash = sha256(key);

    return parseInt(hash.slice(0, 8), 16);
  }

  hashMod(key) {
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    let hash = this.hashMod(key);

    if (this.data[hash]) {
      throw new Error("hash collision or same key/value pair already exists!");
    } else {
      this.data[hash] = new KeyValuePair(key, value);
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    let hash = this.hashMod(key);
    let current = this.data[hash];
    if (current) {
      let newNode = new KeyValuePair(key, value);
      newNode.next = current;
      this.data[hash] = newNode;
    } else {
      this.data[hash] = new KeyValuePair(key, value);
    }

    this.count++;
  }

  insert(key, value) {
    let index = this.hashMod(key);
    let curr = this.data[index];

    while (curr) {
      if (curr.key === key) {
        curr.value = value;
        return;
      }
      curr = curr.next;
    }

    let newPair = new KeyValuePair(key, value);
    newPair.next = this.data[index];
    this.data[index] = newPair;
    this.count++;
  }
}

module.exports = HashTable;
