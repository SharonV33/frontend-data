//sources
//https://www.d3-graph-gallery.com/graph/pie_basic.html
//https://www.youtube.com/watch?v=lnXf1mpFGb8&ab_channel=FrontendTips

import legend from './legend'

export default function buildPieChart(data, selected) {
    //set up static width, height and radius for the visualisation
    const width = 450
    const height = 450
    const radius = 200

    //remove current chart
    d3.select("#vis")
        .selectAll("*")
        .remove()

    d3.select("#workingButtons")
        .selectAll("button")
        .style("background-color", "#FFF")

    d3.select("#" + selected)
        .style("background-color", "#98abc5")

    //load legend
    legend(data)

    //select element to build chart in
    const svg = d3.select("#vis")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "pie")

    //create a group element in the center of the svg. this will be the centre of the pie chart
    const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)

    //set up a domain and colors to be used in the chart
    const color = d3.scaleOrdinal(data)
        .domain(data)
        .range(["#98abc5", "#8a89a6"])

    //assign the data to the chart, for each data element it used the value of the selected object
    const pie = d3.pie()
        .value(data => data.value)

    //create the outer and inner path of the chart
    //inner radius is how far from the center the graph starts
    //outer radius is how far from the center the graph ends
    const path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0)

    //create arcs with the desired values of that group
    const pies = g.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')

    //set up the chart
    pies
        .append('path')
        .attr('d', path)
        .attr('fill', data => color(data.value))

    console.log(data)

}