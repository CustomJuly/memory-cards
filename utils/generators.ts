export function generateRandomHash(): string {
  return `random-${Math.round(Math.random() * 1e7)}`
}
