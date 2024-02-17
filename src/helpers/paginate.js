//Test data
//const dataToPaginate = [{ test: 'test' }, { test2: 'test2' }, { test3: 'test3' }, { test4: 'test4' }, { test5: 'test5' }]

// Usage:
// (allData, itemsPerPage, pageNumber) => {data:[],pageNumber,totalPages}


module.exports = (allData, itemsPerPage, pageNumber) => {
    const object = {
        data: allData,
        pageNumber: Number(pageNumber),
        totalPages: null
    }

    if (object.data.length === 0) {
        object.error = 'No data founded'
        return object
    }

    if (itemsPerPage <= 0) {
        object.error = 'itemsPerPage must be > 0'
        return object
    }

    object.totalPages = Math.ceil(allData.length / itemsPerPage);
    if (object.totalPages < object.pageNumber || object.pageNumber <= 0) {
        object.error = 'Invalid page number'
    }
    object.data = allData.slice(itemsPerPage * (object.pageNumber - 1), itemsPerPage * object.pageNumber);
    return object
}