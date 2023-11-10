const fs = require("fs");

module.exports = {
	deleteFiles: (files) => {
		files.images.forEach((v) => {
			fs.unlinkSync(`${v.path}`);
		});
	},
};
