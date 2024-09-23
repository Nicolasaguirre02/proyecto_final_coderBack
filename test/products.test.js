import { expect } from 'chai';
import supertest from "supertest";

//const expect = chai.expect
// url/enpint
const requester = supertest('http://localhost:8080')

describe('Test de productos', () => {

    it('El endpint POST /api/products debe crear un producto correctamente',  async()=> {
        const productMock= {
            price: 30,
            titulo: "titulo del producto mock",
            disponible: true,
            owner: "Premium"
        };

        const {
            statusCode,
            ok,
            _body
        }   = await requester.post('/api/products').send(productMock);
        console.log(statusCode);
        console.log(ok);
        console.log(_body);

        expect(_body.playload).to.have.property('_id');
    }); 

     it('El endpint GET /api/products/pid debe mostrar el producto por el id', async() => {
        const productIDMock = '664fb9b635bf3469c325f966';

        const {_body} = await requester.get(`/api/products/${productIDMock}`);
        console.log(_body);

        expect(_body).to.be.an('object');
    }); 

    it('El endpint PUT /api/products/pid debe modificar el producto por el id', async() => {
        const productIDMock = '664fb9b635bf3469c325f966';

        const productMuck = {
            owner: "premium",
            titulo: "diNuevo titulo modificado",
            price: 107,
            disponible: true
        }

        

        const {_body} = await requester.put(`/api/products/${productIDMock}`).send(productMuck);
        console.log(_body);

        expect(_body).to.be.an('object');
    });
});
