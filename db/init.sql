CREATE DATABASE IF NOT EXISTS opensw;
USE opensw;

CREATE TABLE IF NOT EXISTS User (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                      nickname VARCHAR(50) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      password VARCHAR(70) NOT NULL,
                      profile_image_url VARCHAR(255),
                      user_address VARCHAR(255),
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PloggingCourse (
                                id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                                title VARCHAR(50) NOT NULL,
                                metadata JSON NOT NULL,
                                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PloggingGroup (
                               id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                               course_id BIGINT NOT NULL,
                               address VARCHAR(255) NOT NULL,
                               status ENUM('before', 'during', 'after') NOT NULL,
                               created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                               updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                               FOREIGN KEY (course_id) REFERENCES PloggingCourse(id),
                               UNIQUE(course_id)
);

CREATE TABLE IF NOT EXISTS UserPloggingGroupApplyment (
                                            user_id BIGINT NOT NULL,
                                            plogging_group_id BIGINT NOT NULL,
                                            is_plogging_group_admin TINYINT(1) NOT NULL,
                                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                            PRIMARY KEY (user_id, plogging_group_id),
                                            FOREIGN KEY (user_id) REFERENCES User(id),
                                            FOREIGN KEY (plogging_group_id) REFERENCES PloggingGroup(id) ON DELETE CASCADE,
                                            UNIQUE (user_id, plogging_group_id)
);

CREATE TABLE IF NOT EXISTS PloggingGroupReview (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                                     user_id BIGINT NOT NULL,
                                     plogging_group_id BIGINT NOT NULL,
                                     reward INT,
                                     content TEXT,
                                     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                     FOREIGN KEY (plogging_group_id) REFERENCES PloggingGroup(id) ON DELETE CASCADE,
                                     FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PloggingGroupReviewPicture (
                                            id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                                            plogging_group_review_id BIGINT NOT NULL,
                                            image_url VARCHAR(2048) NOT NULL,
                                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                            FOREIGN KEY (plogging_group_review_id) REFERENCES PloggingGroupReview(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PloggingReviewPicture (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                                       plogging_group_id BIGINT NOT NULL,
                                       image_url VARCHAR(2048) NOT NULL,
                                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                       FOREIGN KEY (plogging_group_id) REFERENCES PloggingGroup(id) ON DELETE CASCADE
);

INSERT INTO User (nickname, email, password, profile_image_url, user_address)
VALUES ('test', 'test@gmail.com', '1234', 'test.jpg', 'test address');
