# Task Hub – Mini Task Manager 

## Introduction

**Task Hub** is a full-stack task management web application designed to help users efficiently manage their daily tasks. It provides secure authentication using JWT and a responsive, interactive UI.

The backend is built with **Spring Boot**, while the frontend is developed using **Angular**. The entire application is **Dockerized**, making it easy to set up and run in any environment.

##  Key Features

-  **User Authentication**
	- User registration and login using JWT

-  **Task Management**
	
    - Create tasks
        
    - Update tasks
        
    - Delete tasks
        
    - View all tasks
        
    - View task by ID
    
- **Task Status Management**
    
    - Mark tasks as **Completed**
    
    - Mark tasks as **In Progress**
    
- **Dockerized Architecture**
    
    - Backend, frontend, and database run via Docker
    
-  **REST API Integration**
    
    - Clean API communication between Angular and Spring Boot
    
-  **API Testing Support**

    - Easily test endpoints using Postman
    
-  **Scalable Architecture**
    
    - Can be extended to support role-based authorization in future

-  **API Documentation**
	
    - All API endpoints are documented by openApi/Swagger
## Tech Stack

### Backend

- Java
    
- Spring Boot
    
- Spring Security (JWT Authentication)
    

### Frontend

- Angular
    
- TypeScript
    
- HTML / CSS
    

###  Database

- MySQL
    

### DevOps & Tools

- Docker & Docker Compose

- Git & GitHub

- Postman

- IntelliJ IDEA / VS Code

-  Dbeaver

## Installation & Setup

## 1. Run With Docker (Recommended)

###  Prerequisites

- Docker
    
- Docker Compose
    
- Git

## Setup steps

### 1. Clone the repository
```
	git clone https://github.com/YasasSri2002/Task-Hub-task-manager.git
	cd Task-Hub-task-manager
```

### 2. Configure environment variables

Create a `.env` file in the project's root folder and copy the template that follows. Use your own configuration in place of the placeholder values.

``` env
# MySQL
MYSQL_ROOT_PASSWORD=your root database password

MYSQL_DATABASE= database name

# Spring Boot

DATABASE_HOST= docker db service name

DATABASE_PORT= mysql port

DATABASE_NAME= database name

DATABASE_USERNAME=username for access the database

DATABASE_PASSWORD=password for access the database

ACTIVE_PROFILE= active profile in the spring NOTE:better keep prod

  

# JWT

JWT_SECRET_KEY= jwt secret key

JWT_EXPIRE_TIME= token expire time

```

### 3. Run the application

```
	docker compose up -build 
```
	
	or
	
	```
		docker compose up --build -d
	```

### Access the Application

#### Frontend 
	http://localhost:4000/
#### Backend
	http://localhost:8080/
#### Database
	jdbc:mysql://localhost:3313/
#### API Documentation
	http://localhost:8080/swagger-ui/index.html


## 1: Run Without Docker (Manual Setup)
### 1. Clone the repository
```
	git clone https://github.com/YasasSri2002/Task-Hub-task-manager.git
	cd Task-Hub-task-manager
```

### 2. Set environment variables in IntelliJ

- Open **Run → Edit Configurations…**

- Select your **Spring Boot configuration** (or create a new one for `TaskHubApplication`)

- In **Environment variables**, add the required variables

``` env

DATABASE_HOST= database host name

DATABASE_PORT= database port

DATABASE_NAME= database name

DATABASE_USERNAME=username for access the database

DATABASE_PASSWORD=password for access the database

ACTIVE_PROFILE= active profile in the spring NOTE:better keep dev

# JWT

JWT_SECRET_KEY= jwt secret key

JWT_EXPIRE_TIME= token expire time

```

###  3. Run the Application

#### Run the Backend
1. With inteliJ
	- Open the main class
		``edu.yasas.task_hub.TaskHubApplication
	- Click the **Run** button (green triangle) to start the backend server	 
	- Backend will start at http://localhost:8080
2. With cmd
	- Open a terminal and navigate to the `backend` folder
		-``cd Task-Hub-task-manager/backend
	- Run the backend with Maven
		-``mvn spring-boot:run
#### Run the Frontend 
- Open a terminal and navigate to the `frontend` folder
		-``cd Task-Hub-task-manager/frontend
- Install dependencies (if not done already)
	- ``npm install 
- Start the Angular development server
	-``ng serve
- Frontend will be available at - http://localhost:4200

## Credentials (for testing JWT-protected APIs)

- Users can simply **register a new account** and then **log in** to receive a JWT token.  
No pre-created credentials are required.

## Steps to test
- Register a new user
	-  Go to the registration page in the frontend 
	-  Enter your name, email, and password
	-  Submit the form
	
- Login with the new user
	- Go to the login page 
	- Enter the email and password you just registered
	- Submit the form
	- The backend will respond with a **JWT token**
- Token can be seen in Cookies
	- `auth-token` token is httpCookie

## Database Setup

**Task Hub** uses **MySQL** as the database, and all tables and schema changes are automatically managed with **Flyway**
-  SQL migration files are located in
	 ``backend/src/main/resources/db/migration