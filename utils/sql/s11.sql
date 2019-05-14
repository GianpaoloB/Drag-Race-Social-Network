DROP TABLE IF EXISTS queens;

CREATE TABLE queens(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    winner BOOLEAN,
    miss_congeniality BOOLEAN,
    image_url VARCHAR(250),
    place SMALLINT
)

INSERT INTO queens VALUES("Soju", false, false, "", 15)
INSERT INTO queens VALUES("Kahanna Montrese", false, false, "", 14)
INSERT INTO queens VALUES("Honey Davenport", false, false, "", 13)
INSERT INTO queens VALUES("Mercedes Iman Diamond", false, false, "", 12)
INSERT INTO queens VALUES("Ariel Versace", false, false, "", 11)
INSERT INTO queens VALUES("Scarlet Envy", false, false, "", 10)
INSERT INTO queens VALUES("Ra'Jah O'Hara", false, false, "", 9)
INSERT INTO queens VALUES("Plastique Tiara", false, false, "", 8)
INSERT INTO queens VALUES("Shuga Cain", false, false, "", 7)
INSERT INTO queens VALUES("Nina West", false, false, "", 6)
INSERT INTO queens VALUES("Yvie Oddly", false, false, "")
INSERT INTO queens VALUES("Vanessa Vanjie Mateo", false, false, "")
INSERT INTO queens VALUES("Silky Nutmeg Ganache", false, false, "")
INSERT INTO queens VALUES("Brooke Lynn Hytes", false, false, "")
INSERT INTO queens VALUES("A'Keria C. Davenport", false, false, "")
