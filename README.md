
# Trabajo practico N°1 PROGRAMACION DISTRIBUIDAS II
Este proyecto esta realizado con  node js

# Requisitos
- Tener node js instalado:
    - Aqui tiene el sitio oficial de nodejs  https://nodejs.org/es/
- postman
- En la carpeta tp1 corre el siguiente comando "npm i"

# Como correr el programa
- npm start
# Los test corren con el comando
- npm test
# Como realizar pruebas de uso
Para saber que nodejs esta correctamente instalado
- node -v
- con ejecutar el comando "npm i" deberia installar todas las dependencias que figuran en el "package.json" 
.Para ejecutar el proyecto para visualizar con morgan las respuestas  del servidor
# npm run dev
- luego desde postman puede ejecutar las siguientes pruebas
# Get all 
- http://localhost:4000/api/videoClub/
# Get the element of type 
- http://localhost:4000/api/videoClub/rent
# Get the element with the object_id of a type 
- http://localhost:4000/api/videoClub/rent/b172a2ab-5900-4532-bd68-68a041752017
# Post 
- http://localhost:4000/api/videoClub/
# body: 
<rent>
   <object_id>b172a2ab-5900-4532-bd68-68a041877656</object_id>
   <client_id>5d65ac9e-d431-4138-a8e4-c4719205cb1b</client_id>
   <details>
       <status>RENTED</status>
       <until>2020/10/01</until>
   </details>
</rent>
