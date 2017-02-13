// Donnie's Tacos //

const WordPOS = require('wordpos');
const Tacos   = require('./tacos/tacos.js');

const wordpos = new WordPOS();

const quotes = [
    "Sometimes your best investments are the ones you don't make."
];

const donnies = {
    doTacos: function(text) {
        wordpos.getPOS(text, function(result) {
            if (typeof result.rest === "undefined") {
                console.log(this.noResult());
            }

            var newText = text;

            for (let i = 0; i < result.rest.length;i++) {
                let word = result.rest[i];
                let reg  = new RegExp(result.rest[i]);
                let taco = Tacos[Math.floor(Math.random() * quotes.length)];

                if (result.rest[i] === "" ) {
                    continue;
                }

                // Hack, do this with regex/replace for plural,
                // possessive, end of sentence
                if (word.endsWith('s')) {
                    taco = taco + 's';
                } else if (word.endsWith('s.')) {
                    taco = taco + 's.';
                }

                newText = newText.replace(reg, taco);
            }

            console.log(newText);
        }.bind(this));
    },
    noResult: function() {
        return "Unable to serve Donnie's Tacos";
    }
}


const randomText = quotes[Math.floor(Math.random() * quotes.length)];

donnies.doTacos(randomText);
