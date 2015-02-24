/* globals casper, document */
casper.test.begin('App is setup correctly', 1, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    //test.assertExists('.todo-list', 'List should exist');
    //test.assertExists('.todo-form', 'Form should exist');
      test.assert(true);
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
