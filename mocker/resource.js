import { image } from 'faker';

export default router => {
  router.post('/resource', (request, response) => {
    response.status(200).send({
      url: image.image(),
    });
  });
};
