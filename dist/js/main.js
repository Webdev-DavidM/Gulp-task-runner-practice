async function getBeersFromAPI(r){try{let e=await fetch(`https://api.punkapi.com/v2/beers?page${r}&per_page=10`);e=await e.json(),displayOnThePage(e)}catch(e){console.log(e)}}function beerLiked(e){let r=document.querySelector(`.beerId${e}`);r.src="/src/images/heart-thin-white-32.png"}function displayOnThePage(e){const r=document.querySelector(".beers-flex-container");e=e.map(e=>{var{name:r,brewers_tips:t,image_url:i,id:e}=e;return`
         <div class="beer-card-flex-item">
            <h3>${r}</h3>
            <p>${t}</p>
            <div class="img-container">
               <img class="beer-image" src=${i} alt="" />
               <button onclick="beerLiked(${e})"
               ><img class="like-heart beerId${e}" src="/src/images/heart-thin-32.png" alt="" /></button>
            </div>
            <hr>
         </div>`}).join("");r.innerHTML+=e}getBeersFromAPI(1);