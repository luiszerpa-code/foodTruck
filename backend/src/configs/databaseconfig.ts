/* import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}
 */
    
/* import mongoose from "mongoose";


const url = process.env.URL
mongoose.connect(process.env.MONGO_URI!)
 .then((data)=>console.log('Connection with MongoDB is OK'))
 .catch((error)=> console.log('Connection with MongoDB failed.')) */

 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://luisdoxen:R0BvZwLMKnz9lLmu@cluster0.audqejx.mongodb.net/foodmine=true&w=majority&ft=Cluster0";
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);