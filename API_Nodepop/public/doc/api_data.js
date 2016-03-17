define({ "api": [
  {
    "type": "get",
    "url": "/anuncios",
    "title": "Obtener listado de todos los anuncios disponible.",
    "name": "GetAnuncios",
    "group": "Anuncios",
    "parameter": {
      "fields": {
        "Login": [
          {
            "group": "Login",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Sólo los usuarios logueados pueden acceder a este GET.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del producto anunciado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "venta",
            "description": "<p>Devuelve true o false indicando si el producto está en venta o no.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "precio",
            "description": "<p>Precio que tiene el producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foto",
            "description": "<p>Url de una imagen del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags que corresponden a ese producto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \n{\n\t\"result\": true,\n\t\"rows\": [\n\t\t{\n\t\t\t\"_id\": \"56ea6973e0b2c1280de9ebd4\",\n\t\t\t\"nombre\": \"Bicicleta\",\n\t\t\t\"venta\": true,\n\t\t\t\"precio\": 230.15,\n\t\t\t\"foto\": \"bici.jpg\",\n\t\t\t\"__v\": 0,\n\t\t\t\"tags\": [\n\t\t\t\t\"lifestyle\",\n\t\t\t\t\"motor\"\n\t\t\t]\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnunciosNotFound",
            "description": "<p>Se ha producido algún error al obtener los anuncios de la base de datos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"result\": false,\n  \"error\": {error}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/anuncios.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "get",
    "url": "/anuncios",
    "title": "Obtener listado de anuncios utilizando distintos filtros.",
    "name": "GetAnunciosFiltros",
    "group": "Anuncios",
    "parameter": {
      "fields": {
        "Login": [
          {
            "group": "Login",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Sólo los usuarios logueados pueden acceder a este GET.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nombre",
            "description": "<p>Nombre del producto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "tag",
            "description": "<p>Tag que tenga producto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venta",
            "description": "<p>Venta, true o false, para ver si está en venta el producto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "precio",
            "description": "<p>Precio del producto. (50, -50, 50-, 50-1000).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "start",
            "description": "<p>Para paginación, mostrara anuncios a partir del número indicado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "limit",
            "description": "<p>Para paginación, mostrará como máximo el número de anuncios indicado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "description": "<p>Para ordenación, mostrará el listado de anuncios ordenado por el parámetro indicado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/anuncios?tag=mobile&venta=false&nombre=ip&precio=50&start=0&limit=2&sort=precio",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del producto anunciado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "venta",
            "description": "<p>Devuelve true o false indicando si el producto está en venta o no.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "precio",
            "description": "<p>Precio que tiene el producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foto",
            "description": "<p>Url de una imagen del producto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags que corresponden a ese producto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \n{\n\t\"result\": true,\n\t\"rows\": [\n\t\t{\n\t\t\t\"_id\": \"56ea6973e0b2c1280de9ebd4\",\n\t\t\t\"nombre\": \"Bicicleta\",\n\t\t\t\"venta\": true,\n\t\t\t\"precio\": 230.15,\n\t\t\t\"foto\": \"bici.jpg\",\n\t\t\t\"__v\": 0,\n\t\t\t\"tags\": [\n\t\t\t\t\"lifestyle\",\n\t\t\t\t\"motor\"\n\t\t\t]\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AnunciosNotFound",
            "description": "<p>Se ha producido algún error al obtener los anuncios de la base de datos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"result\": false,\n  \"error\": {error}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/anuncios.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "get",
    "url": "/tags",
    "title": "Obtener un listado de todos los tags existentes.",
    "name": "GetTags",
    "group": "Tags",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Tags",
            "optional": false,
            "field": "Array",
            "description": "<p>Array con un listado de todos los tags existentes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \n{\n\t\"result\": true,\n\t\"rows\": [\"lifestyle\", \"motor\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TagsNotFound",
            "description": "<p>Se ha producido algún error al obtener los tags existentes en la app.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"result\": false,\n  \"error\": {error}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tags.js",
    "groupTitle": "Tags"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Obtener información de ususarios",
    "name": "GetUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \n{\n\t\"result\": true,\n\t\"rows\": [\n\t\t{\n\t\t\t\"_id\": \"56ea6973e0b2c1280de9ebd7\",\n\t\t\t\"nombre\": \"kevin\",\n\t\t\t\"email\": \"kivenoliva@gmail.com\"\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UsersNotFound",
            "description": "<p>Se ha producido algún error al obtener los usuarios de la base de datos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"result\": false,\n  \"error\": {error}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Registrar un nuevo usuario",
    "name": "PostUser",
    "group": "User",
    "parameter": {
      "fields": {
        "nombre": [
          {
            "group": "nombre",
            "type": "String",
            "optional": false,
            "field": "Nombre",
            "description": "<p>Nombre del usuario.</p>"
          }
        ],
        "email": [
          {
            "group": "email",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Email del usuario.</p>"
          }
        ],
        "clave": [
          {
            "group": "clave",
            "type": "String",
            "optional": false,
            "field": "Clave",
            "description": "<p>Clave del usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Param-Example:",
          "content": "{\n  \"nombre\": \"Kevin\",\n  \"email\": \"kiven@gmail.com\",\n  \"clave\": \"pass\"\n}",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "clave",
            "description": "<p>Clave del usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \n{\n\t\"result\": true,\n\t\"rows\": [\n\t\t{\n\t\t\t\"_id\": \"56ea6973e0b2c1280de9ebd7\",\n\t\t\t\"nombre\": \"kevin\",\n\t\t\t\"email\": \"kivenoliva@gmail.com\",\n\t\t\t\"clave\": \"85f5e10431f69bc2a14046a13aabaefc660103b6de7a84f75c4b96181d03f0b5\",\n\t\t\t\"__v\": 0\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UsersNotSave",
            "description": "<p>Se ha producido algún error al guardar un usuario en la base de datos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"result\": false,\n  \"error\": {error}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
