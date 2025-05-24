class UserInfo {
  constructor(selectors) {
    this.profileName = document.querySelector(selectors.nameSelector);
    this.profileDescription = document.querySelector(selectors.hobbieSelector);
    this.profileAvatar = document.querySelector(selectors.avatarSelector);
  }
  getUserInfo() {
    return {
      name: this.profileName.textContent,
      about: this.profileDescription.textContent,
    };
  }
  setUserInfo({ name, about, avatar }) {
    if (name) this.profileName.textContent = name;
    if (about) this.profileDescription.textContent = about;
    if (avatar) this.profileAvatar.src = avatar;
  }
}

export default UserInfo;
