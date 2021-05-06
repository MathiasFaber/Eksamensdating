class User {
    constructor(name, email, password, birthdate, zipCode, description, genderId, toothbrushId, roleId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.zipCode = zipCode;
        this.description = description;
        this.genderId = genderId;
        this.toothbrushId = toothbrushId;
        this.roleId = roleId;
    };

    calculateAge(user) {
        // Converts the data from SQL format to JS format with the Date() function
        var birthdate = new Date(user.birthdate)
        var ageDifMs = Date.now() - birthdate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        // As the genderpreferences are divided into 4 categories, the function returns an ID between 1-4, which indicates which interval of age the user belongs to. 
        if(age >= 18 && age <= 25){
            return 1;
        } else if (age >= 26 && age <= 35){
            return 2;
        } else if (age >= 36 && age <= 50){
            return 3;
        } else if (age >= 51){
            return 4;
        }
    }

    // User funktioner
/*
    //Beregner brugerens alder ud fra fødselsdato
    calculateAge(birthdate){
        var ageDifMs = Date.now() - birthdate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    //Opretter egen bruger
    createMyUser() {
    };

    //Sletter egen bruger
    deleteMyUser();

    //Opdaterer egen bruger
    updateMyUser();

    //Sætter præferencer for aldersgruppe, køn og tandbørstefarve, som har interesse
    setPreferences();

    //Logger ind
    login();

    //Logger ud
    logout();

    //Giver liste over egne likede brugere
    getLikelist();

    //Liker en anden bruger
    like(otherUserId);

    //Disliker en anden bruger
    dislike(otherUserId);

    //Fjerner et givet like af anden bruger
    deleteLike(otherUserId);
    */
};

module.exports = User;


class Admin extends User {
    constructor(name, email, password, birthdate, zipCode, description, genderId, toothbrushId, roleId){
        super(name, email, password, birthdate, zipCode, description, genderId, toothbrushId, roleId)
    }

    // Admin functions

}
