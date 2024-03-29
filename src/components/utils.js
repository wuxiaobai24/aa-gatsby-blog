// import limax from "limax"
const colorlist = ["primary", "link", "info", "success", "warning", "danger"]
const slugfunc = name => name // limax(name, { tone: false })
const hashfunc = s => {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}
const colorfunc = name => colorlist[hashfunc(name) % colorlist.length]

export {slugfunc, colorfunc}