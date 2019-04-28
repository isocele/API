# Users

This application is built using [KoaJS node.js Framework](https://koajs.com/) and is used for the EpiCare project.
It handles all user-related endpoints, such as Authentification and Profile.

The application's default port is 8080, and is accessible on user.epicare.fr.

All rights reserved

## Open Endpoints

Open endpoints require no Authentication.

* [Register](server/Auth.md#Register) : `POST /register`
* [Login](server/Auth.md#Login) : `POST /login/`
* [Confirm](server/Auth.md#Confirm) : `POST /confirm/`
* [Reset](server/Auth.md#Reset) : `GET /reset/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](server/Users.md#profile) : `GET /profile/` *Todo*
* [Update info](server/Users.md#profile) : `PUT /profile/` *Todo*


## Run locally

  ```
  npm start || npm run unix
  ```

## Tests
### Built using Jest and Supertest
  ```
  npm test
  ```
