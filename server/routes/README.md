This contains python files, each containing API endpoints for different parts of our web app.

"Routes" folder has

1. Dashboard.
   
   Handles automatic POST API calls from the dashboard of our web app. It obtains the unique userId, and hence all journal entries created by that user.

2. Entry routes

   Handles GET API calls when the user clicks on 'Add entry' on the web app. It obtains all relevant information identifying the user, the content entered and other related information like 'Emotions', all of which are stored into our MySQL database.

3. Login routes

   Handles POST API calls in the login/register page of our web app. Login and Register both send out API calls, where identification information can be obtained and stored in our MySQL database. Each user has a unqiue, userId produced for each new user added.

4. Future routes

   More python files will be added as more features are added to our web app. 
