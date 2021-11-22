import express from 'express';
import { fetchWalletForNFTs, getTransactionData } from './wallet';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const address = req.query.address as string;//'9X3n2WPj8k7GB2wD7MxSxuL3VqC2e6YaafdcyPbr8xys';//
    console.log(`Requested wallet address ${address}`);
    const result = await fetchWalletForNFTs(address);
    for (const nft of result ?? []) {
      await getTransactionData(address, nft.mint);
    }
    console.log(`Request is${result == false ? ' not' : ''} process`);
    res.send(`Requested wallet address ${address}<br>${JSON.stringify(result)}`);
  } catch (e) {
    console.log(`Request isn't process: ${e}`);
    res.send(e);
  }
});

app.get('/nft', async (req, res) => {
  try {
    const address = req.query.address as string;//'9X3n2WPj8k7GB2wD7MxSxuL3VqC2e6YaafdcyPbr8xys';
    const mint = req.query.mint as string;//'HkaDezUF8eEHZRkDbMJGCCxNVuLuDfQ6ABpADahLw36M';
    console.log(`Requested wallet address ${address}, mint ${mint}`);
    const result = await getTransactionData(address, mint);
    console.log(`Request is processed`);
    res.send(`Requested wallet address ${address} mint ${mint}<br>${JSON.stringify(result)}`);
  } catch (e) {
    console.log(`Request isn't process: ${e}`);
    res.send(e);
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
  // func();
  return ;
});