# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "name": "helloworld",
  "username": "helloworld",
  "password": "password123"
}
```

Response Body (Success):

```json
{
  "data": {
    "name": "Hello World",
    "username": "helloworld"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username cannot blank, ..."
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "helloworld",
  "password": "password123"
}
```

Response Body (Success):

```json
{
  "data": {
    "name": "Hello World",
    "username": "helloworld",
    "token": "uuid"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password wrong"
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "name": "Hello World",
    "username": "helloworld"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "name": "New Hello World", // optional
  "password": "newpassword123" // optional
}
```

Response Body (Success):

```json
{
  "data": {
    "name": "New Hello World",
    "username": "helloworld"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint: DELETE /api/users/current

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```
