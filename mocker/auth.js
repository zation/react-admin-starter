export default (router) => {
  router.post('/auth/local', (request, response) => {
    response.status(200).send({
      authorization: 'authorization',
      user: {
        id: 1,
        username: 'Zation',
        status: 'ACTIVE',
      },
    });
  });
};
