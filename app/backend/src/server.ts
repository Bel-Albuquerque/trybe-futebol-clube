import { App } from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;
const newApp = new App();
newApp.start(PORT);

// admin: {
//   validAdmin: {
//     id: 1,
//     username: 'Admin',
//     role: 'admin',
// admin@admin.com
//     password: 'secret_admin',
//   },
