# Branded Things Api Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `POST /product/add`
- `GET /product/all`
- `GET /product/:id/detail`
- `DELETE /product/:id/delete`
- `GET /category/all`
- `POST /category/add`
- `DELETE /category/:id/delete`
- `PUT /category/:id/edit`
- `PUT /product/:id/edit`
- `PATCH /product/:id/edit-status`
- `GET /history/all`

## 1. POST /register

Request :

- body

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Success register account",
  "data": {
    "id": 6,
    "username": "asalaja",
    "email": "asalaja@gmail.com",
    "password": "$2a$10$bIQjrGdMr0fXOVehxNHenuL4DtpPxPBD1G4Ik9RVzmDXHhH9YEfNi",
    "role": "admin",
    "phoneNumber": "123456",
    "address": "jakarta",
    "updatedAt": "2023-09-10T13:12:48.721Z",
    "createdAt": "2023-09-10T13:12:48.721Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email address already in use"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must be at least 5 characters"
}

```

## 2. POST /login

Request :

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGRyaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbGRyaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTQzNTIwOTN9.a8dOI9A4hbZ66gGh902Q3fIM7tm0tawF8c-KUaVXH2Q",
    "user": {
      "id": 1,
      "email": "aldrin@gmail.com",
      "username": "aldrin",
      "role": "admin"
    }
  }
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Invalid Username/Password"
}
```

## 3. POST /product/add

Request :

- headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "authorId": "integer",
  "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Product create successfully",
  "data": {
    "id": 9,
    "name": "Baju Batik",
    "description": "Baju batik mahal",
    "price": 200000,
    "stock": 1,
    "imgUrl": "image.google.com",
    "authorId": 1,
    "categoryId": 3,
    "updatedAt": "2023-09-10T13:32:02.650Z",
    "createdAt": "2023-09-10T13:32:02.650Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 50,000"
}

```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

## 4. GET /product/all

Request :

- headers

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "message": "Get All Product Successfully",
  "data": [
    {
      "id": 5,
      "name": "Gacha",
      "description": "Gacha",
      "price": 1231244,
      "stock": 12,
      "imgUrl": "asdsa",
      "authorId": 4,
      "categoryId": 3,
      "createdAt": "2023-09-10T12:48:23.063Z",
      "updatedAt": "2023-09-10T12:48:23.063Z",
      "User": {
        "id": 4,
        "username": "aldrin.mursidi",
        "email": "aldrin.mursidi@gmail.com",
        "password": "$2a$10$eepbCiy7DNDdsVhnsMi.GOYhVCZ8lgy73RQJ0LhMzksknxwH9SGfa",
        "role": "user",
        "phoneNumber": "081300000",
        "address": "jakarta",
        "createdAt": "2023-09-10T12:47:59.432Z",
        "updatedAt": "2023-09-10T12:47:59.432Z"
      }
    },
    {
      "id": 9,
      "name": "Baju Batik",
      "description": "Baju batik mahal",
      "price": 200000,
      "stock": 1,
      "imgUrl": "image.google.com",
      "authorId": 1,
      "categoryId": 3,
      "createdAt": "2023-09-10T13:32:02.650Z",
      "updatedAt": "2023-09-10T13:32:02.650Z",
      "User": {
        "id": 1,
        "username": "aldrin",
        "email": "aldrin@gmail.com",
        "password": "$2a$10$V//N2AEkiFU/HFQH3SNoseD0vSunHK24FVDWjNX4nK3HaOPEfLeY.",
        "role": "admin",
        "phoneNumber": "021123456",
        "address": "jakarta",
        "createdAt": "2023-09-10T10:28:22.988Z",
        "updatedAt": "2023-09-10T10:28:22.988Z"
      }
    }
  ]
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No product found"
}
```

## 5. GET /product/:id/detail

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "message": "Get Product by Id Successfully",
  "data": {
    "id": 5,
    "name": "Gacha",
    "description": "Gacha",
    "price": 1231244,
    "stock": 12,
    "imgUrl": "asdsa",
    "authorId": 4,
    "categoryId": 3,
    "createdAt": "2023-09-10T12:48:23.063Z",
    "updatedAt": "2023-09-10T12:48:23.063Z"
  }
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product detail not found"
}
```

## 6. DELETE /product/:id/delete

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "message": "Deleted product successfully",
  "data": 1
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Deleted product not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You only allowed to update your product"
}
```

## 7. GET /category/all

Request :

- headers

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "message": "Get All Categories Successfully",
  "data": [
    {
      "id": 3,
      "name": "Sepatu",
      "createdAt": "2023-09-10T10:28:22.974Z",
      "updatedAt": "2023-09-10T10:28:22.974Z"
    },
    {
      "id": 4,
      "name": "Barang Berharga",
      "createdAt": "2023-09-10T12:48:36.366Z",
      "updatedAt": "2023-09-10T12:48:36.366Z"
    }
  ]
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No category found"
}
```

## 8. POST /category/add

Request :

- headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Category success created",
  "data": {
    "id": 5,
    "name": "Celana",
    "updatedAt": "2023-09-10T14:41:45.794Z",
    "createdAt": "2023-09-10T14:41:45.794Z"
  }
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

## 9. DELETE /category/:id/delete

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "message": "Category deleted successfully",
  "data": 1
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

## 10. PUT /category/:id/edit

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "name": "string"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": "integer",
  "message": "string",
  "data": "object"
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

## 10. PUT /product/:id/edit

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "imgUrl": "string",
  "stock": "integer",
  "price": "integer",
  "categoryId": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": "integer",
  "message": "string",
  "data": "object"
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You only allowed to update your product"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

## 10. PATCH /product/:id/edit-status

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "status": "string"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": "integer",
  "message": "string",
  "data": "object"
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

# 11. PATCH /history/all

Request :

- headers

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "statusCode": "integer",
  "message": "string",
  "data": "array of object"
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first with your email and password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No history found"
}
```
