const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

module.exports = (req, res, next) => {
  try {
  	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const email = decodedToken.email;

    const id = parseInt(req.params.id);
	pool.query('SELECT email FROM orders WHERE courseId = $1', [id], (error, results) => {
	    if (error) {
	      throw error
	    }

	    const mails = [];
	    for (let i in results.rows) {
	    	mails.push(results.rows[i].email)
	    }
	    for (m in mails) {
		    if (mails[m] === email) {
		    	return next();
		    }
	    }
	    res.json({msg: 'no match'})

 	})
  } catch {
    res.status(401).json({
      error: 'No token provided'
    });
  }
}