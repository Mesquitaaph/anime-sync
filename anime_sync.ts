import express, {Request, Response} from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

//https://goyabu.com/wp-json
const categories = {
  OnePiece: 9,
  BlackClover: 2142
};

interface Episode {
  id: number;
  guid: {
    rendered: string;
  },
  slug: string;
  link: string;
  title: {
    rendered: string;
  }

}

function printEps(DATA:Array<Episode>) {
  DATA.map((ep) => {
    let nome = ep.title.rendered;
    while(nome.includes("&#8211;")) {
      nome = nome.replace("&#8211;", "-");
    }
    console.log(ep.slug + " " + ep.link);
  })
}

const episodes:Array<Episode> = [];

async function getEps() {
  let counter = 1;
  let running = true;
  while(running) {
    await axios.get(`https://goyabu.com/wp-json/wp/v2/posts?categories=${categories.BlackClover}&per_page=100&page=${counter++}`).then(res => {
      let DATA = res.data as Array<Episode>;
      DATA.map(ep => {
        const { id, guid, link, slug, title } = ep;
        episodes.push({ id, guid, link, slug, title });
      });
      //printEps(DATA);

      if(DATA.length < 100) running = false; 
    });
    break;
  }
}

getEps().then(() => {
  episodes.forEach(ep => console.log(ep));

});


// app.get("/", (req: Request, res: Response) => {
  
  
// });

// app.listen(3000);
