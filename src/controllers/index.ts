import { ElasticsearchReadRouter } from "./elasticsearch-read"

export const Controllers = Promise.all([
  ElasticsearchReadRouter,
]).then((controllers) => {
  return {
    ElasticsearchReadRouter: controllers[0],
  }
})