const ALLGENRES = `SELECT *
FROM GENRES`;
const NEWGENRE = `INSERT INTO genres(genre_name)
VALUES($1) RETURNING *;`