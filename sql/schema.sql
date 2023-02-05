CREATE TABLE subscribers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(40) character set utf8 NOT NULL,
    sex VARCHAR(15) character set utf8 NOT NULL,
    age INT NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    main_address VARCHAR(15) character set utf8,
    descriptions VARCHAR(500) character set utf8,
    other_data VARCHAR(200),
    data_state VARCHAR(50) character set utf8 NOT NULL,
    publisher_id INT NOT NULL,
    editor_id INT,
    last_update TIMESTAMP,
    publish_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE Patients(
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscriber_id INT NOT NULL,
    past_medical VARCHAR(500) character set utf8,
    past_surgical VARCHAR(20),
    drug_history VARCHAR(20)
);

CREATE TABLE records(
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(20) NOT NULL,
    sub_category VARCHAR(20) NOT NULL,
    descriptions VARCHAR(200) character set utf8,
    subscriber_id INT,
    publisher_id INT NOT NULL,
    data_state VARCHAR(20) NOT NULL,
    other_data VARCHAR(200),
    editor_id INT,
    last_update TIMESTAMP,
    publish_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE diseases(
    id INT AUTO_INCREMENT PRIMARY KEY,
    record_id INT,
    data1 VARCHAR(1000) character set utf8,
    data2 VARCHAR(1000) character set utf8,
    data3 VARCHAR(1000) character set utf8,
    data4 VARCHAR(1000) character set utf8,
    data5 VARCHAR(1000) character set utf8,
    plan_date TIMESTAMP
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    user_password VARCHAR(800) NOT NULL,
    code VARCHAR(25) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users(username, phoneNumber, user_password, code) VALUES('Ari Sabah', '07502136395', '$2b$12$3wuz2B5cBLc5XvtAwIi9rObTqVOTmbh2UhUGznWj1G/R0.7fbiXLa', 'SuperAdmin');

DROP TABLE subscribers;
DROP TABLE diseases;
DROP TABLE Patients;
DROP TABLE records;
DROP TABLE users;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

-- CREATE TABLE items(
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     item_name VARCHAR(100) character set utf8 NOT NULL,
--     descriptions VARCHAR(900) character set utf8 NOT NULL,
--     price DECIMAL(15, 2) NOT NULL,
--     money_type VARCHAR(10) NOT NULL,
--     quantity INT NOT NULL,
--     tags VARCHAR(400) character set utf8 NOT NULL,
--     data_state VARCHAR(50) character set utf8 NOT NULL,
--     other_data VARCHAR(200),
--     publisher_id INT NOT NULL,
--     editor_id INT,
--     last_update TIMESTAMP,
--     publish_date TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- DROP TABLE items;

-- CREATE TABLE dealers(
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     dealer_name VARCHAR(40) character set utf8 NOT NULL,
--     email VARCHAR(50) character set utf8 NOT NULL,
--     phoneNumber VARCHAR(12) NOT NULL,
--     descriptions VARCHAR(500) character set utf8 NOT NULL,
--     other_data VARCHAR(200),
--     data_state VARCHAR(50) character set utf8 NOT NULL,
--     purchase_number INT NOT NULL,
--     publisher_id INT NOT NULL,
--     editor_id INT,
--     last_update TIMESTAMP,
--     publish_date TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- DROP TABLE dealers;

-- CREATE TABLE info(
--     info_type VARCHAR(30) NOT NULL UNIQUE,
--     info_data DECIMAL(30, 2) NOT NULL
-- );

-- INSERT INTO info VALUES('iqdTotalMoney', 0);
-- INSERT INTO info VALUES('usdTotalMoney', 0);
-- INSERT INTO info VALUES('usdValue', 0);

-- DROP TABLE info;