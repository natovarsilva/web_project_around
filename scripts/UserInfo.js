export default class UserInfo {
  constructor(profileName, decription) {
    this.profileName = document.querySelector(".form__text-input_name");
    this.profileDescription = document.querySelector(
      ".form__text-input_description"
    );
    getUserInfo(){
        return{
            name: this.profileName.textContent;
            about: this.profileDescription.textContent;
        }
    };
    setUserInfo({name, about}){
        if(name) this.profileName.textContent = name;
        if(about) this.profileDescription.textContent = about;
    };
  }
}
