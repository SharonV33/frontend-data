//code based on examples from curran
//https://www.youtube.com/watch?v=NlBt-7PuaLk&ab_channel=CurranKelleher
//and https://www.d3-graph-gallery.com/graph/barplot_basic.html

import { max } from 'd3'

export default function barChart(dataFromBar, selected) {
    //select element to create bar chart in
    let data = dataFromBar
    const container = d3.select("#vis")

    const svg = container.append("svg").attr("class", "bar")
    //set width and height equal to that of the svg element
    const margin = {top: 10, right: 0, bottom: 70, left: 30}
    const width = 500 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    //create x axis
    let xAxis = d3.scaleBand()
        .range([0, width])
        //give each bar some padding
        .padding(0.5)
    //create Y axis
    let yAxix = d3.scaleLinear()
        .domain([0, max(data, data => data.isDisabled)])
        .range([height, 0])

    //clear currently loaded chart
    d3.select("#vis")
        .select(".pie")
        .selectAll("*")
        .remove()

    d3.select("#legend")
        .style("border", "none")
        .selectAll("*")
        .remove()

    //change colour of current button
    d3.select("#workingButtons")
        .selectAll("button")
        .style("background-color", "#FFF")

    d3.select("#" + selected)
        .style("background-color", "#98abc5")

    d3.select('#filter')
        .on("click", filterEmpty)

    filterEmpty()


    function filterEmpty() {
        const filter = d3.selectAll('#filter').property('checked')
        let newData = []

        if (filter === true) {
            for (let item of dataFromBar) {
                if (item.isDisabled > 0) {
                    newData.push({name: item.name, isDisabled: item.isDisabled})
                } else {
                    // console.log("not disability accessible")
                }
            }
        } else {
            newData = dataFromBar
        }

        data = newData

        xAxis.domain(data.map(data => data.name))

        svg.select(".xAxis").call(d3.axisBottom(xAxis)).exit().remove()


        svg.selectAll(".bar")
            .exit()
            .remove()

        // svg.select(".bar").enter().append('rect')

        svg.selectAll(".bar")
            .selectAll("rect")
            .attr("fill", "#000000")


        renderBarChart(data)
        return data

    }

    function renderBarChart(data) {
        //set up X axis
        //give the svg the correct size
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        //create a group for the x axis and style the text
        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-90)")
            .style("text-anchor", "end")


        //add Y axis to graph
        svg.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(yAxix))

        //create bars
        svg.selectAll("bar")
            .data(data)
            .attr("class", "bar")
            //use enter to create the correct amount of bars based on the data
            .enter()
            .append("rect")
            //give the bar the correct location for where the bar should be
            .attr("x", function (data) {
                return xAxis(data.name)
            })
            .attr("y", function (data) {
                return yAxix(data.isDisabled)
            })
            //give the bar the correct width
            //bandwidth is a standard d3 function. it gives the bars all the same width
            .attr("width", xAxis.bandwidth())
            //give the bar the correct height based on the value of data.isDisabled
            .attr("height", function (data) {
                return height - yAxix(data.isDisabled)
            })
            //add colour
            .attr("fill", "#8A89A6")
            .exit()
            .remove()
    }
}
