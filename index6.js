const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        // console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category}</a>
        `;
        tabContainer.appendChild(div)
    })
    // console.log(data.data);

};


const handleLoadNews = async (categoryId) => {
    console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    let category = data?.data
    let notFound = document.getElementById('notFound')
    if (!category?.length) {
        notFound.classList.remove('hidden')
    }
    else {
        notFound.classList.add('hidden')
    }

    const cardContainer = document.getElementById("card-container")

    cardContainer.innerHTML = "",
        // console.log(data.data)
        category.forEach((news) => {
            console.log(news)
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card bg-base-200 h-full shadow-xl">
        <figure><img class="h-60 w-80 rounded-xl" src="${news.thumbnail}" alt="Shoes" /></figure>                                   
        
                                
      <div class="flex gap-2">
         <figure><img class="h-8 w-8 rounded-full" src="${news.authors[0].profile_picture
                }" alt="Shoes" />
         </figure>                  
         <h1 class="text-xl font-semibold">${news.title}</h1>
      </div>
      <div class="mx-12 ">
        <div class="flex gap-4">
        <h2>${news?.authors[0].profile_name
                }</h2>
         <i class="fa-solid fa-badge-check"></i>
        <h2>${news.authors[0].verified
                }</h2>
        </div>        
        <p> ${news.others.views} views</>
      </div>
    
    </div>
        `;
            cardContainer.appendChild(div);
        })


}
handleCategory();
handleLoadNews("1000");
