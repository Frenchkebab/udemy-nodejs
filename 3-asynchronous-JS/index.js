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

// ! async function
const getDogPic = async () => {
  /*
   * Will stop the code from running at this point until this Promise is resolved
   * resolved value will be substituted into the variable 'data'
   * This makes the code look more like syncrhonous code
   */
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log(imgs);
  } catch (err) {
    console.log(err);
    throw err; // ! If you throw an error, that will then mark the entire Promise as rejeceted
  }
  return '2: READY!';
};

//* IIFE
(async () => {
  try {
    console.log('1: Will get dog pics!');
    // const data = await readFilePro(`${__dirname}/dog.txt`);
    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('Error!!');
  }
})();

// console.log('1: Will get dog pics!');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch((err) => {
//     /*
//      * The promise function above comming from the Async function
//      * will still be marked as successful
//      * If you want to mark it as rejected,
//      * then you should 'throw' an error
//      */
//     console.log('Error !!!');
//   }); //* the async function runs in the 'background'

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
