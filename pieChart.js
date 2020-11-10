//sources
//https://www.d3-graph-gallery.com/graph/pie_basic.html
//https://www.youtube.com/watch?v=lnXf1mpFGb8&ab_channel=FrontendTips

import 'd3'

export default function buildPieChart(data, dataFromUrl) {

    let selectedData = dataFromUrl.allData


    const GR = d3.select('#GR')
    GR.on("click", changeData(dataFromUrl.GR))

    d3.select("#overview")
        .on('click', changeData(dataFromUrl.allData))

    function changeData(data) {
        selectedData = data
        return selectedData
    }
    console.log(selectedData)

    let allDisabled = 0
    let notDisabled = 0

    for (let item of selectedData) {
        if (item.disabled === true) {
            allDisabled++
        } else if (item.disabled === false) {
            notDisabled++
        }
    }

    const usableData = [{
        name: 'disabled',
        value: allDisabled
    },
        {
            name: 'total',
            value: notDisabled
        }]



    //set up static width, height and radius for the visualisation
    const width = 450
    const height = 450
    const radius = 200

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
    const color = d3.scaleOrdinal(usableData)
        .domain(usableData)
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
        .data(pie(usableData))
        .enter()
        .append('g')
        .attr('class', 'arc')

    //set up the chart
    pies
        .append('path')
        .attr('d', path)
        .attr('fill', data => color(data.value))

}