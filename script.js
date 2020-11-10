//fix for issue with parcel, tip from Gijs Laarman
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

        for (let item of dataFromUrl.allData) {
            if (item.disabled === true) {
                allDisabled++
            } else if (item.disabled === false) {
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
        buildPieChart(data, dataFromUrl)
        legend(data)
        barChart(data, allDisabled)

    })