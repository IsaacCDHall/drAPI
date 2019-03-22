import '../scss/styles.scss';
import $ from 'jquery';
import {DrCall} from './Drcall.js';

$(document).ready(function(){
  const drSearch = new DrCall();
  const drList= drSearch.getDrs();
  console.log(drList);
});
