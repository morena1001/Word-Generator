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

var regOnset = ["m", "n", "p", "f", "t", 
                "d", "s", "sh", "r", "l",
                "y", "k", "g", "h", "ch",
                "mf", "mr", "mg", "pr", "pl",
                "fr", "fl", "fy", "tf", "tr",
                "dr", "ks", "kr", "kl", "gr", "gl", ""];
var regNucleus = ["i", "e", "a", "u", "o"];
 var regCoda = ["m", "n", "p", "f", "t", "d", "s", "sh", "r", "l",
                "y", "k", "g", "h", "ch", "mp", "mf", "mt", "md", "np", 
                "nf", "nt", "nd", "ns", "nsh", "nl", "nk", "nh", "pf", "pt", 
                "ps", "fm", "fp", "ft", "fs", "fl", "tf", "ts", "dm", "ds", 
                "sp", "st", "shp", "sht", "sk", "rp", "rf", "rt", "rd", "rs", 
                "rk", "rg", "rh", "lm", "lp", "lf", "lt", "ld", "ls", "kt",
                "ks", "gs", "ht", "rm", "rn", ""];



window.onload = function() {
    if (document.forms["form"]["presets"].value == "No preset") {
        document.forms["form"]["ssp"].disabled = true;
    }
}

document.forms["form"]["presets"].addEventListener('input', function(e) {
    if (e.target.value == "Kregen preset") {
        document.forms["form"]["ssp"].disabled = false;
        document.forms["form"]["onset"].disabled = true;
        document.forms["form"]["nucleus"].disabled = true;
        document.forms["form"]["coda"].disabled = true;
        document.forms["form"]["onset"].value = "";
        document.forms["form"]["nucleus"].value = "";
        document.forms["form"]["coda"].value = "";
    }
    else {
        document.forms["form"]["ssp"].checked = false;
        document.forms["form"]["ssp"].disabled = true;
        document.forms["form"]["onset"].disabled = false;
        document.forms["form"]["nucleus"].disabled = false;
        document.forms["form"]["coda"].disabled = false;
    }
});

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
        else {
            let words = [];
            for (let i = 0; i < parseInt(count); i++) {
                let word = "";
                let syllables = getRandomInt(min, max);
                for (let j = 0; j < syllables; j++) {
                    word += regOnset[getRandomInt(0, regOnset.length - 1)] + 
                            regNucleus[getRandomInt(0, regNucleus.length - 1)] + 
                            regCoda[getRandomInt(0, regCoda.length - 1)];
                }

                if (rd && words.includes(word)) {
                    while (words.includes(word)) {
                        word = "";
                        syllables = getRandomInt(min, max);
                        for (let j = 0; j < syllables; j++) {
                            word += regOnset[getRandomInt(0, regOnset.length - 1)] + 
                                    regNucleus[getRandomInt(0, regNucleus.length - 1)] + 
                                    regCoda[getRandomInt(0, regCoda.length - 1)];
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
        if (message.length > 0) { alert(message); return; }

        var custOnset = [];
        var custNucleus = [];
        var custCoda = [];

        if (onset.includes(', ')) { custOnset = onset.split(', '); }
        else if (onset.includes(',')) { custOnset = onset.split(','); }
        else { custOnset = onset.split(' '); }
        for (let i = 0; i < custOnset.length; i++) {
            custOnset[i] = custOnset[i].trim();
            if (custOnset[i] == '' || custOnset[i] == '\n') {
                custOnset.splice(i, 1);
                i--;
            }
        }

        if (nucleus.includes(', ')) { custNucleus = nucleus.split(', '); }
        else if (nucleus.includes(',')) { custNucleus = nucleus.split(','); }
        else { custNucleus = nucleus.split(' '); }
        for (let i = 0; i < custNucleus.length; i++) {
            custNucleus[i] = custNucleus[i].trim();
            if (custNucleus[i] == '' || custNucleus[i] == '\n') {
                custNucleus.splice(i, 1);
                i--;
            }
        }

        if (coda.includes(', ')) { custCoda = coda.split(', '); }
        else if (coda.includes(',')) { custCoda = coda.split(','); }
        else { custCoda = coda.split(' '); }
        for (let i = 0; i < custCoda.length; i++) {
            custCoda[i] = custCoda[i].trim();
            if (custCoda[i] == '' || custCoda[i] == '\n') {
                custCoda.splice(i, 1);
                i--;
            }
        }

        let words = [];
        for (let i = 0; i < parseInt(count); i++) {
            let word = "";
            let syllables = getRandomInt(min, max);
            for (let j = 0; j < syllables; j++) {
                word += custOnset[getRandomInt(0, custOnset.length - 1)] + 
                        custNucleus[getRandomInt(0, custNucleus.length - 1)] + 
                        custCoda[getRandomInt(0, custCoda.length - 1)];
            }

            if (rd && words.includes(word)) {
                while (words.includes(word)) {
                    word = "";
                    syllables = getRandomInt(min, max);
                    for (let j = 0; j < syllables; j++) {
                        word += custOnset[getRandomInt(0, custOnset.length - 1)] + 
                                custNucleus[getRandomInt(0, custNucleus.length - 1)] + 
                                custCoda[getRandomInt(0, custCoda.length - 1)];
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
});

function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
} 
