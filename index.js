const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient } = require('mongodb');
require('dotenv').config()


// Middle Ware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzdlp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
      
    await client.connect();
    const database = client.db("doctor_portal");
    const appointmentCollection = database.collection("appointment");

    app.post('/appointment', async (req, res) => {
      const appointment = req.body;
      const result = await appointmentCollection.insertOne(appointment)
      console.log(result);
      res.json(result)
        });
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World Doctor Side connected !')
})

app.listen(port, () => {
  console.log(`Listening Port :  ${port}`)
})