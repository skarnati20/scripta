# Scripta
### A note taking web-app

Hello! Scripta is an idea I've had for some time, and it's basically a note-taking app that lets you insert any text you want, and it lets you mark-it up. You can quote specific parts of the text and attach a note to them. As you make notes, you will be able to see them. I was also trying to add a download feature, but after hours of looking through Stack Overflow, I still couldn't figure out how to generate a textfile with the notes and quotes (please suggest any solutions!). On that note, this is my Launch Project for Full Stack @ Brown and, therefore, my first time creating a web-app, so grill the formatting, style, and code as much as possible!

## Repository Structure
I created this with express generator, so there will be a lot of stuff here that I don't use. The first important place to look is the "routes" folder where the index.js file is. This is where I kept the code for the backend, with all the requests and the connection to the MongoDB database. The second important place is the "client" folder, where you can find the App.js and App.css file for the front end.

## How to Run this Code
*Keep in mind that I'm on Mac*
1) The first step is to install the repository from GitHub.  
2) Then go to your terminal to find the file for the repository which should be "scripta-master." Assuming the file is in your downloads folder, you should be able to access it through the terminal by doing "cd downloads" then "cd scripta-master".
3) Now, once you have accessed the scripta-master folder, type, "PORT=3001 npx nodemon," which should start running the backend. There might be a warning that comes up about a file not being authenticated, but it doesn't affect how the app runs (but tell me if that is still concerning, though).
4) Make a new terminal tab and go back to the scripta-master folder, but this time type "cd client" then type "yarn". This will install some stuff, and after this is done, type "yarn start". This should launch the frontend.
5) You should now be brought to your browser where the app should load! (Also, try hovering over the word "Scripta")

## Bugs
There aren't many that I know of. But occasionally some of the quotes and notes will not load. Usually, refreshing the page will fix that. Also, this is less of a bug than more of a development concern, but dotenv seems to not be working, so any suggestions here would be helpful!

## Contributor(s)
Sai Karnati

## Video
