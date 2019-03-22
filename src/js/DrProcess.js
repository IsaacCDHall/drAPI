import $ from 'jquery';

export class DrProcess{
  constructor(){
  }
  handlePatients(patients){
    if(patients===true){
      return "Accepting new patients";
    } else {
      return "Not accepting new patients";
    }
  }

  handleUnfef(parameter){
    if(parameter!==undefined){
      return parameter
    } else return "";
  }
  handleWebsite(website){
    if(website!==undefined){
      return `<p><a href='${website}'>Website</a></p>`
    } else return "";
  }

  handleSpecialties(specialties){
    if(specialties!==undefined){
      let specialString="";
      specialties.forEach((sp)=>{
        specialString+=`<h4>${sp.name}</h4>`;
      });
      return specialString;
    } else return "";
  }

  assembleDr(dr){
    $('.dr-list').append(
      `<div class="dr-card">
        <h2>${dr.profile.first_name+" "+dr.profile.last_name}</h2>
        <img src='${dr.profile.image_url}'>
        <div class="practice">
          ${this.handleSpecialties(dr.specialties)}
          <p>${this.handleUnfef(dr.practices[0].visit_address.street)}</p>
          <p>${this.handleUnfef(dr.practices[0].visit_address.street2)}</p>
          <p>${this.handleUnfef(dr.practices[0].visit_address.city)+", "+this.handleUnfef(dr.practices[0].visit_address.state)+", "+ this.handleUnfef(dr.practices[0].visit_address.zip)}</p>
          <p>${this.handlePatients(dr.practices[0].accepts_new_patients)}</p>
          <p>${this.handleUnfef(dr.practices[0].phones[0].number)}</p>
          <p>${this.handleUnfef(dr.practices[0].email)}</p>
          ${this.handleWebsite(dr.practices[0].website)}
        </div>
      </div>`
    );
  }
}
