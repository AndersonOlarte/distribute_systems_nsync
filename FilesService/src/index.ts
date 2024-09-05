import app from './app';
import { startConnetionWithDb } from './db-connection';

const PORT = 3000;

async function main() {
    try {
        app.listen(PORT);
        await startConnetionWithDb();
        console.log('Database initialized');
        console.log('Server is listening port: ', PORT);
    } catch (error) {
        
    }
    
}

main();