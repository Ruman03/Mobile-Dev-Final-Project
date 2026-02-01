JavaScript Object Notation (JSON)
JSON stands for JavaScript Object Notation. It is a lightweight data-interchange format that is
easy for humans to read and write and easy for machines to parse and generate. JSON is widely
used for transmitting data between a server and a client, such as in web applications.
Key Features of JSON:
1. Lightweight: Minimal syntax and easy to handle.
2. Human-readable: Simple structure makes it easy to understand.
3. Language-independent: Supported by most programming languages.
4. Uses Key-Value Pairs: Data is organized as key-value pairs.
Example of JSON:
{
 "name": "John Doe",
 "age": 30,
 "isStudent": false,
 "hobbies": ["reading", "traveling", "coding"],
 "address": {
 "street": "123 Main St",
 "city": "Anytown",
 "country": "USA"
 }
}
Structure:
• Objects: Enclosed in {} and contain key-value pairs. Keys are strings.
• Arrays: Enclosed in [] and contain a list of values.
• Values: Can be strings, numbers, booleans, arrays, objects, or null.
JSON is a crucial format for APIs, configuration files, and data exchange in modern web
applications.
JSON Server
JSON Server is a tool that allows you to quickly set up a mock REST API for testing and
prototyping. It uses a JSON file as its data source and provides endpoints to interact with the data
just like a real API. It's widely used in development environments where creating a full-fledged
backend is unnecessary.
Why Use JSON Server?
1. Fast and Easy Setup:
o You can create a fully functional API within minutes using just a JSON file.
o No need for complex backend development.
2. Mock API for Testing:
o Developers can test their frontend applications without waiting for a real backend.
o Simulates API calls with HTTP methods like GET, POST, PUT, PATCH,
DELETE.
3. Flexible Data Source:
o The data is stored in a simple JSON file, which is easy to modify and understand.
4. Useful for Prototyping:
o Helps in building a prototype where the backend is not yet available.
o Useful for UI/UX teams to test and visualize their applications.
5. Full REST API:
o Provides endpoints that follow REST conventions, making it easier to integrate
with frontend frameworks.
6. Lightweight:
o Runs locally, and requires minimal resources.
Example Usage:
1. Install JSON Server:
npm install -g json-server
2. Create a JSON File (db.json):
{
 "users": [
 { "id": 1, "name": "John Doe" },
 { "id": 2, "name": "Jane Doe" }
 ]
}
3. Run JSON Server:
json-server --watch db.json
4. Access the API:
• GET /users → List all users
• POST /users → Add a new user
• PUT /users/:id → Update a user
• DELETE /users/:id → Delete a user
Benefits in Real Scenarios:
• Simplifies the development of React, Angular, or Vue.js applications by providing
endpoints for testing.
• Reduces dependencies on backend teams during the initial development phase.
• Mimics the structure and behavior of actual APIs.
Would you like a detailed example or assistance setting up JSON Server for your project?
JSON Server Access via IP
If you cannot access JSON Server via a local IP (e.g., 192.168.x.x), it might be because the
server is configured to listen only on localhost by default. To make the JSON Server accessible
on the local network, you need to configure it to listen on all network interfaces.
Steps to Resolve the Issue:
1. Start JSON Server with the Correct Host
By default, JSON Server binds to localhost (127.0.0.1). You need to specify the host as
0.0.0.0 to make it accessible via your local network.
Run this command:
json-server --host 0.0.0.0 db.json
2. Find Your Local IP Address
Identify your machine's local IP address on the network:
• On Windows/Mac/Linux, you can use:
ipconfig # Windows
ifconfig # Linux/Mac (or `ip a`)
Look for your active network adapter (e.g., 192.168.x.x).
3. Access JSON Server via Local IP
Once the server is running, access it using the machine's local IP:
http://192.168.x.x:3000
(Replace 192.168.x.x with your machine’s IP address)