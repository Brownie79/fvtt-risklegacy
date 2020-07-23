Hooks.once("ready", async () => {
    //register handlebars code here
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    Handlebars.registerHelper('for', (from, to, incr, block) => {
        var accum = '';
        for(var i = from; i < to; i += incr) accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('length', (obj) => {
        return obj.length || obj.toString().length;
    });

    Handlebars.registerHelper('offset', (obj, num) => {
        return parseInt(obj) + parseInt(num);
    })

    Handlebars.registerHelper('isEmpty', (obj) => {
        return obj === undefined || obj === null || Object.keys(obj).length === 0;
    });
});