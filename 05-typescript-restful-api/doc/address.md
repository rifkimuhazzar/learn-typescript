# Address API Spec

## Create Address

Endpoint: POST /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Street Express",
  "city": "City Express",
  "province": "Province Express",
  "country": "Country Express",
  "postal_code": "0101"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street Express",
    "city": "City Express",
    "province": "Province Express",
    "country": "Country Express",
    "postal_code": "0101"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Country is required"
}
```

## Get Address

Endpoint: GET /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street Express",
    "city": "City Express",
    "province": "Province Express",
    "country": "Country Express",
    "postal_code": "0101"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Address is not found"
}
```

## Update Address

Endpoint: PUT /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Street Express",
  "city": "City Express",
  "province": "Province Express",
  "country": "Country Express",
  "postal_code": "0101"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street Express",
    "city": "City Express",
    "province": "Province Express",
    "country": "Country Express",
    "postal_code": "0101"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Country is required"
}
```

## Remove Address

Endpoint: DELETE /api/contacts/:idContact/addresses/:idAddress

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
  "errors": "Address is not found"
}
```

## List Address

Endpoint: GET /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Street Express",
      "city": "City Express",
      "province": "Province Express",
      "country": "Country Express",
      "postal_code": "0101"
    },
    {
      "id": 2,
      "street": "Street Express",
      "city": "City Express",
      "province": "Province Express",
      "country": "Country Express",
      "postal_code": "0101"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Contact is not found"
}
```
