import { Elasticsearch } from "./Elasticsearch"

// Initialize all use cases
export const UseCases = Promise.all([]).then(async () => {

  const usecases = {
    Elasticsearch: new Elasticsearch(),
  }
  
  return usecases
})