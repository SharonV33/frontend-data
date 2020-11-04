//sources
//https://www.d3-graph-gallery.com/graph/pie_basic.html
//https://www.youtube.com/watch?v=lnXf1mpFGb8&ab_channel=FrontendTips

import 'regenerator-runtime/runtime'
import disabledParking from './disabledParkingScript'
import allParking from './parkingScript'

//set up static width, height and radius for the visualisation
const width = 450
const height = 450
const radius = 200

allParking('https://opendata.rdw.nl/resource/t5pc-eb34.json')
    .then(datafromUrl => console.log('script', datafromUrl))

//load data from parkingscript
disabledParking('https://opendata.rdw.nl/resource/b3us-f26s.json')
    .then(dataFromUrl => {
        //set data from disabledparkingscript in data element
        const data = [{
            name: 'disabled',
            value: dataFromUrl
        },
            {
                name: 'total',
                value: 100
            }]
        //start the buildPieChart function with the data element
        buildPieChart(data)


    })


//build the chart
function buildPieChart(data) {
    const svg = d3.select("#vis")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

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
        .attr('fill', d => color(d.data.value))

}

//legend

// select the svg area
// var svg = d3.select("#legend")
//
// // Handmade legend
// svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
// svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#404080")
// svg.append("text").attr("x", 220).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
// svg.append("text").attr("x", 220).attr("y", 160).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")
