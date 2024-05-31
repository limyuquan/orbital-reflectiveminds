This is the backend of our Web App. 

"Server" folder has 

1. ```requirements.txt``` currently contains our utilised libraries from external modules, which also provides Docker-Compose the necessary libraries.
2. ```app.py``` is the file that initialises the processes handled by the backend.
   
   It initialises our Flask application, sets up our connection to our MySQL database via environment variables that are kept private and lastly sets up blueprints for different route folders, preventing ```app.py``` from clustering. More details about routes can be found in ```routes```.
   
