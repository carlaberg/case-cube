const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_USER } = process.env;

export const newToken = userId => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION
  })
}

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    })
  });
}

exports.signIn = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  if (req.body.username != process.env.ADMIN_USERNAME || req.body.password != process.env.ADMIN_PASSWORD) {
    return res.status(401).send({ message: 'Invalid email and passoword combination' })
  }

  try {
    const token = newToken(JWT_USER)
    const user = {userId: JWT_USER}
    return res.status(201).send({ token, user })
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}


// Middleware for protecting routes
exports.protect = async (req, res, next) => {
  // Get the authorization header from  the incoming request
  const bearer = req.headers.authorization

  // Return Unauthorized status if there is no bearer token in the
  // request header or if it doesn'r start with the word Bearer
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();

  let payload

  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  
  req.user = { userId: payload.userId };
  
  next();
}

exports.currentUser = (req, res) => {
  console.log(req.user)
  const user = req.user

  if (!user) res.status(401).end()

  res.status(201).send(user)
}