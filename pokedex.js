
const pokemonCount = 151;
var pokedex = {};
var pokemonNames = [];

window.onload = async function()
{
    let pokemonLoaded = Math.floor(Math.random() * pokemonCount) + 1;
    console.log(pokemonLoaded);

    for(let i = 1; i <= pokemonCount; i++)
    {
        await getPokemon(i);

        pokemonNames.push(pokedex[i]["name"]);
        
    }

    let pokemon = document.createElement("div");
    console.log("FOUND:")
    console.log(pokedex[pokemonLoaded]["img"]);
    document.getElementById("pokemon-img").src = pokedex[pokemonLoaded]["img"];
    document.getElementById("pokemon-img").style = "filter: brightness(0%)";
    

    const myInput = document.getElementById("myInput");

    myInput.addEventListener("input", () =>
    {
        const listE = document.querySelector("#autocomplete-list");
        if(listE) listE.remove();
        
        
        let value = myInput.value.toLowerCase();
        
        if(value.length === 0) return;
        const filterdNames = [];

        pokemonNames.forEach((pokemons) =>
        {
            if(pokemons.substr(0, value.length).toLowerCase() === value)
                filterdNames.push(pokemons);
        })

        const listEl = document.createElement("ul");
        listEl.className = "autocomplete-list";
        listEl.id = "autocomplete-list";

        filterdNames.forEach((poke) =>
        {
            const listItem = document.createElement("li");
            const pokeButton = document.createElement("button");
            pokeButton.innerHTML= poke;
            pokeButton.addEventListener("click", function(e)
            {
                e.preventDefault();

                const buttonEl = e.target;
                myInput.value = buttonEl.innerHTML;

                const listE = document.querySelector("#autocomplete-list");
                if(listE) listE.remove();
            })
            listItem.appendChild(pokeButton);

            listEl.appendChild(listItem);
        })

        document.querySelector("#searchF").appendChild(listEl);
    });


    let lives = 5;

    const myBtn = document.getElementById("myBtn");
    myBtn.addEventListener("click", function(e) 
    {
        let pokemonLoadedName = pokedex[pokemonLoaded]["name"];
        if(pokemonLoadedName === myInput.value)
        {
            console.log("Correct");
        }
        else
        {
            console.log("incorrect");
            lives -= 1;
        }
        console.log("Button clicked");

        if(lives === 4)
        {
            console.log(lives);
            let typesDiv = document.getElementById("pokemon-types")
            while(typesDiv.firstChild)
            {
                typesDiv.firstChild.remove();
            }

            let types = pokedex[pokemonLoaded]["types"];
            for(let i = 0; i < types.length; i++)
            {
                let type = document.createElement("span");
                type.innerText = types[i]["type"]["name"].toUpperCase();
                type.classList.add("type-box");
                type.classList.add(types[i]["type"]["name"]);
                typesDiv.append(type);
            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        }
        if(lives == 3)
        {
            console.log(lives);
            document.getElementById("pokemon-description").innerText = pokedex[pokemonLoaded]["desc"];
        }
        if(lives == 2)
        {
            console.log(lives);
            document.getElementById("pokemon-img").style = "filter: brightness(100%)";
        }
        if(lives == 1)
        {
            
        }
        if(lives == 0)
        {
            console.log(lives)
        }

    })




    
    
}

async function getPokemon(num)
{
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);
    
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    console.log(pokemonImg);

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    var entry = 9;
    pokemonDesc = pokemonDesc["flavor_text_entries"][entry]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types": pokemonType, "desc" : pokemonDesc};
}




