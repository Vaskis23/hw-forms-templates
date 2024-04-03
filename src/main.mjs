import http from 'node:http'
import querystring from 'node:querystring'
import { getProducts, getProductById, saveOrder } from './modules/data.mjs'
import {render} from './modules/template.mjs'
import { readFile } from 'node:fs/promises'

 //HW rewrite using switch
const server = http.createServer(async (req,res) => {
    res.setHeader("Content-type", "text/html")

    let html

    if(req.url === "/") {
        const products = await getProducts()
        html = await render('./pages/home.html', { products: products })
    
    } else if (req.url.startsWith("/images")) {
        html = await readFile(`.${req.url}`);
    } else if (req.url.startsWith("/buy")) {
        //HW: try to use regexp capture
        //HW: what if "/buy?id=1"
        let id = parseInt(req.url.split("/").pop())
        let product = await getProductById(id)
        html = await render("./pages/order.html", { product: product });

    } else if (req.url.startsWith("/pay")) { 
        let parameters = req.url.split("?")
        let data = querystring.parse(parameters[1])
        if (!data.agree) {
            html = 'Необходимо согласиться с условиями';
            res.statusCode = 400;
            res.end(html);
            return;
        }
        await saveOrder(data)
        html = 'order save'

    } else { 
        html = `Ops, not found ;(`
        res.statusCode = 404
    }

    res.end(html)
})

server.listen("3000","localhost")