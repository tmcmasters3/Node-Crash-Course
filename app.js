const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const res = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes'); // import the blog routes

// username: tmmcmasters
// password: test1234!

// express app

const app = express();

//Connect to mngodb
const dbURI = "mongodb+srv://tmmcmasters:test1234!@nodetuts.sauduad.mongodb.net/nodetuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');



//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog 2',
//         snippet: 'About my new blog',
//         body: 'More about my new blog'
//     });

//     blog.save().then(result => {
//         res.send(result);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then(result => {
//         res.send(result);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('63fd5d00a66d730e77c0c185').then(result => {
//         res.send(result);
//     }).catch(err => {
//         console.log(err);
//     })
// })


// routes   
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

//blog routes
app.use('/blogs', blogRoutes);

// 404 page must be here or else it might not be displayed properly before poeople reach the intended page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});


