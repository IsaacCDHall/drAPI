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

const assembleDr=(dr)=>{

  $('.dr-list').append(`
    <div class="dr-card">
      <h2>${dr.profile.first_name+" "+dr.profile.last_name}</h2>
      <h4>${dr.specialties[0].name}</h4>
      <img src='${dr.profile.image_url}'>
      <div class="practice">
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
    });
  });
});
