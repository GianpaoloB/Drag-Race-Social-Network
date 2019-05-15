DROP TABLE IF EXISTS ranking;

CREATE TABLE ranking(
    id SERIAL PRIMARY KEY,
    charisma SMALLINT,
    uniqueness SMALLINT,
    nerve SMALLINT,
    talent SMALLINT,
    user_id SMALLINT,
    queen_id SMALLINT
);
CREATE UNIQUE INDEX rank ON ranking(greatest(user_id,queen_id), least(user_id,queen_id));
-- ALTER TABLE ranking ADD CONSTRAINT rank UNIQUE (user_id, queen_id);
