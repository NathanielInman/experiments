export function capitalize (string) {
  return string.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
} // end capitalize()
