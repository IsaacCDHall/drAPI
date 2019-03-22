import '../scss/styles.scss';
import $ from 'jquery';
import {DrCall} from './Drcall.js';

$(document).ready(function(){
  const drSearch = new DrCall();
  const specialties=drSearch.allSpecialties();
  specialties.then(function(response){
    const parsedData= JSON.parse(response);
    console.log(parsedData);
    parsedData.data.forEach(function(specialization){
      $('#specialtyInput').append(`<option value="${specialization.uid}">${specialization.name}</option>`)
    })

  })
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
        $('.dr-list').append(`<p>${dr.profile.first_name+" "+dr.profile.last_name}</p>`)
      });
    });
  });
});
