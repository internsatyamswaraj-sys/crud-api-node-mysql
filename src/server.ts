// import 'dotenv/config';
// import { Application } from './app';

// // Create and start the application
// const application = new Application();

// // Start the server
// application.start();

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log(' Shutting down gracefully...');
//   await application.stop();
//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   console.log(' Shutting down gracefully...');
//   await application.stop();
//   process.exit(0);
// });


import 'dotenv/config';
import { Application } from './app';

const application = new Application();

// Must initialize before starting
application.initialize().then(() => {
  application.start();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await application.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await application.stop();
  process.exit(0);
});
