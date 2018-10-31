
module.exports = exports = get = (req, res) => {
    console.log("Inside controller");
    res.send({ "kerv": "hi world" });
}