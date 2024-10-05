import app from './app';
import { startConnetionWithDb } from './db-connection';

async function main() {
    try {
        app.listen(parseInt(process.env.FOLDER_SERVICE_PORT || '3000') , '0.0.0.0');
        await startConnetionWithDb();
        console.log('Server listening port: ', process.env.DOCUMENT_SERVICE_PORT);
    } catch (error) {
        
    }
};

main();