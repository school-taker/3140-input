// enum just to make code self-documenting
const format = {
	BINARY: 'binary number',
	BIG_INT: 'bigInt',
	NUMBER: 'base 10 number',
	TEXT: 'miscellaneous text',
	HEX: 'hexidecimal number',
	EMPTY: 'empty text'
}


// Parsers for each text type. Array ordering is important.
// We go from most restrictive to most loose
// empty text does not need a test
const tests = [
	[/^(?:0b)?((?:0|1)+)$/, match => ({ 
		format: format.BINARY,
		value: parseInt(match[1], 2),
	})],
	[/^([0-9]+)n$/, match => ({
        format: format.BIG_INT,
        value: match[1],
	})],
	[/^[0-9]+$/, match => ({ 
		format: format.NUMBER, 
		value: match[0],
	})],
	[/^(?:0x)?([a-fA-F0-9]+)$/, match => ({
		format: format.HEX,
		value: parseInt(match[1], 16),
	})],
	[/.+/, match => ({ 
        format: format.TEXT,
        value: match[0]
    })],
];


// get all test types in the order of them passing
export function getAllTextTypes(text) {
	const types = [];
	for (const [reg, func] of tests) {
		const res = text.match(reg);
		if (!res) continue;

		types.push(func(res));
	}

	return types;
}


// only get the first text type to pass
export function getTextType(text) {
	for (const [reg, func] of tests) {
		const res = text.match(reg);
		if (!res) continue;
		
		return func(res);
	}
	
    // if none pass, we have no text
	return {
		format: format.EMPTY,
		value: '',
	}
}