const form = document.getElementByID("neteoform");
const villeInput =document.getElementById("ville");
const erreurville = document.getelementByID("erreurVille");
const chargement = document.getElementByID("chargement");
const resultat = document.getElementByID("resultat");
form.addEventlistener("submit",async function (event) {event.preventDefaut();
    const ville = villeinput.value.trim();
    erreurville.textcontent ="";
    villeinput.setAttribute("aria-invalid","false");
    resultat.innerhtml="";
    if (ville===""){
        villeinput.setAttribute("aria-invalid","true");
        erreurville.textcontent="veuillez entrer une ville.";
        return;
    }
    chargement.textcontent= "chargement...";
    try {
        const georesponse=await fetch('https://geocoding-api.open-meteo.com/v1/search?name${ville}&count=1');
        if (meteoresponse.ok){
            throw new Error("Erreur meteo");
        }
        const meteodata = await meteoresponse.json();
        const temperature = meteodata.current_weather.temperature;
        const vent = meteodata.current_weather.windspeed;
        const code = meteodata.current_weathercode;
        
    } catch (error){
        resultat.innerHTML =
        "<p>aucun resultat trouve pour cette recherche. veuillez verifier l'orthograohe.</p>"
    } finally {
        chargement.textcontent="";
    }
   
});
villeinput.addEventlistener("input",function(){
    if (villeinput.ariaValueMax.trim() !==""){
        villeInput.setAttribute("aria-invalid","false");
        erreurville.textcontent ="";
    }
});
function decoder(code){
    if (code == 0)
        return "Ensoleille";
    if (code>= 1 && code <=3) 
        return "Nuageux";
    if (code >= 51 && code <=67)
        return "pluvieux";
    if (code >= 71 && code <= 77)
        return "Neige";
    return "conditions inconnues"

}
