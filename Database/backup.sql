DROP database IF EXISTS NAME_OF_DATABASE; CREATE database NAME_OF_DATABASE; -- NAME_OF_DATABASE= Nombre de la base de datps

CREATE user if NOT EXISTS 'USER_NAME'@'SERVER_NAME' IDENTIFIED BY 'PASSWORD'; GRANT ALL PRIVILEGES ON api_graphql.* TO 'USER_NAME'@'SERVER_NAME';
FLUSH PRIVILEGES;

-- Create the tables USE api_graphql;
USE app_blog;

CREATE TABLE vehicles (  
	id INT NOT NULL AUTO_INCREMENT,  
	color VARCHAR(40) NOT NULL, 
	year INT NOT NULL,  
	manufacturer VARCHAR(40) NOT NULL,  
	mileage INT NOT NULL,  
    PRIMARY KEY (id)
);

INSERT INTO vehicles (color, year, manufacturer, mileage) VALUES('Red',    1990, 'Toyota',     350000);
INSERT INTO vehicles (color, year, manufacturer, mileage) VALUES('Azul',   2011, 'Nissan',     105000);
INSERT INTO vehicles (color, year, manufacturer, mileage) VALUES('Verde',  2017, 'Suzuki',     85000);
INSERT INTO vehicles (color, year, manufacturer, mileage) VALUES('Café',   2012, 'Volkswagen', 120000);
INSERT INTO vehicles (color, year, manufacturer, mileage) VALUES('Blanco', 2020, 'Renault',    2000);
INSERT INTO vehicles (color, year, manufacturer, mileage) VALUES('Negro',  2015, 'Isuzu',      90000);
