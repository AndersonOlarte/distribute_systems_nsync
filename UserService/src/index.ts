import app from './app';
import { startConnetionWithDb } from './db-connection';


const PORT = 3002;

async function main() {
    try {
        app.listen(parseInt('3002') , '0.0.0.0');
        await startConnetionWithDb();
        console.log('Database initialized');
        console.log('Server is listening port: ', PORT);
    } catch (error) {
        console.error(error);
    }
}

main();