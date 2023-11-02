To launch the project, use the command `npm i`

Additionally, you should have Docker installed and running. After installation, enter the command
docker run --name postgres-container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=root -p 5432:5432 -d postgres

Please replace "myuser", "mypassword", and "mydatabase" with your desired values for the PostgreSQL user, password, and database name respectively. Make sure to update these values to secure ones if you intend to use the code in a production environment.

Finally, enter the `npm start` command
