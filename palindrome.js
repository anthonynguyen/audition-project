module.exports = function isPalindrome(message) {
	if(message === null) return false;
	message = message.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "").toLowerCase();
	var len = message.length;
	for ( var i = 0; i < Math.floor(len/2); i++) {
		if (message[i] !== message[len - 1 - i]) {
			return false;
		}
	}
	return true;
};
