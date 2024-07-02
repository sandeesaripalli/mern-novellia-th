# Pet Management

This Pet Management App is web based sys to manage pet records. It allows user to create, read, update and delete (CRUD) pet info. user can include vaccine, allergies and image details, app includes a admin interface to manage all the records.

## Features

- **Add and Edit Pet Records**:

- **Delete Pet Records**

- **List Pets**

- **Admin Interface**
- **Search Functionality**: (to be implemented).

- **API Documentation**:

## Technologies Used

- **Frontend**: React, Material Tailwind, React Router

- **Backend**: Node.js, Express.js, MongoDB, Mongoose

- **API Documentation**: Swagger

## Setup and Installation

### Prerequisites

- Node.js

- MongoDB

- Yarn or npm

- Docker (for Docker setup)

### Backend Setup

1. Clone the repository:

```sh

git clone https://github.com/sandeesaripalli/mern-novellia-th.git

cd mern-novellia-th
```

2. Install the dependencies:

```sh
cd server
npm install
```

3. Create a `.env` file in the `backend` directory and add your MongoDB configuration:

```env
DB_USER=<your_db_user>

DB_PASSWORD=<your_db_password>

DB_HOST=<your_db_host>

DB_PORT=<your_db_port>

DB_NAME=<your_db_name>

PORT=4000
```

```example env
DB_HOST=mongodb

DB_USER=root

DB_PASSWORD=example

DB_NAME=novellia_pets

DB_PORT=27017

PORT=4000
```

### Frontend Setup

1. Navigate to the frontend directory:

```sh
cd client
```

2. Install the dependencies:

```sh
npm install
```

### Docker Setup

#### Prerequisites

- Docker

- Docker Compose

#### Steps

1. Build and run the Docker containers:

```sh
docker-compose up --build
```

2. The backend server will be running at `http://localhost:4000`.

3. The frontend server will be running at `http://localhost:3000`.

4. MongoDB will be accessible at `mongodb://localhost:27017`.

#### Docker Compose Configuration

Ensure you have the following `docker-compose.yml` file at the root of your project

### Swagger API Documentation

Access the API documentation at `http://localhost:4000/api-docs`.
