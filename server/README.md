# API

---

## Create a new user

**URL** : `/user/create`
**Method** : `POST`
**Auth required** : No
**Body** :

```json
{ "email": "[valid email address]", "password": "[plain text password]" }
```

**Data example**

```json
{
  "username": "iloveauth@example.com",
  "password": "abcd1234"
}
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "user created"
}
```

#### Error Response

**Condition** : If 'email' or 'password' is blank.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "No login or password"
}
```

**Condition** : If no user was found.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
  "error": "User not found"
}
```

**Condition** : If password doesn't match.

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
  "error": "user not authorized"
}
```

---

## Authenticate user

**URL** : `/user/login`
**Method** : `POST`
**Auth required** : No
**Body** :

```json
{ "email": "[valid email address]", "password": "[plain text password]" }
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNTYwMzUzLCJleHAiOjE2NTQwOTYzNTN9.4Z-TT-Ii-t-QSmQiZGHvqFKzS4DkXm83iRuPYLglu0s",
  "auth": true,
  "avatar": null,
  "email": "iloveauth@example.com",
  "name": null
}
```

#### Error Response

**Condition** : If 'email' or 'password' is blank.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "No login or password"
}
```

**Condition** : If there is a DB error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
  "error": "Error creating user"
}
```

## Get user data items

**URL** : `/user/data`
**Method** : `GET`
**Auth required** : Yes
**Params** :

```ts
userId: string;
```

**Headers** :

```json
{
  "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNTYwMzUzLCJleHAiOjE2NTQwOTYzNTN9.4Z-TT-Ii-t-QSmQiZGHvqFKzS4DkXm83iRuPYLglu0s"
}
```

**Data example**

```text
/user/data?userId=iloveauth@example.org
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "items": [
    {
      "ans": "1.53198966856604",
      "date": 1616467357646,
      "ds": "16.0569999856116",
      "id": 2000,
      "userId": "iloveauth@example.org",
      "wtl": "79.8716398841907"
    },
    {
      "ans": "1.73174747138207",
      "date": 1619261038846,
      "ds": "7.56342636621635",
      "id": 1999,
      "userId": "iloveauth@example.org",
      "wtl": "40.4906970800925"
    }
  ],
  "message": "2 records found"
}
```

#### Error Response

**Condition** : If no userId specified

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "userId not specified"
}
```

**Condition** : If no token header present

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "No token provided"
}
```

## Get user profile

**URL** : `/user/profile`
**Method** : `GET`
**Auth required** : Yes
**Params** :

```ts
userId: string;
```

**Headers** :

```json
{
  "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNTYwMzUzLCJleHAiOjE2NTQwOTYzNTN9.4Z-TT-Ii-t-QSmQiZGHvqFKzS4DkXm83iRuPYLglu0s"
}
```

**Data example**

```text
/user/profile?userId=iloveauth@example.org
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "avatar": "[base64 image string]",
  "email": "foo2@bar.com",
  "name": "John"
}
```

#### Error Response

**Condition** : If no userId specified

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "userId not specified"
}
```

**Condition** : If no token header present

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "No token provided"
}
```

## Update user avatar

**URL** : `/user/update/avatar`
**Method** : `POST`
**Auth required** : Yes
**Params** :

```ts
userId: string;
avatar: string;
```

**Headers** :

```json
{
  "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNTYwMzUzLCJleHAiOjE2NTQwOTYzNTN9.4Z-TT-Ii-t-QSmQiZGHvqFKzS4DkXm83iRuPYLglu0s"
}
```

**Data example**

```json
{
  "userId": "iloveauth@example.org",
  "avatar": "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TtSLVDu0g4pChOlkQFXHUKhShQqgVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi5uak6CIl/i8ttIjx4Lgf7+497t4BQr3MNKtrHNB020wl4mImuyoGXtEDAWEMICQzy5iTpCQ8x9c9fHy9i/Es73N/jn41ZzHAJxLPMsO0iTeIpzdtg/M+cYQVZZX4nHjMpAsSP3JdafIb54LLAs+MmOnUPHGEWCx0sNLBrGhqxFPEUVXTKV/INFnlvMVZK1dZ6578hcGcvrLMdZrDSGARS5AgQkEVJZRhI0arToqFFO3HPfxDrl8il0KuEhg5FlCBBtn1g//B726t/OREMykYB7pfHOdjBAjsAo2a43wfO07jBPA/A1d621+pAzOfpNfaWvQICG0DF9dtTdkDLneAwSdDNmVX8tMU8nng/Yy+KQuEb4G+tWZvrX2cPgBp6ip5AxwcAqMFyl73eHdvZ2//nmn19wP4k3J2DinL0gAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+UGAhMPIA2CPJQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFUlEQVQY02P8x8zMgBswMeAFI1UaAEcsARjjhiHfAAAAAElFTkSuQmCC"
}
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{ "message": "Avatar updated" }
```

#### Error Response

**Condition** : If no userId specified

**Code** : `404 NOT FOUND`

**Content** :

```json
{
  "error": "User not found"
}
```

**Condition** : If no token header present

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "No token provided"
}
```

## Update user name

**URL** : `/user/update/name`
**Method** : `POST`
**Auth required** : Yes
**Params** :

```ts
userId: string;
name: string;
```

**Headers** :

```json
{
  "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNTYwMzUzLCJleHAiOjE2NTQwOTYzNTN9.4Z-TT-Ii-t-QSmQiZGHvqFKzS4DkXm83iRuPYLglu0s"
}
```

**Data example**

```json
{
  "userId": "iloveauth@example.org",
  "name": "John"
}
```

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{ "message": "Name updated" }
```

#### Error Response

**Condition** : If no userId specified

**Code** : `404 NOT FOUND`

**Content** :

```json
{
  "error": "User not found"
}
```

**Condition** : If no token header present

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": "No token provided"
}
```
