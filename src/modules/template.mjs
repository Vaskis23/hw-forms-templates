import Twig from "twig"



const render = async (template, data) => {

    return new Promise ((resolve, reject) => {
        Twig.renderFile(template,data, (err, html) => {
                if (err) reject(err);
                resolve(html)
            })
        }) 

};

export {render}