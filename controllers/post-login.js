import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, } from 'firebase/auth';

/**
 *
 * @param {object} req - The http request object provided by the express server.
 * @param {object} res - The http response object provided by the express server.
 */
const controllerPostLogin = (req, res) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, req.body.name, req.body.password)
    .then(() => {
      setPersistence(auth, browserSessionPersistence)
      .then(() => {
        res.send({
          valid: true,
        });
      })
    })
    .catch((err) => { // invalid login
      res.send({
        valid: false,
      });
    });
};

export { controllerPostLogin, };
