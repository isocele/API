# Assets

This application is built using [KoaJS node.js Framework](https://koajs.com/) and is used for the EpiCare project.

The application's default port is 8083, and is accessible on assets.epicare.fr.

All rights reserved

## Endpoints

All endpoints require no authentification, as all our assets are public.

**URL** : `/`

**Method** : `GET`

**Auth required** : `NO`

**Data type** : `query`

**Data constraints**

```json
{
    "id": "[image's ID in plain text]",
}
```

**Data example**

```json
{
    "id": "chat.jpg",
}
```

**Request example**

```
	firefox http://localhost:8084/chat.jpg;
```

## Success Response

**Code** : `200 OK`

**Content example**: Sends the requested image

## Error Response

**Code** : `404 NOT FOUND`


## Run locally

  ```
  npm start
  ```

## Tests
### Built using Jest and Supertest
  ```
  npm test
  ```
