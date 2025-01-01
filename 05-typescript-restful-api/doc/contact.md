# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Hello",
  "last_name": "World", // optional
  "email": "helloworld@example.com", // optional
  "phone": "01010101" // optional
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Hello",
    "last_name": "World", // optional
    "email": "helloworld@example.com", // optional
    "phone": "01010101" // optional
  }
}
```

Response Body (Failed):

```json
{
  "errors": "First name cannot blank, ..."
}
```

## Get Contact

Endpoint: GET /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Hello",
    "last_name": "World",
    "email": "helloworld@example.com",
    "phone": "01010101"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Contact is not found"
}
```

## Update Contact

Endpoint: PUT /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "New Hello",
  "last_name": "World",
  "email": "helloworld@example.com",
  "phone": "01010101"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "New Hello",
    "last_name": "World",
    "email": "helloworld@example.com",
    "phone": "01010101"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "First name cannot blank, ..."
}
```

## Remove Contact

Endpoint: Delete /api/contacts/:id

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
  "errors": "Contact is not found"
}
```

## Search Contact

Endpoint: GET /api/contacts

Query Parameter:

- name : string, contact first name/last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Hello",
      "last_name": "World",
      "email": "helloworld@example.com",
      "phone": "01010101"
    },
    {
      "id": 2,
      "first_name": "Hello 2",
      "last_name": "World 2",
      "email": "helloworld2@example.com",
      "phone": "02020202"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 5,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```
