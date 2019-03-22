import '../scss/styles.scss';
import $ from 'jquery';
import {DrCall} from './Drcall.js';

$(document).ready(function(){
  const drSearch = new DrCall();
  const drList= drSearch.getDrs();
  drList.then(function(response){
    const parsedData= JSON.parse(response);
    console.log(parsedData.data);
    parsedData.data.forEach(function(dr){
      $('.dr-list').append(`<p>${dr.profile.first_name+" "+dr.profile.last_name}</p>`)
    })
  })
});
