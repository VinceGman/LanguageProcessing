const fs = require('fs');

const model = {};
const languages = ['english', 'chinese', 'hindi', 'spanish', 'arabic'];

function process(filename) {
    // Tries Reading Langauge File Given With Feedback
    try {
        let data = fs.readFileSync(`./language_files/${filename}`, { encoding: 'utf8', flag: 'r' });
        console.log(`Success: ${filename}`);
        return data;
    }
    catch {
        console.log(`Failed: ${filename}`);
        return;
    }
}

function createLanguageModel(languages) {
    
    // Assigns Languages To Model
    for (let i = 0; i < languages.length; i++) {
        model[languages[i]] = {};
    }

    // Trains Model
    fs.readdirSync('./language_files/').forEach(file => { train(file); });

    // Show Model
    console.log(model);
}

function train(file) {
    let language = file.split('_')[0];

    let data = fs.readFileSync(`./language_files/${file}`, { encoding: 'utf8', flag: 'r' });
    //console.log(`Trained On: ${file}`);

    let stream = data.toLowerCase().split('');

    if (model[language]) // Checks if language is in model
    {
        for (let i = 0; i < stream.length-1; i++) // Loops through data stream
        {
            // Shows working symbols
            //console.log(`Testing: ${stream[i]} -> ${stream[i+1]}`);

            // Checks if symbol is already present
            if (model[language][stream[i]])
            {
                if (!model[language][stream[i]].includes(stream[i+1]))
                {
                    // Adds follow symbol if symbol wasn't already present
                    model[language][stream[i]].push(stream[i+1]);
                }
            }
            else
            {
                // Adds new symbol
                model[language][stream[i]] = [stream[i+1]];
            }
        }
    }
}

createLanguageModel(languages);