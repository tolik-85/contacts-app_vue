export default function makeId() {
  Math.trunc(Math.random() * 0xffff_ffff)
}
