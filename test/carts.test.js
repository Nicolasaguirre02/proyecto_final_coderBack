import { expect } from 'chai';
import supertest from "supertest";

//const expect = chai.expect
// url/enpint
const requester = supertest('http://localhost:8080')

describe('Test de productos', () => {

   it('El endpint POST /api/carts debe crear un carrito correctamente',  async()=> {

        const {
            statusCode,
            ok,
            _body
        }   = await requester.post('/api/carts');
        console.log(statusCode);
        console.log(ok);
        console.log(_body);

        expect(_body).to.have.property('_id');
    });

    it('El endpint POST /api/carts/cid/product/pid debe agregar un producto al carrito correctamente',  async()=> {

        const cidMock = "66c3cfac32badaab5a6263a6";
        const pidMock = "664fb9b635bf3469c325f966";


        const {
            statusCode,
            ok,
            _body
        }   = await requester.post(`/api/carts/${cidMock}/product/${pidMock}`);
        console.log(statusCode);
        console.log(ok);
        console.log(_body);

        expect(_body).to.be.an('object');
    }); 

    it('El endpint DELETE /api/carts/cid debe aeliminar todos lo productos asignados al carrito correctamente',  async()=> {

        const cidMock = "66c3cfac32badaab5a6263a6";
     
        const {
            statusCode,
            ok,
            _body
        }   = await requester.post(`/api/carts/${cidMock}`);
        console.log(statusCode);
        console.log(ok);
        console.log(_body);

        expect(_body).to.be.an('object');
    });

});