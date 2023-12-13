const { getBooksModel } = require("./books.model");

async function getBooks(req, res, next) {
    const limit = 25
    const {search,mime_type,topic,languages,ids} = req.query
    let {page} = req.query
    if(isNaN(page) || page < 1 || !page){
        page = 1
    }
    const data = await getBooksModel({page,limit,search,topic,mime_type,languages,ids})
    res.send({
        count : data.total,
        next: Math.ceil(data.total / limit) > page ? `http://localhost:3000?page=${Number(page)+1}`: null,
        previous: page > 1 ? `http://localhost:3000?page=${page-1}`: null,
        results: data.data,
    });
}

module.exports = {getBooks}