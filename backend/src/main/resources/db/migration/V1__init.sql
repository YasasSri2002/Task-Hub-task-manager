CREATE TABLE `user_table` (
  `id` binary(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL UNIQUE,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);