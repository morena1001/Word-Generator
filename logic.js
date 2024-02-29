var sspOnset = ["m", "n", "p", "f", "t", 
                "d", "s", "sh", "r", "l",
                "y", "k", "g", "h", "ch",  
                "mr", "nr", "pr", "pl", "fr", 
                "fl", "fy", "tr", "dr", "sm", 
                "sr", "shm", "shr", "kr", "kl", "gr", "gl", ""];
var sspNucleus = ["i", "e", "a", "u", "o"];
var sspCoda = ["m", "n", "p", "f", "t", "d", "s", "sh", "r", "l",
               "y", "k", "g", "h", "ch", "ms", "mf", "mp", "mt", "md", 
               "ns", "nf", "np", "nk", "nt", "nd", "nch", "pf", "pt", "ps", 
               "ft", "fs", "ts", "ds", "sf", "sk", "sp", "st", "sd", "shk", 
               "sht", "rsh", "rs", "rm", "rg", "rp", "rch", "rt", "rd", "rf", 
               "rk", "rn", "ls", "lf", "lch", "lp", "lsh", "lt", "ld", "lm", 
               "lk", "kt", "ks", "ksh", "gs", "ht", ""];

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let presets = document.forms["form"]["presets"].value;
    let onset = document.forms["form"]["onset"].value;
    let nucleus = document.forms["form"]["nucleus"].value;
    let coda = document.forms["form"]["coda"].value;
    let ssp = document.forms["form"]["ssp"].checked;
    let list = document.forms["form"]["list"].checked;
    let rd = document.forms["form"]["rd"].checked;
    let count = document.forms["form"]["count"].value;
    let minCount = document.forms["form"]["min-count"].value;
    let maxCount = document.forms["form"]["max-count"].value;

    let min = parseInt(minCount);
    let max = parseInt(maxCount);

    if (min > max) {
        alert("Minimum syllable count should be greater than maximum syllable count");
        return;
    }


    if (presets == "Kregen preset") {
        if (ssp) {
            let words = [];
            for (let i = 0; i < parseInt(count); i++) {
                let word = "";
                let syllables = getRandomInt(min, max);
                for (let j = 0; j < syllables; j++) {
                    word += sspOnset[getRandomInt(0, sspOnset.length - 1)] + 
                            sspNucleus[getRandomInt(0, sspNucleus.length - 1)] + 
                            sspCoda[getRandomInt(0, sspCoda.length - 1)];
                }

                if (rd && words.includes(word)) {
                    while (words.includes(word)) {
                        word = "";
                        syllables = getRandomInt(min, max);
                        for (let j = 0; j < syllables; j++) {
                            word += sspOnset[getRandomInt(0, sspOnset.length - 1)] + 
                                sspNucleus[getRandomInt(0, sspNucleus.length - 1)] + 
                                sspCoda[getRandomInt(0, sspCoda.length - 1)];
                        }
                    }
                }

                words.push(word);
            }
            
            document.getElementById("output").innerHTML = "";
            if (list) {
                for (let i in words) {
                    document.getElementById("output").innerHTML += words[i] + "</br>";
                }
            }
            else {
                for (let i in words) {
                    document.getElementById("output").innerHTML += words[i] + " ";
                }
            }
        }
    }

    else {
        let message = "";
        if (onset.length == 0) { message += "Onset cannot be empty\n"; }
        if (nucleus.length == 0) { message += "Nucleus cannot be empty\n"; }
        if (coda.length == 0) { message += "Coda cannot be empty\n"; }
        if (message.length > 0) { alert(message); }
    }

    // if (onset.length == 0) {
    //     onset = "onset";
    // }
    // if (nucleus.length == 0) {
    //     nucleus = "nucleus";
    // }
    // if (coda.length == 0) {
    //     coda = "coda";
    // }

    // document.getElementById("output").innerHTML = presets + " " + onset
    //     + " " + nucleus + " " + coda + " " + ssp + " " + list 
    //     + " " + count + " " + minCount + " " + maxCount;
});

function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
} 
