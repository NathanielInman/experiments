import { r } from './randomNumber';

export function rndHex () {
  const l = '0123456789abcdef'.split('');
  let c = '#';
  for (let i = 0; i < 6; i++) c += l[r(0, 15, 1)];
  return c;
}
