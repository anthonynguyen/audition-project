A simple app for identifying and recording palindromes.


## Description of the Implementation

The audition project was implemented using the MEAN stack techonologies, which is composed of Mongo, Express, Angular, and Node.
The server logic is written using nodejs on top of the Express framework to help assist in the REST API requests.
The requests that are covered in clude get, post and delete. 
Furthermore it is deployed on an instance in AWS E2. 


## Running the Audition Project Locally

Clone the git repository in the local system.

Enter the directory and install all the node dependencies.

'''bash
npm install
'''

Since the Audition Project is a node app that runs as an express server, index.js must be run to start it.

''' bash
node index.js
'''
The app will run at http://localhost:3000


## Running the Audition Project on an EC2 Instance

Fire up an instance on your EC2 account in AWS

In terminal, ssh to your instance's home folder.

''' bash
ssh -i <instance-name>.pem ubuntu@<instance-ip-address>
'''

Then follow the instructions for running the app locally, to have it running on the EC2 instance server.


## REST API Documentation

GET              /api/messages                        Get a list of messages

GET              /api/messages/:id                    Get a specific message

GET              /api/messages/:message_id            Get a specific message

POST             /api/messages                        Post a message

DELETE           /api/messages/:id                    Delete a specific message


## URI to the app

A running version of the app can be found here: ec2-52-201-255-191.compute-1.amazonaws.com

