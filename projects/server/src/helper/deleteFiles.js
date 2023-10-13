const fs = require("fs");

module.exports = {
    deleteFiles: (files) => {
        files.image.forEach((v) => {
            fs.unlinkSync(v.path);
        });
    },
};
