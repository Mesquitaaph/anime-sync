import express, {Request, Response} from 'express';
import cors from 'cors';
import axios from 'axios';
import FormData from 'form-data';

const app = express();

app.use(cors());

//https://goyabu.com/wp-json
const categories = {
  OnePiece: 9,
  BlackClover: 2142
};

function printEps(DATA:any) {
  DATA.map((ep:any) => {
    const nome = ep.title.rendered;
    console.log(nome.replace("&#8211;", "-"));
  })
}



async function getEps() {
  let counter = 1;
  let running = true;
  while(running) {
    await axios.get(`https://goyabu.com/wp-json/wp/v2/posts?categories=${categories.OnePiece}&per_page=100&page=${counter++}`).then(res => {
      let DATA = res.data;
      
      printEps(DATA);
      if(DATA.length < 100) running = false;
    });
  }
}

getEps();

app.get("/", (req: Request, res: Response) => {
  
  
});

app.listen(3000);
