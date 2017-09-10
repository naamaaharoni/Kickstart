/**
 * Created by naamaa on 24/01/2016.
 */

var conference = {
    date: new Date(2016, 6, 1),
    place: 'Hangar 11, Namal Tel Aviv',
    price: 70,
    speakers: [
        {
            fullName: 'Naama Aharoni',
            topic: 'CSS',
            duration: 20
        },
        {
            fullName: 'Itzik Cohen',
            topic: 'JavaScript',
            duration: 30
        },
        {
            fullName: 'Guy Levi',
            topic: 'HTML',
            duration: 40
        }
    ],
    availableSeats: 100
};

function getAllSpeakers() {
    return conference.speakers;
}

function signupToEvent(){
    conference.availableSeats -= 1;
    return conference.availableSeats;
}
