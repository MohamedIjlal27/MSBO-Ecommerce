Here's the steps to run the project:

1. Download or clone the project to your preferred IDE, but Visual Studio Code is recommended.
2. Open the terminal of your IDE.
3. Redirect to the client folder by running `cd client` and then run the `npm install` command to install the dependencies.
4. Redirect to the server folder by running `cd ../server` and then run the `npm install` command to install the dependencies.
5. Inside the server folder, create a `.env` file and define the environment variables as shown in the `example.env`.
6. Inside the server folder, create one more folder in the root directory and name it `uploads`.
7. Inside the `uploads` folder, create four more folders and name them as follows: `users`, `products`, `categories`, `banners`.
8. Pass the path of the uploads folder to the FILES_UPLOADS_PATH variable inside the .env file. There is no need to include the subfolder paths of uploads.
9. Create a MongoDB database and pass the connection string to MONGO_URI, and pass your database name to the DB_NAME variable inside the .env file.
10. You can use the same Stripe key and secret code mentioned in the `example.env`, or you can create and define your own.
11. After following all the first 9 steps, you can run this project by executing the command `npm start`.
12. To start the client, navigate to the client folder by running `cd ../client` and then run `npm start`.
13. To start the server, navigate to the server folder by running `cd server` and then run `npm start`.

These steps should help you set up and run the project successfully. If you encounter any issues, feel free to ask for further assistance!
+94727920628

Note:

1. There will be two roles: admin and user. Admins can add, delete, and update products and users. They can also dispatch orders and update delivery statuses.
2. When you create or register for the first time, the user role will be defined as admin. Afterwards, the user role will default to normal user.

Swagger Api Documentation Link: http://localhost:4000/api-docs/
To correctly check all the API endpoint documentation, start by logging in using the authentication endpoint. This will generate a JWT. Copy and paste the generated token into the authorization section located at the top left corner.

I have created a Stripe dummy local environment payment gateway.
