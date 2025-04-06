import {describe, expect, it} from 'vitest';
import {buildBusinessId, FiBusinessId, FiBusinessIdError, getBaseId, getMultiplier, isValidBusinessId} from '../src';

type CustomBrand = {__T: 'FiBusinessId'};

describe('test business ID', () => {
	describe('test build business ID', () => {
		it('should build business ID', () => {
			const _value: FiBusinessId<CustomBrand> = buildBusinessId<CustomBrand>('1572860');
			expect(buildBusinessId('1572860')).to.be.eq('1572860-0');
			expect(buildBusinessId(0)).to.be.eq('0000000-0');
			expect(buildBusinessId('0')).to.be.eq('0000000-0');
		});
		it('should fail to build broken business ID', () => {
			expect(() => buildBusinessId('ASD')).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
			expect(buildBusinessId.bind(null, -1)).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
			expect(buildBusinessId.bind(null, 10000000)).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
			expect(buildBusinessId.bind(null, null)).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
		});
	});
	describe('test validate business ID', () => {
		it('should validate business ID', () => {
			const value: string = '1572860-0';
			const isValid = isValidBusinessId<CustomBrand>(value);
			if (isValid) {
				const _test: FiBusinessId<CustomBrand> = value;
			}
			expect(isValidBusinessId('1572860-0')).to.be.eq(true);
			expect(isValidBusinessId('1572860-1')).to.be.eq(false);
			expect(isValidBusinessId('0737546-2')).to.be.eq(true);
			expect(isValidBusinessId('0737546-9')).to.be.eq(false);
			expect(isValidBusinessId('0725267-3')).to.be.eq(true);
			expect(isValidBusinessId('1456344-5')).to.be.eq(true);
			expect(isValidBusinessId('2729069-3')).to.be.eq(true);
			expect(isValidBusinessId('helloworld-4')).to.be.eq(false);
			expect(isValidBusinessId(null)).to.be.eq(false);
			expect(isValidBusinessId(undefined)).to.be.eq(false);
		});
		it('should validate old business ID', () => {
			expect(isValidBusinessId('737546-2')).to.be.eq(true);
			expect(isValidBusinessId('737546-9')).to.be.eq(false);
		});
	});
	describe('test utility functions', () => {
		it('should test multiplier function', () => {
			expect(getMultiplier(0)).to.be.eq(7);
			expect(() => getMultiplier(-1)).to.throw(RangeError, 'Index out of bounds');
		});
		it('should test getBaseId function', () => {
			expect(() => getBaseId('' as `${number}-${number}`)).to.throw(FiBusinessIdError, 'No base ID found');
			expect(getBaseId('1572860-0')).to.be.eq('1572860');
		});
	});
	describe('test FiBusinessId function', () => {
		it('should test valid values', () => {
			expect(FiBusinessId('1572860-0')).to.be.eq('1572860-0');
		});
		it('should test getBaseId function', () => {
			expect(() => FiBusinessId<CustomBrand>('1572860-1')).to.throw(FiBusinessIdError, 'Checksum is not valid');
			expect(() => FiBusinessId<CustomBrand>('test')).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
			expect(() => FiBusinessId<CustomBrand>(null)).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
			expect(() => FiBusinessId<CustomBrand>(undefined)).to.throw(FiBusinessIdError, 'Type or syntax is not valid');
		});
	});
});
