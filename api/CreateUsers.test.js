import fetchMock from 'jest-fetch-mock';
global.fetch = fetchMock;
import CreateUsers from './CreateUsers';

let data = {
  
  name: 'Jason Hsuu',
      username: 'Jasonhsuu',
      password: 'youreawizard'
}

describe('CreateUsers', () => {
	it('Calls fetch', () => {
		fetch.mockResponse(JSON.stringify(data));

		return CreateUsers(data, {
			DATABASE_ID: 'SOME_DATABASE_ID',
			TOKEN: 'SOME_TOKEN'
		}).then(user => {
			expect(user).toEqual(data);
		});
	});

	afterAll(() => {
		fetch.mockReset();
	});
});