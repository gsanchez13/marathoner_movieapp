const SHOWSBYUSERID = `SELECT shows_id, title, img_url, genre_id, genre_name 
FROM shows_users
INNER JOIN users ON shows_users.user_id = users.id
INNER JOIN shows ON shows_users.shows_id = shows.id
INNER JOIN genres ON show.genre_id = genres.id
WHERE shows_users.user_id = $1;`

const SHOWBYID = `SELECT shows.id, title, img_url, genres.id, genre_name
FROM shows
INNER JOIN genres ON shows.genre_id = genres.id
WHERE shows.id = $1;`

const CHECKSHOWTITLE = `SELECT CAST(
    CASE WHEN EXISTS(
        SELECT id, genre_id
        FROM shows
        WHERE title = $1
    )
    THEN TRUE
    ELSE FALSE
    END as bool
);`

const POSTSHOW = `INSERT INTO shows(title, img_url, genre_id)
VALUES($1, $2, $3)
RETURNING *`

const SHOWBYGENREID = `SELECT * 
FROM shows
WHERE genre_id = $1`;