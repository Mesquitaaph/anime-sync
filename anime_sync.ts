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
    let nome:string = ep.title.rendered;
    while(nome.includes("&#8211;")) {
      nome = nome.replace("&#8211;", "-");
    }

    //console.log(nome.split("-"));
    const eps = nome.split("-");
    if(eps.length > 2)
      console.log(eps[0]+eps[1].substring(0,14));
    else if(eps.length > 1)
      console.log(eps[0]+eps[1].substring(0,14));
    else
      console.log(eps[0])
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
