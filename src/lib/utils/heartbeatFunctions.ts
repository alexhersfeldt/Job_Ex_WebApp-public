// 
const url1= 'https://dmweb.sdfe.dk/maps/C1507145_PullFR24.html';
const url2= 'https://dmweb.sdfe.dk/maps/C1507145_PullFR24_Vik.html';

// fetch the html from the urls and create text nodes from the html


// const response1 = await fetch(url1,{mode: 'no-cors'});
// const response2 = await fetch(url2,{mode: 'no-cors'});

// export const html1 = await response1.text();
// export const html2 = await response2.text();

export function getFR24EX() {
    const Http = new XMLHttpRequest();
    const url='https://dmweb.sdfe.dk/maps/C1507145_PullFR24.html';
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        }
}

export function getFR24Vik() {
    const Http = new XMLHttpRequest();
    const url='https://dmweb.sdfe.dk/maps/C1507145_PullFR24_Vik.html';
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        }
}



