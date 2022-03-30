This project is the result of the practice of writing automatic API tests based on the HTTP request sender "supertest" + testing framework "mocha". As the reporter  "mochawesome". As the assertion library "chai". 

To run tests and generate report, use the command:
        npm test

Attention, the project does not have an authorization token, you will need to register on a test resource and get your own.
Place the token in the root of the project in the .env file. It should look like:
        TOKEN="900b1cd10f--------------------------------------"