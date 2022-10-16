require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Andriy',
    age: 20,
    favouriteFoods: ['apple', 'pasta']
  });
  person.save()
  .then(data => done(null, data))
  .catch(err => console.log(err));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person
    .find({name: personName})
    .then(data => done(null, data))
    .catch(err => console.log(err))
};

const findOneByFood = (food, done) => {
  Person
    .findOne({favoriteFoods: food})
    .then(personFound => {done(null, personFound); console.log(personFound)})
    .catch(err => console.log(err));
};

const findPersonById = (personId, done) => {
  Person
    .findById(personId)
    .then(personFound => {done(null, personFound); console.log(personFound)})
    .catch(err => console.log(err));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person
    .findById(personId)
    .then(personFound => {
      personFound.favoriteFoods.push(foodToAdd);
      return personFound.save();
    })
    .then(data => done(null, data))
    .catch(err => console.log(err))
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person
    .findOneAndUpdate(
      { name: personName }, 
      { age: ageToSet },
      { new: true, useFindAndModify: false} 
    )
    .then(personFound => done(null, personFound))
    .catch(err => console.log(err))
};

const removeById = (personId, done) => {
  Person
    .findByIdAndRemove(personId)
    .then(itemRemoved => done(null, itemRemoved))
    .catch(err => console.log(err));
 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person 
    .remove({ name: nameToRemove})
    .then(data => done(null, data))
    .catch(err => console.log(err));

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec()
    .then(data => done(null, data))
    .catch(err => console.log(err))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
