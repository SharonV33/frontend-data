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
        let UT = [dataFromUrl[1]]
        console.log(UT)

        // for (let item of dataFromUrl) {
        //     if (item === true) {
        //         allDisabled++
        //     } else if (item === false) {
        //         notDisabled++
        //     }
        // }

        const data = [{
            name: 'disabled',
            value: 10
            },
            {
                name: 'total',
                value: 50
            }]

        //start the buildPieChart function with the data element
        buildPieChart(data)
        legend(data)
        barChart(data, allDisabled)

    })