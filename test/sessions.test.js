import { expect } from 'chai';
import supertest from "supertest";

//const expect = chai.expect
// url/enpint
const requester = supertest('http://localhost:8080')

describe('Test de sessions', () => {
    let tokenMock;

    /* it('Debe registrar correctamente un usuario', async() => {
        const userMock={   
                first_name:"mock",
                last_name:"mock",
                email:"probandoMock2@gmail.com",
                age:22,
                cart:"665605507caa05dc20b49c25",
                password:"12345"
        };

        const {_body} = await requester.post('/api/register').send(userMock);

        expect(_body.playload).to.be.ok
    }); */

    it('Debe loguear correctamente al usuario y devolver un token en una cookie', async () => {
        const userMock = {
            email: 'probandoMock@gmail.com',
            password: '12345'
        };
    
        const result = await requester.post('/api/login').send(userMock);
    
        const cookies = result.header['set-cookie'];
        //console.log("Cookies:", cookies);
    
        // Busca la cookie que contiene el token
        const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
        expect(tokenCookie).to.be.ok;
    
        const token = tokenCookie.split('=')[1].split(';')[0];
    
        // Verifica que el token sea válido (no sea nulo o vacío)
        expect(token).to.be.ok;
    
        console.log("Token extraído:", token);
    });

});