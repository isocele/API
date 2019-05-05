# Users
## Profile
Allows the user to get his profile informations.

**URL** : `/profile`

**Method** : `GET`

**Auth required** : `YES`

**Data type** : `token as query`

**Data constraints**

```json
{
    "token": "[token in plain text]"
}
```

**Data example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
    "name": "user's name",
    "last_name": "user's last_name",
    "email": "user's email",
    "type": "user's type",
    "contacts": "user's contact list"
    ...
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "not_authenticated": [
        "Error: You need to be authenticated"
    ],
    "user_not_found": [
        "Error: User not found"
    ]
}
```
## Profile

Allows the user to modify his personnal informations.

**URL** : `/profile`

**Method** : `PUT`

**Auth required** : `YES`

**Data type** : `token as query AND application/json`

**Data constraints**

```json
{
    "token": "[token in plain text]"
}
```

**Data example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
    ...
}
```

**Data example**

```json
{
    "email": "jest@gmail.com",
    "password": "jesttest"
    ...
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
    "name": "user's name",
    "last_name": "user's last_name",
    "email": "user's email",
    "type": "user's type",
    "contacts": "user's contact list"
    ...
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "not_authenticated": [
        "Error: You need to be authenticated"
    ],
    "user_not_found": [
        "Error: User not found"
    ]
}
```

## Confirm
Confirm the user's account by verifying the email address.

**URL** : `/confirmr`

**Method** : `POST`

**Auth required** : `NO`

**Data type** : Query

**Query constraints**

```json
{
    "token": "[token given by the email's link]"
}
```

**Query example**

```
    localhost:8080/confirm?token=6d3c7a6c1b621bc131407150606f76d253bbcab0
```

## Success Response

**Code** : `200 OK`

## Error Response

**Condition** : If there is a problem with the token.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "parameters_error": [
        "Error: Missing parameters."
    ],
    "wrong_token": [
        "Error: Wrong token."
    ]
}
```

## Reset
Sends an email to the user in order to reset his password.

**URL** : `/reset`

**Method** : `GET`

**Auth required** : `NO`

**Data type** :`application/json`

**Data constraints**

```json
{
    "email": "[valid email address]"
}
```

**Data example**

```json
{
    "email": "jest@gmail.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "body": "Email sent"
}
```

## Error Response

**Condition** : If there is an issue with the email.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "parameters_error": [
        "Error: Missing parameters."
    ],
    "user_not_found": [
        "Error: User not found."
    ]
}
```

## Reset

Modifies the user's existing password.

**URL** : `/reset`

**Method** : `POST`

**Auth required** : `NO`

**Data type** :`application/json`

**Data constraints**

```json
{
	"token": "[token given by the email's link]",
	"email": "[valid email address]",
	"password": "[NEW password in plain text]"
}
```

**Data example**

```json
{
	"token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d",
	"email": "jest@gmail.com",
	"password": "jesttest1"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If there is an issue with the email.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "parameters_error": [
        "Error: Missing parameters."
    ],
    "user_not_found": [
        "Error: User not found."
    ]
}
```
