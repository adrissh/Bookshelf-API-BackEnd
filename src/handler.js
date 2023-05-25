const {nanoid} = require('nanoid');
const books = require('./books');


const addBookHandler = (request,h)=>{
    
const id = nanoid(16);
const insertedAt = new Date().toISOString();
const updatedAt = insertedAt;
let {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

if(pageCount === readPage){
     finished = true;
}
else if(pageCount != readPage) {
     finished = false;
}
console.log(name)

readPageConvert = parseInt(readPage)
pageCountConvert = parseInt(pageCount)


    if(readPageConvert > pageCountConvert){
        const response = h.response(
            {
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }
        )
        response.code(400);
        return response;
    }
    
    if(name == null){
        const response = h.response(
            {
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku"
            }
        )
        response.code(400);
        return response;
    }
    if(name !== null && readPage <= pageCount){
        // const years = Number(year)
        // const pageCounts = Number(pageCount)
        // const readPages = Number(readPage)

        const newBook = {id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,insertedAt,updatedAt};
        books.push(newBook);
    }
    
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if(isSuccess){
       

        const response = h.response(
            {
                "status": "success",
                "message": "Buku berhasil ditambahkan",
                data : 
                    {
                        bookId : id
                    }
            }
        );
        response.code(201);
        return response;
     }

}


const getAllBooks = (request,h)=>{
    let resultQueryName = request.query.name;   
    let resultQueryReading = request.query.reading;
    let resultQueryFinished = request.query.finished;
    console.log(resultQueryFinished)
    const finish = finished
    console.log(finish)

    if(resultQueryFinished == 1){
        resultFinished = true;
    }
    else if(resultQueryFinished == 0){
        resultFinished = false;
    }


    if(resultQueryReading == 1){
        resultReading = true
    }else if(resultQueryReading == 0){
        resultReading = false
    }



    // let queryName=  resultQueryName?.replace(/['"]/g, '')


    if(resultQueryName !=undefined && resultQueryReading ==undefined){
        const filterNameBook = books.filter(element=> element.name.toLowerCase().includes(resultQueryName.toLowerCase()))
        const response = h.response(
            {
                status: 'success',
                data : {
                    books : filterNameBook.map((element)=>({
                        name : element.name,
                        publisher : element.publisher,
                    }))
                }
            }
        )             
        response.code(200)
        return response;
    }
    else if(resultQueryName == undefined && resultQueryReading != undefined ){
        const findReading = books.filter(element => element.reading ==resultReading)
        const response = h.response(
                {
                    status: 'success',
                    data : {
                        books :findReading.map((element)=>({
                            name : element.name,
                            publisher : element.publisher,
                        }))
                    }
                } 
        )
        response.code(200)
        return response
    }
    else if(resultQueryFinished != undefined){
        const findFinished = books.filter(element => element.finished == resultFinished)
        const response = h.response(
            {
                status: 'success',
                data : {
                    books :findFinished.map((element)=>({
                        name : element.name,
                        publisher : element.publisher,
                    }))
                }
            } 
        )
        response.code(200)
        return response
    }
    else if (resultQueryName == undefined && resultQueryReading == undefined && resultQueryFinished == undefined ){
        let filteredBooks = books;
        const response = h.response({
            status : 'success',
            data :{ 
                books : filteredBooks.map((element)=>({
                    id : element.id,
                    name : element.name,
                    publisher : element.publisher,
                }))
            },
        
        });
        response.code(200);
        return response;
   
}
    }





const getDetailBooks = (request,h)=>{
    const bookId = request.params.bookId; // bentuk object
    // const checkBookId = books.find(element => element.id === bookId);
    // console.log(checkBookId)
    const findBook = books.find(element => element.id === bookId ); 
    // console.log(findBook)
    
    if(findBook !== undefined){
        const response = h.response(
            {
                "status": "success",
                "data": {
                    book :findBook
                }
            }
        )
        response.code(200);
        return response;
    }

    else if(findBook == undefined){
        const response = h.response(
            {
                "status": "fail",
                "message": "Buku tidak ditemukan"
            }
        )
        response.code(404);
        return response;
    } 
  
}


const editBooks = (request,h)=>{
    const bookId = request.params; // bentuk object
    const idBook = bookId.bookId; // nah ini nge conver jadi string

    const checkBookId = books.some(element => element.id === idBook);
    console.log(checkBookId)
    let {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

    pageCounts = parseInt(pageCount)
    readPages = parseInt(readPage) 

    
    if(name == null){
        const response = h.response(
            {
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku"
            }
        
        )
        response.code(400);
        return response;
    }

    if(readPages > pageCounts){
        const response = h.response(
            {
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }
        )
        response.code(400);
        return response;
    }

    if(checkBookId){
        const findBook = books.find(element => element.id = idBook );
        if(readPage == pageCount){
            finished = true;
        }
        else if(readPage != pageCount){
            finished = false;
        }
        findBook.name = name
        findBook.year = year,
        findBook.author = author,
        findBook.summary = summary,
        findBook.publisher = publisher,
        findBook.pageCount = pageCount,
        findBook.readPage = readPage,
        findBook.reading = reading,
        findBook.finished = finished

      
        const response = h.response(
            {
                "status": "success",
                "message": "Buku berhasil diperbarui"
            }
        )
        response.code(200);
        return response;

    }
    else if(checkBookId == false){
       const response = h.response(
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }
       )
       response.code(404);
       return response;
    }

}

const deleteBooks = (request,h)=>{
    const bookId = request.params; // bentuk object
    const idBook = bookId.bookId; // nah ini nge conver jadi string
    const checkBookId = books.some(element => element.id === idBook); // check book id ada apa tidak

    const findIndex = books.findIndex(element => element.id == idBook)
    
    if(checkBookId){
        books.splice(findIndex,1)
        const response = h.response(
            {
                "status": "success",
                "message": "Buku berhasil dihapus"
            }
        )
        response.code(200);
        return response;
    }
    else if(checkBookId == false){
        const response = h.response(
            {
                "status": "fail",
                "message": "Buku gagal dihapus. Id tidak ditemukan"
            }
        )
        response.code(404);
        return response;
    }



}


module.exports = {addBookHandler,getAllBooks,getDetailBooks,editBooks,deleteBooks};

