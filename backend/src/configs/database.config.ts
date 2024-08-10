/* import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}
 */

import mongoose from "mongoose";


const url = process.env.URL
mongoose.connect(process.env.MONGO_URI!)
 .then((data)=>console.log('Connection with MongoDB is OK'))
 .catch((error)=> console.log('Connection with MongoDB failed.'))
 