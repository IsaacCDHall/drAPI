import '../scss/styles.scss';
import $ from 'jquery';
import {DrCall} from './Drcall.js';

const newPatients=(patients)=>{
  if(patients===true){
    return "Accepting new patients";
  } else {
    return "Not accepting new patients";
  }
}

const excludeUndef=(parameter)=>{
  if(parameter!==undefined){
    return parameter
  } else return "";
}
const excludeUndefWebsite=(website)=>{
  if(website!==undefined){
    return `<p><a href='${website}'>Website</a></p>`
  } else return "";
}

const handleSpecialties=(specialties)=>{
  if(specialties!==undefined){
    let specialString="";
    specialties.forEach((sp)=>{
      specialString+=`<h4>${sp.name}</h4>`;
    });
    return specialString;
  } else return "";
}

const assembleDr=(dr)=>{
  $('.dr-list').append(`
    <div class="dr-card">
      <h2>${dr.profile.first_name+" "+dr.profile.last_name}</h2>
      <img src='${dr.profile.image_url}'>
      <div class="practice">
        ${handleSpecialties(dr.specialties)}
        <p>${excludeUndef(dr.practices[0].visit_address.street)}</p>
        <p>${excludeUndef(dr.practices[0].visit_address.street2)}</p>
        <p>${excludeUndef(dr.practices[0].visit_address.city)+", "+excludeUndef(dr.practices[0].visit_address.state)+", "+ excludeUndef(dr.practices[0].visit_address.zip)}</p>
        <p>${newPatients(dr.practices[0].accepts_new_patients)}</p>
        <p>${excludeUndef(dr.practices[0].phones[0].number)}</p>
        <p>${excludeUndef(dr.practices[0].email)}</p>
        ${excludeUndefWebsite(dr.practices[0].website)}
      </div>
    </div>
    `);
}

$(document).ready(function(){
  const drSearch = new DrCall();
  const specialties=drSearch.allSpecialties();
  specialties.then(function(response){
    const parsedData= JSON.parse(response);
    console.log(parsedData);
    parsedData.data.forEach(function(specialization){
      $('#specialtyInput').append(`<option value="${specialization.uid}">${specialization.name}</option>`)
    });
  });
  $('#searchForm').submit(function(event){
    event.preventDefault();
    const inputedName= $('#nameInput').val();
    const condition= $('#conditionInput').val();
    const specialty= $('#specialtyInput').val();
    const drList= drSearch.getDrs(inputedName,condition,specialty);
    drList.then(function(response){
      const parsedData= JSON.parse(response);
      console.log(parsedData.data);
      $('.dr-list').text('');
      parsedData.data.forEach(function(dr){
        assembleDr(dr);
      });
      if(parsedData.data.length===0){
        $('.dr-list').text("No results match those chriteria");
      }
    });
  });
});
