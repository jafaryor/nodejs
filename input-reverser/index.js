/**
 * Listens the user input in stand-by mode.
 */
process.stdin.on('data', (input) => {
    console.log(reverse(input));
});

/**
 * Reverses the input Buffer and returns it as string.
 */
function reverse(input) {
    // trim() is used to get rid of "NEWLINE"
    // symbol at the end of the user input.
    return input.reverse().toString().trim();
}

// Refernces: https://codelikethis.com/lessons/javascript/input-and-output
