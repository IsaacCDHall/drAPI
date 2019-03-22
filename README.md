# Portland Doctor Search
### Matt Groberg

## Description

_This application uses the Better Doctors API to allow users to search for doctors in Portland. Users can search for Doctors by name, specialty, or by condition they treat._

## Specs

1. Takes in search form inputs and calls function with them.
2. Queries the BetterDoctor API using the search terms.
3. Waits for response, then stores response in variable (if there was an error, it will return the error message).
4. Parses JSON data to make looping possible.
5. Loops over the array of results, removing undefined values and displaying unique values for each doctor in a "card".
6. Displays a message if there were no Doctors found given the search criteria.

## Installation and Setup

1. Clone this repository
2. Make a file called .env in the root directory. Sign up for the Better Doctor API to get a key, and place it in this file like this:
exports.apiKey=KEYGOESHERE
3. Install Dependencies using this command: npm i
4. Start dev server with with command:


## Technologies Used

* Backend: NodeJS, NPM, and webpack
* Front-end: HTML, CSS, and JavaScript (w jQuery)

#### Copyright (c) 2019 Matt Groberg MIT license.
