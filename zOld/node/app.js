// A basic Node.js script

// Importing the built-in 'fs' module for file system operations
const fs = require('fs');

// Reading a file asynchronously
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:', data);
});

// Displaying a message
console.log('Node.js script executed!');
