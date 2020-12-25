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
