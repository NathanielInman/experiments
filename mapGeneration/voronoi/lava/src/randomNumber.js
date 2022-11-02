export function r (lb = 1, ub = 0, isWholeNumber = false) {
  if (lb > ub) return Math.random() * lb; // supports r(n)
  const n = lb + Math.random() * (ub - lb); // supports r(2,4,true)

  if (isWholeNumber) return n | 0; // supports r(2,4) or r(2,4,false)
  return n;
}
