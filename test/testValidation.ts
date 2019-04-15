process.env.NODE_ENV = 'test';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {buildBusinessId, isValidBusinessId} from '../src/';

describe('test business ID', () => {
	it('should build business ID', () => {
		expect(buildBusinessId('1572860')).to.be.eq('1572860-0');
	});
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
