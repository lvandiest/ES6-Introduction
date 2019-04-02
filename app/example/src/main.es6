import {Cat} from "modules/cat";

let loki = new Cat('Loki', 'siamese', 'lilac point', '28-10-2013');
let turbo = new Cat('Turbo', 'oriental shorthair', 'lilac point', '22-07-2013');

window.onload = function() {
    document.getElementById('cats').innerHTML = `<ul><li>${loki.getInfo()}</li><li>${turbo.getInfo()}</li></ul>`;
};