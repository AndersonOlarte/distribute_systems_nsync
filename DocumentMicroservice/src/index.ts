import app from './app';
import { startConnetionWithDb } from './db-connection';

const PORT = 3000;

async function main() {
    try {
        app.listen(PORT);
        await startConnetionWithDb();
        console.log('Server listening port: ', process.env.DOCUMENT_SERVICE_PORT);
    } catch (error) {
        
    }
};

main();