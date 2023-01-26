export const makeSvg = (hits, locale) => {
  const formatted = new Intl.NumberFormat(locale).format(hits);
  const width = `Views:  ${formatted}`.length * 6.5;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width + 10}" height="20" role="img" aria-label="Views ${formatted}">
      <title>Views ${formatted}</title>
      <g shape-rendering="crispEdges">
      <rect x="0" width="${width + 3}" height="20" fill="#007ec6"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        <text x="${width * 5}" y="140" transform="scale(.1)" fill="#fff" textLength="${width * 9}">Views:  ${formatted}</text>
      </g>
    </svg>
    `;

  // const svg2 = `
  //   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width + 15}" height="20" role="img" aria-label="Views ${formatted}">
  //       <title>Views ${formatted}</title>
  //       <linearGradient id="b" x2="0" y2="100%">
  //           <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
  //           <stop offset="1" stop-opacity=".1"/>
  //       </linearGradient>
  //       <mask id="a">
  //           <rect width="${width + 15}" height="20" fill="#fff"/>
  //       </mask>
  //       <g shape-rendering="crispEdges" mask="url(#a)">
  //           <rect x="0" width="52" height="20" fill="#555"/>
  //           <rect x="52" width="${width + 15}" height="20" fill="#007ec6"/>
  //           <rect x="0" width="${width + 15}" height="20" fill="url(#b)"/>
  //       </g>
  //       <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
  //           <text x="25.5" y="15" fill="#010101" fill-opacity=".3">Views</text>
  //           <text x="25.5" y="14">Views</text>
  //           <text x="${width * 8}" y="140" transform="scale(.1)" fill="#010101" fill-opacity=".3">${formatted}</text>
  //           <text x="${width * 8}" y="140" transform="scale(.1)">${formatted}</text>
  //       </g>
  //   </svg>
  //   `;

  return svg;
};
