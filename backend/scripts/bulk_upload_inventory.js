const fs = require('fs');
const path = require('path');
const axios = require('axios');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, '../sample_inventory.csv');
const apiUrl = 'http://localhost:5000/inventory/upload';

async function uploadInventory() {
  const products = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      products.push(row);
    })
    .on('end', async () => {
      // Convert products to Excel or send as JSON (if backend supports JSON bulk upload)
      // Here, we send each product as a separate request for demo purposes
      for (const product of products) {
        try {
          await axios.post(apiUrl, product, {
            headers: { 'Content-Type': 'application/json' }
          });
          console.log(`Uploaded: ${product.name}`);
        } catch (err) {
          console.error(`Failed: ${product.name}`, err.response?.data || err.message);
        }
      }
      console.log('Bulk upload complete.');
    });
}

uploadInventory();
