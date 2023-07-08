import { once } from 'lodash';
import React, { useContext } from 'react';
import RNRestart from 'react-native-restart';

export const randomNum = (max = 100): number => Math.floor(Math.random() * max);

export const restartApp = RNRestart.Restart;


export const createStateContext = once(<T,>() => React.createContext({} as State<T>));
export const useStateContext = <T,>() => useContext(createStateContext<T>());


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


export const getRandomParagraph = () => {
    const paragraph = [
        "Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation?",
        `I'm going to hire professional help tomorrow. I can't handle this anymore. She fell over the coffee table and now there is blood in her catheter. This is much more than I ever signed up to do.`,
        `Waiting and watching. It was all she had done for the past weeks. When you’re locked in a room with nothing but food and drink, that’s about all you can do anyway. `,
        `She watched as birds flew past the window bolted shut. She couldn’t reach it if she wanted too, with that hole in the floor. She thought she could escape through it but three stories is a bit far down.`,
        `There was no time. He ran out of the door without half the stuff he needed for work, but it didn't matter. He was late and if he didn't make this meeting on time, someone's life may be in danger.`,
        `There was nothing else to do. The deed had already been done and there was no going back. It now had been become a question of how they were going to be able to get out of this situation and escape.`,
        `There was a time when he would have embraced the change that was coming. In his youth, he sought adventure and the unknown, but that had been years ago.`
    ]

    return paragraph[getRandomInt(paragraph.length - 1)];
}



export const getRandomFullName = () => {
    const paragraph = [
        "Chiara Bowes",
        `Tamzin Harrison`,
        `Adrian Hobbs`,
        `Mared Byers`,
        `Euan Crane`,
        `Kianna Lam`,
        `Faiza Aguirre`,
        `Harleigh Kidd`,
        `Milosz Davie`,
        `Kiana Chan`
    ]

    return paragraph[getRandomInt(paragraph.length - 1)];
}


export const getRandomImageUrl = () => {
    const paragraph = [
        "https://thumbs.dreamstime.com/b/portrait-teen-girl-wavy-hair-looking-aside-shock-surprise-ready-to-bite-burger-her-hands-foodie-hamburger-shocked-117694116.jpg",
        `https://thumbs.dreamstime.com/b/woman-closeup-eating-hamburger-portrait-41841030.jpg`,
        `https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg`,
        `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80`,
        `https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&w=1000&q=80`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfi2kATPt5R1EJCsZchLfnvEVYRsrzii4wJxnXNGPfZ84VObcExjkVyktq6yGmQPzVl8&usqp=CAU`,
        `https://thumbs.dreamstime.com/b/teenage-girl-smiling-portrait-beautiful-136676692.jpg`,
        `https://thumbs.dreamstime.com/b/beautiful-young-girl-smiling-camera-chilling-cafe-portrait-young-mixed-race-girl-chilling-cafe-smiling-camera-copy-160113298.jpg`,
        `https://thumbs.dreamstime.com/b/portrait-beautiful-young-african-american-woman-smiling-close-up-46959481.jpg`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7xO2-Yxt6tbxGKe_Xr2CtSRsLJlfyN8cTslBNlkLiGdvkCuPpAfMuvH1Mx5viy10cC0&usqp=CAU`
    ]

    return paragraph[getRandomInt(paragraph.length - 1)];
}

export const getRandomImageFoodUrl = () => {
    const paragraph = [
        "https://img.freepik.com/photos-gratuite/vue-face-delicieux-cheeseburger-viande-frites-fond-sombre-diner-hamburgers-collation-fast-food-sandwich-salade-plat-toast_140725-159215.jpg?w=2000",
        `https://img.freepik.com/premium-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?w=2000`,
        `https://img.freepik.com/free-photo/chicken-wings_144627-17035.jpg?w=2000`,
        `https://img.freepik.com/free-photo/delicious-fried-chicken-plate_144627-27383.jpg?w=2000&t=st=1663632134~exp=1663632734~hmac=bd6ddbb6d6c7a96a3ac7429c613cdbcd1b0b28de15eb46bfe470a02b95d2e947`,
        `https://img.freepik.com/premium-photo/concept-oriental-cuisine-national-uzbek-pilaf-with-meat-cast-iron-skillet-wooden-table-background-image-top-view-copy-space-flat-lay_127425-9.jpg?w=2000`,
        `https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?w=2000&t=st=1663632169~exp=1663632769~hmac=9ea3211709920e3cd9e2c6f4448d7f909c8c1edf65c7c7c3c3c34d07639bdb38`,
        `https://img.freepik.com/free-photo/sandwich-hamburger-with-juicy-burgers-tomato-red-cabbage_2829-4119.jpg?t=st=1663619196~exp=1663619796~hmac=46d953e469994cb2a7f92b976932a6068ec7512fa0b7eb883cd258db2c4437b3`,
        `https://img.freepik.com/free-photo/fried-fish-carp-fresh-vegetable-salad-wooden-table-flat-lay-top-view_2829-19929.jpg`,
        `https://img.freepik.com/free-photo/penne-pasta-with-tomato-sauce-with-sausage-tomatoes-green-basil-decorated-frying-pan-wooden-table_2829-20103.jpg`,
        `https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg`
    ]

    return paragraph[getRandomInt(paragraph.length - 1)];
}