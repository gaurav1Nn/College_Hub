const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(express.json())
const Anthropic = require("@anthropic-ai/sdk");
app.use(cors())
require('dotenv').config();
const port = 3001;
const anthropic = new Anthropic({
    apiKey:
    `${process.env.API_KEY}`,
  });
app.post('/v1', async (req,res)=>{
   try{
    const topic = req.body.topic
    const prompt = `You are an AI roadmap generator for rendering
     roadmaps on a website. Your task is to generate a 
     comprehensive roadmap for learning a ${topic},
      including all the necessary topics, concepts, and steps involved.

    The topic for the roadmap will be provided separately
    , and you should generate the roadmap based on that topic.
    
  For generating the roadmap you will first find out the sub topics of ${topic} from beginner topics to advanced topics,
  then you will make it a section and
    
   
    
    For each section, provide a title and a list of
     relevant items or sub-topics. The structure of
      the roadmap should be hierarchical, with sections
       and their corresponding items nested.
    
    Please provide the roadmap in a structured format
     that can be easily rendered on a website, 
     .Response format should be covered in an array, such as given below.
    
    The output should follow this structure:
    [
        {
            "title": "Topic Roadmap",
            "sections": [
              {
                "title": "Section Title",
                "items": [
                  "Item 1",
                  "Item 2",
                  ...
                ]
              },
              ...
            ]
          }
    ]
    your response should not contain anything else than rather than array itself
    `
    const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens:2000,
        messages: [
          { 
            role: 'user',
             content:[
              {
                  type:'text',
                  text:prompt
              }
            ]
          }
        ]
    })
    if (response.content) {
        console.log(response.content[0].text)
      res.send(response.content[0].text);
    } else {
        res.status(500).send('Failed to generate response!');
      }
   }catch(error){
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  
   }
})

app.listen(port, () => {
    console.log(`Server running on  http://localhost:${port}`);
  });
  