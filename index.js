const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001



app.use(cors());
app.use(express.json());

//touristsSport
//lVe3rZSCmEpUjw3o





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6u84a8i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const addTourists = client.db('touristsDB').collection('tourists')

    app.get('/tourists', async (req, res) => {
      const cursor = addTourists.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/tourists/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await addTourists.findOne(query)
      res.send(result)
    })

    app.post('/tourists', async (req, res) => {
      const newSport = req.body;
      console.log(newSport);
      const result = await addTourists.insertOne(newSport);
      res.send(result)

    })


    app.put('/tourists/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const optional = { upsert: true }
      const updateSport = req.body
      // console.log(updateSport);
      const update = {
        $set: {
          photo: updateSport.photo,
          name: updateSport.name,
          country_Name: updateSport.country_Name,
          location: updateSport.location,
          short_description: updateSport.short_description,
          average_cost: updateSport.average_cost,
          seasonality: updateSport.seasonality,
          travel_time: updateSport.travel_time,
          totaVisitorsPerYear: updateSport.totaVisitorsPerYear,
          user_name: updateSport.user_name,
          User_Email: updateSport.User_Email
        }
      }
      const result = await addTourists.updateOne(filter, update, optional)
      res.send(result)


    })



    app.delete('/tourists/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await addTourists.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Asia tourist spot is running on');
});

app.listen(port, () => {
  console.log(`Asia tourist spot server is running on port: ${port}`);
});
