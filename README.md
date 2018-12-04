[![Build Status](https://travis-ci.com/techforbetter/connect5.svg?branch=master)](https://travis-ci.com/techforbetter/connect5)

# Connect 5

Connect 5 has been developed to give frontline staff the confidence to have more effective conversations with the public about their mental health and wellbeing.

This initial MVP is an app for Connect 5 trainers, where they can create and track upcoming sessions, send out surveys to workshop participants and immediately get all data visualised on the platform to track the impact of the delivery. They also have the ability to export all results to work with further. 

### The Team
[Ramy](https://github.com/developess) | [Marwa](https://github.com/thejoefriel) | [Simon](https://github.com/VirtualDOM) | [Joe](https://github.com/SleepySheepy172)

### Tech Stack

| Core | Testing | Other |
| - | -------- | -------- |
|Node|jest|babel
|Express|supertest|passport
|React|eslint|axios
|MongoDB|react-testing-library|serve-favicon|
|HTML|nodemon|env2|
|CSS|concurrently||
|Styled-Components|||


## Getting Started
How to get a copy of the project up and running on your local machine.

*Please ensure you have this software **installed and running** on your local machine **before** you attempt to run this webapp.*
> **Node** (via nvm recomended)
> see: https://github.com/creationix/nvm

> **MongoDB**
> see: https://docs.mongodb.com/manual/installation/

### Setup

#### 1. Clone the repo:
```
$ git clone https://github.com/techforbetter/connect5.git
```
#### 2. Install Dependencies 
```
$ cd connect5
$ npm i
```

#### 3. Install Dependencies in the `client` folder
```
$ npm run client:init
```

#### 4. Get Mongo running on your local computer
Connect to mongo in a separate terminal tab/window.
```
$ mongod
```

#### 5. Add some more Environment Variables
Create a `config.env` file in the root.

Add these👇 lines to the file, to make your local databases work, inserting your own psql username and password.
```
mongoURI= mongodb://localhost:27017/connect5db
mongoURI_TEST= mongodb://localhost:27017/connect5db_TEST
```
Add a 'Secret' for password encryption.
```
SECRET = "[SOMETHING SECRET]"
```

#### 6. Build the Database
Use this script that runs dummy_data_build.js to set up your survey questions and put in some inital dummy data
```
$ npm run dummybuild
```

#### 7. Run the Tests
To make sure everything is working as it should.

Server:
```
$ npm test
```

Client:
```
$ npm run test:client
```

#### 8. Run the Server
```
$ npm run dev:both
```
Wait for a `compiled successfully` message.

#### 9. Have Fun
The webapp should now be running on
```localhost:3000```
Now you can play with the code all you like 🎉

If you notice anything wrong with the instructions or the project isn't running as expected don't hesitate to raise an issue and we'll try to figure it out.
