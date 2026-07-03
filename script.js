
const wordInput = document.getElementById("wordInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

    function searchWord() {

        const word = wordInput.value;

        if (word.trim() === '') {
            result.innerHTML = '<p>Please enter a word</p>';
            return;
        }

        result.innerHTML = '<p>Loading word...</p>';

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Word not found');
                }
                return response.json();
            })
            .then(data => {
                const definition = data[0].meanings[0].definitions[0].definition;
                const partOfSpeech = data[0].meanings[0].partOfSpeech;
                let example = data[0].meanings[0].definitions[0].example;

                if (!example) {
                    example = 'No example in this case!';
                }

                result.innerHTML = 
                `
                    
                    <div class="word">${word}</div>

                    <div class="definition">
                        <strong>${partOfSpeech}</strong> : ${definition}
                        <br><br>
                        <em>Example: ${example} </em>
                    </div>
                `;

            })
            .catch(error => {
                result.innerHTML = `
                    <p>${error.message}</p>
                    <p>Try another word!</p>
                `;
            });

    }

    searchBtn.onclick = searchWord;