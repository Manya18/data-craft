const db = require('../db');
const bcrypt = require('bcrypt');

class ProjectController {
    async createProject(req, res) {
        const { title, goal, description, start_date, final_date, budget } = req.body;
        const client = await db.connect();

        try {
            if (!title || !start_date || !final_date) {
                return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
            }

            const userId = req.cookies.user_id;
            if (!userId) {
                return res.status(401).json({ error: 'Пользователь не авторизован' });
            }

            await client.query('BEGIN');

            const newProject = await client.query(
                `INSERT INTO Project (title, goal, description, start_date, final_date, budget) 
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [title, goal, description, start_date, final_date, budget]
            );

            const projectId = newProject.rows[0].id;

            await client.query(
                `INSERT INTO Person_project (person_id, project_id, is_admin, is_owner, status_id) 
                 VALUES ($1, $2, true, true, 3)`,
                [userId, projectId]
            );

            await client.query('COMMIT');

            res.status(201).json({ message: 'Проект успешно создан', projectId });
        } catch (error) {
            await client.query('ROLLBACK');

            if (error.code === '22003') { // Код ошибки для numeric value out of range
                return res.status(400).json({ error: 'Бюджет должен быть числом' });
            } else {
                return res.status(500).json({ error: 'Не удалось создать проект. Попробуйте позже' });
            }
        } finally {
            client.release();
        }
    }

    async getProject(req, res) {
        const id = req.params.id;
        const client = await db.connect();

        try {
            const project = await client.query(`SELECT * FROM project_details WHERE id = $1;`, [id]);
            res.status(201).json(project.rows[0]);
        } catch (error) {
            console.error('Ошибка при получении данных проекта:', error);
            res.status(500).json({ error: 'Не удалось получить данные. Попробуйте позже' });
        } finally {
            client.release();
        }
    }

    async getProjects(req, res) {
        const userId = req.cookies.user_id;
        const client = await db.connect();

        try {
            const project = await client.query(`SELECT * 
            FROM project_details
            WHERE id IN (
                SELECT pp.project_id
                FROM Person_project pp
                WHERE pp.person_id = $1
            );`, [userId]);
            res.status(201).json(project.rows);
        } catch (error) {
            console.error('Ошибка при получении данных проектов:', error);
            res.status(500).json({ error: 'Не удалось получить данные. Попробуйте позже' });
        } finally {
            client.release();
        }
    }
}

module.exports = new ProjectController();