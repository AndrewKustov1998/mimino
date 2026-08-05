!(function (e) {
    'function' != typeof e.matches &&
        (e.matches =
            e.msMatchesSelector ||
            e.mozMatchesSelector ||
            e.webkitMatchesSelector ||
            function (e) {
                for (
                    var t = this,
                        o = (t.document || t.ownerDocument).querySelectorAll(e),
                        n = 0;
                    o[n] && o[n] !== t;

                )
                    ++n;
                return Boolean(o[n]);
            }),
        'function' != typeof e.closest &&
            (e.closest = function (e) {
                for (var t = this; t && 1 === t.nodeType; ) {
                    if (t.matches(e)) return t;
                    t = t.parentNode;
                }
                return null;
            });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
    /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
    var modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');

    /* Перебираем массив кнопок */
    modalButtons.forEach(function (item) {
        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener('click', function (e) {
            /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
            e.preventDefault();

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
            var modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector(
                    '.modal[data-modal="' + modalId + '"]'
                );

            /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
            modalElem.classList.add('active');
            overlay.classList.add('active');
        }); // end click
    }); // end foreach

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }); // end foreach

    document.body.addEventListener(
        'keyup',
        function (e) {
            var key = e.keyCode;

            if (key == 27) {
                document
                    .querySelector('.modal.active')
                    .classList.remove('active');
                document.querySelector('.js-overlay-modal').classList.remove('active');
            }
        },
        false
    );

    overlay.addEventListener('click', function () {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });

    /* Маска номеру телефону у форматі +38 (___) ___-__-__ */
    var phoneInputs = document.querySelectorAll('.person-phone'),
        phonePrefix = '+38 (';

    function phoneDigits(value) {
        var digits = value.replace(/\D/g, '');
        if (digits.slice(0, 2) === '38') {
            digits = digits.slice(2);
        }
        return digits.slice(0, 10);
    }

    function formatPhone(digits) {
        var result = phonePrefix + digits.slice(0, 3);
        if (digits.length >= 3) result += ')';
        if (digits.length > 3) result += ' ' + digits.slice(3, 6);
        if (digits.length > 6) result += '-' + digits.slice(6, 8);
        if (digits.length > 8) result += '-' + digits.slice(8, 10);
        return result;
    }

    phoneInputs.forEach(function (input) {
        input.addEventListener('focus', function () {
            if (!this.value) {
                this.value = phonePrefix;
            }
        });

        input.addEventListener('input', function () {
            var digits = phoneDigits(this.value);
            this.value = digits ? formatPhone(digits) : phonePrefix;
        });

        input.addEventListener('blur', function () {
            if (!phoneDigits(this.value)) {
                this.value = '';
            }
        });
    });
}); // end ready