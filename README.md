# Brain Agriculture API

## Description

Brain Agriculture API is a backend service designed to manage agricultural data, including producer information, farm details, and crop types. It is built with Node.js and Express and uses PostgreSQL for data persistence.

## Technologies and Tools

- **Development:**
    - Node.js
    - TypeScript
    - Express.js
    - Docker and Docker Compose
    - PostgreSQL
    - -npm

- **Production:**
    - Same as development, with production-level configurations for databases and other services.

- **Testing:**
    - Jest for unit and integration testing
    - Supertest for HTTP assertions

## Environment Setup

1. **Docker and Docker Compose**: Ensure you have Docker and Docker Compose installed on your system.

2. **Node.js**: This project uses Node.js version 16 or later.

3. **.env File**: Duplicate the `.env.example` file and rename it to `.env`. Adjust the variables to match your environment setup.

   Example:
    ```
    DB_HOST=db
    DB_PORT=5432
    POSTGRES_DB=your_database
    POSTGRES_USER=your_username
    POSTGRES_PASSWORD=your_password
    ```

## Running the Project

### With Docker Compose

To start the entire stack (application and database) with Docker Compose, run the following command:

```bash
docker-compose up
```
This will set up the PostgreSQL database and run the Node.js application in containers.

## Manually
If you wish to run the application without Docker:

Install dependencies:

```bash
npm install
```

Compile TypeScript to JavaScript:

```bash
npm run build
```

Start the application:

```bash
npm start
```

## Running Tests
To run tests, execute the following command:

```bash
npm test
```

This will run all Jest test suites found in the tests directory.

## API Documentation
 - Swagger
```bash
link
```

Contributing
Joao Bione

License
