import idb from 'idb';

// opening database, creating object stores, checking versions, putting data
var dbPromise = idb.open('test-db', 5, function(upgradeDb) {

  switch ( upgradeDb.oldVersion) {
      case 0 :
              var keyValStore = upgradeDb.createObjectStore('keyval');
              keyValStore.put("world", "hello");
      case 4 :
              upgradeDb.createObjectStore('people',{ keyPath : 'name'});
  }
});

// read "hello" in "keyval"
dbPromise.then( function(db) {
  var trans = db.transaction("keyval");
  var objstore = trans.objectStore("keyval")
  return objstore.getKey("hello");
}).then(function (ans) {
  console.log("The key for hello is : ", ans);
});

dbPromise.then(function(db) {
  // TODO: in the keyval store, set
  // "favoriteAnimal" to your favourite animal
  // eg "cat" or "dog"

  var tx = db.transaction("keyval", "readwrite");
  var dataacc = tx.objectStore("keyval");
  dataacc.put("dog","favoriteAnimal").then(function() {
    console.log("favoriteAnimal success")
  }).catch(function(err) {
    console.log("favoriteAnimal failed : ", err)
  });
  return tx.complete;
}).then(function (ans) {
  console.log("favoriteAnimal Transaction complete");
}).catch( function(err) {
  console.log("favoriteAnimal Transaction failed :", err)
})

// insert into the object store - >  Make a PUT out of this
dbPromise.then( function (db) {
  var tx = db.transaction("people", "readwrite");
  var object = tx.objectStore("people");
  object.put({
    name : "Samir Sheriff",
    age : 100,
    favouriteAnimal : "Doggo"
  })
  object.put({
    name : "Popeye",
    age : 50,
    favouriteAnimal : "Eugene the dog"
  })
  object.put({
    name : "Oswald",
    age : 8,
    favouriteAnimal : "Pingu"
  })
  object.put({
    name : "Tam tam",
    age : 3,
    favouriteAnimal : "pam pam"
  })

  return tx.complete;
});

// get all the data from this object store - > Make a GET out of this
// It is a promise - > return successfully goes into the then function, not to another function call

dbPromise.then( function ( db) {
  var tx = db.transaction("people", "readwrite");
  var objStore = tx.objectStore("people");
  return objStore.getAll();
}).then ( function ( allPeople) {
  console.log ("People : ", allPeople);
}).catch(function (err) {
  console.log("Error : ", err)
})
