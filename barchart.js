//code based on examples from curran
//https://www.youtube.com/watch?v=NlBt-7PuaLk&ab_channel=CurranKelleher
//and https://www.d3-graph-gallery.com/graph/barplot_basic.html

import { max } from 'd3'

export default function barChart(data) {

    d3.select(".pie")
        .selectAll("*")
        .remove()

    d3.select("#bar")
        .selectAll("*")
        .remove()

    //select element to create bar chart in
    const svg = d3.select("#bar")
    //set width and height equal to that of the svg element
    const margin = {top: 30, right: 30, bottom: 70, left: 80}
    const width = 460  - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom



    const renderBarChart = data => {
        //give the svg the correct size
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        //set up X axis
        const xAxis = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(data =>  data.name))
            //give each bar some padding
            .padding(0.5)

        //create a group for the x axis and style the text
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-90)")
            .style("text-anchor", "end")

        //create Y axis
        const yAxix = d3.scaleLinear()
            .domain([0, max(data, data => data.isDisabled)])
            .range([ height, 0])

        //add Y axis to graph
        svg.append("g")
            .call(d3.axisLeft(yAxix))

        //create bars
        svg.selectAll("bar")
            .data(data)
            //use enter to create the correct amount of bars based on the data
            .enter()
            .append("rect")

            //give the bar the correct location for where the bar should be
            .attr("x", function(data) { return xAxis(data.name) })
            .attr("y", function(data) { return yAxix(data.isDisabled) })

            //give the bar the correct width
            //bandwidth is a standard d3 function. it gives the bars all the same width
            .attr("width", xAxis.bandwidth())
            //give the bar the correct height based on the value of data.isDisabled
            .attr("height", function(data) { return height - yAxix(data.isDisabled) })
            //add colour
            .attr("fill", "#8A89A6")

    }

    renderBarChart(data)


}