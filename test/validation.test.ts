import {buildBusinessId, getBaseId, getMultiplier, isValidBusinessId} from '../src/';
import {describe, expect, it} from 'vitest';

describe('test business ID', () => {
	describe('test build business ID', () => {
		it('should build business ID', () => {
			expect(buildBusinessId('1572860')).to.be.eq('1572860-0');
		});
		it('should fail to build broken business ID', () => {
			expect(buildBusinessId.bind(null, 'ASD')).to.throw(Error, 'not valid business id');
		});
	});
	describe('test validate business ID', () => {
		it('should validate business ID', () => {
			expect(isValidBusinessId('1572860-0')).to.be.eq(true);
			expect(isValidBusinessId('1572860-1')).to.be.eq(false);
			expect(isValidBusinessId('0737546-2')).to.be.eq(true);
			expect(isValidBusinessId('0737546-9')).to.be.eq(false);
			expect(isValidBusinessId('0725267-3')).to.be.eq(true);
			expect(isValidBusinessId('1456344-5')).to.be.eq(true);
			expect(isValidBusinessId('2729069-3')).to.be.eq(true);
			expect(isValidBusinessId('helloworld-4')).to.be.eq(false);
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
			expect(() => getBaseId('')).to.throw(Error, 'not valid business id');
			expect(getBaseId('1572860-0')).to.be.eq('1572860');
		});
	});
});
