import '../scss/styles.scss';
import $ from 'jquery';
import {DrCall} from './Drcall.js';

$(document).ready(function(){
  const drSearch = new DrCall();
  $('#searchForm').submit(function(event){
    event.preventDefault();
    const inputedName= $('#nameInput').val();
    const condition= $('#conditionInput').val();
    const drList= drSearch.getDrs(inputedName,condition);
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
