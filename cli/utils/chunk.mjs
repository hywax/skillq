export function chunkArray(stream, size) {
  return stream.reduce(
    (chunks, _, idx, arr) =>
      idx % size === 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [],
  )
}

export function objectChunk(object, size) {
  return chunkArray(Object.entries(object), size).map((chunk) => Object.fromEntries(chunk))
}
