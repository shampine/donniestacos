// Donnie's Tacos //

const WordPOS = require('wordpos');
const Tacos   = require('./dict/tacos.js');
const Quotes  = require('./dict/quotes.js');

const wordpos = new WordPOS({});

const donnies = {
    doTacos: function(text) {
        wordpos.getPOS(text, function(result) {
            if (typeof result.rest === "undefined") {
                console.log(this.noResult());
            }

            let newText = text;

            for (let i = 0; i < result.rest.length;i++) {
                let word = result.rest[i];
                let reg  = new RegExp(result.rest[i]);
                let taco = this.getRandom(Tacos);

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
    getRandom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    noResult: function() {
        return "Unable to serve Donnie's Tacos";
    }
};

const randomText = donnies.getRandom(Quotes);

donnies.doTacos(randomText);
