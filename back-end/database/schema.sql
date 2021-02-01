CREATE TABLE questions (
	id int not null auto_increment,
  name VARCHAR(255),
  question TEXT,
  primary key (id)
);

CREATE TABLE answers (
	id int not null auto_increment,
  name VARCHAR(255),
  answer TEXT,
  question_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE profile (
	bio TEXT NOT NULL,
	picture_link TEXT NOT NULL,
	favorite_song VARCHAR(255) NOT NULL,
	favorite_movie VARCHAR(255) NOT NULL,
	favorite_pizza VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
