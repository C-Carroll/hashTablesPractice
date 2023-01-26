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
    if (this.data[hash]) {
      let curr = this.data[hash];

      while (curr.next) {
        curr = curr.next;
      }
      curr.next = new KeyValuePair(key, value);
      this.count++;
    } else {
      this.data[hash] = new KeyValuePair(key, value);
      this.count++;
    }
  }

  insert(key, value) {}
}

module.exports = HashTable;
