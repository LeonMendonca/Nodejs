class DtoResponse {
  constructor({id, username}) {
    this.id = id;
    this.username = username;
  }
}

class DtoResponseProfile {
  constructor({
    firstname, lastname, username, email, phonenumber, dob, gender,    
    currentaddress, permanentaddress, state, taluka, district, zipcode, aadharnumber  
  }) {
    this.firstname = firstname,
    this.lastname = lastname,
    this.username = username,
    this.email = email,
    this.phonenumber = phonenumber,
    //dob is date type, converted to string
    this.dob = dob.toISOString().split('T')[0],
    this.gender = gender,
    this.currentaddress = currentaddress,
    this.permanentaddress = permanentaddress,
    this.state = state,
    this.taluka = taluka,
    this.district = district,
    this.zipcode = zipcode,
    this.aadharnumber = aadharnumber
  }
}

export { DtoResponse, DtoResponseProfile };
