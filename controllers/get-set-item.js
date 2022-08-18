import { db, } from '../db.js';
import { ref, update } from "firebase/database";
import { getAuth, } from 'firebase/auth';
const auth = getAuth();

/**
 *
 * @param {object} req - The http request object provided by the express server.
 * @param {object} res - The http response object provided by the express server.
 */
const controllerGetSetItem = async(req, res) => {
  if (!auth.currentUser) return res.status(401).send({
    valid: false,
  });

  const updates = {};
  updates[`/items/${auth.currentUser.uid}/${req.params.itemId}/instock`] = false;
  update(ref(db), updates);
  res.send({
    done: true,
  });
};

export { controllerGetSetItem, };
