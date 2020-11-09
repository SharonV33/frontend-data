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
            console.log(cleanProvinceCheck.length)
            //
            // let counter = 0
            // for (counter < cleanProvinceCheck.length; counter++;) {
            //     console.log(counter)
            //     allData.push({province: cleanProvinceCheck[counter], disabled: cleanDisabledCheck[counter]})
            //
            //     return allData
            // }


            for (let counter = 0; counter <= cleanProvinceCheck.length; counter++) {​​​​​​​​
                console.log('counter', counter)
                allData.push(
                    {​​​​​​​
                    province: cleanProvinceCheck[counter],
                    disabled: cleanDisabledCheck[counter]
                    }​​​​​​​​
                )
            }​​​​​​​​
            console.log(allData)



            console.log(allData)

            return cleanDisabledCheck
        })
}
