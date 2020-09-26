const request = require('supertest');

const app = require("../src/app")

/**
 * Testing get all the items in the list of the videoclub
 */

 describe("GET /api/videoClub", () => {
   it("responde con json que contiene una lista del videoclub ", (done) => {
     request(app)
       .get("/api/videoClub")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200, done);
   });
 });

 /**
  * Prueba si trae los elementos dando un existente de un tipo específico
  */
 describe("GET /api/videoClub/:type", () => {
   it("responder con json que contiene un elemento de ese tipo ", (done) => {
     request(app)
       .get("/api/videoClub/rent")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200, done);
   });
   it("responder con json que contiene un elemento de ese tipo ", (done) => {
     request(app)
       .get("/api/videoClub/delivery_to_rent")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200, done);
   });
  it("responder con json que contiene un elemento de ese tipo ", (done) => {
    request(app)
      .get("/api/videoClub/return")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
      it("responder con json que contiene un elemento de ese tipo ", (done) => {
        request(app)
          .get("/api/videoClub/delivery_to_return")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
   it("responder con json no encontrado cuando el elemento de ese tipo no existe ", (done) => {
     request(app)
       .get("/api/videoClub/typeNoExistente")
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(404)
       .expect('"Type error. ONLY VALID: RENT,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN"')
       .end((err) => {
         if (err) return done(err);
         done();
       });
   });
 });

 describe("GET /api/videoClub/:type/:object_id", () => {
  it("responde con json que contiene un elemento de ese tipo si tiene un object_id que envío como parámetro al lado del tipo", (done) => {
    request(app)
      .get("/api/videoClub/rent/b172a2ab-5900-4532-bd68-68a041752017")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("responde con json no encontrado cuando el elemento de ese tipo no existe", (done) => {
    request(app)
      .get("/api/videoClub/type/idNoExistente")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect('"Invalid param."')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
  it("responder con json no encontrado cuando el elemento de ese tipo no existe", (done) => {
    request(app)
      .get("/api/videoClub/rent/b172a2ab-5900-4532-bd68-68a041752067")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect('"You dont have that element"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/videoClub", () => {

});

