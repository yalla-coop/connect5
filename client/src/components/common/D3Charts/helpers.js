/* eslint-disable*/

import * as d3 from 'd3';

// solution found here https://stackoverflow.com/questions/24784302/wrapping-text-in-d3?answertab=votes#tab-top
export function wrapText(text, width) {
  text.each(function() {
    const text = d3.select(this);
    const words = text
      .text()
      .split(/\s+/)
      // to keep the (12 replies)
      .map(i=> i.replace("+"," "))
      .reverse();
    let word;
    let line = [];
    let lineNumber = 0;
    const lineHeight = 1.1; // ems
    const x = text.attr('x');
    const y = text.attr('y');
    const dy = 0; // parseFloat(text.attr("dy")),
    let tspan = text
      .text(null)
      .text(null)
      .append('tspan')
      .attr('x', x)
      .attr('y', y)
      .attr('dy', `${dy}em`);
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', `${++lineNumber * lineHeight + dy}em`)
          .text(word);
      }
    }
  });
}

export const getDivWidth = divSelector => {
  const width = d3
    .select(divSelector)
    // get the width of div element
    .style('width')
    // take of 'px'
    .slice(0, -2);
  // return as an integer
  return Math.round(Number(width));
};
