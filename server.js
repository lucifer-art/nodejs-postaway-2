import app from './index.js';
import { connectionUsingMongoose } from './src/config/dbConfig.js';

const port = process.env.PORT || 3500

app.listen(port, ()=> {
    connectionUsingMongoose();
    console.log('Server is running on port 3500');
})