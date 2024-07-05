const url = 'http://localhost:3000'
console.log("vote");
document.addEventListener('DOMContentLoaded',async function() {
  const res = await fetch(`${url}/candidates`,{
    method:'GET',
  })
  const response = await res.json();
  const allCandidates = response.status;
  console.log(allCandidates);
  for(let candidate of allCandidates) {
    $(document).ready(function() {
      var newElement = `
        <div class="d-flex mb-3 flex-item id=${candidate.id}">
          <div class="text-left">
            <h4>${candidate.party_name}</h4>
          </div>
          <div class="text-right">
            <strong class="me-4">${candidate.cand_name}</strong>
            <img src="${candidate.symbol}" alt="image">
          </div>
        </div>`;
        
      $('#div-container').append(newElement);
    });
    //console.log(candidate);
  }
})
