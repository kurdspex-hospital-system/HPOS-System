const bcrypt = require('bcrypt');

export const hash = (data) => {
    const promise = new Promise((resolve, reject) => { 
        bcrypt.hash(data, 12, (err, hash) => {
            if(err) {
                reject(err);
            }
            
            resolve(hash);
        });
    });

    return promise
      .then((hash) => {
        return hash;
      })
      .catch((err) => {
        return err;
      })
};

export const isSame = (data, hash) => {
    const promise = new Promise((resolve, reject) => { 
        bcrypt.compare(data, hash, (err, result) => {
            if(err) reject(err);
            resolve(result);	
        });
    });

    return promise
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      })
};