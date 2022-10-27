const getLocalTime = () => {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const d = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const miu = date.getMinutes() > 0 ? date.getMinutes() : `0${date.getMinutes()}`
  const s = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
  return `${y}-${m}-${d}-${h}-${miu}-${s}`
}

/**
 *
 * @returns 生成唯一key值
 */
const getFileKey = () => {
  let key = ''
  const cArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
  for (let i = 0; i < 20; i++) {
    if (i !== 0 && i % 4 === 0) {
      key += '-'
    } else {
      const cIndex = Math.round(Math.random() * 20)
      key += cArray[cIndex]
    }
  }
  return key
}

const getSuffix = (fileName) => {
  const seat = fileName.lastIndexOf('.')
  const extension = fileName.substring(seat).toLowerCase()
  return extension
}

const suffixIsPDF = (fileName) => {
  if (fileName) {
    const extension = getSuffix(fileName)
    if (extension === '.pdf') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export {
  getLocalTime,
  getFileKey,
  getSuffix,
  suffixIsPDF
}