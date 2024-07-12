Here the project's main URL after deployment into render hosting => https://todolist-colibrideploy.onrender.com/TaskManagement/getTasks

Here all the endPoints :

        -Get all the Tasks => https://todolist-colibrideploy.onrender.com/TaskManagement/getTasks
        
        -Create new Task => https://todolist-colibrideploy.onrender.com/TaskManagement/createTask 
                          * with JSON data for the request like this => {
                                                                              "title" : "bullshit",
                                                                              "descriptionTask": "bullshit",
                                                                              "dateCreation": "2024-07-08 10:00:00"
                                                                          }
                                                                          
         -Marked a Task as finish or not finish => https://todolist-colibrideploy.onrender.com/TaskManagement/changeTaskStatus/idTask
         

         -Update Task fields => https://todolist-colibrideploy.onrender.com/TaskManagement/updateTaskFieldsById/idTask
                            * with JSON data fields you wanna change like => {
                                                                                  "title" : "releas Prod update "
                                                                              }
                                                                              
         -Delete Task => https://todolist-colibrideploy.onrender.com/TaskManagement/DeleteTask/idTask

How to test the endPoints :

        -install any software that can send request to an API URL (ex: postman,VScode with extension,... or just browser for get API URL )
        
        -Call the URL above with the JSON data if needed 
        
        -that's it

        
All the external package :

        - nodemon : to restart automatically the server after any change in development 
        
        - dotenv : easy to manage environment for  build and deployment 

        - Jest : for unit Test for each functionality 

        - rim raf : to automatically remove the builds folder and create on for each npm run build
        
        - concurently : so that the project can run different script at the same times 
                          for exemple this =>  "build": "concurrently \"rimraf build/\"  \"tsc -p tsconfig.build.json\""
                          
        
How Run the project in local :

        - Run the command line : npm install to install all the dependency needed

        - Run the command line : nodemon to run the server

        - And the test all the url with local url like : localhost:1337/TaskManagement/getTasks

        NB: make sure to have internet connexion because the database is still online
                                                                                                  
