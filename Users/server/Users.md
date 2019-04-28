# Auth

This application is built using [KoaJS node.js Framework](https://koajs.com/) and is used for the EpiCare project.

The application's default port is 8080, and is accessible on auth.epicare.fr.

All rights reserved

## Open Endpoints

Open endpoints require no Authentication.

* [Register](server/Auth.md) : `POST /register`
* [Login](server/Auth.md) : `POST /login/`
* [Confirm](server/Auth.md) : `POST /confirm/`
* [Reset](server/Auth.md) : `GET /reset/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](server/users.md) : `GET /user/` *Todo*
* [Update info](server/users.md) : `PUT /user/` *Todo*
* [Reset Password](server/users.md) : `POST /reset/`


## Run locally

  ```
  npm start || npm run unix
  ```

## Tests
### Built using Jest and Supertest
  ```
  npm test
  ```
