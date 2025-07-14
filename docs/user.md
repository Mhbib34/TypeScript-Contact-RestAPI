# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "Habib",
  "password": "rahasia",
  "name": "Muhammad Habib"
}
```

Response Body (Success) :

```json
{
  "success":true
  "message":"Created User Successfully"
  "data": {
    "username": "Habib",
    "name": "Muhammad Habib"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "Habib",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "success":true
  "message":"User Login Successfully"
  "data": {
    "username": "Habib",
    "name": "Muhammad Habib",
    "token": "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "success":true
  "message":"Get User Successfully"
  "data": {
    "username": "Habib",
    "name": "Muhammad Habib"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": "Muhammad Habib" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "success":true
  "message":"Update User Successfully"
  "data": {
    "username": "Habib",
    "name": "Muhammad Habib"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "success":true
  "message":"User Logout Successfully"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
