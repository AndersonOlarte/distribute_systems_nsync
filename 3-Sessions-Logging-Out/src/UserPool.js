import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_sNDRKAEdw",
    ClientId: "sjmcsth0t1rojam2ppi57gvin"
}

// Asigna la instancia a una variable con nombre
const userPool = new CognitoUserPool(poolData);

// Luego exporta la variable
export default userPool;