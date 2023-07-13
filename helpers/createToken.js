const jwt = require('jsonwebtoken')


const { SECRET_KEY } = process.env

const createToken = ({_id: id}) => {

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

    return token

}

module.exports = createToken
