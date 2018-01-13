// Initialize
var synaptic = require('synaptic');
var natural = require('natural');
var fs = require('fs');
var tokenizer = new natural.WordTokenizer();
var objectKeys = Object.keys || require('object-keys');


// function convertToNumber(text){
//     var number_to_feed=Array.apply(null, Array(48)).map(Number.prototype.valueOf,0);
//      var string_length=text.length;
//      for(var i=0;i<string_length;i++){
//          number_to_feed[i]=text.charCodeAt(i)

//      }
//      return number_to_feed

// }

Normalize = function(ascii)
{
      var bin = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
      for (var i = 0; i < ascii.length; i++)
      {
          var code = ascii.charCodeAt(i);
          bin += ('0000000000' + code.toString(2)).slice(-10);
      }
      return bin.slice(-10 * 10).split('').reverse();
}

function Denormalize(input){

input.reverse()

var final=input.join('')

  var char_string='';
 for (var i = 0; i < final.length; i=i+10)
      {
            var ten_slice=final.slice(i,i+10)
            var charcode=parseInt(ten_slice,2)
           // console.log("charcode",charcode)
            var character=String.fromCharCode(charcode)
            //console.log("character",character)
            char_string=char_string+character
      } 
      return char_string;
}

// Prepare
// To-Do: Add a better dataset
var data = {
    'hello': 'hi',
    "Good morning": "morning",
    'you good?': "Yes",
     'weather':'cold',
     ' live':'synaptic js',
     "what's ssynaptic.js?":"ML"
};

var texts=[];
var output_texts=[]
var trainingSet=[]
for(var text in data){
    

    trainingSet.push({input:Normalize(text),output:Normalize(data[text])})
     }
 



var inputLayers = 100;
var hiddenLayers = 101;
var outputLayers = 100

var network = new synaptic.Architect.Perceptron(inputLayers, hiddenLayers, outputLayers);
var trainer = new synaptic.Trainer(network);
console.log('-------- Initialization completed --------');

console.log('-------- Training started --------');
console.log(
    'Info: '+inputLayers+' input layers, '+hiddenLayers+' hidden layers and '+outputLayers+' output layers.'
);

var testingSet = [];
var test_data = [
     'hi',
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
    rate: 0.1,
    iterations: 1000,
    error: .005,
    shuffle: true,
    // log: 10,
    cost: synaptic.Trainer.cost.CROSS_ENTROPY ,
    schedule: {
        every: 100,
        do: function(data) {
            //console.log(data);

            if (data.iterations % 10 === 0) {
                // console.log('Testing the "it was very good" text. Category:');
                // var test = network.activate(convertToNumber("Hi"));
                // console.log(test)
                // console.log(categories[arrayMaxIndex(test)]);
            }
        },
    },
});

var responses=network.activate(Normalize("you good"));

for(var i=0;i<responses.length;i++){
    responses[i]= responses[i]>=0.5?1:0
}

console.log("Test result for you good",Denormalize(responses))
responses=network.activate(Normalize("hi"));

for(var i=0;i<responses.length;i++){
    responses[i]= responses[i]>=0.5?1:0
}

console.log("Test result hi",Denormalize(responses))
 responses=network.activate(Normalize("weather"));

for(var i=0;i<responses.length;i++){
    responses[i]= responses[i]>=0.5?1:0
}

console.log("Test result for weather",Denormalize(responses))

 responses=network.activate(Normalize("live"));

for(var i=0;i<responses.length;i++){
    responses[i]= responses[i]>=0.5?1:0
}

console.log("Test result  for live",Denormalize(responses))
