class DtoRequestSignup {
  constructor({
    aadharnumber, confirmpassword, currentaddress, date, district, 
    email, firstname, lastname, gender, password, permanentaddress, 
    phonenumber, state, taluka, tnc, username, zipcode
  }) {
    this.aadharnumber = aadharnumber,
    this.confirmpassword = confirmpassword,
    this.currentaddress = currentaddress,
    this.date = date,
    this.district = district,
    this.email = email,
    this.firstname = firstname,
    this.lastname = lastname,
    this.gender = gender,
    this.password = password,
    this.permanentaddress = permanentaddress,
    this.phonenumber = phonenumber,
    this.state = state,
    this.taluka = taluka,
    this.tnc = tnc,
    this.username = username,
    this.zipcode = zipcode
  }
}

class DtoRequestLogin {
  constructor({uniquename, aadharnumber, password, rememberpass}) {
    this.uniquename = uniquename,
    this.aadharnumber = aadharnumber,
    this.password = password,
    this.rememberpass = rememberpass
  }
}

export { DtoRequestSignup, DtoRequestLogin  };
