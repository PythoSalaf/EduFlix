// Mock for File API in Node.js environment
global.File = class File {
  constructor(bits, name, options = {}) {
    this.bits = bits;
    this.name = name;
    this.options = options;
  }
};

global.Blob = class Blob {
  constructor(bits, options = {}) {
    this.bits = bits;
    this.options = options;
  }
};
