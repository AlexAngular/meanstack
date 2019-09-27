const Movie = require('../models/moviesModel');


function list(req, res){

    Movie.find({}).populate({path:'user'}).exec(function(error, movies){
        if(error){
            return res.status(400).json({'error':error});
        }
        if(movies){
            return res.status(200).json({movies: movies});
        }else{
            return res.status(400).json({'error': 'no se pueden mostrar peliculas'});
        }
    });
}

function create(req, res){
    
    if(!req.body.movie){
        return res.status(400).json({'error': 'Faltan parámetros'});
    }else{
        let body = req.body.movie;

        let newMovie = new Movie(body);

        newMovie.save().then()
        .then(() => {
            return res.status(200).json({'message': 'movie creada ', 'movie': newMovie});
        })
        .catch(error =>{
            return res.status(400).json({'error': 'no se ha podido crear la pelicula'});
        });
    }
}

function update(req, res){

    if(!req.query.id){
        return res.status(400).json({'error': 'Faltan parámetros movie'});
    }else{
        let id = req.query.id;
        let body = req.body.movie;

        Movie.updateOne({_id : id}, {$set : body}, function(error, movieUpdate){
            if(error){
                return res.status(400).json({'error': 'movie creada', 'movie': newMovie});
            }
            if(movieUpdate){
                return res.status(200).json({'error': 'Película actualizada', 'movie': movieUpdate});
            }
        });
    }
}

function borrar(req, res){

    if(!req.query.id){
        return res.status(400).json({'error': 'Faltan parámetros para borrar movie'});
    }else{
        let id = req.query.id;

        Movie.deleteOne({_id : id}, function(error, movieDelete){
            if(error){
                return res.status(400).json({'error': 'movie creada', 'movie': newMovie});
            }
            if(movieDelete){
                return res.status(200).json({'error': 'Película borrada', 'movie': movieDelete});
            }
        });
    }
}

module.exports = {
    list,
    create,
    update,
    borrar
}