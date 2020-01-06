const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};

const signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      const { email } = req.body;
    
      pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash], (error, results) => {
        if (error) {
          res.send(error.detail);
          return console.log('error', error);
        }
        res.status(201).json({msg: 'user created'});
      })        
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE (email = $1)', [email], (err, results) => {
        if (err) {
            return console.log('error', err);
        }

        if (results.rows.length > 0) {
            const { password: hash } = results.rows[0];

            bcrypt.compare(password, hash, function(err, response) {
              if(response) {
                const token = jwt.sign({ email, password }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                
                res.status(200).json({
                    email: email,
                    token: token
                });

              } else {
               console.log('Password is incorrect')
              } 
            });
        } else {
            res.json({
                msg: 'email not found'
            })
        }


    });

};


module.exports = {
    getUsers,
    signUp,
    login
};