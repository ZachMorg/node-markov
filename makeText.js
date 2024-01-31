/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');


const generateText = function(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}


const makeFileText = function(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log('ERROR:', err);
            process.kill(1);
        }
        else{
            generateText(data);
        }
    });
}


const makeURLText = async function(url){
    try{
        let res = await axios.get(url);
    }
    catch(err){
        console.log('ERROR:', err);
        process.kill(1);
    }
    generateText(res.data)
}



let method = process.argv[2];
let path = process.argv[3];

if(method === 'file'){
    makeFileText(path);
}
else{
    makeURLText(path);
}