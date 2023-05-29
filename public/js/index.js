const socket = io()

const createProductButton = document.getElementById('createProductButton')
const form = document.getElementById('productForm');


document.addEventListener('DOMContentLoaded', async () => {
    await getProducts();
  });

  let allProd = []

  form.addEventListener('submit', (event)=>{
    event.preventDefault()

  const title = document.getElementById('title').value
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const code = document.getElementById('code').value;
  const stock = document.getElementById('stock').value;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('code', code);
  formData.append('stock', stock);

  
  createProduct(formData);
  
  form.reset();

})

async function createProduct(product) {
    try {
  
      const response = await fetch('/api/products', {
        method: 'POST',
        body: product
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
  
      const data = await response.json();
      console.log('Producto creado:', data);
  
      await getProducts()
  
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  }