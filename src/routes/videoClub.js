const { Router } = require("express");
const router = new Router();
const _ = require("underscore");
const fs = require('fs');
const validate = require('uuid-validate');
const json_items = fs.readFileSync('src/items.json', 'utf-8');
let items = JSON.parse(json_items);

//const datos = require("src/datos");

// get all
router.get("/", (request, response) => {
  response.json(items);
});
// get specific type
router.get("/:type",(request, response) => {
  var { type } = request.params;
  switch (type) {
    case "rent":
      response.json(items[0][0]);
      break;
    case "return":
      response.json(items[1][0]);
      break;
    case "delivery_to_rent":
      response.json(items[2][0]);
      break;
     case "delivery_to_return":
      response.json(items[3][0]);
      break;
    default:
      response.status(404).json("Type error. ONLY VALID: RENT,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN")
      break;
  }  
});
//respond with json that contains an element of that type if it has an object_id that I send as a parameter next to the type
router.get("/:type/:object_id", (request, response) => {
  var {
    type,
    object_id
  } = request.params;
  switch (type) {
    case "rent":
      var list = items[0][0].rent
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You dont have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      }
      break;
    case "return":
      var list = items[1][0].return

      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You dont have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      } 
      break;
    case "delivery_to_rent":
      var list = items[2][0].delivery_to_rent
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You dont have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      } 
      break;
    case "delivery_to_return":
      var list = items[3][0].delivery_to_return
  
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You dont have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      } 
      break;
    default:
      response.status(404).json("Invalid param.")
      break;
  }
});
// crear cada tipo
router.post('/', (request, response) => {
// rent,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN   
  const newData = {
    ...request.body
  };
  let type = Object.keys(newData)[0]
  switch (type) {
    case "rent":
      var newElement = generateData(newData.rent, type)
      if (newElement != {}) {
        return response.status(201).json("Item creado");
      } else {
        response.status(400).json({
          error: "Item no creado",
        });
      }
      break;
    case "return":
      var newElement = generateData(newData.return)
      if (newElement != {}) {
        items[1][0].return.push(newElement);
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        return response.status(201).json("Item creado");
      } else {
        response.status(400).json({
          error: "Item no creado",
        });
      }
      break;
    case "delivery_to_rent":
      var newElement = generateData(newData.delivery_to_rent)
      if (newElement != {}) {
        items[2][0].delivery_to_rent.push(newElement);
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        return response.status(201).json("Item creado");
      } else {
        response.status(400).json({
          error: "Item no creado",
        });
      }
      break;
    case "delivery_to_return":
      var newElement = generateData(newData.delivery_to_return)
      if (newElement != {}) {
        items[3][0].delivery_to_return.push(newElement);
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        return response.status(201).json("Item creado");
      } else {
        response.status(400).json({
          error: "Item not created",
        });
      }
      break;
    default:
      response.send("Error type data. Entries must have a correct format in xml");
      break;
  }  
});

// actualizar
router.put("/:object_id", (request, response) => {
  const {
   object_id
  } = request.params;
  const newData = {
    ...request.body
  }
  let type = Object.keys(newData)[0];
  switch(type){
    case "rent":
      var list = items[0][0].rent
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("no existe el elemento");
      } else {
        items[0][0].rent = actualizar(newData.rent, list)
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        response.status(201).json("Item actualizado correctamente")
      }
    break;
    case "return":
      var list = items[1][0].return
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("no existe el elemento")
      } else {
        items[1][0].return = actualizar(newData.return, list)
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        response.status(201).json("Item actualizado correctamente")
      }
    break;
    case "delivery_to_rent":
      var list = items[2][0].delivery_to_rent
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("no existe el elemento")
      } else {
        items[2][0].delivery_to_rent = actualizar(newData.delivery_to_rent, list)
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        response.status(201).json("Item actualizado correctamente")
      }
    break;
    case "delivery_to_return":
      var list = items[3][0].delivery_to_return
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("no existe el elemento")
      } else {
        items[3][0].delivery_to_return = actualizar(newData.delivery_to_return, list)
        const json_items = JSON.stringify(items);
        fs.writeFileSync('src/items.json', json_items, 'utf-8');
        response.status(201).json("Item actualizado correctamente")
      }
    break;
    default:
      response.status(400).json({
         error: "Item no actualizado",
        });
    break;
  }
});
// eliminar
router.delete("/:type/:object_id", (request, response) => {
  const {
    type,
    object_id
  } = request.params;
  if(type && object_id){
    switch (type) {
      case "rent":
        var list = items[0][0].rent
        items[0][0].rent = list.filter((dato) => dato.object_id != object_id);

        break;
      case "return":
        var list = items[1][0].return
        items[1][0].return = list.filter((dato) => dato.object_id != object_id);
        break;
      case "delivery_to_rent":
        var list = items[2][0].delivery_to_rent
        items[2][0].delivery_to_rent = list.filter((dato) => dato.object_id != object_id);
        break;
      case "delivery_to_return":
        var list = items[3][0].delivery_to_re
        items[3][0].delivery_to_rent = list.filter((dato) => dato.object_id != object_id);
        break;
      default:
        response.status(400).json({
          error: "Item not delete",
        });
        break;
      
    }
    const json_items = JSON.stringify(items);
    fs.writeFileSync('src/items.json', json_items, 'utf-8');
    response.status(201).json("Item eliminado correctamente")
  }
});

module.exports = router;
function isValidDate(dateString) {

    var datePattern = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/;

    var matchArray = dateString.match(datePattern);

    if (matchArray == null) {
        return false;
    }
    var cleanDateString = dateString.replace(/\D/g, '');

    var year = parseInt(cleanDateString.substr(0, 4));
    var month = parseInt(cleanDateString.substr(4, 2));
    var day = parseInt(cleanDateString.substr(6, 2));


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        daysInMonth[1] = 29;
    }

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }
    return true;
}

function searchItemByObjet_id(list, object_id){
  var itemInListFound=null
  if(list.length!=0){
    list.forEach(element => {
      var uuid1 = element.object_id.toString()
      if (object_id == uuid1) {
        itemInListFound = element;
      }
    });
  }

  return itemInListFound;
}

function generateData(data, type){
  var uuidClient = data.client_id[0]
  var uuidObject = data.object_id[0]
  var fecha = data.details[0].until[0];
  var newElement = {}
  if (uuidClient && uuidObject &&
    validate(uuidClient) &&
    validate(uuidObject) &&
    data.details && isValidDate(fecha)
  ) {
    newElement = {
      client_id: uuidClient,
      object_id: uuidObject,
      details: {
        status: data.details[0].status[0],
        until: fecha,
      },
    };
  }
  switch(type){
    case "rent":
    items[0][0].rent.push(newElement);
    break;
    case "return":
    items[1][0].return.push(newElement);
    break;
    case "delivery_to_rent":
    items[2][0].delivery_to_rent.push(newElement);
    break;
    case "delivery_to return":
    items[3][0].delivery_to_return.push(newElement);
    break;
  } 
  const json_items = JSON.stringify(items);
  fs.writeFileSync('src/items.json', json_items, 'utf-8');
  return newElement
}

function actualizar(newItem, list) {
  list.map(function (dato) {
    if (dato.object_id == newItem.object_id[0]) {
      dato.client_id = newItem.client_id[0]
      dato.details.status = newItem.details[0].status[0]
      dato.details.until = newItem.details[0].until[0]
    }
    return dato;
   });
   return list
}
