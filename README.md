# Marathoner

**An application that allows users to signup and display what shows they are watching, as well on comment on show pages and add new shows.**

- **Users**

    | Method  | Endpoint             | Description            | Body Data     |
    | ------- | -------------------- | ---------------------- | ------------- |
    | GET     |/users/:id            | Get a user by id       | N/A           |
    | GET ALL |/users/all            | Get a user by id       | N/A           |
    | POST    |/users/new_user       | Register a new user    | Body Data     |

- **Shows**

    | Method | Endpoint            | Description                    | Body Data     |
    | ------ | ------------------- | ------------------------------ | ------------- |
    | GET    | /shows/info/showId  | Get show info by id            | N/A           |
    | GET ALL| /shows/all          | Get all shows & viewers by id  | N/A           |
    | GET    | /shows/user/:userId | Get shows that user is watching| N/A           |
    | POST   | /shows/new_show     | Register a new show            | Body Data     |

- **Genres**

    | Method  | Endpoint    | Description    | Body Data |
    | ------- | ----------- | ---------------| --------- |
    | GET ALL | /genres/all | Get all genres | N/A       |


- **Comments**

    | Method | Endpoint                          | Description                | Body Data     |
    | ------ | --------------------------------- | -------------------------- | ------------- |
    | GET    | /comments/show_comments/:show_id  | Get a shows comments by id | N/A           |
    | POST   | /comments/new_comment             | Post a new comment on show | Body Data     |

