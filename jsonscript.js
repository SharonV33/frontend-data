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
            //select only first 50 items for testing script
            const selection = parkingData.slice(0, 10)

            //select data from wrapper
            const dataUnwrapped = selection.map(item => item.parkingFacilityInformation)

            //select specifications object
            const specifications = dataUnwrapped.map(item => item.specifications[0])

            //select disabledaccess
            const disabledAccess = specifications.map(item => item.disabledAccess)

            //create an empty array to push correct and edited values
            let cleanDisabledCheck = []


            // if a value is undefined, make it false because it is very likely that this
            //garage is not disability friendly

            for (const data of disabledAccess) {
                if (data === undefined) {
                    cleanDisabledCheck.push(false)
                } else {
                    cleanDisabledCheck.push(data)
                }
            }

            const postalAddress = dataUnwrapped.map(item => item.operator.postalAddress)
            const province = postalAddress.map(item => item.province)
            for (provincie of province){
                console.log(provincie)
            }


            return cleanDisabledCheck
        })
}
