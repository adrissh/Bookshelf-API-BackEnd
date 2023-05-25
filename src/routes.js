const {addBookHandler,getAllBooks,getDetailBooks,editBooks,deleteBooks}  = require('./handler');

const routes = [

    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBooks,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBooks,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBooks,
    },
    {
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return h.response('404 Error! Page Not Found!').code(404);
        }
    }
   
];


module.exports = routes;