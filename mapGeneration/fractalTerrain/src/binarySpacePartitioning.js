// These three constants control the size of the rooms
const minSize = 1;
const maxSize = 5;
const r = (lint, uint) => Math.floor(Math.random() * (uint - lint)) + lint;

// The partition class is essentially a binary tree with tiny controller
// logic to handle partition sizes and closing of partitions that don't
// meet the size requirements. After the tree is constructed, there's a
// connect method that walks up the tree from the bottom nodes recursively
// connecting sister leaves together with hallways.
class Partition {
  // This constructor creates a partitioned map down to the smallest
  // available size. The rooms are constructed with walls. After initialization
  // the connect function is called to build out hallways.
  constructor (map, x1, x2, y1, y2, parent, type) {
    this.id = parent ? parent.id + type : '@';
    this._closed = false;
    this.map = map;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2; // ordained space
    this.width = x2 - x1;
    this.height = y2 - y1;
    this.parent = parent || false;
    if (parent) {
      this.depth = parent.depth * 0.7 + Math.random() * (1 - parent.depth * 0.7);
    } else {
      this.depth = 1;
    } // end if
    this.initialize();
  }

  get opened () { return this._closed === false; }
  get closed () { return this._closed === true; }
  setClosed () { this._closed = true; }

  // This creates a left and right child (left/right could be up and down) if there
  // is enough valid space to do so; otherwise, it sets the left and right child
  // as closed nodes
  initialize () {
    const x1 = this.x1; const y1 = this.y1; const x2 = this.x2; const y2 = this.y2;

    // splitting horizontally
    if (this.width >= this.height) {
      if (this.width > maxSize) {
        const split = r(x1 + minSize, x2 - minSize, 1);

        this.left = new Partition(this.map, x1, split, y1, y2, this, 'L');
        this.right = new Partition(this.map, split + 1, x2, y1, y2, this, 'R');
      } else { // can't split horizontally, too small - close nodes
        this.left = { closed: true };
        this.right = { closed: true };
        this.fill();
      } // end if

    // splitting vertically
    } else if (this.height > maxSize) {
      const split = r(y1 + minSize, y2 - minSize, 1);

      this.left = new Partition(this.map, x1, x2, y1, split, this, 'L');
      this.right = new Partition(this.map, x1, x2, split + 1, y2, this, 'R');
    } else { // can't split vertically, too small - close nodes
      this.left = { closed: true };
      this.right = { closed: true };
      this.fill();
    } // end if
  }

  // Fill is called when the partition can no longer be broken down into
  // smaller partitions.
  fill () {
    for (let y = this.y1 - 1; y <= this.y2; y++) {
      for (let x = this.x1 - 1; x <= this.x2; x++) {
        this.map.setDepth(x, y, this.depth);
      } // end for
    } // end for
  }
}

export function bsp (map) {
  const tree = new Partition(map, 1, map.width - 1, 1, map.height - 1);

  return tree;
}
