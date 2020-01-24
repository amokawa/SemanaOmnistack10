# Overview
Based on 10ª Semana da Omnistack tutorials by Rocketseat.
This is the API to DevRadar clients. Use it to manage the developers information.
This application implements RESTful concepts and MVC architecture.

# Models: Devs
The developer object details is listed below.

# Dependencies
You need a MongoDB server with

## Dev Structure
```js
{
  "_id": "<UID>",
  "github": "<GitHub user>",
  "name": "<User name>",
  "bio": "<Bio from GitHub profile>",
  "avatar_url": "<GitHub's Avatar URL>",
  "techs": [ "<Technologies array>" ],
  "location": {
    "coordinates": [
      <Longitude>,
      <Latitude>
    ]
  },
  "__v": <Qnt. de updates>
}
```
# Controllers
Followin are the list of the endpoints of DevRadar

## /devs
| Method       | Path                | Description                           |
| ------------ | ------------------- | ------------------------------------- |
| ![GET][1]    | `/api/devs`         | List of all developer                 |
| ![POST][2]   | `/api/devs`         | Creates a developer                   |
| ![GET][3]    | `/api/devs/:github` | Find a specific developer             |
| ![PUT][4]    | `/api/devs/:github` | Edits the developer details           |
| ![DELETE][5] | `/api/devs/:github` | Deletes a developer                   |

## Search
It uses a coordinate to search for developers.

| Method       | Path     | Description |
| ------------ | ------------- | ------------- |
| ![GET][6]    | `/api/search` | List all the developers in a **10 kilometer** radius from a given coordinate |

# Samples
## Index
```http
GET /api/devs HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "techs": [],
    "_id": "5e2a416a0a69a6955b2aeb80",
    "name": null,
    "avatar_url": "https://avatars2.githubusercontent.com/u/53023867?v=4",
    "bio": "Software Engineer",
    "location": {
        "coordinates": [
            -23.5348038,
            -46.7710128
        ],
        "_id": "5e2a416a0a69a6955b2aeb81",
        "type": "Point"
    },
    "__v": 0
}
```
</details>

------------------------------------------------------------------------------------------------------------------------

## Create
```http
POST /api/devs HTTP/1.1
Content-Type: application/json

{
	"github_user": "amokawa",
	"latitude": "-46.7710128",
	"longitude": "-23.5348038",
	"techs": "Ruby on Rails, React, React Native"
}
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "techs": [
        "Ruby on Rails",
        "React",
        "React Native"
    ],
    "_id": "5e2b053e3d6105ca1752085c",
    "github_user": "amokawa",
    "name": "amokawa",
    "avatar_url": "https://avatars2.githubusercontent.com/u/53023867?v=4",
    "bio": "Software Engineer",
    "location": {
        "coordinates": [
            -23.5348038,
            -46.7710128
        ],
        "_id": "5e2b053e3d6105ca1752085d",
        "type": "Point"
    },
    "__v": 0
}
```
</details>

------------------------------------------------------------------------------------------------------------------------

## Read
```http
GET /api/devs/amokawa HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "techs": [
        "Ruby on Rails",
        "React",
        "React Native"
    ],
    "_id": "5e2b053e3d6105ca1752085c",
    "github_user": "amokawa",
    "name": "amokawa",
    "avatar_url": "https://avatars2.githubusercontent.com/u/53023867?v=4",
    "bio": "Software Engineer",
    "location": {
        "coordinates": [
            -23.5348038,
            -46.7710128
        ],
        "_id": "5e2b053e3d6105ca1752085d",
        "type": "Point"
    },
    "__v": 0
}
```
</details>

------------------------------------------------------------------------------------------------------------------------

## Update
```http
PUT /api/devs/amokawa HTTP/1.1
Content-Type: application/json

{
	"github_user": "amokawa",  // It shouldn't change the dev user
	"latitude": "-46.7710128",
	"longitude": "-23.5348038",
	"techs": "Ruby on Rails, React, React Native, Java"
}
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "modifiedCount": 1,
    "ok": 1
}
```
</details>


------------------------------------------------------------------------------------------------------------------------

## Delete
```http
DELETE /api/devs/amokawa HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary></details>



------------------------------------------------------------------------------------------------------------------------

## Search
```http
GET /api/search?techs=ReactJS,Node.JS&latitude=-23.2480525&longitude=-45.8870291 HTTP/1.1
```
<details>
<summary><code>HTTP/1.1 200 OK</code></summary>

```json
{
    "devs": [
        {
            "techs": [
                "Ruby on Rails",
                "React",
                "React Native",
                "Java"
            ],
            "_id": "5e2b053e3d6105ca1752085c",
            "github_user": "amokawa",
            "name": "amokawa",
            "avatar_url": "https://avatars2.githubusercontent.com/u/53023867?v=4",
            "bio": "Software Engineer",
            "location": {
                "coordinates": [
                    -23.5348038,
                    -46.7710128
                ],
                "_id": "5e2b05603d6105ca17520860",
                "type": "Point"
            },
            "__v": 0
        }
        ...
    ]
}
```
</details>

[1]: #index
[2]: #create
[3]: #read
[4]: #update
[5]: #delete
[6]: #search-1
