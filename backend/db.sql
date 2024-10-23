CREATE TABLE Date_format(
	id SERIAL PRIMARY KEY,
	title VARCHAR(10) NOT NULL
);
INSERT INTO Date_format (title) VALUES
('ММ/ДД/ГГ'),
('ДД/ММ/ГГ'),
('ММ.ДД.ГГ'),
('ДД.ММ.ГГ');

CREATE TABLE Invitation_status(
	id SERIAL PRIMARY KEY,
	title VARCHAR(15) NOT NULL
);
INSERT INTO Invitation_status (title) VALUES
('Не просмотрено'),
('Отклонено'),
('Подтверждено');

CREATE TABLE Priority(
	id SERIAL PRIMARY KEY,
	title VARCHAR(10) NOT NULL
);
INSERT INTO Priority (title) VALUES
('Низкий'),
('Средний'),
('Высокий');



CREATE TABLE Person(
	id SERIAL PRIMARY KEY,
	surname VARCHAR(64) NOT NULL,
	name VARCHAR(50) NOT NULL,
	patronymic VARCHAR(50),
	email VARCHAR(254) NOT NULL UNIQUE,
	phone VARCHAR(11) NOT NULL UNIQUE,
	password CHAR(60) NOT NULL,
	photo BYTEA
);

CREATE TABLE Settings(
	id SERIAL PRIMARY KEY,
	person_id INTEGER NOT NULL REFERENCES Person(id) ON DELETE CASCADE, 
	light_theme BOOL DEFAULT true,
	color_scheme VARCHAR(30) DEFAULT 'blueViolet',
	is_rus BOOL DEFAULT true,
	mondey_start BOOL DEFAULT true,
	time_format_24 BOOL DEFAULT true,
	date_format_id INTEGER DEFAULT 4 REFERENCES Date_format(id) ON DELETE RESTRICT
);

CREATE TABLE Project(
	id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	goal TEXT,
	description TEXT,
	current_status_id INTEGER DEFAULT 1,
	start_date DATE NOT NULL,
	final_date DATE NOT NULL,
	budget DECIMAL(19, 2)
);
CREATE TABLE Project_status(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	is_system BOOL DEFAULT false,
	project_id INTEGER REFERENCES Project(id) ON DELETE CASCADE
);
ALTER TABLE Project
ADD CONSTRAINT fk_current_status
FOREIGN KEY (current_status_id) REFERENCES Project_status(id) ON DELETE CASCADE;
INSERT INTO Project_status (title, is_system) VALUES
('Новый', true),
('В работе', true),
('Завершен', true),
('Приостановлен', true),
('Не активный', true);

CREATE TABLE Person_project(
	id SERIAL PRIMARY KEY,
	person_id INTEGER NOT NULL REFERENCES Person(id) ON DELETE CASCADE,
	project_id INTEGER NOT NULL REFERENCES Project(id) ON DELETE CASCADE,
	is_admin BOOL NOT NULL,
	role VARCHAR(50),
	status_id INTEGER DEFAULT 1 REFERENCES Invitation_status(id) ON DELETE RESTRICT
);

CREATE TABLE Document(
	id SERIAL PRIMARY KEY,
	document_name varchar(255) NOT NULL,
	document BYTEA,
	project_id INTEGER NOT NULL REFERENCES Project(id) ON DELETE CASCADE
);

CREATE TABLE Stage(
	id SERIAL PRIMARY KEY,
	project_id INTEGER NOT NULL REFERENCES Project(id) ON DELETE CASCADE,
	title VARCHAR(150) NOT NULL,
	current_status_id INTEGER DEFAULT 1,
	start_date DATE NOT NULL,
	final_date DATE NOT NULL,
	budget DECIMAL(19, 2),
	priority_id INTEGER NOT NULL REFERENCES Priority(id) ON DELETE RESTRICT
);
CREATE TABLE Stage_status(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	is_system BOOL DEFAULT false,
	stage_id INTEGER REFERENCES Stage(id) ON DELETE CASCADE
);
ALTER TABLE Stage
ADD CONSTRAINT fk_current_status
FOREIGN KEY (current_status_id) REFERENCES Stage_status(id) ON DELETE CASCADE;
INSERT INTO Stage_status (title, is_system) VALUES
('Не начат', true),
('В работе', true),
('Завершен', true),
('Приостановлен', true);

CREATE TABLE New_column(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	project_id INTEGER NOT NULL REFERENCES Project(id) ON DELETE CASCADE
);

CREATE TABLE Person_stage(
	id SERIAL PRIMARY KEY,
	person_id INTEGER NOT NULL REFERENCES Person(id) ON DELETE CASCADE,
	stage_id INTEGER NOT NULL REFERENCES Stage(id) ON DELETE CASCADE
);

CREATE TABLE Task(
	id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	description TEXT,
	stage_id INTEGER NOT NULL REFERENCES Stage(id) ON DELETE CASCADE,
	current_status_id INTEGER DEFAULT 1,
	start_date TIMESTAMP NOT NULL,
	final_date TIMESTAMP NOT NULL,
	priority_id INTEGER NOT NULL REFERENCES Priority(id) ON DELETE RESTRICT
);
CREATE TABLE Task_status(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	is_system BOOL DEFAULT false,
	task_id INTEGER REFERENCES Task(id) ON DELETE CASCADE
);
ALTER TABLE Task
ADD CONSTRAINT fk_current_status
FOREIGN KEY (current_status_id) REFERENCES Task_status(id) ON DELETE CASCADE;
INSERT INTO Task_status (title, is_system) VALUES
('Новый', true),
('В работе', true),
('Завершен', true),
('Приостановлен', true);

CREATE TABLE Person_task(
	id SERIAL PRIMARY KEY,
	person_id INTEGER NOT NULL REFERENCES Person(id) ON DELETE CASCADE,
	task_id INTEGER NOT NULL REFERENCES Task(id) ON DELETE CASCADE
);


---для получения проекта по id---
CREATE VIEW project_details AS
SELECT 
    p.id AS project_id,
    p.title,
    p.goal,
    p.description,
    json_build_object(  -- Создаем объект current_status
        'id', ps.id,
        'title', ps.title,
        'is_system', ps.is_system,
        'project_id', ps.project_id
    ) AS current_status,  -- Переименовываем в current_status
    p.start_date,
    p.final_date,
    p.budget,
    ARRAY(
        SELECT json_build_object(
            'user', json_build_object(
                'id', per.id,
                'surname', per.surname,
                'name', per.name,
                'patronymic', per.patronymic,
                'email', per.email,
                'phone', per.phone,
                'photo', per.photo
            ),
            'is_admin', pp.is_admin,
            'role', pp.role,
            'invite_status', ins.title
        )
        FROM Person_project pp
        JOIN Person per ON pp.person_id = per.id
        JOIN Invitation_status ins ON pp.status_id = ins.id
        WHERE pp.project_id = p.id
    ) AS members,
    ARRAY(
        SELECT json_build_object(
            'id', d.id,
            'document', d.document
        )
        FROM Document d
        WHERE d.project_id = p.id
    ) AS documents
FROM Project p
LEFT JOIN Project_status ps ON p.current_status_id = ps.id;