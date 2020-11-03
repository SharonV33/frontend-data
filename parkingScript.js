//define export
// export {fetchSecondUrl}

//defining variables
const url1  = 'https://opendata.rdw.nl/resource/b3us-f26s.json'
const url2 = 'https://opendata.rdw.nl/resource/t5pc-eb34.json'
const column1 = 'disabledaccess'
const column2 = 'capacity'
const column3 = 'areaid'
const column4 = 'location'
const column5 = 'areadesc'

//fetch data from first url
fetch(url1)
//turn fetched data into .json
    .then(result => {
        return result.json()
    })
    .then(parkingData => {
        //create new array with just the desired data
        const columnArray = sortData(parkingData, column1, column2, column3)
        //remove 0 and undefined values
        const cleanArray = cleanData(columnArray)
        //transform string numbers to integers
        const arrayToInt = stringToNumber(cleanArray)
        const disabledParkingSpaces = arrayToInt.lenght
        return disabledParkingSpaces
    })
//fetch data from second  resource
fetch(url2)
//turn fetched data into .json
    .then(result => {
        return result.json()
    })
    .then(parkingData => {
        //create new array with just the desired data
        const columnArray = sortData(parkingData, column3, column4, column5)
        //remove 0 and undefined values
        const cleanArray = cleanData(columnArray)
        // console.log('clean array 2 ', cleanArray)
        return cleanArray.length
    })


//create new array that only contains data from the desired column
function sortData(dataArray, column1Name, column2Name, column3Name) {
    return dataArray.map(item => Array(item[column1Name], item[column2Name], item[column3Name]))
}

//convert string data to integers
//with help of Gijs Laarman
function stringToNumber(stringData) {
    const allNumbers = stringData.map(entry => {
        if (typeof entry === String) {
            return parseInt(entry)
        }
    })
    return allNumbers
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


