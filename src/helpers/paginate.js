//Test data
//const dataToPaginate = [{ test: 'test' }, { test2: 'test2' }, { test3: 'test3' }, { test4: 'test4' }, { test5: 'test5' }]

// Usage:
// (allData, itemsPerPage, pageNumber) => {data:[],pageNumber,totalPages}


module.exports = (allData, itemsPerPage, pageNumber) => {
    const object = {
        data: [],
        pageNumber,
        totalPages: null
    }
    if (itemsPerPage <= 0)
        throw new Error('itemsPerPage must be > 0')
    object.totalPages = Math.ceil(allData.length / itemsPerPage);
    if (object.totalPages < object.pageNumber || object.pageNumber <= 0)
        return { ...object, error: 'Invalid page number' }

    object.data = allData.slice(itemsPerPage * (object.pageNumber - 1), itemsPerPage * object.pageNumber);
    return object
}