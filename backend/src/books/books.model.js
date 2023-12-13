const connection = require("../db")

async function getBooksModel({page = 1, limit = 25, mime_type, search, topic,languages,ids}) {

    const mainQuery = `SELECT 
    bb.gutenberg_id as id,
    bb.download_count,
    bb.media_type,
    bb.title,

    cast(CONCAT('[',
    (SELECT 
        GROUP_CONCAT(JSON_OBJECT("name",name,"birth_year",birth_year,"death_year",death_year))
        FROM 
        books_author AS vba INNER JOIN books_book_authors AS vbba ON vbba.author_id = vba.id
    WHERE
    vbba.book_id = bb.id),
    ']')as json) AS authors,

    cast(CONCAT('{',
            (SELECT 
                    GROUP_CONCAT(CONCAT('"',mime_type, '":"', url,'"'))
                FROM
                    books_format AS vbf
                WHERE
                    vbf.book_id = bb.id),
            '}')as json) AS formats,

    cast(CONCAT('[',
    (SELECT 
            GROUP_CONCAT(CONCAT('"',name,'"'))
        FROM
            books_subject AS vbs inner join books_book_subjects as vbbs on vbs.id = vbbs.subject_id
        WHERE
            vbbs.book_id = bb.id),
    ']')as json) AS subjects,

    cast(CONCAT('[',
        (SELECT 
            GROUP_CONCAT(CONCAT('"',name,'"'))
        FROM
            books_bookshelf AS vbs inner join books_book_bookshelves as vbbb on vbs.id = vbbb.bookshelf_id
        WHERE
            vbbb.book_id = bb.id),
    ']')as json) AS bookshelves,

    cast(CONCAT('[',
    (SELECT 
        GROUP_CONCAT(CONCAT('"',code,'"'))
    FROM
        books_language AS vbl inner join books_book_languages as vbbl on vbl.id = vbbl.language_id
    WHERE
        vbbl.book_id = bb.id),
    ']')as json) AS languages

   
    
FROM
    books_book AS bb
    `

    const where = []

    if(search && search !== ''){
        const words = search.split(" ")
        const titleLike = []
        const authorLike = []
        words.forEach(wrd => {
            titleLike.push(`bb.title like '%${wrd}%'`)
            authorLike.push(`ba.name like '%${wrd}%'`)
        })
        where.push(`(${titleLike.join(" or ")}
            or
        bb.id in (select book_id from books_book_authors as bba inner join books_author as ba ON bba.author_id = ba.id where ${authorLike.join(" or ")}))`)
    }
    if(topic && topic !== ''){
        const words = topic.split(",")
        const bsLike = []
        const bbshLike = []
        words.forEach(wrd => {
            bsLike.push(`bs.name like '%${wrd}%'`)
            bbshLike.push(`bbsh.name like '%${wrd}%'`)
        })
        where.push(`
        (bb.id in (select book_id from books_book_subjects as bbs inner join books_subject as bs on bbs.subject_id = bs.id where ${bsLike.join(' or ')})
            or 
        bb.id in (select book_id from books_book_bookshelves as bbb inner join books_bookshelf as bbsh on bbb.bookshelf_id = bbsh.id where ${bbshLike.join(' or ')}))
        `)
    }

    if(mime_type && mime_type !== ''){
        where.push(`(bb.id in (select book_id FROM books_format AS bf WHERE bf.mime_type like '%${mime_type}%'))`)
    }

    if(ids && ids!==''){
        const idList = ids.split(",")
        const idsArr = []
        idList.forEach(id => {
           if(!isNaN(id) && id && id !== ''){
            idsArr.push(id)
           }
        })
        where.push(`(bb.gutenberg_id in (${idsArr.join(",")}))`)
    }

    if(languages && languages!==''){
        const words = languages.split(",")
        const languageLike = []
        words.forEach(wrd => {
            languageLike.push(`bl.code like '%${wrd}%'`)
        })
        where.push(`
            (bb.id in (select book_id FROM books_book_languages as bbl inner join books_language AS bl on bl.id = bbl.language_id where ${languageLike.join(' or ')}))
        `)
    }

    
    const whereStr = `${where.length > 0 ? ' where ' : ''} ${where.join(' and ')}`
    console.log(`${mainQuery} ${whereStr}`)
    const [data, fields] = await (await connection).query(`${mainQuery} ${whereStr} order by bb.download_count DESC LIMIT ${limit} offset ${(page - 1) * limit}`)
    const [count, countFields] = await (await connection).query(`select count(id) as total from books_book as bb ${whereStr}`)
        
    const result = data.map((row) => {
        return {
            ...row,
            authors : row.authors ? row.authors : [],
            subjects : row.subjects ? row.subjects : [],
            bookshelves : row.bookshelves ? row.bookshelves : [],
            languages : row.languages ? row.languages : [],
        }
    })
    
    return {total: count[0].total,data:result}

    // return result
}

module.exports = { getBooksModel }