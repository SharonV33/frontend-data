//code based on examples from curran
//and https://www.d3-graph-gallery.com/graph/barplot_basic.html

import { max } from 'd3'

export default function barChart(data) {

    //select element to create bar chart in
    const svg = d3.select("#bar")
    //set width and height equal to that of the svg element
    const margin = {top: 30, right: 30, bottom: 70, left: 60}
    const width = 460 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom



    const renderBarChart = data => {

        const xAxis = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d =>  d.name))
            .padding(0.2)

        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .style("text-anchor", "end")

    // Add Y axis
        const yAxix = d3.scaleLinear()
            .domain([0, max(data, d => d.value)])
            .range([ height, 0])

        svg.append("g")
            .call(d3.axisLeft(yAxix))

        //create bars
        svg.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) { return xAxis(d.name) })
            .attr("y", function(d) { return yAxix(d.value) })
            .attr("width", xAxis.bandwidth())
            .attr("height", function(d) { return height - yAxix(d.value) })
            .attr("fill", "#69b3a2")

    }

    renderBarChart(data)


}