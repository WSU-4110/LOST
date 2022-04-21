const sum = (vals) => {

    let sum = 0;

    vals.forEach((val) => {
        sum += val;
    });

    return sum;
}

const positive = (vals) => {

    return vals.filter((x) => { return x > 0; });
}

const negative = (vals) => {

    return vals.filter((x) => { return x < 0; });
}
const homeText = () =>{
    return "This is the Home Page"
}
const songText = () =>{
    return "This is the Song Page"
}
const attrText = () =>{
    return "This is the Attribute Page"
}
const loginText = () =>{
    return "This is the Login Page"
}

module.exports = { sum, positive, negative, homeText, songText, attrText, loginText };