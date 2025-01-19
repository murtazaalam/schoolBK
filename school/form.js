class SchoolUserForm {
    constructor({
      username,
      email,
      password,
      role,
      schoolName,
      activationDate,
      deactivationDate,
      logo,
      registrationNumber,
      address,
    }) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
      this.schoolName = schoolName;
      this.activationDate = activationDate;
      this.deactivationDate = deactivationDate;
      this.logo = logo;
      this.registrationNumber = registrationNumber;
      this.address = address;
    }
  
    validate() {
      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.role ||
        !this.schoolName ||
        !this.activationDate ||
        !this.registrationNumber ||
        !this.address
      ) {
        return { success: false, message: "All required fields must be filled." };
      }
      if (!this.isValidEmail(this.email)) {
        return { success: false, message: "Invalid email format." };
      }
      if (!this.isValidPassword(this.password)) {
        return {
          success: false,
          message:
            "Password must be at least 8 characters long and include both numbers and letters.",
        };
      }
      if (!this.isValidDate(this.activationDate)) {
        return { success: false, message: "Invalid activation date format." };
      }
      if (this.deactivationDate && !this.isValidDate(this.deactivationDate)) {
        return { success: false, message: "Invalid deactivation date format." };
      }
      return { success: true, message: "Validation passed." };
    }
  
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    isValidPassword(password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(password);
    }

    isValidDate(date) {
      return !isNaN(new Date(date).getTime());
    }
  
    save() {
      console.log("Saving user data...");
      return { success: true, message: "User data saved successfully." };
    }
  }
  
  module.exports = SchoolUserForm;
  