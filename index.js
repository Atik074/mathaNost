const socialPlatForm = (dataLimit) =>{
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url)
  .then(res => res.json())
  .then(data => displaySocialItems(data.data.tools ,dataLimit))
}
//display data showing

const displaySocialItems = (socialItems,dataLimit) =>{
  console.log(socialItems)
const seeMore = document.getElementById('see-more')
  if( dataLimit && socialItems.length > 6){
    socialItems = socialItems.slice(0,6) 
   seeMore.classList.remove('d-none')

  }
  else{
      seeMore.classList.add('d-none')
  }
 

const socialContainer = document.getElementById('social-container')
       socialContainer.innerText = ''
  socialItems.forEach(socialItem => {
      console.log(socialItem)
      const div = document.createElement('div')
      div.classList.add('col')
      div.innerHTML = ` 
      <div class="card h-100">
      <img src="${socialItem.image}" class="card-img-top" alt="...">
      <div class="card-body mt-2">
        <h3 class="card-title ">Features</h3>
        <ol class="fs-4 text-muted mb-3">
        <li>${socialItem.features[0] ? socialItem.features[0] : 'no features found' }</li>
        <li>${socialItem.features[1] ? socialItem.features[1] : 'no features found' }</li>
        <li>${socialItem.features[2] ? socialItem.features[2] : 'no features found'}</li>
        </ol>
      </div>
      <div class="card-footer">
      <div class="d-flex justify-content-between align-items-center">
      <div>
       <h4>${socialItem.name}</h4>
      <p class="fs-6"> <i class="fa-solid fa-calendar-days me-1"></i> ${socialItem.published_in}</p> </div>
      <div>
      <button id="btn-modal" onclick="loadData('${socialItem.id}')"  class="border border-0 rounded bg-light" data-bs-toggle="modal" data-bs-target="#socilMediaModal">
      <i class="fa-solid fa-arrow-right text-danger fs-4"></i>
      </button>
      
      </div>
    </div>  
        `
socialContainer.appendChild(div)
       });
loadBySpinner(false)
}

// datalimiation function
const showAll = (dataLimit)=>{
loadBySpinner(true)
socialPlatForm(dataLimit)

}
// click see more button and get  all cards
document.getElementById('btn-see-more').addEventListener('click',function(){
 showAll()

})

// dynamic function by id
const loadData = async id=>{
const url =` https://openapi.programming-hero.com/api/ai/tool/${id}`
 const res = await fetch(url);
    const data = await res.json();
    displayLoadData(data.data);
   console.log(url)
}

const displayLoadData = (socialMedia) => {
   console.log(socialMedia)

  document.getElementById('modalTitle').innerText =socialMedia.description
   document.getElementById('modal-body').innerHTML = `
   
<div class="d-flex gap-3 mt-3 responsive-display">
   
    <div class="border border-danger p-2 shadow p-3 mb-5 bg-body-tertiary rounded ">
   <div class="w-100 d-flex gap-3 bg-white text-success fs-4 fw-semibold responsive-display">
   <div class="border text-success d-flex align-items-center ">
      <p class="px-2">${socialMedia.pricing[0].price ? socialMedia.pricing[0].price : "Data not found"} 
       ${socialMedia.pricing[0].plan ? socialMedia.pricing[0].plan : "Data not found"} </p>
     </div>
     <div class="border text-warning d-flex align-items-center">
     <p class="px-2">${socialMedia.pricing[1].price ? socialMedia.pricing[1].price : "Data not found"} 
     ${socialMedia.pricing[1].plan ? socialMedia.pricing[1].plan : "Data not found"} </p>
   </div>
   <div class="border text-danger  ">
   <p class="px-2">${socialMedia.pricing[2].price ? socialMedia.pricing[2].price : "Data not found"} 
   ${socialMedia.pricing[2].plan ? socialMedia.pricing[2].plan : "Data not found"} </p>
 </div>
 </div>
 <div class="mt-3 p-2 d-flex justify-content-between align-items-center responsive-display">
 <div>
   <h3>Features </h3>
   <ul>
   <li>${socialMedia.features[1].feature_name ? socialMedia.features[1].feature_name : 'Feature not found'}</li>
   <li>${socialMedia.features[2].feature_name ? socialMedia.features[2].feature_name : 'Feature not found'}</li>
     <li>${socialMedia.features[3].feature_name ? socialMedia.features[3].feature_name : 'Feature not found'}</li>
   </ul>
   </div>
   <div>
   <h3>Integrations </h3>
   <ul>
   <li>${socialMedia.integrations[0] ? socialMedia.integrations[0] : 'no data found'}</li>
   <li>${socialMedia.integrations[1] ? socialMedia.integrations[1] : 'no data found'}</li>
   <li>${socialMedia.integrations[2] ? socialMedia.integrations[2] : 'no data found'}</li>
   <li>${socialMedia.integrations[3] ? socialMedia.integrations[3] : 'no data found'}</li>
   <li>${socialMedia.integrations[4] ? socialMedia.integrations[4] : 'no data found'}</li>
   </ul>
   </div>
   </div>
   
  
   </div>
   <div class="card" id="card" style="width:100%">
<img class="card-img-top"  src="${socialMedia.image_link?.[0] ? socialMedia.image_link?.[0] : 'no img found' }" alt="Card image cap" >
<div class="card-body fs-5">
  <h4 class="card-title">${socialMedia.input_output_examples ?socialMedia.input_output_examples[0]?.input  : 'data not found' }</h4>
  <p class="card-text">${socialMedia.input_output_examples ? socialMedia.input_output_examples[0]?.output : 'No! Not Yet! Take a break!!!'}  </p>

  <button id='bttn' class="btn btn-danger text-white accuracy-btn">${socialMedia.accuracy.score == null ? '0.0 ' : socialMedia.accuracy.score  }% accuracy </button>

  
  
</div>
</div>
</div>
    `
   
}

// loadMaster or Spiner
const loadBySpinner = isLoading =>{
  const loader = document.getElementById('loadMaster')
  if(isLoading){
    loader.classList.remove('d-none')

  }
  else{
    loader.classList.add('d-none')
  }
}


socialPlatForm(6)