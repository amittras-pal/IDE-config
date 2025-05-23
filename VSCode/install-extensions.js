// Install extensions in the extensions.txt file.
// use "#" or "//" to skip any extension.
// requires nodejs to be installed.

const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const filePath = path.join(__dirname, 'extensions.txt');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    // Split the data into an array of lines
    const lines = data.split('\n');
    // Filter out empty lines and trim whitespace
    const extensions = lines
        .filter(line => line.trim() !== '' && !line.startsWith('#') && !line.startsWith('//'))
        .map(line => line.trim());
    // Log the extensions to the console
    console.log(`${extensions.length} Extensions to install:`, extensions);


    // Install each extension using the command line
    extensions.forEach(extension => {
        const command = `code --install-extension ${extension}`;
        console.log(`Running command: ${command}`);
        try {
            execSync(command, { stdio: 'inherit' });
        } catch (error) {
            console.error(`Failed to install extension ${extension}:\n\n`, error.message);
        }
    });
} catch (err) {
    console.error('Error reading extensions.txt:', err);
}
