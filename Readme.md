Alpha Tribe
Overview
Alpha Tribe is a Node.js application using MongoDB with Mongoose for managing user posts and comments. This application includes user authentication, post creation, and comment functionalities.

Features
User registration and authentication
Post creation with stock symbols
Commenting on posts
Liking posts
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/Gaurav1-ui/alpha-tribe.git
Navigate to the Project Directory

bash
Copy code
cd alpha-tribe
Install Dependencies

bash
Copy code
npm install
Create a .env File

Create a .env file in the root directory of the project and add the following environment variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the Application

bash
Copy code
npm start
The application will start with Nodemon and can be accessed at http://localhost:8000.