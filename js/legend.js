export default function legend(data) {

    d3.select(".legend")
        .selectAll("*")
        .remove()

    const svg = d3.select(".legend")
    const size = 20

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#98abc5", "#8a89a6"])

    svg.attr("width", 150)
        .attr("height", 100)
        .style("border", "1px solid darkgray")

    //why does this not work?
    svg.selectAll("p")
        .text(legend)

// Add one dot in the legend for each name.
    svg.selectAll("color")
        .data(data)
        .enter()
        //rect is a default d3 shape
        .append("rect")
        .attr("x", 25)
        .attr("y", function(d,i){ return 25 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style('fill', data => color(data.name))
        .text(function(data){ return data.value})

// Add one dot in the legend for each name.
    svg.selectAll("lable")
        .data(data)
        .enter()
        .append("text")
        .attr("x", 25 + size*1.5)
        .attr("y", function(d,i){ return 25 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .text(function(data){ return data.name})

    console.log(data)

    svg.selectAll("value")
        .data(data)
        .enter()
        .append("text")
        .attr("x", 25 + size*1.2)
        .attr("y", function(d,i){ return 50 + i*(size+5) + (size/2)})

}
