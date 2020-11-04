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
            const selection = parkingData.slice(0, 50)
            //select data from wrapper
            const dataUnwrapped = selection.map(item => item.parkingFacilityInformation)
            //select specifications object
            const specifications = dataUnwrapped.map(item => item.specifications[0])
            //select disabledaccess
            const disabledAccess = specifications.map(item => item.disabledAccess)
            //create an empty array to push correct and edited values
            let cleanDisabled = []
            let allDisabled = 0
            let notDisabled = 0

            // if a value is undefined, make it false because it is very likely that this
            //garage is not disability friendly
            for (item of disabledAccess) {
                if (item === undefined) {
                    cleanDisabled.push(false)
                } else {
                    cleanDisabled.push(item)
                }
            }
            //count the amount of trues and falses in the array and add 1 to the correct variable
            for (item of cleanDisabled) {
                if (item === true) {
                    allDisabled++
                } else if (item === false) {
                    notDisabled++
                }
             }

            console.log('disabled', allDisabled)
            console.log('not', notDisabled)
            return allDisabled, notDisabled
        })
}


fetchData()
