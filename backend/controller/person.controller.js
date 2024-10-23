const db = require('../db');
const bcrypt = require('bcrypt');

class PersonController {
    async registratePerson(req, res) {
        const { surname, name, patronymic, email, phone, password, photo } = req.body;
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const hashedPassword = await bcrypt.hash(password, 10);
            const newPerson = await client.query(
                `INSERT INTO Person (surname, name, patronymic, email, phone, password, photo) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
                [surname, name, patronymic, email, phone, hashedPassword, photo]
            );

            const personId = newPerson.rows[0].id;
            await client.query(
                `INSERT INTO Settings (person_id) VALUES ($1);`,
                [personId]
            );

            await client.query('COMMIT');

            res.status(201).json(newPerson.rows[0]);
        } catch (error) {
            await client.query('ROLLBACK');

            console.error('Ошибка при регистрации пользователя:', error);

            if (error.code === '23505') {
                res.status(409).json({ error: 'Пользователь с такой электронной почтой или телефоном уже существует' });
            } else if (error.code === '23503') {
                res.status(400).json({ error: 'Некорректные данные' });
            } else {
                res.status(500).json({ error: 'Не удалось зарегистироваться. Попробуйте позже' });
            }
        } finally {
            client.release();
        }
    }

    async authorizePerson(req, res) {
        const { email, password } = req.body;
        const client = await db.connect();

        try {
            const result = await client.query(
                `SELECT * FROM Person WHERE email = $1;`,
                [email]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({ error: 'Неверный логин или пароль' });
            }

            const person = result.rows[0];
            const isMatch = await bcrypt.compare(password, person.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Неверный логин или пароль' });
            }

            res.cookie('user_id', person.id, {
                httpOnly: true,
                maxAge: 28800000
            });

            console.log(req.cookies.session_id);
            res.status(201).json({
                id: person.id
            });
        } catch (error) {
            console.error('Ошибка при авторизации пользователя:', error);
            res.status(500).json({ error: 'Не удалось авторизоваться. Попробуйте позже' });
        } finally {
            client.release();
        }
    }

    async logOutPerson(req, res) {
        res.clearCookie('user_id', { httpOnly: true });

        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ error: 'Не удалось выйти' });
                }
                return res.status(200).json({ message: 'Успешный выход' });
            });
        } else {
            return res.status(200).json({ message: 'Успешный выход' });
        }
    }
}

module.exports = new PersonController();