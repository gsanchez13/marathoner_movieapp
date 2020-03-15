const COMMENTSBYSHOWID = `SELECT * 
FROM comments
INNER JOIN users ON comments.user_id = users.id
INNER JOIN shows ON comments.show_id = shows.id
WHERE comments.show_id = $1;`

const NEWCOMMENT = `INSERT INTO comments(comment_body, user_id, show_id)
VALUES($1, $2, $3)
RETURNING *;`

const COMMENTINFOBYID = `SELECT(username, avatar_url, show_id) FROM comments
INNER JOIN users ON comments.id = users.id
WHERE comments.id = $1 AND 
comments.show_id = $2;`

