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
            //create an empty array to push correct and edited values
            let cleanDisabledCheck = []

            //create an empty array to push all data to
            let allData = []

            //create an empty array to push data per province to
            let NH = []
            let ZH = []
            let UT = []
            let GD = []
            let DR = []
            let OV = []
            let FL = []
            let GR = []
            let FR = []
            let NB = []
            let LB = []
            let ZL = []

            //select only first 50 items for testing script
            const selection = parkingData.slice(0, 1000)

            //select data from wrapper
            const dataUnwrapped = selection.map(item => item.parkingFacilityInformation)

            //select specifications object
            const specifications = dataUnwrapped.map(item => item.specifications[0])

            //select disabledaccess
            const disabledAccess = specifications.map(item => item.disabledAccess)

            // if a value is undefined, make it false because it is very likely that this
            //garage is not disability friendly
            for (let data of disabledAccess) {
                if (data === undefined) {
                    cleanDisabledCheck.push(false)
                } else {
                    cleanDisabledCheck.push(data)
                }
            }

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

            //combine all data that was collected in one array with objects per item
            //with help from chelsea Doeleman
            for (let counter = 0; counter <= cleanDisabledCheck.length; counter++) {
                allData.push(({province: cleanProvinceCheck[counter], disabled: cleanDisabledCheck[counter]}))
            }

            //create array per province
            for (let item of allData) {
                if (item.province == "Groningen") {
                    GR.push(item)
                } else if (item.province == "Friesland") {
                    FR.push(item)
                }
                else if (item.province == "Drenthe"){
                    DR.push(item)
                }
                else if (item.province == "Utrecht"){
                    UT.push(item)
                }
                else if (item.province == "Overijsel"){
                    OV.push(item)
                }
                else if (item.province == "Flevoland"){
                    FL.push(item)
                }
                else if (item.province == "Zeeland"){
                    ZL.push(item)
                }
                else if (item.province == "Limburg"){
                    LB.push(item)
                }
                else if (item.province == "Gelderland"){
                    GD.push(item)
                }
                else if (item.province == "Drenthe"){
                    DR.push(item)
                }
                else if (item.province == "Noord Holland"){
                    NH.push(item)
                }
                else if (item.province == "Zuid Holland"){
                    ZH.push(item)
                }
                else if (item.province == "Noord Brabant"){
                    NB.push(item)
                }
            }

            return {allData, NH, ZH, NB, DR, GD, LB, ZL, FL, OV, UT, FR, GR}
        })
}
