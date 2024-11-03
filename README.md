## Financial Assistance Scheme Management System

## Description
This is a RESTful API for managing beneficiaries, schemes, and applications for a financial assistance program. The system supports authentication and authorization for API access.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL for Database
- JWT for Authentication
- Middleware for Authorization

### Prerequisites
- Node.js and npm installed in Visual Studio Code
- PostgreSQL installed and running
- Git installed

## Database Setup and Installation
- Download PostgreSQL V17.0 from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads and install
- Download pgAdmin4 from https://www.pgadmin.org/download/pgadmin-4-windows/ and install
1)	Open pgAdmin:
2)	Launch pgAdmin and connect to your PostgreSQL server.
3)	In the pgAdmin interface, right-click on the "Databases" section in the left-hand tree, select Create > Database
5)	Name your database (e.g., financial_assistance) and click Save.
6)	Open the Query Tool:
7)	In the left-hand tree, expand the "Databases" section, then find and click on your newly created database (e.g., financial_assistance).
8)	Right-click on the database, then select Query Tool from the dropdown menu. This opens a query editor window.
9)	Copy and paste the code in SQLScript.txt(included in this repo) into the query editor to create the tables.
12)	Execute the SQL Script:
13)	Click the Execute/Play button (lightning bolt icon) or press F5 to run the script.
14)	pgAdmin will execute each CREATE TABLE command, and you should see confirmation messages for each table created.
15)	Verify the Tables:
16)	In the left-hand tree under your database, go to Schemas > public > Tables to see the list of tables created (e.g., administrators, applicants, schemes, applications, and household_members).

### Setting up the code in Visual Studio Code

1. **Clone the repository:**
   In Visual Studio Code, select "Clone Git Repository" and enter the URL https://github.com/m-yuqin/financial-assistance.git
   OR use command git clone https://github.com/m-yuqin/financial-assistance.git
2. Open .env file and update the variables inside according to the credentials you created for your PostgreSQL database.
   DB_USER=your_username<br>
   DB_HOST=localhost<br>
   DB_NAME=your_database<br>
   DB_PASS=your_password<br>
   DB_PORT=your_database_port_number<br>
   JWT_SECRET=your_jwt_secret

4. In Visual Studio Code terminal, cd \<repository-directory\>
5. If you wish to generate a new JWT_SECRET, you can delete the JWT_SECRET line in .env file and run the script generateSecret.js using Node.js in vscode:
    
    node generateSecret.js

    This will generate a new JWT_SECRET and automatically append it to the .env file.

6. Run command "npm start" in the terminal to start the server
7. In your web browser, navigate to http://localhost:3000/api-docs/

### Testing the API Endpoints
1. Open a browser and navigate to http://localhost:3000/api-docs/
2. Add an administrator
3. Login as an administrator and note down the JWT Token returned
4. On the top right hand, there's a button named "Authorize", click on it and enter the JWT Token generated in the previous step
5. Create a new scheme using the example provided in http://localhost:3000/api-docs/
6. Create a new applicant using the example provided in http://localhost:3000/api-docs/
7. Get eligible schemes for the applicant created
8. Create a new application for the applicant using the example provided in http://localhost:3000/api-docs/
9. Save the outcome of the application by executing the example provided in http://localhost:3000/api-docs/
10. Test all other endpoints
