
# Movies & Subscriptions Management

![image](https://user-images.githubusercontent.com/93710408/157208516-89070fc9-aa0d-4e4b-aae9-7399e7079a41.png)

Movie and subscription Management Site with permissions for each user.
The admin can create users with a username and permissions but without a password.
In order for the user to log in to the site he has to go to the create account page 
and type in the username he is received from the admin with a password he creates for himself.
Only admin has permission to view, create, edit and delete users.
Each user has certain permissions that allow him to view, create, edit and / or delete data.

## Live demo

https://cinema-management.netlify.app/

## Technologies

*	Frontend: HTML, CSS, Bootstrap v5.0, Javascript, React, Redux, Context.
*	BackEnd: Nodejs, Express, Mongoose, cors.
*	Database: MongoDB.

## How to run

* Run the command: 'npm i' in the SubscriptionsWS and CinemaWS folders that are inside the Server folder
  and in the my-app folder that are inside the Client folder.
  
* Run the command: 'node index.js' in two terminals, one for the SubscriptionsWS folder and one for CinemaWS folder.

* In mongoDB create a "UsersDB" Database and the collection "users" 
  and insert the following document into the collection: { "_id" : ObjectId("61f419a6f282fbba2e15b798"), "username" : "admin", "password" : "123456" }

* Run the React App by entering the command: 'npm start' in the terminal of 'my-app' folder.

## Login to the site

* Username: admin

* Password: 123456
