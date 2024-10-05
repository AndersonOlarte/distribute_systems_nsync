import app from './app';
import { startConnetionWithDb } from './db-connection';

async function main() {
    try {
        app.listen(3001 , '0.0.0.0');
        await startConnetionWithDb();
        console.log('Database initialized');
        console.log('Server is listening port: ', process.env.FOLDER_SERVICE_PORT);
    } catch (error) {
        console.error(error);
    }
    
}

main();