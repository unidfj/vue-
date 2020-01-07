export const dateFormat = (t, spe) => {
    t = new Date(t)
    spe = spe || '/'
    let y = t.getFullYear()
    let m = t.getMonth() + 1
    let d=t.getDate()
    return `${y}${spe}${m}${spe}${d}`
}