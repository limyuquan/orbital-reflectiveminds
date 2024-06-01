# Reflective Minds Back-End Server

This folder contains the back-end code for the Reflective Minds project. It is built using Flask, a popular Python back-end framework library.

## Project structure

"Server" folder has 

1. ```requirements.txt``` currently contains our utilised libraries from external modules, which also provides Docker-Compose the necessary libraries.
2. ```app.py``` is the file that initialises the processes handled by the backend.
   
   It initialises our Flask application, sets up our connection to our MySQL database via environment variables that are kept private and lastly sets up blueprints for different route folders, preventing ```app.py``` from clustering. More details about routes can be found in ```routes```.


The application will be available at http://localhost:5002
