import pool from '../utils/pool';

export default class Prompt {
  id;
  name;
  text;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.text = row.text;
  }

  static async insert({ name, text }) {
    const { rows } = await pool.query(`
    INSERT INTO prompts (name, text)
      VALUES ($1, $2)
      RETURNING *
    `, [name, text]);

    return new Prompt(rows[0]);

  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT *
      FROM prompts
    `);

    return rows.map(row => new Prompt(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT *
      FROM prompts
      WHERE id = $1
    `, [id]);

    return new Prompt(rows[0])
  }

  static async update(prompt, id) {
    const { rows } = await pool.query(`
      UPDATE prompts
      SET name = $1,
          text = $2,
      WHERE id = $3
      RETURNING *  
    `, [prompt.name, prompt.text, id]);

    return new Prompt(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM prompts
      WHERE id = $3
      RETURNING *
    `, [id])

    return new Prompt(rows[0]);
  }
};
