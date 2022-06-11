USE express;

CREATE TABLE user
(
    `id`         INT PRIMARY KEY auto_increment,
    `name`       VARCHAR(255)                         NOT NULL,
    `email`      VARCHAR(255)                         NOT NULL UNIQUE,
    `password`   VARCHAR(255)                         NOT NULL,
    `created_at` DATETIME                             NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)