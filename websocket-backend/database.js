const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Подключено к MongoDB');
    return client.db('chatdb');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
  }
}

module.exports = { connectToDatabase };
