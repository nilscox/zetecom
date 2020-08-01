import request from 'supertest';

export class GraphQLClient {

  server: any;

  execute(query: string) {
    return request(this.server)
      .post('/api/graphql')
      .send({
        operationName: null,
        query,
      })
      .then(res => {
        if (res.status !== 200) {
          console.error(res.body);
          expect(res.status).toEqual(200);
        }

        return res;
      });
  }

}
