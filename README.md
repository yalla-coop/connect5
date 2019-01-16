[![Build Status](https://travis-ci.com/techforbetter/connect5.svg?branch=master)](https://travis-ci.com/techforbetter/connect5)

# An App related to Tech for Better
[Tech for Better](https://www.foundersandcoders.com/techforbetter/) is a pro-bono programme for nonprofits to design, test and build new digital service ideas using developers in London and Gaza,

## About the client
Connect 5 is a UK-wide mental health promotion training programme developed from a unique collaboration between Public Health England (PHE) & Health Education England (HEE). It is designed to increase the confidence and core skills of front line staff so that they can be more effective in having conversations about mental health and wellbeing, help people to manage mental health problems and increase their resilience and mental wellbeing through positive changes.

The vision is to facilitate Connect 5’s internal organisation process by creating a mobile application

## About the MVP
This current version of the app is a Minimum Viable Product (MVP) focussing on the most relevant features and needs. Working in agile software development it is important to constantly test products with users. MVPs can be taken out as proof-of-concepts challenging own pre-assumptions and to eventually improve digitalised ideas and needs.

## What the app does
The Connect 5 App aims to improve internal monitoring activities to ensure that training sessions are effective. The web-app is a tool that focuses primarily on trainers to easily share survey forms with course participants and to collect results. Moreover the App shows and visualises individual and overall average survey results. Finally trainers can export and download all of their results. Using the app Connect 5 trainers can gain insights about their teaching outcomes over time. 
Secure authentication was managed to be set up on top of the initial planned scope meaning that each trainer can have their own unique log in, with all their data protected.

As stated above what has been built to date is a MVP that will enable the product owner to do further user testing. 

<img width="383" alt="start" src="https://user-images.githubusercontent.com/23721486/51248988-c18d7d00-1989-11e9-9242-8c5b7bd76ab3.png">
<img width="357" alt="signuplogin" src="https://user-images.githubusercontent.com/23721486/51248898-796e5a80-1989-11e9-81fc-d435ce375bdc.png">
<img width="393" alt="dashboard" src="https://user-images.githubusercontent.com/23721486/51248908-812dff00-1989-11e9-9073-0bc33cb9b65c.png">
<img width="410" alt="sessiondetails" src="https://user-images.githubusercontent.com/23721486/51248912-87bc7680-1989-11e9-9aba-7b7285300f7c.png">
<img width="400" alt="sessionresults" src="https://user-images.githubusercontent.com/23721486/51248926-8f7c1b00-1989-11e9-8bee-793f0cf9306a.png">
<img width="412" alt="sessionresultsind" src="https://user-images.githubusercontent.com/23721486/51248936-9dca3700-1989-11e9-8c1c-16daa5eeed5f.png">
<img width="431" alt="sessionresultsover" src="https://user-images.githubusercontent.com/23721486/51248956-a6bb0880-1989-11e9-85a2-e8e6eda047e5.png">


## Workflow summary

### November 5th-6th - Initial Project planning
Meet and greed between the London and Gaza teams, creating preferred tech-stack, personal project goals etc., final client workshop in London including Gaza-team via Google hangouts

### November 7th-12th - Design Sprint and User Testing
Creating prototype for client and user testing, user testing with three connect 5 trainers and one coordinator

### November 13th to 19th - Core sprint 1 (5 days)
Features absolutely essential to the platform i.e.: navbar (w/o home icon), sign up and log in (simple), add sessions, view sessions, delete sessions, results for single session

### November 20th to 26th - Core sprint 2 (5 days)
Features that are important for the initial scope, i.e.: dashboard and home icon, sign up and log in (secure), results overview (all sessions), data compliance, export results (email / pdf download)

### November 27th to December 2nd - Debugging and Bonus sprint (4 days)
Iron out bugs, have a contingency for first two sprints, bringing in bonus features, i.e.: edit sessions / add attendance, info page (learn about C5), extend results overview (add more stats)

## The Team
![teamc5](https://user-images.githubusercontent.com/23721486/51249138-437da600-198a-11e9-8330-b052824ec543.png)
[Ramy](https://github.com/ramyalshurafa) | [Marwa](https://github.com/marwajomaa) | [Simon](https://github.com/dupreesi) | [Joe](https://github.com/thejoefriel)


## Tech Stack
| Core | Testing | Other |
| - | -------- | -------- |
|Node|jest|babel
|Express|supertest|passport
|React|eslint|axios
|MongoDB|react-testing-library|serve-favicon|
|HTML|nodemon|env2|
|CSS|concurrently||
|Styled-Components|||

## Summary
The remote working process turned out to be very efficient and successful. The communication between the developers and the product owner went great and the final product exceeded expectations as most of the bonus features could be implemented. The product handover went smoothly and the product owner was really pleased with the MVP. 

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
