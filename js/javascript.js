/*Se obtienen los elementos de html*/
const pokeNameInput = document.getElementById("pokeName");
const pokePhoto = document.getElementById("pokeImg");
const pokenamebus = document.getElementById("pokenamebus");
const pokeid = document.getElementById("pokeid");
const tipopokemon = document.getElementById("tipopokemon");
const hp = document.getElementById("stats");
const oculta = document.getElementById("habipokes");
const oculta2 = document.getElementById("contenedorevo");
const ancho = document.getElementById("contenedor");
/*se ocultan los contenedores de habilidades y el contenedor de evolucion*/
window.onload = ocultar();
function ocultar() {
  ancho.style.maxWidth = "200px";
  oculta.style.display = "none";
  oculta2.style.display = "none";
  tipopokemon.style.display = "none";
}
function mostrar(){
    oculta.style.display = "block";
    ancho.style.maxWidth = "700px";
    oculta2.style.display = "block";
    tipopokemon.style.display = "block";
}
/*se definen los colores por tipo de pokemon*/
const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};
/*Funcion principal para buscar los pokemones*/
const fetchPokemon = () => {
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  if (validar(pokeName)) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url)
      .then((res) => {
        if (res.status != "200") {
          pokeImage(
            "img/pokeball.png",
            "Pokemon not found",
            "Pokemon no encontrado"
          );
          ocultar()
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          let pokeImg = data.sprites.front_default;
          pokeImage(pokeImg, data.name, data.id);
          pokeTypes(data.types);
          pokeEstadisticas(data.stats);
          evoluciones(data.species.url);
          if (data.game_indices.length > 0) {
            datosextra(
              data.height,
              data.weight,
              "Pokemon " + data.game_indices[0].version.name,
              data.abilities,
              data.moves
            );
          } else {
            datosextra(data.height, data.weight, "Sin primera aparicion");
          }
        }
      });
      mostrar();
    } else {
    alert("No se aceptan caracteres especiales o campos vacios");
  }
};
/*Busca la imagen y la inserta*/
const pokeImage = (url, name, id) => {
  pokePhoto.src = url;
  pokeid.innerHTML = "No. " + id;
  pokenamebus.innerHTML = name;
};
/*Crea los div y los inserta de los tipos y clases de pokemones*/
const pokeTypes = (types) => {
  tipopokemon.innerHTML = "";
  types.forEach((element) => {
    const tipoelemento = document.createElement("div");
    tipoelemento.style.cssText =
      "color:" + typeColors[element.type.name] + "; font-weight: bold;";
    tipoelemento.textContent = element.type.name;
    tipopokemon.appendChild(tipoelemento);
  });
  pokeImg.style.background = `radial-gradient(#FFFFFF 33%, ${
    typeColors[types[0].type.name]
  } 33%)`;
  pokeImg.style.backgroundSize = "10px 10px";
};
/*Inserta las estadisticas*/
const pokeEstadisticas = (stats) => {
  let a = 0,
      b = 0;
  stats.forEach((element) => {
    const hp = document.getElementById("stats" + a);
    const text = document.getElementById("text" + a);
    b = (element.base_stat * 100) / 255;
    hp.style.width = b + "%";
    text.textContent = element.stat.name + ":  " + element.base_stat;
    a++;
  });
};
/**Funcion para autocompletar el input*/
$(function () {
    var availableTags = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew","chikorita","bayleef","meganium","cyndaquil","quilava","typhlosion","totodile","croconaw","feraligatr","sentret","furret","hoothoot","noctowl","ledyba","ledian","spinarak","ariados","crobat","chinchou","lanturn","pichu","cleffa","igglybuff","togepi","togetic","natu","xatu","mareep","flaaffy","ampharos","bellossom","marill","azumarill","sudowoodo","politoed","hoppip","skiploom","jumpluff","aipom","sunkern","sunflora","yanma","wooper","quagsire","espeon","umbreon","murkrow","slowking","misdreavus","unown","wobbuffet","girafarig","pineco","forretress","dunsparce","gligar","steelix","snubbull","granbull","qwilfish","scizor","shuckle","heracross","sneasel","teddiursa","ursaring","slugma","magcargo","swinub","piloswine","corsola","remoraid","octillery","delibird","mantine","skarmory","houndour","houndoom","kingdra","phanpy","donphan","porygon2","stantler","smeargle","tyrogue","hitmontop","smoochum","elekid","magby","miltank","blissey","raikou","entei","suicune","larvitar","pupitar","tyranitar","lugia","ho-oh","celebi","treecko","grovyle","sceptile","torchic","combusken","blaziken","mudkip","marshtomp","swampert","poochyena","mightyena","zigzagoon","linoone","wurmple","silcoon","beautifly","cascoon","dustox","lotad","lombre","ludicolo","seedot","nuzleaf","shiftry","taillow","swellow","wingull","pelipper","ralts","kirlia","gardevoir","surskit","masquerain","shroomish","breloom","slakoth","vigoroth","slaking","nincada","ninjask","shedinja","whismur","loudred","exploud","makuhita","hariyama","azurill","nosepass","skitty","delcatty","sableye","mawile","aron","lairon","aggron","meditite","medicham","electrike","manectric","plusle","minun","volbeat","illumise","roselia","gulpin","swalot","carvanha","sharpedo","wailmer","wailord","numel","camerupt","torkoal","spoink","grumpig","spinda","trapinch","vibrava","flygon","cacnea","cacturne","swablu","altaria","zangoose","seviper","lunatone","solrock","barboach","whiscash","corphish","crawdaunt","baltoy","claydol","lileep","cradily","anorith","armaldo","feebas","milotic","castform","kecleon","shuppet","banette","duskull","dusclops","tropius","chimecho","absol","wynaut","snorunt","glalie","spheal","sealeo","walrein","clamperl","huntail","gorebyss","relicanth","luvdisc","bagon","shelgon","salamence","beldum","metang","metagross","regirock","regice","registeel","latias","latios","kyogre","groudon","rayquaza","jirachi","deoxys-normal","turtwig","grotle","torterra","chimchar","monferno","infernape","piplup","prinplup","empoleon","starly","staravia","staraptor","bidoof","bibarel","kricketot","kricketune","shinx","luxio","luxray","budew","roserade","cranidos","rampardos","shieldon","bastiodon","burmy","wormadam-plant","mothim","combee","vespiquen","pachirisu","buizel","floatzel","cherubi","cherrim","shellos","gastrodon","ambipom","drifloon","drifblim","buneary","lopunny","mismagius","honchkrow","glameow","purugly","chingling","stunky","skuntank","bronzor","bronzong","bonsly","mime-jr","happiny","chatot","spiritomb","gible","gabite","garchomp","munchlax","riolu","lucario","hippopotas","hippowdon","skorupi","drapion","croagunk","toxicroak","carnivine","finneon","lumineon","mantyke","snover","abomasnow","weavile","magnezone","lickilicky","rhyperior","tangrowth","electivire","magmortar","togekiss","yanmega","leafeon","glaceon","gliscor","mamoswine","porygon-z","gallade","probopass","dusknoir","froslass","rotom","uxie","mesprit","azelf","dialga","palkia","heatran","regigigas","giratina-altered","cresselia","phione","manaphy","darkrai","shaymin-land","arceus","victini","snivy","servine","serperior","tepig","pignite","emboar","oshawott","dewott","samurott","patrat","watchog","lillipup","herdier","stoutland","purrloin","liepard","pansage","simisage","pansear","simisear","panpour","simipour","munna","musharna","pidove","tranquill","unfezant","blitzle","zebstrika","roggenrola","boldore","gigalith","woobat","swoobat","drilbur","excadrill","audino","timburr","gurdurr","conkeldurr","tympole","palpitoad","seismitoad","throh","sawk","sewaddle","swadloon","leavanny","venipede","whirlipede","scolipede","cottonee","whimsicott","petilil","lilligant","basculin-red-striped","sandile","krokorok","krookodile","darumaka","darmanitan-standard","maractus","dwebble","crustle","scraggy","scrafty","sigilyph","yamask","cofagrigus","tirtouga","carracosta","archen","archeops","trubbish","garbodor","zorua","zoroark","minccino","cinccino","gothita","gothorita","gothitelle","solosis","duosion","reuniclus","ducklett","swanna","vanillite","vanillish","vanilluxe","deerling","sawsbuck","emolga","karrablast","escavalier","foongus","amoonguss","frillish","jellicent","alomomola","joltik","galvantula","ferroseed","ferrothorn","klink","klang","klinklang","tynamo","eelektrik","eelektross","elgyem","beheeyem","litwick","lampent","chandelure","axew","fraxure","haxorus","cubchoo","beartic","cryogonal","shelmet","accelgor","stunfisk","mienfoo","mienshao","druddigon","golett","golurk","pawniard","bisharp","bouffalant","rufflet","braviary","vullaby","mandibuzz","heatmor","durant","deino","zweilous","hydreigon","larvesta","volcarona","cobalion","terrakion","virizion","tornadus-incarnate","thundurus-incarnate","reshiram","zekrom","landorus-incarnate","kyurem","keldeo-ordinary","meloetta-aria","genesect","chespin","quilladin","chesnaught","fennekin","braixen","delphox","froakie","frogadier","greninja","bunnelby","diggersby","fletchling","fletchinder","talonflame","scatterbug","spewpa","vivillon","litleo","pyroar","flabebe","floette","florges","skiddo","gogoat","pancham","pangoro","furfrou","espurr","meowstic-male","honedge","doublade","aegislash-shield","spritzee","aromatisse","swirlix","slurpuff","inkay","malamar","binacle","barbaracle","skrelp","dragalge","clauncher","clawitzer","helioptile","heliolisk","tyrunt","tyrantrum","amaura","aurorus","sylveon","hawlucha","dedenne","carbink","goomy","sliggoo","goodra","klefki","phantump","trevenant","pumpkaboo-average","gourgeist-average","bergmite","avalugg","noibat","noivern","xerneas","yveltal","zygarde-50","diancie","hoopa","volcanion","rowlet","dartrix","decidueye","litten","torracat","incineroar","popplio","brionne","primarina","pikipek","trumbeak","toucannon","yungoos","gumshoos","grubbin","charjabug","vikavolt","crabrawler","crabominable","oricorio-baile","cutiefly","ribombee","rockruff","lycanroc-midday","wishiwashi-solo","mareanie","toxapex","mudbray","mudsdale","dewpider","araquanid","fomantis","lurantis","morelull","shiinotic","salandit","salazzle","stufful","bewear","bounsweet","steenee","tsareena","comfey","oranguru","passimian","wimpod","golisopod","sandygast","palossand","pyukumuku","type-null","silvally","minior-red-meteor","komala","turtonator","togedemaru","mimikyu-disguised","bruxish","drampa","dhelmise","jangmo-o","hakamo-o","kommo-o","tapu-koko","tapu-lele","tapu-bulu","tapu-fini","cosmog","cosmoem","solgaleo","lunala","nihilego","buzzwole","pheromosa","xurkitree","celesteela","kartana","guzzlord","necrozma","magearna","marshadow","poipole","naganadel","stakataka","blacephalon","zeraora","meltan","melmetal","grookey","thwackey","rillaboom","scorbunny","raboot","cinderace","sobble","drizzile","inteleon","skwovet","greedent","rookidee","corvisquire","corviknight","blipbug","dottler","orbeetle","nickit","thievul","gossifleur","eldegoss","wooloo","dubwool","chewtle","drednaw","yamper","boltund","rolycoly","carkol","coalossal","applin","flapple","appletun","silicobra","sandaconda","cramorant","arrokuda","barraskewda","toxel","toxtricity-amped","sizzlipede","centiskorch","clobbopus","grapploct","sinistea","polteageist","hatenna","hattrem","hatterene","impidimp","morgrem","grimmsnarl","obstagoon","perrserker","cursola","sirfetchd","mr-rime","runerigus","milcery","alcremie","falinks","pincurchin","snom","frosmoth","stonjourner","eiscue-ice","indeedee-male","morpeko-full-belly","cufant","copperajah","dracozolt","arctozolt","dracovish","arctovish","duraludon","dreepy","drakloak","dragapult","zacian","zamazenta","eternatus","kubfu","urshifu-single-strike","zarude","regieleki","regidrago","glastrier","spectrier","calyrex"];
  $("#pokeName").autocomplete({
    source: availableTags,
    minLength: 2,
    select: function (event, ui) {
      $("#pokeName").val(ui.item.value);
      fetchPokemon();
    },
  });
});
/*Funcion para buscar las evoluciones */
const evoluciones = (evo) => {
  const col4 = document.getElementById("col4");
  fetch(evo)
    .then((res) => {
      if (res.status != "200") {
        pokeImage(
          "img/pokeball.png",
          "Pokemon not found",
          "Pokemon no encontrado"
        );
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        col4.textContent = data.generation.name;
        vercadena(data.evolution_chain.url);
      }
    });
};
/**Ve las cadenas de evolucion en la api */
const vercadena = (cadena) => {
  let primer;
  var segunda = [];
  var tercera = [];
  fetch(cadena)
    .then((res) => {
      if (res.status != "200") {
        pokeImage(
          "img/pokeball.png",
          "Pokemon not found",
          "Pokemon no encontrado"
        );
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
          /**Guarda todas las evoluciones del pokemon */
        primer = data.chain.species.name;
        for (i = 0; i < data.chain.evolves_to.length; i++) {
          segunda.push(data.chain.evolves_to[i].species.name);
          for (e = 0; e < data.chain.evolves_to[i].evolves_to.length; e++) {
            tercera.push(data.chain.evolves_to[i].evolves_to[e].species.name);
          }
        }
        buscarimg(primer, segunda, tercera);
      }
    });
};
/*Busca las imagenes de las evoluciones de pokemones*/
const buscarimg = (p, s, t) => {
  const pri = document.getElementById("primera");
  const seg = document.getElementById("segunda");
  const ter = document.getElementById("tercera");
  pri.innerHTML = "";
  seg.innerHTML = "";
  ter.innerHTML = "";

  if (p == "zygarde") {
    p = "zygarde-50";
  }
  const url = `https://pokeapi.co/api/v2/pokemon/${p}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        pokeImage(
          "img/pokeball.png",
          "Pokemon not found",
          "Pokemon no encontrado"
        );
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
          /**Primera Evolucion */
        const divimf = document.createElement("div");
        const img1 = document.createElement("img");
        const text = document.createElement("p");
        img1.src = data.sprites.front_default;
        text.textContent = data.name;
        pri.appendChild(divimf);
        divimf.appendChild(img1);
        divimf.appendChild(text);
      }
    });
   
  for (i = 0; i < s.length; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${s[i]}`;
    fetch(url)
      .then((res) => {
        if (res.status != "200") {
          pokeImage(
            "img/pokeball.png",
            "Pokemon not found",
            "Pokemon no encontrado"
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {

             /*Segunda evolucion*/
          const divimf = document.createElement("div");
          const img1 = document.createElement("img");
          const text = document.createElement("p");
          img1.src = data.sprites.front_default;
          text.textContent = data.name;
          seg.appendChild(divimf);
          divimf.appendChild(img1);
          divimf.appendChild(text);
        }
      });
  }
  for (e = 0; e < t.length; e++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${t[e]}`;
    fetch(url)
      .then((res) => {
        if (res.status != "200") {
          pokeImage(
            "img/pokeball.png",
            "Pokemon not found",
            "Pokemon no encontrado"
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
             /*Tercera evolucion*/
          const img1 = document.createElement("img");
          const text = document.createElement("p");
          let pokeImg = data.sprites.front_default;
          let parra = data.name;
          img1.src = pokeImg;
          text.textContent = parra;
          ter.appendChild(img1);
          ter.appendChild(text);
        }
      });
  }
};
 /*Insertar los datos extras de los pokemones*/
const datosextra = (altura, peso, version, abi, moves) => {
  const col1 = document.getElementById("col1");
  const col2 = document.getElementById("col2");
  const col3 = document.getElementById("col3");
  const col5 = document.getElementById("col5");
  const col6 = document.getElementById("mult");
  col5.innerHTML = "";
  altura = altura / 10;
  peso = peso / 10;
  col1.textContent = altura + " M";
  col2.textContent = peso + " Kg";
  col3.textContent = version;
  for (i = 0; i < abi.length; i++) {
    const p = document.createElement("p");
    p.textContent = abi[i].ability.name;
    col5.appendChild(p);
  }
  for (e = 0; e < moves.length; e++) {
    const p = document.createElement("option");
    p.textContent = moves[e].move.name;
    col6.appendChild(p);
  }
};
/**Validar si el nonmbre no viene vacio o con simbolos */
function validar(valor) {
  let isValid = false;
  const pattern = new RegExp("^[A-Za-z0-9]+", "i");
  if (!valor) {
    isValid = false;
  } else {
    if (!pattern.test(valor)) {
      isValid = false;
    } else {
      isValid = true;
    }
  }
  if (!isValid) {
    pokeNameInput.style.borderColor = "salmon";
  } else {
    pokeNameInput.style.borderColor = "palegreen";
  }
  return isValid;
}
