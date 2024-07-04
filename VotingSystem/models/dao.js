import { pool } from '../index.js';
import { nanoid } from 'nanoid';
import { hash } from 'bcrypt';

class Dao {
  static async createUser(userData) {
    try {
      const id = nanoid();
      const saltRounds = 10;
      const hashedPassword = await hash(userData.password, saltRounds)
      const result = await pool.execute('INSERT INTO regvoters VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [
        id, userData.firstname, userData.lastname, userData.gender, userData.date, userData.username, hashedPassword, userData.currentaddress, 
        userData.permanentaddress, parseInt(userData.zipcode), userData.state, userData.taluka, userData.district, 
        parseInt(userData.aadharnumber), parseInt(userData.phonenumber), userData.email, userData.tnc
      ]);
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  static async authUser(uniqueNameCol,uniqueName) {
    try { 
      const result = await pool.execute(`SELECT id, username, email, password, aadharnumber FROM regvoters WHERE ${uniqueNameCol} = ?;`,[uniqueName])
      return result[0];
    } catch(error) {
      throw error;
    }
  }

  static async getUser(id) {
    try {
      const result = await pool.execute(`SELECT * FROM regvoters WHERE id = ?`,[id]);
      return result[0];
    } catch(error) {
    }
  }
}

export { Dao };
