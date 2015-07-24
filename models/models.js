//construccion de DB segun modelo en quiz.js

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null,null, //DB_name, user, pwd, 
  { dialect:  "sqlite",
    storage:  "quiz.sqlite"  // solo SQLite (.env)
  }      
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// exportar tablas
exports.Quiz = Quiz;//exporta definicion de tabla quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
//sequelize.sync().then(function() {
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
	  if(count === 0) {   // la tabla se inicializa solo si está vacía
	    Quiz.create( 
	       {pregunta: 'Capital de Itaalia',   respuesta: 'Roma'}
	       //,{pregunta: 'Capital de Portugal', respuesta: 'Lisboa'}
	    ).success(function(){console.log('Base de datos (tabla quiz) inicializada')});
	  };
	});

});
