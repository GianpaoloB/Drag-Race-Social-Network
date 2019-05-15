DROP TABLE IF EXISTS queens;

CREATE TABLE queens(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    winner BOOLEAN,
    miss_congeniality BOOLEAN,
    image_url VARCHAR(250),
    place SMALLINT
);

INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Soju', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/8/84/Soju.jpg/revision/latest/scale-to-width-down/1000?cb=20190124192327', 15);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Kahanna Montrese', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/b/b9/Kahanna_Montrese.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191657', 14);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Honey Davenport', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/8/83/Honey_Davenport.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191622', 13);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Mercedes Iman Diamond', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/1/10/Mercedes_Iman_Diamond.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191730', 12);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Ariel Versace', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/3/3a/Ariel_Versace.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191236', 11);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Scarlet Envy', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/a/af/Scarlet_Envy.jpg/revision/latest/scale-to-width-down/1000?cb=20190321151802', 10);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Ra''Jah O''Hara', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/c/c9/Ra%27jah_D_Ohara.jpg/revision/latest/scale-to-width-down/1000?cb=20190124192028', 9);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Plastique Tiara', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/f/f6/Plastique_Tiara.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191919', 8);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Shuga Cain', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/d/d5/Shuga_Cain.jpg/revision/latest/scale-to-width-down/1000?cb=20190124192208', 7);
INSERT INTO queens (name, winner, miss_congeniality, image_url, place) VALUES('Nina West', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/6/60/Nina_West.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191846', 6);
INSERT INTO queens (name, winner, miss_congeniality, image_url) VALUES('Yvie Oddly', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/Yyvie_Oddly.jpg/revision/latest/scale-to-width-down/1000?cb=20190321022554');
INSERT INTO queens (name, winner, miss_congeniality, image_url) VALUES('Vanessa Vanjie Mateo', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/f/fb/Vanessa_Vanjie_Mateo.jpg/revision/latest/scale-to-width-down/1000?cb=20190124192407');
INSERT INTO queens (name, winner, miss_congeniality, image_url) VALUES('Silky Nutmeg Ganache', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/6/69/Silky_Nutmeg_Ganache.jpg/revision/latest/scale-to-width-down/1000?cb=20190124192250');
INSERT INTO queens (name, winner, miss_congeniality, image_url) VALUES('Brooke Lynn Hytes', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/0/03/Brooke_Lynn_Hytes.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191352');
INSERT INTO queens (name, winner, miss_congeniality, image_url) VALUES('A''Keria C. Davenport', false, false, 'https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/2/2a/A%27keria_C._Davenport.jpg/revision/latest/scale-to-width-down/1000?cb=20190124191151');
