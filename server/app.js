'use strict';

const express = require("express");
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser')
var app = express();
var jsonParser = bodyParser.json();

app.use(cors());

var fileUrl = 'assets/recipes.json';
var recipeRawData = fs.readFileSync('assets/recipes.json');
var recipeData = JSON.parse(recipeRawData);



app.get("/getRecipes", (req,res,next) => {
    res.json(recipeData);
})

app.post("/recipe", jsonParser, (req,res,next) => {
    if(!req.body){
        return res.sendStatus(400);
    }

    recipeData.sort((a,b) => a.id - b.id);
    let newId = recipeData[recipeData.length-1].id + 1;

    let newRecipe = req.body;
    newRecipe.id = newId;

    recipeData.push(newRecipe);

    let rawJson = JSON.stringify(recipeData);

        fs.writeFile(fileUrl, rawJson, 'utf8', (err) => {
            if(err) throw err;
            console.log("Added!");
        });

        res.json('true');
});

app.put("/recipe/:id", jsonParser, (req, res) => {

    if(!req.body){
        return res.sendStatus(400);
    }

    var object = recipeData.find(recipe => recipe.id == req.params.id)

    if(object != undefined){
        var updatedRecipe = req.body;

        var recipeIndex = recipeData.indexOf(object);
        recipeData[recipeIndex] = updatedRecipe;

        var rawJson = JSON.stringify(recipeData);

        fs.writeFile(fileUrl, rawJson, 'utf8', (err) => {
            if(err) throw err;
            console.log("Updated!");
        });

        res.json('true');
    }
    else{
        return res.sendStatus(404);
    }
});

app.delete("/recipe/:id", (req,res,next) => {
    let selectedRecipe = recipeData.find(recipe => recipe.id == req.params.id);
    if(selectedRecipe == undefined){
        return res.sendStatus(404);
    }
    else {
        let updatedRecipeData = recipeData.filter(recipe => recipe.id != req.params.id);
        let rawJson = JSON.stringify(updatedRecipeData);

        fs.writeFile(fileUrl, rawJson, 'utf8', (err) => {
            if(err) throw err;
            console.log("Deleted!");
        });

        res.json('true');
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});