const console = require("console");

(function () {
    console.log(foo); // undefined
    {
        var foo = 'foo';
    }
})();

(function () {
    {
        var foo = 'foo';
    }
    console.log(foo); // foo
})();

try {
    (function () {
        {
            let foo = 'foo';
        }
        console.log(foo); // foo is not defined
    })();
} catch (e) {
    console.error(e.message);
}

try {
    (function () {
        console.log(foo); // Cannot access 'foo' before initialization
        let foo = 'foo';
    })();
} catch (e) {
    console.error(e.message);
}

try {
    function logFoo () {
        console.log(foo); // foo
    }
    let foo = 'foo';
    logFoo();
} catch (e) {
    console.error(e.message);
}

try {
    function logFoo () {
        console.log(foo); // foo
    }
    process.nextTick(logFoo);
    let foo = 'foo';
} catch (e) {
    console.error(e.message);
}