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
    if (isDataCorrect(phone, email) && arguments.length == 3)
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
        if (query === undefined) {
            result.push(new FoundRecords(item, -1));
        }
        else if (item.name.indexOf(query) > -1 ||
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
        if (index == -1) break;
        phoneBook.splice(index, 1);
    }
    console.log('Кол-во удаленных записей: ' + count);
    // Ваша необьяснимая магия здесь
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    var count = phoneBook.length;
    var parseData = data.split(/[\r\n;]+/);

    for (var i=0; i<parseData.length; i++) {
        var name = parseData[i++];
        var phone = parseData[i++];
        var email = parseData[i];
        this.add(name, phone, email);
    }
    console.log("Добавлено контактов: " + (phoneBook.length - count) );

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var max = {
        nameLength: 3,
        phoneLength: 7,
        emailLength: 5
    };
    for (var i in phoneBook) {
        var contact = phoneBook[i];
        contact.phone = normalize(contact.phone);
        if (contact.name.length > max.nameLength) max.nameLength = contact.name.length;
        if (contact.phone.length > max.phoneLength) max.phoneLength = contact.phone.length;
        if (contact.email.length > max.emailLength) max.emailLength = contact.email.length;
    }

    console.log(repeat(max.nameLength + 3 + max.phoneLength + 3 + max.emailLength + 2, "-"));
    console.log("Имя" + repeat(max.nameLength - 3, " ") + " | " +
        "Телефон" + repeat(max.phoneLength - 7, " ") + " | " +
        "Email" + repeat(max.emailLength-5, " ") + " |");
    console.log(repeat(max.nameLength + 3 + max.phoneLength + 3 + max.emailLength + 2, "-"));

    for (var i in phoneBook) {
        var contact = phoneBook[i];
        var ph = contact.phone;
        var em = contact.email;
        var nm = contact.name;
        console.log(nm + repeat(max.nameLength - nm.length, " ") + " | " +
            ph + repeat(max.phoneLength - ph.length, " ") + " | " +
            em + repeat(max.emailLength - em.length, " ") + " |");
        console.log(repeat(max.nameLength + 3 + max.phoneLength + 3 + max.emailLength + 2, "-"));

    }

    // Ваша чёрная магия здесь

};

function repeat(count, s) {
    var str = "";
    var spaceCount = Math.round(count);
    for (var i=0; i<spaceCount; i++) {
        str += s;
    }
    return str;
}

function normalize(phone) {
    var p = phone.replace(/\D/g, "");
    var newPhone = "";

    for (var i in p) {
        var digit = p[p.length - 1 - i];
        newPhone += digit;
        if (newPhone.length == 2) newPhone += "-";
        if (newPhone.length == 5) newPhone += "-";
        if (newPhone.length == 9) newPhone += " )";
        if (newPhone.length == 14) newPhone += "( ";
        if (newPhone.length >= 17 && i == p.length - 1) newPhone += "+";
    }

    return reverseStr(newPhone);
}

function reverseStr(str) {
    var newStr = '', i;
    for (i = str.length - 1; i >= 0; i--) {
        newStr += str.charAt(i);
    }
    return newStr;
}

