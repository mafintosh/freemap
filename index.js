module.exports = class FreeMap {
  constructor (reserved = 0) {
    this.free = []
    this.data = []

    while (this.data.length < reserved) this.data.push(null)
  }

  alloc () {
    if (this.free.length) {
      return this.free.pop()
    }
    this.data.push(null)
    return this.data.length - 1
  }

  add (data) {
    const id = this.alloc()
    this.data[id] = data
    return id
  }

  free (id) {
    this.data[id] = null
    this.free.push(id)
  }

  set (id, data) {
    if (id === this.data.length) this.data.push(null)
    if (id >= this.data.length) throw new Error('Invalid id')
    this.data[id] = data
  }

  get (id) {
    return this.data[id]
  }

  * [Symbol.iterator] () {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== null) yield [i, this.data[i]]
    }
  }
}
