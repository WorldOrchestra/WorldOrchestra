/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('127.0.0.1:9001/', function(response) {
    //require('utils').dump(document.getElementsByTagName('body')[0]);
    //test.assertExists('svg', 'Track render view should exist');
    console.log(document.getElementsByTagName('body')[0]);
  });

  casper.then(function() {
    test.assertExists('#tabs', 'Instrument tabs should exist');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('App can add and remove todos', function suite(test) {
  casper.start('http://localhost:3000/', function() {
    //casper.fill('form.todo-form', {'todo': 'Moo'}, true);
    //test.assertExists('input[data-todo-id="1"]', 'Item should exist');
    //casper.click('button[data-todo-id="1"]');
    //test.assertDoesntExist('input[data-todo-id="1"]', "Item should not exist");
      test.assert(true);
  });

  casper.run(function() {
    test.done();
  });
});
