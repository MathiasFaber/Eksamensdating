class User {
    constructor(name, email, password, birthdate, zipCode, description, genderId, toothbrushId, roleId) {
        this.name = name;
        this.email = email;
        this. password = password;
        this. birthdate = birthdate;
        this. zipCode = zipCode;
        this.description = description;
        this.genderId = genderId;
        this.toothbrushId = toothbrushId;
        this.roleId = roleId;
    };

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
};

module.exports = User;