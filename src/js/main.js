async function getBeersFromAPI(pageNo) {
   try {
      let beers = await fetch(
         `https://api.punkapi.com/v2/beers?page${pageNo}&per_page=10`
      );
      beers = await beers.json();
      displayOnThePage(beers);
   } catch (error) {
      console.log(error);
   }
}

function beerLiked(id) {
   let selectedBeerHeart = document.querySelector(`.beerId${id}`);
   selectedBeerHeart.src = '/src/images/heart-thin-white-32.png';
}

function displayOnThePage(beers) {
   const beerFlexContainer = document.querySelector('.beers-flex-container');
   let beersContent = beers
      .map((beer) => {
         let { name, brewers_tips, image_url, id } = beer;

         return `
         <div class="beer-card-flex-item">
            <h3>${name}</h3>
            <p>${brewers_tips}</p>
            <div class="img-container">
               <img class="beer-image" src=${image_url} alt="" />
               <button onclick="beerLiked(${id})"
               ><img class="like-heart beerId${id}" src="/src/images/heart-thin-32.png" alt="" /></button>
            </div>
            <hr>
         </div>`;
      })
      .join('');
   beerFlexContainer.innerHTML += beersContent;
}

getBeersFromAPI(1);
