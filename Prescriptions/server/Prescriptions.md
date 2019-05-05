# Auth
## Upload
Allows the user to create an account.

**URL** : `/upload?token=TOKEN`

**Method** : `POST`

**Auth required** : `YES`

**Data type** : `file/png,jpg`


## Success Response

**Code** : `200 OK`

**Content example**: OK: File uploaded

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "parameters_error": [
        "Error: Missing file."
    ],
    "disk_full": [
      "Error: Disk full."
    ],
    "user_not_found": [
      "Error: Invalid token."
    ]
}
```

## Download
Allows the user to log in to their previously created account.

**URL** : `/download?token=TOKEN`

**Method** : `GET`

**Auth required** : `YES`

**Data type** :`Application/JSON`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "Files":[
      {
        "name":"0-4-2019-16:49:8.png",
        "extension":".png"
      },
      {
        "name":"0-4-2019-16:53:8.png",
        "extension":".png"
      }
    ]
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "parameters_error": [
        "Error: Missing parameters."
    ],
    "user_not_found": [
        "Error: Unknown user."
    ]
}
```

## DownloadFile
Confirm the user's account by verifying the email address.

**URL** : `/download/fileName?token:TOKEN`

**Method** : `GET`

**Auth required** : `YES`

**Data type** : `File/png,jpg`

**Query constraints**

```json
{
    "token": "[token given when logging in]",
    "fileName": "[File name given by previous /download declaration]"
}
```

**Query example**

```
    localhost:8080/download/0-4-2019-16:49:8.png?token=6d3c7a6c1b621bc131407150606f76d253bbcab0
```

## Success Response

**Code** : `200 OK`

## Error Response

**Condition** : If there is a problem with the token.

**Code** : `400 BAD REQUEST`