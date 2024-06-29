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
}

export { Dao };
