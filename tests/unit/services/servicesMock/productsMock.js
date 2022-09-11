const productsMock =
  [
    {
      "id": 1,
      "productName": "Martelo de Thor"
    },
    {
      "id": 2,
      "productName": "Traje de encolhimento"
    }
  ];

const insertedProductMock =
  {
    insertId: 666,
    name: 'Luva do Infinito'
}
  
const formatProductMock = {
  id: insertedProductMock.insertId,
  name: insertedProductMock.name
};

module.exports = {
  productsMock,
  insertedProductMock,
  formatProductMock,
};
