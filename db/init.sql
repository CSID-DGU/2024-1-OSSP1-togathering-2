CREATE TABLE User (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      nickname VARCHAR(50),
                      email VARCHAR(255),
                      password VARCHAR(70),
                      profile_image_url VARCHAR(255),
                      user_address VARCHAR(255),
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8m64_unicode_ci;