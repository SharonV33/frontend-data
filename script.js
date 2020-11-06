//sources
//https://www.d3-graph-gallery.com/graph/pie_basic.html
//https://www.youtube.com/watch?v=lnXf1mpFGb8&ab_channel=FrontendTips

import 'regenerator-runtime/runtime'

import fetchJson from './jsonscript'
import buildPieChart from './pieChart'
import legend from './legend'
import barChart from './barchart'


//load data from parkingscript
fetchJson()
    .then(dataFromUrl => {
        let allDisabled = 0
        let notDisabled = 0

        for (const item of dataFromUrl) {
            if (item === true) {
                allDisabled++
            } else if (item === false) {
                notDisabled++
            }
        }

        const data = [{
            name: 'disabled',
            value: allDisabled
        },
            {
                name: 'total',
                value: notDisabled
            }]

        //start the buildPieChart function with the data element
        buildPieChart(data)
        legend(data)
        barChart(data)

    })



//build the chart


//legend

