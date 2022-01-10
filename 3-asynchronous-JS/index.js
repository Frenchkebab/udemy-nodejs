const fs = require('fs');
const superagent = require('superagent');

/*
 * creating a new function which behind the scenes still runs
 * the built in readFile function
 * but then returns a promise so that we can use promise
 * so that we can use the promise instead of the callback funciton
 */
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file T.T');
      /*
       * Whatever variable that we pass into the resolve funciton
       * will later be available as the argument in the then method
       */
      resolve(data); //* 'data' here is the value that this promise returns to us
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file T.T');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  /*
   * Will stop the code from running at this point until this Promise is resolved
   * resolved value will be substituted into the variable 'data'
   * This makes the code look more like syncrhonous code
   */
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

/* 
readFilePro(`${__dirname}/dog.txt`) //* if you put value in variable 'file' then this will return a Promise
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //* this code will return a Promise
  }) //* HTTP get request
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message); //* this code wil return a Promise
    // fs.writeFile('dog-img.txt', res.body.message, (err) => {
    //   console.log('Random dog image saved to file!');
    // });
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    console.log(err);
  });
 */
