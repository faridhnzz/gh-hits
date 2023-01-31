import { makeBadge, ValidationError } from 'badge-maker';

export const makeSvg = (hits, label, lcolor, color, style) => {
  const formatted = new Intl.NumberFormat(undefined).format(hits);
  const svg = makeBadge({
    label: label || 'Views',
    labelColor: lcolor || '#555',
    message: String(formatted),
    color: color || 'blue',
    style: style || 'flat',
  });
  return svg;
};
