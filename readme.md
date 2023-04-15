A fullstack application that handles users, and lets them create documents in a WYSIWYG editor, save them on a database, and edit or preview them later.


You can test the exported database, the details are located in .\backend\databaseFunctions.js, in plaintext. In actual public work, do not have these things in plaintext like this.

Here's the snip of what to look for. These should allow you to access the database.
```
const MYSQL_USERNAME = "testuser";
const MYSQL_PASSWORD = "password";
```

This is only for testing, in a scenario where you are making this public, make sure you have these stored safely out of plain sight.

To start the project, first navigate to the backend folder, and start the server.

If you are in the root folder, you'll have to write this in the terminal.  
`cd .\backend\`  
Followed by this to start the server.  
`npm start`  

After that to preview the frontend in vite, you open a new terminal and navigate to frontend.  
`cd .\frontend\`

You can either build the project and it will be in the "dist folder" by writing this:  
`npm run build` 
OR you can just run it as dev which allows you to preview and live edit the code:  
`npm run dev`  
Which gives you a locally hosted link to use.