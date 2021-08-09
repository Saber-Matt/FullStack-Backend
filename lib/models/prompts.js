import { insertBefore } from 'parse5/lib/tree-adapters/default';
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
    INSERT FROM prompts (name, text)
      VALUES ($1, $2)
      RETURNING *
    `, [name, text]);

    return new Prompt(rows[0]);

  }
}