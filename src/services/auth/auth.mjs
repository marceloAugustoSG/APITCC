import jwt from 'jsonwebtoken';

// Função para gerar um token JWT
function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        // Outros campos que desejar incluir no token
    };
    const options = {
        expiresIn: '1h', // Tempo de expiração do token (opcional)
    };
    return jwt.sign(payload, 'secretpassword', options); // Substitua 'secretpassword' por uma chave secreta segura
}

export { generateToken };
