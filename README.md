# Chatbot implementations using nueral nets in node.js

Hello everyone my name is Pranav ,I am a machine learning enthusiast. Below are a few chatbot implementations I developed using nueral networks.I developed them using node.js library called synaptic.js

## Types
Two types of chatbot have been developed

        1) Retrieval based chatbot 
        2) Generative chatbot
        
## Approach followed
1) `Retrieval based chatbot`: I have basically tried to build a classifier here. Based on inputs the network recieves we classify them into fixed set of outputs(here outputs map to certain responses)


![alt text](https://camo.githubusercontent.com/6cbf32d6b071f11cda62a15c7697f1381bf03789/687474703a2f2f7777772e636f646570726f6a6563742e636f6d2f4b422f646f746e65742f707265646963746f722f6e6574776f726b2e6a7067)

We used the [bag of words](https://en.wikipedia.org/wiki/Bag-of-words_model) approach, we count the words in each input string and create a kind of dictionary with all the words from training set , The number of input layers is same size as the dictionary i.e. every word in the  dictionary has a corresponding input nueron. whenever data is fed into the network we create a stream of numbers . for every word found in the dictionary the correponding nueron is fed the number of times the word occurs in the input  sentence.

The output is a number which matches a particular category of responses and accordingly an appropriate response is sent back. see below responses generated by chatbot
![alt text](https://github.com/pranavkirtani/chatbot-retrievallbased/blob/master/screenshot.png)

To see this implemenation please see `index.js`

2) `Generative chatbot`: This one is a bit more complex, in the above chabot we see that reponses for any given query is fixed, this means that the chabot picks the most approriate response for a query. in a generative chatbot the chabot generates the responses based on inputs.These are really hard to make and the implemenation you will see here is far from the best out there.I just wanted to experiment and see what we can do with nueral nets
So, there are different approaches for doing this like seq2seq model etc., but  I decided to try something different.
I basically take an entire sentence and  convert it to a binary input.This has an obvious downside in that we need to limit the sentence length.In our example we use a size of 100 for input and a similar size for output.if any sentence is less than 100 letters we append zeroes as padding.

We can see the output when we ran the chat bot below:
![alt text](https://github.com/pranavkirtani/chatbot-retrievallbased/blob/master/generative.png)
As you can see that while the chatbot does generate output it does not make a lot of sense.I used a small traning set for both the above chatbots using larger set will give you a much better result than what I recieved.

Also You can change some of the parameters like iterations and learning rate to see what results you get
`trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 1000,
    error: .005,
    shuffle: true,
    cost: synaptic.Trainer.cost.CROSS_ENTROPY 
    }
});`


# Items to be added
I am currently working on a generative chatbot with using the seq2seq model and  will update that here shortly
