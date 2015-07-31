var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

//GET /quizes/:id
exports.show=function(req,res){
	res.render('quizes/show', {quiz:req.quiz});
};

//GET /quizes/:id/answer
exports.answer=function(req,res){
	var resultado;
	if (req.query.respuesta===req.quiz.respuesta){
		resultado='Corrrecto';
	} else {
		resultado='Incorrrecto';
	}
	res.render('quizes/answer', {  quiz: req.quiz, respuesta:resultado});

};

//GET /quizes
exports.index = function(req, res) {  
	//findAll({where: ["pregunta like ?", "%" + req.query.search.replace(" ","%") + "%"]})
	if (req.query.search){
		models.Quiz.findAll({where: ["pregunta like ?", "%" + req.query.search.replace(" ","%") + "%"]}).then( function(quizes) {//success
	      		res.render('quizes/index.ejs', {quizes: quizes});
	    	}).catch(function(error) { next(error);});
	} else {
		models.Quiz.findAll().then( function(quizes) {//success
	      		res.render('quizes/index.ejs', {quizes: quizes});
	    	}).catch(function(error) { next(error);});
    	}
};

//GET /quizes/new
exports.new=function(req,res){
	var quiz = models.Quiz.build({pregunta:"Pregunta", respuesta:"Respuesta"});
	res.render('quizes/new',{quiz:quiz});
};

//POST /quizes/create
exports.create=function(req,res){
	var quiz = models.Quiz.build( req.body.quiz );

	//a BD
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
			res.redirect('/quizes');
		});
	
};