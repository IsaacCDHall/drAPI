export class DrCall{
  constructor(){
  }

  allSpecialties(){
    return new Promise((resolve,reject)=>{
    const myRequest = new XMLHttpRequest();
    const url = `https://api.betterdoctor.com/2016-03-01/specialties?&user_key=${process.env.exports.apiKey}`;
    myRequest.onload = function(){
      if(this.status===200){
        resolve(myRequest.response)
      } else {
        reject(console.log("there was an error!"))
      }
    }
    myRequest.open("GET",url,true);
    myRequest.send();
  });
  }
  getDrs(name,condition,specialty){
  return new Promise((resolve,reject)=>{
  const myRequest = new XMLHttpRequest();
  const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&name=${name}&specialty_uid=${specialty}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;
  myRequest.onload = function(){
    if(this.status===200){
      resolve(myRequest.response)
    } else {
      reject(console.log("there was an error!"))
    }
  }
  myRequest.open("GET",url,true);
  myRequest.send();
});
  }


}
