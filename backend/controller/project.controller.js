const db = require('../db');
const bcrypt = require('bcrypt');

class ProjectController {
    // async createProject(req, res) {
    //     const {title, goal, decsription, start_date, final_date, budget} = req.body;
    //     const client = await db.connect();

    //     try {
    //         await client.query('BEGIN');
            
    //         const newProject = await client.query(`INSERT INTO Project (title, goal, decsription, start_date, final_date, budget) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [title, goal, decsription, start_date, final_date, budget]);
    //         const projectId = newProject.rows[0].id;

    //         const projectOwnerId =
    //     }
    // }
    async getProject(req, res) {
        const id = req.params.id;
        const client = await db.connect();

        try {
            const project = await client.query(`SELECT * FROM project_details WHERE id = $1;`, [id]);
            res.status(201).json(project.rows[0]);
        } catch (error) {
            console.error('Ошибка при получении данных проекта:', error);
            res.status(500).json({ error: 'Не получить данные. Попробуйте позже' });
        } finally {
            client.release();
        }
    }
}

module.exports = new ProjectController();