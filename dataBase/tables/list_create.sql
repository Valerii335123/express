USE express;

CREATE TABLE list
(
    `id`          INT PRIMARY KEY auto_increment,
    `title`       VARCHAR(255)                         NOT NULL,
    `description` TEXT                                 null,
    `priority`    INT(1)                                        DEFAULT 1,
    `status`      VARCHAR(10)                                   DEFAULT 'to_do',
    `parent_id`   int,
    `user_id`   int,
    `created_at`  DATETIME                             NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `closed_at`   DATETIME                             null,
    FOREIGN KEY (parent_id) REFERENCES list (id),
    FOREIGN KEY (user_id) REFERENCES user (id)


)