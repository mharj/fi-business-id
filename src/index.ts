const multipliers = [7, 9, 10, 5, 8, 4, 2];

const businessIdPattern = /^\d{6,7}-\d$/;
const idPattern = /^\d{7}$/;

/**
 * Gets the multiplier for the given index.
 * @param index The index for which to get the multiplier.
 * @returns The multiplier for the given index.
 * @throws Will throw a RangeError if the index is out of bounds.
 */
export function getMultiplier(index: number): number {
	const multiplier = multipliers[index];
	if (multiplier === undefined) {
		throw new RangeError('Index out of bounds');
	}
	return multiplier;
}

/**
 * Pads the given value to the next multiple of 11.
 * @param value The value to pad.
 * @returns The padded value.
 */
function pad(value: number): number {
	return Math.ceil(value / 11) * 11 - value;
}

/**
 * Calculates the checksum for the given business ID data.
 * @param data An array of numbers representing the business ID.
 * @returns The checksum value.
 */
function buildCheckSum(data: number[]): number {
	const sum = data.reduce((prev, value, idx) => prev + getMultiplier(idx) * value, 0);
	return pad(sum) % 11;
}

/**
 * Normalizes the business ID by adding a leading zero if it has six digits.
 * @param businessId The business ID to normalize.
 * @returns The normalized business ID.
 */
function normalizeBusinessId(businessId: string): string {
	if (getBaseId(businessId).length === 6) {
		return '0' + businessId;
	}
	return businessId;
}

/**
 * Gets the base ID from the given business ID without the checksum.
 * @param businessId The business ID from which to get the base ID.
 * @returns The base ID without the checksum.
 */
export function getBaseId(businessId: string): string {
	const baseId = businessId.split('-')[0];
	if (!baseId) {
		throw new Error('not valid business id');
	}
	return baseId;
}

/**
 * Builds a business ID by appending a checksum to the given ID data.
 * @param idData The base ID data.
 * @returns The complete business ID with checksum.
 * @since v0.0.1
 */
export function buildBusinessId(idData: string): string {
	if (!idData.match(idPattern)) {
		throw new Error('not valid business id');
	}
	return `${idData}-${buildCheckSum(idData.split('').map((c) => parseInt(c, 10))).toString()}`;
}

/**
 * Validates the given business ID.
 * @param businessId The business ID to validate.
 * @returns True if the business ID is valid, false otherwise.
 * @since v0.0.1
 */
export function isValidBusinessId(businessId: string): boolean {
	if (!businessId.match(businessIdPattern)) {
		return false;
	}
	const normalizedId = normalizeBusinessId(businessId);
	return normalizedId === buildBusinessId(getBaseId(normalizedId));
}
