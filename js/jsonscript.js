import 'regenerator-runtime/runtime'

export default async function () {
    const res = await fetchData()
    const data = await res
    return data
}

function fetchData() {
    return fetch('https://raw.githubusercontent.com/SharonV33/frontend-data/main/data/parkeergarages_1000.json')
        .then(result => {
            return result.json()
        })
        .then(parkingData => {
            //create an empty array to push all data to
            let cleanDisabledCheck = []
            let allData = []
            let allProvinces = []

            //select only first 50 items for testing script
            const selection = parkingData.slice(0, 1000)

            //select data from wrapper
            const dataUnwrapped = selection.map(item => item.parkingFacilityInformation)

            //check if item has the correct values, else return null
            //with help from Laurens Aarnoudse
            const disabledCheck = dataUnwrapped.map(item => {
                if(!item.specifications[0]){
                    return null
                }
                if(!item.specifications[0].disabledAccess) {
                    return null
                }
                return item.specifications[0].disabledAccess
            })

            //check if item has the correct values, else return null
            //with help from Laurens Aarnoudse
                const cleanProvinceCheck = dataUnwrapped.map(item => {
                    if (!item.operator){
                        return null
                    }
                    if (!item.operator.postalAddress){
                        return null
                    }
                    if (!item.operator.postalAddress.province){
                        return null
                    }
                    return item.operator.postalAddress.province
                })

            // if a value is undefined, make it false because it is very likely that this
            //garage is not disability friendly
            for (let data of disabledCheck) {
                if (data === null) {
                    cleanDisabledCheck.push(false)
                } else {
                    cleanDisabledCheck.push(data)
                }
            }
            //combine all data that was collected in one array with objects per item
            //with help from chelsea Doeleman
            for (let counter = 0; counter <= cleanDisabledCheck.length; counter++) {
                allData.push(({province: cleanProvinceCheck[counter], disabled: cleanDisabledCheck[counter]}))
            }

            //convert the true/false disability value to variabled with numbered values
            //to create the chart easier
            function readableData(data){
                let allDisabled = 0
                let notDisabled = 0
                for (let item of data) {
                    if (item.disabled === true) {
                        allDisabled++
                    } else if (item.disabled === false) {
                        notDisabled++
                    }
                }
                const object = [
                    {
                    name: 'disabled',
                    value: allDisabled
                    },
                    {
                        name: 'total',
                        value: notDisabled
                    }]
                return object
            }


            let rawGR = allData.filter(function(data){
                return data.province === "Groningen"
                })
            let rawFR = allData.filter(function(data){
                return data.province === "Friesland"
            })
            let rawUT = allData.filter(function(data){
                return data.province === "Utrecht"
            })
            let rawOV = allData.filter(function(data){
                return data.province === "Overijsel"
            })
            let rawFL = allData.filter(function(data){
                return data.province === "Flevoland"
            })
            let rawZL = allData.filter(function(data){
                return data.province === "Zeeland"
            })
            let rawLB = allData.filter(function(data){
                return data.province === "Limburg"
            })
            let rawGD = allData.filter(function(data){
                return data.province === "Gelderland"
            })
            let rawDR = allData.filter(function(data){
                return data.province === "Drenthe"
            })
            let rawNH = allData.filter(function(data){
                return data.province === "Noord Holland"
            })
            let rawZH = allData.filter(function(data){
                return data.province === "Zuid Holland"
            })
            let rawNB = allData.filter(function(data){
                return data.province === "Noord Brabant"
            })



            let GR = readableData(rawGR)
            let FR = readableData(rawFR)
            let UT = readableData(rawUT)
            let OV = readableData(rawOV)
            let FL = readableData(rawFL)
            let ZL = readableData(rawZL)
            let LB = readableData(rawLB)
            let GD = readableData(rawGD)
            let DR = readableData(rawDR)
            let NB = readableData(rawNB)
            let ZH = readableData(rawZH)
            let NH = readableData(rawNH)
            let finalData = readableData(allData)


            //create a large dataset with all values per province for the bar chart
            allProvinces.push(
                {name: "Noord Holland", isDisabled: NH[0].value, notDisabled: NH[1].value},
                {name: "Zuid Holland", isDisabled: ZH[0].value, notDisabled: ZH[1].value},
                {name: "Noord Brabant", isDisabled: NB[0].value, notDisabled: NB[1].value},
                {name: "Drenthe", isDisabled: DR[0].value, notDisabled: DR[1].value},
                {name: "Gelderland", isDisabled: GD[0].value, notDisabled: GD[1].value},
                {name: "Limburg", isDisabled: LB[0].value, notDisabled: LB[1].value},
                {name: "Zeeland", isDisabled: ZL[0].value, notDisabled: ZL[1].value},
                {name: "Flevoland", isDisabled: FL[0].value, notDisabled: FL[1].value},
                {name: "Overijsel", isDisabled: OV[0].value, notDisabled: OV[1].value},
                {name: "Utrecht", isDisabled: UT[0].value, notDisabled: UT[1].value},
                {name: "Friesland", isDisabled: FR[0].value, notDisabled: FR[1].value},
                {name: "Groningen", isDisabled: GR[0].value, notDisabled: GR[1].value})


            return {finalData, allProvinces, NH, ZH, NB, DR, GD, LB, ZL, FL, OV, UT, FR, GR}
        })
}
