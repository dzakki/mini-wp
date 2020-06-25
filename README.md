# mini-wp
 mini-wp built with Express, Mongoose and Vue

## Usage app client
1. visit http://mini-wp.dzakki.com/
2. login or register
3. welcome!

## Usage app

### run in your computer
```
$ npm install
$ npm start
$ npm run dev    
```
access the API via `http://localhost:3000` or `https://dz-mini-wp.herokuapp.com`

## User

### Register/Create
* Method:  `POST`
* URL:  `/auth/register`
* body: `username=[string]*`,` email=[string]*` ,`password=[string]*`
* Output
    * 200: 
        ```
        "result": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI0ODRlMzc4MjQ2ZTEzZDc4Y2M5ZTciLCJyb2xlIjoiQXV0aG9yIiwiaWF0IjoxNTc5NDUxNjE5fQ.pc4Njq1KuY6Cact2lGR23e-B2AxI728Y6mMdGbuFEMY"
        }
        ```
    * 400
        ```
        {
            "message": "User validation failed: username: username is required"
        }
        ```
    * 409
        ```
        {
            "message": "username: dzakki1 has been used. "
        }
        ```

### Login
* Method:  `POST`
* URL:  `/auth/login`
* body: `username=[string]*` ,`password=[string]*`
* Output
    * 200: 
        ```
        "result": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI0ODRlMzc4MjQ2ZTEzZDc4Y2M5ZTciLCJyb2xlIjoiQXV0aG9yIiwiaWF0IjoxNTc5NDUxNjE5fQ.pc4Njq1KuY6Cact2lGR23e-B2AxI728Y6mMdGbuFEMY"
        }
        ```
    * 400
        ```
        {
            "message": "username/password incorrect"
        }
        ```    

## Tag

### get tags
* Method:  `GET`
* URL:  `/tags`
* Output
    * 200: 
        ```
        "tags": [
            {
                "_id": "5e22b9a8d3604e0768b27018",
                "name": "Vue",
                "__v": 0,
                "created_at": "2020-01-18T07:54:16.472Z",
                "updated_at": "2020-01-18T07:54:16.475Z"
            },
        }
        ```

## Article

### get articles
* Method:  `GET`
* URL:  `/articles` 
* Output
    * 200: 
        ```
        "articles": [
        {
            "tags": [
                {
                    "_id": "5e22b9a8d3604e0768b27019",
                    "name": "Reactjs",
                    "__v": 0,
                    "created_at": "2020-01-18T07:54:16.487Z",
                    "updated_at": "2020-01-18T07:54:16.488Z"
                }
            ],
            "_id": "5e245317dd08d433bf46fb81",
            "title": "ipsum lorem",
            "slug": "ipsum-lorem.html",
            "content": "content here",
            "featured_image": "https://storage.googleapis.com/img.png",
            "author": {
                "_id": "5e2299601d7a505da5b766bd",
                "email": "dzakki1@example.com"
            },
            "created_at": "2020-01-19T13:01:11.334Z",
            "updated_at": "2020-01-19T13:01:11.334Z",
            "__v": 0
        }]
        ```

### get articles by slug
* Method:  `GET`
* URL:  `/articles/slug/:slug`
* Output
    * 200: 
        ```
        "articles": 
        {
            "tags": [
                {
                    "_id": "5e22b9a8d3604e0768b27019",
                    "name": "Reactjs",
                    "__v": 0,
                    "created_at": "2020-01-18T07:54:16.487Z",
                    "updated_at": "2020-01-18T07:54:16.488Z"
                }
            ],
            "_id": "5e245317dd08d433bf46fb81",
            "title": "ipsum lorem",
            "slug": "ipsum-lorem.html",
            "content": "content here",
            "featured_image": "https://storage.googleapis.com/img.png",
            "author": {
                "_id": "5e2299601d7a505da5b766bd",
                "email": "dzakki1@example.com"
            },
            "created_at": "2020-01-19T13:01:11.334Z",
            "updated_at": "2020-01-19T13:01:11.334Z",
            "__v": 0
        },
        ```

### get articles by author
* Method:  `GET`
* URL:  `/articles/author`
* header: token
* Output
    * 200: 
        ```
        "articles": 
        {
            "tags": [
                {
                    "_id": "5e22b9a8d3604e0768b27019",
                    "name": "Reactjs",
                    "__v": 0,
                    "created_at": "2020-01-18T07:54:16.487Z",
                    "updated_at": "2020-01-18T07:54:16.488Z"
                }
            ],
            "_id": "5e245317dd08d433bf46fb81",
            "title": "ipsum lorem",
            "slug": "ipsum-lorem.html",
            "content": "content here",
            "featured_image": "https://storage.googleapis.com/img.png",
            "author": {
                "_id": "5e2299601d7a505da5b766bd",
                "email": "dzakki1@example.com"
            },
            "created_at": "2020-01-19T13:01:11.334Z",
            "updated_at": "2020-01-19T13:01:11.334Z",
            "__v": 0
        },
        ```

### get articles by id
* Method:  `GET`
* URL:  `/articles/:id`
* Output
    * 200: 
        ```
        "articles": 
        {
            "tags": [
                {
                    "_id": "5e22b9a8d3604e0768b27019",
                    "name": "Reactjs",
                    "__v": 0,
                    "created_at": "2020-01-18T07:54:16.487Z",
                    "updated_at": "2020-01-18T07:54:16.488Z"
                }
            ],
            "_id": "5e245317dd08d433bf46fb81",
            "title": "ipsum lorem",
            "slug": "ipsum-lorem.html",
            "content": "content here",
            "featured_image": "https://storage.googleapis.com/img.png",
            "author": {
                "_id": "5e2299601d7a505da5b766bd",
                "email": "dzakki1@example.com"
            },
            "created_at": "2020-01-19T13:01:11.334Z",
            "updated_at": "2020-01-19T13:01:11.334Z",
            "__v": 0
        },
        ```

### update article
* Method:  `PUT`
* URL:  `/articles/:id`
* header: token
* body: `title=[string]*`,` featured_image=[imgfile]` ,`content=[string]`,`tags=[arraysOfTagId]`
* Output
    * 200: 
        ```
        "articles": 
        {
            "tags": [
                {
                    "_id": "5e22b9a8d3604e0768b27019",
                    "name": "Reactjs",
                    "__v": 0,
                    "created_at": "2020-01-18T07:54:16.487Z",
                    "updated_at": "2020-01-18T07:54:16.488Z"
                }
            ],
            "_id": "5e245317dd08d433bf46fb81",
            "title": "ipsum lorem",
            "slug": "ipsum-lorem.html",
            "content": "content here",
            "featured_image": "https://storage.googleapis.com/img.png",
            "author": {
                "_id": "5e2299601d7a505da5b766bd",
                "email": "dzakki1@example.com"
            },
            "created_at": "2020-01-19T13:01:11.334Z",
            "updated_at": "2020-01-19T13:01:11.334Z",
            "__v": 0
        },
        ```

### delete article
* Method:  `DELETE`
* URL:  `/articles/:id`
* header: token
* Output
    * 200: 
        ```
        "article": {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
        ```


## NB

* Where i can get a token for header request? 
    you will get token after login/register
