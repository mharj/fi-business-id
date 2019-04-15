const multi = [7, 9, 10, 5, 8, 4, 2];

const pad = (value: number) => {
	return Math.ceil(value / 11) * 11 - value;
};

const buildCheckSum = (data: number[]) => {
	if (data.length !== 7) {
		throw new Error('not valid business id');
	}
	return pad(data.map((value, idx) => multi[idx] * value).reduce((prev, curr) => prev + curr)) % 11;
};

export const buildBusinessId = (idData: string): string => {
	if (idData.length !== 7) {
		throw new Error('not valid business id length');
	}
	return idData + '-' + buildCheckSum(idData.split('').map((c) => parseInt(c, 10)));
};

export const isValidBusinessId = (id: string): boolean => {
	let idToCompare = id;
	let idData = id.split('-')[0];
	if (idData.length === 6) {
		idData = '0' + idData;
		idToCompare = '0' + id;
	}
	if (idData.length !== 7) {
		throw new Error('not valid business id');
	}
	return idToCompare === buildBusinessId(idData);
};
