let datasrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2120.2070166181506!2d11.710693977270033!3d57.89960622463139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46457d2eba366c75%3A0x4c1d0c9a97cef208!2sTjuvkils%20hamn!5e0!3m2!1ssv!2sse!4v1739709598412!5m2!1ssv!2sse";

let map = document.getElementById ('mymap');
let frame = document.createElement ('iframe');
frame.src = datasrc;
frame.id = "iframe-map";
frame.width = "100%";
frame.height = "400px";
frame.style.border = "none";
frame.style.borderRadius = "10px";

let maplistner = function (e) {
    map.appendChild(frame);
    removeFadeOut(document.getElementById('placeholder-img'), 2000);
    map.removeEventListener ("mouseover", maplistner);
};

map.addEventListener ('mouseover', maplistner);