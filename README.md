# innovatech-back

### Rutas disponibles:

- URL: '/products'

METHOD: GET

Query Params: optional

- none: all products

- category

- order

- page

- items

## Example

GET('/products?category=tablet&order=asc&page=1&items=5') => 

{
    
    data: [ {product1} , {product2} ,...{productN} ],

    pageNumber: 1,

    totalPages: 10

}

