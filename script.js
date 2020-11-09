//sources
//https://www.d3-graph-gallery.com/graph/pie_basic.html
//https://www.youtube.com/watch?v=lnXf1mpFGb8&ab_channel=FrontendTips

//fix for issue with parcel, tip from Gijs Laarman
import 'regenerator-runtime/runtime'

import fetchJson from '../frontend-data/jsonscript'
import buildPieChart from '../frontend-data/pieChart'
import legend from '../frontend-data/legend'
import barChart from '../frontend-data/barchart'


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
        barChart(data, allDisabled)

    })