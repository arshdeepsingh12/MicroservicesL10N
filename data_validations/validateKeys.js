function validate(reqObj) {
	var status = true;
	if (reqObj.keys === undefined) {
		status = false;
	} else {
		status = true;
	}
	return status;
}

module.exports = {
	validate: validate
};
