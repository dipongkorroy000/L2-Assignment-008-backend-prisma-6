"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formateObject = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = formateObject;
//# sourceMappingURL=formateObject.js.map