import jwt from 'jsonwebtoken';

const createJwt = (id) => {
    try {
        const payload = { id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error creating JWT:', error);
        throw new Error('Failed to create JWT');
    }
};

export default createJwt;
