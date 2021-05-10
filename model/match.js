class Match {
    constructor(matchId, currentUserId, otherUserId, matchYN) {
        this.matchId = matchId;
        this.currentUserId = currentUserId;
        this.otherUserId = otherUserId;
        this.matchYN = matchYN;
    };

    //Foreslår brugere ud fra satte præferencer
    suggestMatch();

    //Når brugeren liker en foreslået bruger, accepteres dette match
    acceptMatch();
};