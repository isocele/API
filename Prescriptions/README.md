# Users

This application is built using [KoaJS node.js Framework](https://koajs.com/) and is used for the EpiCare project.
It handles all user-related endpoints, such as download and upload prescriptions.

The application's default port is 8082, and is accessible on prescriptions.epicare.fr.

All rights reserved

## Closed Endpoints

Closed endpoints require Authentication.

* [Upload](server/Prescriptions.md#Upload) : `POST /upload?token=TOKEN`
* [Download](server/Prescriptions.md#Download) : `POST /download?token=TOKEN`
* [Download File](server/Prescriptions.md#DownloadFile) : `GET /download/fileName?token=TOKEN`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the query of the
request. A Token can be acquired from the Login view from [Login](../Users/server/Auth.md#Login).

## Run locally

  ```
  npm start || npm run unix
  ```