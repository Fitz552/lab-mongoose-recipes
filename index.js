const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
    //Recipe.create({
    //  title: "Arroz com Lentilha",
    //  cuisine: "Fitziana"
    //})
    //.then (recipe => console.log(`Receita salva ${recipe}`))
    //.catch (error => console.log(`Deu ruim ${error}`))

    //Recipe.insertMany(data)
    //.then (recipes => {
    //  let recipeTitles = recipes.map(recipe => recipe.title)
    //  console.log(`Receitas salvas = ${recipeTitles}`)
    //})
    //.catch (error => console.log(`Deu ruim ${error}`))

    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {$set: {duration: 100}}, {new: true})
    .then(updated => console.log(`Receita atualizada: ${updated.title}`))
    .catch (error => console.log(`Deu ruim ${error}`))

    Recipe.deleteOne ({title:"Carrot Cake"})
    .then (deleted => console.log(`Receita deletada: ${deleted}`))
    .catch (error => console.log(`Falha em deletar ${error}`))
  })
  .then (  
    mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
  )

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
