export function fmtINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function fmtMeters(n: number) {
  return Number.isInteger(n) ? `${n}m` : `${n.toFixed(1)}m`;
}
