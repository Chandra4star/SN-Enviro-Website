const fs = require('fs');
const path = require('path');
const https = require('https');

const companies = [
    { name: 'Ultratech', query: 'UltraTech Cement' },
    { name: 'Grasim', query: 'Grasim Industries' },
    { name: 'Godavari', query: 'Godawari Power and Ispat' },
    { name: 'Star_Cement', query: 'Star Cement' },
    { name: 'Adani', query: 'Adani Group' },
    { name: 'Vedanta', query: 'Vedanta Limited' },
    { name: 'Cipla', query: 'Cipla' },
    { name: 'Saint_Gobain', query: 'Saint-Gobain' },
    { name: 'Nuvoco', query: 'Nuvoco Vistas' },
    { name: 'Sree', query: 'Shree Cement' }
];

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function getWikipediaLogo(company) {
    try {
        // 1. Search for the page
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(company.query)}&utf8=&format=json`;
        const options = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } };
        const searchRes = await new Promise(resolve => {
            let data = '';
            https.get(searchUrl, options, res => {
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(JSON.parse(data)));
            });
        });
        
        if (!searchRes.query.search.length) return console.log(`No Wikipedia page for ${company.name}`);
        const title = searchRes.query.search[0].title;
        
        // 2. Get page images
        const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json`;
        const imagesRes = await new Promise(resolve => {
            let data = '';
            https.get(imagesUrl, options, res => {
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(JSON.parse(data)));
            });
        });
        
        const pages = imagesRes.query.pages;
        const pageId = Object.keys(pages)[0];
        const images = pages[pageId].images;
        if (!images) return console.log(`No images for ${company.name}`);
        
        // Find logo image
        const logoImage = images.find(img => img.title.toLowerCase().includes('logo'));
        if (!logoImage) return console.log(`No logo image found for ${company.name}`);
        
        // 3. Get image URL
        const imgInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(logoImage.title)}&prop=imageinfo&iiprop=url&format=json`;
        const imgInfoRes = await new Promise(resolve => {
            let data = '';
            https.get(imgInfoUrl, options, res => {
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(JSON.parse(data)));
            });
        });
        
        const imgPages = imgInfoRes.query.pages;
        const imgPageId = Object.keys(imgPages)[0];
        const url = imgPages[imgPageId].imageinfo[0].url;
        
        console.log(`Downloading ${company.name} from ${url}`);
        const ext = path.extname(url) || '.png';
        const dest = path.join(__dirname, 'public', 'assets', 'logos', `${company.name}${ext}`);
        await downloadFile(url, dest);
        console.log(`Saved ${company.name}`);
    } catch (err) {
        console.error(`Error processing ${company.name}:`, err.message);
    }
}

async function main() {
    for (const comp of companies) {
        await getWikipediaLogo(comp);
    }
}

main();
