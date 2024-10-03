import app from './app';
import { startConnetionWithDb } from './db-connection';

async function main() {
    try {
        app.listen(process.env.DOCUMENT_SERVICE_PORT);
        await startConnetionWithDb();
        console.log('Server listening port: ', process.env.DOCUMENT_SERVICE_PORT);
    } catch (error) {
        
    }
};

main();