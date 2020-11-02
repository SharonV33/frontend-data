const width = 450,
        height = 450

const data = [{
    name: 'disabled',
    value: 10
}, {
    name: 'total',
    value: 20
}];

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

const radius = 200;
const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

const color = d3.scaleOrdinal(['red', 'blue', 'green', 'gray']);

const pie = d3.pie().sort(null).value(d => d.value);

const path = d3.arc().outerRadius(radius).innerRadius(0);

const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));