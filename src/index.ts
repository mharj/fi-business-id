const multi = [7, 9, 10, 5, 8, 4, 2];

const preBusinessIdFilter = new RegExp(/^\d{6,7}-\d$/);
const preFilter = new RegExp(/^\d{7}$/);

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
	if ( ! idData.match(preFilter) ) {
		throw new Error('not valid business id');
	}
	return idData + '-' + buildCheckSum(idData.split('').map((c) => parseInt(c, 10)));
};

export const isValidBusinessId = (businessId: string): boolean => {
	if ( ! businessId.match(preBusinessIdFilter) ) {
		return false;
	}
	let idToCompare = businessId;
	let idData = businessId.split('-')[0];
	if (idData.length === 6) {
		idData = '0' + idData;
		idToCompare = '0' + businessId;
	}
	return idToCompare === buildBusinessId(idData);
};
