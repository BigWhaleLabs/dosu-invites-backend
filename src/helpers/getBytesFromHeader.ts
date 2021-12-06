export default function getBytesFromHeader(range: string, videoSize: number) {
  const options = {
    start: 0,
    end: 0,
    contentLength: 0,
  }
  const bytesPrefix = 'bytes='
  const bytesRange = range.substring(bytesPrefix.length)
  const parts = bytesRange.split('-')
  const rangeStart = parts[0] && parts[0].trim()
  if (rangeStart && rangeStart.length > 0) {
    options.start = parseInt(rangeStart)
  }

  if (parts[1]) {
    const rangeEnd = parts[1] && parts[1].trim()
    if (rangeEnd && rangeEnd.length > 0) {
      options.end = parseInt(rangeEnd)
    }
  } else {
    const chunkSize = 10 ** 6
    options.end = Math.min(options.start + chunkSize, videoSize - 1)
  }

  options.contentLength = options.end - options.start + 1

  return {
    start: options.start,
    end: options.end,
    contentLength: options.contentLength,
  }
}
