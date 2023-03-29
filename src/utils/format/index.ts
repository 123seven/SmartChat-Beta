/**
 * 转义 HTML 字符
 * @param source
 */
export function encodeHTML(source: string) {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 判断是否为代码块
 * @param text
 */
export function includeCode(text: string | null | undefined) {
  const regexp = /^(?:\s{4}|\t).+/gm
  return !!(text?.includes(' = ') || text?.match(regexp))
}

/**
 * 复制文本
 * @param options
 */
export function copyText(options: { text: string; origin?: boolean }) {
  const props = { origin: true, ...options }

  let input: HTMLInputElement | HTMLTextAreaElement

  if (props.origin) input = document.createElement('textarea')
  else input = document.createElement('input')

  input.setAttribute('readonly', 'readonly')
  input.value = props.text
  document.body.appendChild(input)
  input.select()
  if (document.execCommand('copy')) document.execCommand('copy')
  document.body.removeChild(input)
}

/**
 * 时间优化显示 时:分钟
 * @param options
 */
function formatTime(date: Date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${hour}:${minute < 10 ? '0' + minute : minute}`
}

/**
 * 日期优化显示
 * @param options
 */
export function formatDate(dateString: string) {
  const date = new Date(Date.parse(dateString))
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const oneDay = 24 * 60 * 60 * 1000
  const oneWeek = 7 * oneDay

  if (diff < oneDay) {
    // 今天
    return 'Today ' + formatTime(date)
  } else if (diff < 2 * oneDay) {
    // 昨天
    return 'Yesterday ' + formatTime(date)
  } else if (diff < oneWeek) {
    // 最近一周
    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const dayIndex = date.getDay()
    return dayOfWeek[dayIndex] + ' ' + formatTime(date)
  } else {
    // 超过一周
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day} ${formatTime(date)}`
  }
}
