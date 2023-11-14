const multer = require("multer");
const fs = require("fs");

const defaultPath = "src/public";
const paymentProofPath = `${defaultPath}/payment-proof`;

const storage = multer.diskStorage({
	destination: async function (req, file, cb) {
		const isDirectoryExist = fs.existsSync(defaultPath);

		if (!isDirectoryExist) {
			await fs.promises.mkdir(defaultPath, { recursive: true });
		}

		cb(null, `${defaultPath}`);
	},
	filename: function (req, file, cb) {
		const extension = file.mimetype.split("/")[1];
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
	},
});

//Setup file filter
var fileFilter = (req, file, cb) => {
	if (file.mimetype.split("/")[0] === "image") {
		//accept
		cb(null, true);
	} else if (file.mimetype.split("/")[0] !== "image") {
		//reject
		cb(new Error("File Must be Image!"));
	}
};

const storagePaymentProof = multer.diskStorage({
	destination: async function (req, file, cb) {
		const isDirectoryExist = fs.existsSync(paymentProofPath);

		if (!isDirectoryExist) {
			await fs.promises.mkdir(paymentProofPath, {
				recursive: true,
			});
		}

		cb(null, `${paymentProofPath}`);
	},
	filename: function (req, file, cb) {
		const extension = file.mimetype.split("/")[1];
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			"NXCMP-PAYMENT-" +
				file.fieldname +
				"-" +
				uniqueSuffix +
				"." +
				extension
		);
	},
});

const uploadPaymentProof = multer({
	storage: storagePaymentProof,
	limits: { fileSize: 2800000 },
	fileFilter: fileFilter,
});

const multerUpload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { uploadPaymentProof, multerUpload };
