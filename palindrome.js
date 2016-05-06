
// Verifies whether a given message is a palindrome or not
module.exports = function isPalindrome(message) {
	if(message === null) return false;
	var len = message.length;
	for ( var i = 0; i < Math.floor(len/2); i++) {
		if (message[i] !== message[len - 1 - i]) {
			return false;
		}
	}
	return true;
}
