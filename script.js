//fix for issue with parcel, tip from Gijs Laarman
import 'regenerator-runtime/runtime'
import 'd3'

import fetchJson from './jsonscript'
import buildPieChart from './pieChart'
import legend from './legend'
import barChart from './barchart'


//load data from parkingscript
fetchJson()
    .then(dataFromUrl => {
        //add event listeners to buttons to select the data used for the chart
        d3.select('#GR')
                .on("click", () => {buildPieChart(dataFromUrl.GR)})

        d3.select('#FR')
                .on("click", () => {buildPieChart(dataFromUrl.FR)})

         d3.select('#UT')
                .on("click", () => {buildPieChart(dataFromUrl.UT)})

        d3.select('#OV')
                .on("click", () => {buildPieChart(dataFromUrl.OV)})

        d3.select('#FL')
                .on("click", () => {buildPieChart(dataFromUrl.FL)})

        d3.select('#ZL')
                .on("click", () => {buildPieChart(dataFromUrl.ZL)})

        d3.select('#LB')
                .on("click", () => {buildPieChart(dataFromUrl.LB)})

        d3.select('#GD')
                .on("click", () => {buildPieChart(dataFromUrl.GD)})

        d3.select('#DR')
                .on("click", () => {buildPieChart(dataFromUrl.DR)})

        d3.select('#NB')
                .on("click", () => {buildPieChart(dataFromUrl.NB)})

        d3.select('#ZH')
                .on("click", () => {buildPieChart(dataFromUrl.ZH)})

        d3.select('#NH')
                .on("click", () => {buildPieChart(dataFromUrl.NH)})

        d3.select("#overview")
                .on("click", () => {buildPieChart(dataFromUrl.finalData)})

         d3.select("#compare")
             .on("click", () => {barChart(dataFromUrl.allProvinces)})


        // legend(dataFromUrl)


    })