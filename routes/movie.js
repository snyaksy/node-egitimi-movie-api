const express = require('express');
const router = express.Router();

//models
const Movie = require('../models/Movie');

// yeni kayıt ekleme
router.post('/', (req, res, next) => {
  const movie = new Movie({
    title: 'Ölüm Gecesi',
    country: 'Fransa',
    category: 'Korku',
    year: 2009,
    imdb_score:4.9

  });

  movie.save((err,data) => {
    if (err)
      console.log(err);

    res.json(data);
  });
});

router.get('/', (req,res) => {
  const promise = Movie.find({});
  promise.then((data) =>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});




//top 10 Listesi

router.get('/top10', (req,res) => {
  const promise = Movie.find({}).sort({imdb_score: -1}).limit(10);
  promise.then((data) =>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// id bazlı veri çekme işlemi
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
   /* if (!movie)
      next({ message: 'The movie was not found. ', code: 100 });
*/
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// güncelleme işlemi

router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new: true
      }
  );

  promise.then((movie) => {
    if (!movie)
      next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// id bazlı silme işlemi

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if (!movie)
      next({ message: 'The movie was not found. ', code: 99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//yeni kayıt ekleme
/*router.post('/', (req, res, next) => {
  /!*const {title, imdb_score, category, country, year} = req.body;
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });*!/
  const movie = new Movie(req.body);
/!*  movie.save((err, data) => {
    if(err)
      res.json(err);
    res.json(data);
  });*!/
const promise = movie.save();

promise.then((data)=> {
  res.json(data);
}).catch((err) => {
  res.json(err);
   });
});*/

// Between
router.get('/between/:start_year-:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find(
      {
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
      }
  );

  promise.then((data) => {
res.json(data);
}).catch((err) => {
  res.json(err);
})
});

module.exports = router;