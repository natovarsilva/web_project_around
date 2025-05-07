class UserInfo {
  constructor(profileName, decription) {
    this.profileName = document.querySelector(profileName);
    //(".form__text-input_name");
    this.profileDescription = document.querySelector(description);
    //( ".form__text-input_description");
    getUserInfo(){
        return{
            name: this.profileName.textContent;
            about: this.profileDescription.textContent;
        }
    };
    setUserInfo({name, about}){

        if(name) this.profileName.textContent = name; //quitar el if?
        if(about) this.profileDescription.textContent = about; // quitar el if?
    };
  }
}

export default UserInfo