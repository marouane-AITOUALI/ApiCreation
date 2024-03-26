const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }

];

app.get('/', (req, res) => {
    res.send("Hello World !");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course was not found !");
    res.send(course);
});


app.post("/api/courses", (req, res) => {

    /*const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.valid(req.body, schema);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }
    */

    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send("Name is required and should be minimum 3 characters !!");

    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put("/api/courses/:id", (req, res) => {
    // Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(400).send('The courses was not found !!');


    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course wasn't found !!");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.valid(course, schema);
}