'use strict';
function Entry (name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
}
function FoundRecords (entry, index) {
    this.entry = entry;
    this.index = index;
}

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (isDataCorrect(phone, email))
        phoneBook.push(new Entry(name, phone, email));

    // Ваша невероятная магия здесь
};

function isDataCorrect(phone, email) {
    var rePhone = /^\+?(\d+)? ?\(?\d{3}\)? ?\d{3}(\s|-)?\d(\s|-)?\d{3}$/;
    var count = 0;
    for (var i=0; i<phone.length; i++) {
        if (phone[i] == '(')
            count ++;
        if (phone[i] == ')')
            count--;
    }
    var isPhoneCorrect = rePhone.test(phone) && count == 0;

    var reEmail = /^\w+@\w[\w-]*?(\.\w+)+$/;
    var isEmailCorrect = reEmail.test(email);

    return isEmailCorrect && isPhoneCorrect;
}

function findContact(query) {
    var result = [];
    var removeIndex = 0;
    var index = 0;

    phoneBook.forEach(function(item, i) {
        if (item.name.indexOf(query) > -1 ||
            item.phone.indexOf(query) > -1 ||
            item.email.indexOf(query) > -1) {
            result.push(new FoundRecords(item, i - removeIndex++));
        }
    });
    return result;
}
/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var result = findContact(query);
    for (var i in result) {
            var contact = result[i].entry;
            console.log(contact.name + ', ' + contact.phone + ', ' + contact.email);
    }

    // Ваша удивительная магия здесь
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var result = findContact(query);
    var count = 0;
    for (var i in result) {
        count++;
        var index = result[i].index;
        delete phoneBook[index];
    }
    console.log('Кол-во удаленных записей: ' + count);
    // Ваша необьяснимая магия здесь
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var count = 0;

    console.log('    Имя   |   Телефон   |   Email ');
    for (var i in phoneBook) {
        count++;
        var contact = phoneBook[i];
        console.log(count + ') ' +
            contact.name + ',  ' +
            contact.phone + ',  ' +
            contact.email);
    }
    // Ваша чёрная магия здесь

};
