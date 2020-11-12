export default async function (url) {
    const res = await fetchUrl(url)
    const data = await res
    console.log('export',data)
    return data
}

//defining variables
const url1 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json'
const column1 = 'areaid'
const column2 = 'location'
const column3 = 'areadesc'

//data from second  resource
function fetchUrl() {
    return fetch(url1)
    //turn fetched data into .json
        .then(result => {
            return result.json()
        })
        .then(parkingData => {
            //create new array with just the desired data
            const columnArray = sortData(parkingData, column1, column2, column3)
            //remove 0 and undefined values
            const cleanArray = cleanData(columnArray)

            const allParkingGarages = cleanArray.length
            return allParkingGarages
        })
}

//create new array that only contains data from the desired column
function sortData(dataArray, column1Name, column2Name, column3Name) {
    return dataArray.map(item => Array(item[column1Name], item[column2Name], item[column3Name]))
}

//filter all unusable values from the array
function cleanData(array) {
    //check if there are undefined values in the array and remove them
    let noUndefinedArray = array.filter(function (filteredData) {
        return filteredData[0] !== undefined
    })
    //check if there are 0 values in the array and remove them
    let noZeroArray = noUndefinedArray.filter(function (filteredData) {
        return filteredData[0] !== "0"
    })
    //return the cleaned array
    return noZeroArray

}


