// Initialize
var synaptic = require('synaptic');
var natural = require('natural');
var fs = require('fs');
var tokenizer = new natural.WordTokenizer();
var objectKeys = Object.keys || require('object-keys');

// Helpers
function objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function arrayMaxIndex(array) {
    return array.indexOf(Math.max.apply(Math, array));
}

function arrayToDictonary(array, onlyKeys, preventTokenizing) {
    var dictionary = {};
    for (var i in array) {
        var single = array[i];
        var words = tokenizer.tokenize(single);
        if (preventTokenizing) {
            words = [single];
        }
        for (var j in words) {
            var word = words[j];
            if (typeof dictionary[word] == 'undefined') {
                dictionary[word] = 0;
            }
            dictionary[word]++;
        }
    }
    return onlyKeys
        ? objectKeys(dictionary)
        : dictionary
    ;
}

function textToVector(text, dictionary, preventTokenizing) {
    var vector = [];
    var dictionaryKeys = arrayToDictonary([text], true, preventTokenizing);
    for (var dictionaryKey in dictionary) {
        vector.push(
            dictionaryKeys.indexOf(dictionaryKey) === -1
                ? 0
                : 1
        );
    }
    return vector;
}

// Prepare
// To-Do: Add a better dataset
var data = {
    'hello': 'hi, there I am a retrieval based model chatbot written in node.js',
    "Good morning, how are you?": "I am doing well, how about you?",
    'I am also good.': "That's good to hear.",
     'Hows the weather?':'its ver cold out here',
     'Where do you live?':'I live inside the synaptic js',
     "Have you heard of synaptic.js?":"Yes, its Awesome",
     "This is my first experience using nueral networks":"Wow, that really awesome to hear",
     "Have you heard the news?":"What good news?",
     "What is your favorite book?":"I can't read.",
     "So what's your favorite color?":"blue"
};
var texts = [];
var categories = [];

for (var text in data) {
    var category = data[text];
    
    texts.push(text);
    if (categories.indexOf(category) === -1) {
        categories.push(category);
    }
}

// Train
console.log('-------- Initialization started --------');
var trainingSet = [];
var wordsDictionary = arrayToDictonary(texts);
var categoriesDictionary = arrayToDictonary(categories,'',true);
// console.log("wordsDictionary",wordsDictionary)
// console.log("categoriesDictionary",categoriesDictionary)
for (var text in data) {
    var category = data[text];

    trainingSet.push({
        input: textToVector(text, wordsDictionary), 
        output: textToVector(category, categoriesDictionary,true),
    });
}


var inputLayers = objectKeys(wordsDictionary).length;
var hiddenLayers = 32;
var outputLayers = objectKeys(categoriesDictionary).length;

var network = new synaptic.Architect.Perceptron(inputLayers, hiddenLayers, outputLayers);
var trainer = new synaptic.Trainer(network);
console.log('-------- Initialization completed --------');

console.log('-------- Training started --------');
console.log(
    'Info: '+inputLayers+' input layers, '+hiddenLayers+' hidden layers and '+outputLayers+' output layers.'
);
// console.log("trainingSet")
// console.log(trainingSet)
var testingSet = [];
var test_data = [
     'hello',
     'whats your name',
     "what is synaptic.js",
     'do you like synaptic.js?',
     'where do you stay?',
     " which color do you like?",
     "how you feeling?",
     "have you read the news?"
]

for (var i=0;i <test_data.length;i++) {

    testingSet.push({
        input: test_data[i]
    });
}

var result = trainer.train(trainingSet, {
    rate: .1,
    iterations: 1000000000,
    error: .005,
    shuffle: true,
    // log: 10,
    cost: synaptic.Trainer.cost.CROSS_ENTROPY,
    schedule: {
        every: 100,
        do: function(data) {
            console.log(data);

            if (data.iterations % 10 === 0) {
                // console.log('Testing the "it was very good" text. Category:');
                // var test = network.activate(textToVector('it was very good', wordsDictionary));
                // console.log(test)
                // console.log(categories[arrayMaxIndex(test)]);
            }
        },
    },
});
//console.log(result);
console.log('-------- Training completed --------');
// console.log("testingSet")
// console.log(testingSet)
testingSet.forEach(function(data){
var input=data.input;
//console.log(network.activate(textToVector(input,wordsDictionary)))
console.log("text input:",input,"\n chatbot output:",categories[arrayMaxIndex(network.activate(textToVector(input,wordsDictionary)))])
})