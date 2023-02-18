import jwt  from "jsonwebtoken";

export const generateJwt=(id,email)=>{
    const payload = { id,email };
    const accessToken = jwt.sign(payload, process.env.SecretToken, {
      algorithm: "HS256",
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    return accessToken;
}

export const verifyJwt=(token)=>{
    try {
        const payload = jwt.verify(token, process.env.SecretToken);
        if(payload) return true;

        return false;
    
      } catch (error) {
        return res.status(500).send(error.message);
      }
}
