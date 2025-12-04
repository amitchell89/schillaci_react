# Schillaci Guitars

## Built with
- Node
- Express
- React
- React Router
- Webpack
- Babel

Project based on [React_Starter](https://github.com/amitchell89/react_starter)

## Setup
`npm install`

`npm run webpack` : Starts Webpack

`npm run server`: Starts express server

`start-mongo`: Start MongoDb

Visit localhost:3003


## Slider

The Slider is built using [slick-carousel](https://www.npmjs.com/package/slick-carousel) and [react-slick](https://github.com/akiran/react-slick)

## Parallax

Parallax effect built using [react-parallax](https://www.npmjs.com/package/react-parallax)


## MongoDB Setup

This project requires MongoDB to run locally. Follow the steps below to get it up and running.

1. Install MongoDB

macOS (using Homebrew):

`brew tap mongodb/brew
brew install mongodb-community@7.0`

Make sure mongod and mongo commands are available in your terminal.

2. Create a Data Directory

MongoDB needs a directory to store its database files. For this project, we’ll use a directory in your home folder:

`mkdir -p ~/mongodb/data`

3. Add an Alias to Start MongoDB Easily

Add the following alias to your ~/.zshrc (or ~/.bashrc if using Bash):

`alias start-mongo='mongod --dbpath ~/mongodb/data'`

Then reload your shell configuration:

`source ~/.zshrc`

4. Start MongoDB

Now you can start MongoDB with a single command:

`start-mongo`

This will launch MongoDB using the data directory at ~/mongodb/data.