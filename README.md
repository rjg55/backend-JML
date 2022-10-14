# Just Meet API

Please follow these steps in order to setup this project. The corresponding repo for the front-end of this project can be found at this [link](https://github.com/rjg55/Final-Project-FE)

# Deployed via RENDER

[Here](https://just-meet.onrender.com/api/events) is a link for the hosted version of this API.

# SUMMARY

This aim of this project was to build an API for an a mobile app that stored all the information required from the app (such as users, events, groups and messages).

The database is MongoDB (Non-SQL), Mongoose was used for the schema-based modelling of our data and the web framework is Express.js.

The principles of MVC (Model-View-Controller) have been applied. RESTful endpoints are used to enable clear and logical access to desired endpoints. Error handling is also used via middleware functions to ensure a client-side errors are displayed appropriately. Testing (via JEST) of all endpoints/error handling is also included to ensure all code is robust.

# PREREQUISITES

To setup this database you will need to setup your own mongoDB Atlas Cluster. You can find a helpful tutorial [here](https://www.mongodb.com/docs/atlas/getting-started/).

# INSTRUCTIONS TO INSTALL THIS API

## 1. CLONE THIS REPO

1. Go to the github page for this repository - found [here](https://github.com/rjg55/backend-JML)
2. Fork it to your own github account
3. Click the green code icon and copy the https web URL
4. In your terminal of choice, navigate to where you would like to store your copy of the repository
5. Input command:

   ```
   git clone <INSERT-COPIED-REPO-URL>
   ```

6. Open the repo in your IDE of choice (If using VSCode - Input command: **code .**)

## 2. INSTALL DEPENDENCIES

To run this API, you will need to install the required dependencies (such as Express.JS and jest)

1. In your terminal in the IDE of choice - run:

```
npm install
```

## 3. SET UP LOCAL .ENV FILES

Please create two files in the main directory:

- .env.test
- .env.development

Within these files add:

NODE_ENV= < INSERT-DEVELOPMENT-OR-TEST >

MONGO_URI= < INSERT-MONGO-URI >

Once finished, **add these files to the .gitignore file**

## 4. TESTING

This repo comes with some tests already written for existing endpoints and utility functions. They are contained within the folder **tests**.

Run the test suite: **npm test**

## 5. MINIMUM SOFTWARE VERSION REQUIREMENTS

1. Node.JS version **18.3.0 or above**
2. Mongoose version **6.5.4 or above**

## 6. START A LOCAL DB

Run:

```
npm start
```

## All done - you're ready to run locally!
