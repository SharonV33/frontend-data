export default function barChart(data) {

    const svg = d3.select("#bar")

    const render = data => {
        const xScale = scaleLinear()
            .domain([0, max(data, d => d.value)])
            .range([0, innerWidth])
        console.log(xScale.domain())


        svg.selectAll('rect').data(data)
            .enter().append('rect')
            .attr('width', 300)
            .attr('height', 300)
            .style('fill', "#69b3a2")
    }

    render(data)


}