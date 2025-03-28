const multipliers = [7, 9, 10, 5, 8, 4, 2];

const businessIdPattern = /^\d{6,7}-\d$/;
const idPattern = /^\d{7}$/;

/**
 * Finnish Business ID (Y-tunnus) type.
 * @template Brand Optional brand type for a more strict type (e.g., use Zod branded type or custom type).
 * @since v0.1.0
 */
export type FiBusinessId<Brand = `${number}-${number}`> = Brand & `${number}-${number}`;

/**
 * Checks if the given value is of type FiBusinessId.
 * @param {unknown} value The value to check.
 * @returns {value is FiBusinessId} True if the value is of type FiBusinessId, false otherwise.
 * @since v0.1.0
 */
export function isFiBusinessIdType(value: unknown): value is FiBusinessId {
	return typeof value === 'string' && businessIdPattern.test(value);
}

/**
 * Checks if the given value is a valid business ID without the checksum.
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is a valid business ID without the checksum, false otherwise.
 * @since v0.1.0
 */
export function isFiBusinessIdBaseType(value: unknown): value is `${number}` {
	return typeof value === 'string' && idPattern.test(value);
}
/**
 * Gets the multiplier for the given index.
 * @param {number} index The index for which to get the multiplier.
 * @returns {number} The multiplier for the given index.
 * @throws Will throw a RangeError if the index is out of bounds.
 * @since v0.0.6
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
 * @param {number} value The value to pad.
 * @returns {number} The padded value.
 */
function pad(value: number): number {
	return Math.ceil(value / 11) * 11 - value;
}

/**
 * Calculates the checksum for the given business ID data.
 * @param {number[]} data An array of numbers representing the business ID.
 * @returns {number} The checksum value.
 */
function buildCheckSum(data: number[]): number {
	const sum = data.reduce((prev, value, idx) => prev + getMultiplier(idx) * value, 0);
	return pad(sum) % 11;
}

/**
 * Normalizes the business ID by adding a leading zero if it has six digits.
 * @param {string} businessId The business ID to normalize.
 * @returns {string} The normalized business ID.
 */
function normalizeBusinessId(businessId: FiBusinessId): FiBusinessId {
	return businessId.padStart(9, '0') as FiBusinessId;
}

/**
 * Builds an Error object for an invalid business ID.
 * @param {unknown} value The value that is not a valid business ID.
 * @returns {Error} The Error object.
 * @since v0.1.0
 */
function buildValidationError(value: unknown): Error {
	return new Error(`${JSON.stringify(value)} is not valid Finnish Business ID`);
}

/**
 * Gets the base ID from the given business ID without the checksum.
 * @param {string} businessId The business ID from which to get the base ID.
 * @returns {string} The base ID without the checksum.
 * @throws Will throw an Error if the business ID is not valid.
 * @since v0.0.6
 */
export function getBaseId(businessId: FiBusinessId): string {
	const baseId = businessId.split('-')[0];
	if (!baseId) {
		throw buildValidationError(businessId);
	}
	return baseId;
}

/**
 * Builds a business ID by appending a checksum to the given ID data.
 * @template Brand Optional brand type for a more strict type (e.g., use Zod branded type or custom type).
 * @param {string | number | null | undefined} idData The base ID data.
 * @returns {string} The complete business ID with checksum.
 * @throws Will throw an Error if the ID data is not valid.
 * @since v0.0.1
 */
export function buildBusinessId<Brand = `${number}-${number}`>(idData: string | number | null | undefined): FiBusinessId<Brand> {
	if (typeof idData === 'string' && idData.length !== 7) {
		idData = idData.padStart(7, '0');
	}
	if (typeof idData === 'number') {
		idData = idData.toString().padStart(7, '0');
	}
	if (!isFiBusinessIdBaseType(idData)) {
		throw buildValidationError(idData);
	}
	return `${idData}-${buildCheckSum(idData.split('').map((c) => parseInt(c, 10))).toString()}` as FiBusinessId<Brand>;
}

/**
 * Validates the given business ID.
 * @template Brand Optional brand type for a more strict type (e.g., use Zod branded type or custom type).
 * @param {string} businessId The business ID to validate.
 * @returns {string} True if the business ID is valid, false otherwise.
 * @since v0.0.1
 */
export function isValidBusinessId<Brand = `${number}-${number}`>(businessId: string | null | undefined): businessId is FiBusinessId<Brand> {
	if (!isFiBusinessIdType(businessId)) {
		return false;
	}
	const normalizedId = normalizeBusinessId(businessId);
	return normalizedId === buildBusinessId(getBaseId(normalizedId));
}
