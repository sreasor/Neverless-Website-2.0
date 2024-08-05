const jwt = require('jsonwebtoken');

const secret = 'your-secret';
const token = jwt.sign({ foo: 'bar' }, secret);

console.log('Generated Token:', token);
