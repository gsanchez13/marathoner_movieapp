# Marathoner

**An application that allows users to signup and display what shows they are watching, as well on comment on show pages and add new shows.**

- **Auth**

    | Method  | Endpoint     | Description   | Body Data          |
    | ------- | ------------ | ------------- | ------------------ |
    | GET     | /auth/logout | Log user out  | N/A                |
    | POST    | /auth/signup | Register user | username, password |
    | POST    | /auth/login  | Login user    | username, password |

- **Users**

    | Method  | Endpoint   | Description            | Body Data  |
    | ------- | ---------- | ---------------------- | ---------- |
    | GET     | /users/:id | Get a user by id       | N/A        |
    | GET ALL | /users/all | Get a user by id       | N/A        |

- **Shows**

    | Method | Endpoint            | Description                    | Body Data                |
    | ------ | ------------------- | ------------------------------ | ------------------------ |
    | GET    | /shows/info/showId  | Get show info by id            | N/A                      |
    | GET ALL| /shows/all          | Get all shows & viewers by id  | N/A                      |
    | GET    | /shows/user/:userId | Get shows that user is watching| N/A                      |
    | POST   | /shows/new_show     | Register a new show            | title, img_url, genre_id |

- **Genres**

    | Method  | Endpoint    | Description    | Body Data |
    | ------- | ----------- | ---------------| --------- |
    | GET ALL | /genres/all | Get all genres | N/A       |


- **Comments**

    | Method | Endpoint                          | Description                | Body Data                      |
    | ------ | --------------------------------- | -------------------------- | ------------------------------ |
    | GET    | /comments/show_comments/:show_id  | Get a shows comments by id | N/A                            |
    | POST   | /comments/new_comment             | Post a new comment on show | comment_body, user_id, show_id |

