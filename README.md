# Energia API 💪

This REST API powers a workout tracking/logging application, allowing users to manage their workout routines and log their exercise progress. Built with Node.js, Express.js, JWT token for authentication, MongoDB, Mongoose, and JavaScript, it provides a robust backend solution for fitness enthusiasts.

## Installation

```
git clone https://github.com/pesto-students/backend-repo-code-kings.git
```
Go into the project directory and make sure you are using NodeJS 18.18.0

```
npm install
npm run start
```
## ENERGIADB API Documentation

This document outlines the endpoints available in the ENERGIADB API.

## Users

### Signup

- **POST /api/v1/users/signup**
  
  Sign up a new user.

  Request Body (JSON):
```
{
"name": "asad1",
"email": "asad1@email.com",
"password": "pass1234",
"passwordConfirm": "pass1234"
}
```


### Signin

- **POST /api/v1/users/signin**

Sign in an existing user.

Request Body (JSON):

```
{
"email":"asad2@email.com",
"password":"pass1234"
}
```

### Update Password

- **PATCH /api/v1/users/updateMyPassword**

Update the password for the authenticated user.

Request Body (JSON):

```
{
"passwordCurrent": "pass1234",
"password": "pass12345",
"passwordConfirm": "pass12345"
}
```


### Update User Details

- **PATCH /api/v1/users/updateMe**

Update the details of the authenticated user.

Request Body (JSON):

```
{
"name":"admintest1updated"
}
```

### Get All Users

- **GET /api/v1/users/**

Get a list of all users.

### Delete Current User

- **DELETE /api/v1/users/deleteMe**

Delete the authenticated user.

## Routines

### Update User Routine

- **PATCH /api/v1/routines/{routineId}**

Update details of a specific user routine.

Request Body (JSON):

```
{
"name":"NEW PULL NEW KAKA MAMA CHAHA"
}
```

### Get All User Routines

- **GET /api/v1/routines/**

Get a list of all user routines.

### Get User Routine

- **GET /api/v1/routines/{routineId}**

Get details of a specific user routine.

### Create Routine

- **POST /api/v1/routines**

Create a new routine.

Request Body (JSON):

```
{
"name":"PUSH ASADTEST3"
}
```



