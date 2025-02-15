import { getEmbedding } from "@/utils/ai/embed";
import { kmeans } from "ml-kmeans";
export default function IntegrationAnalyticsPage() {
  interface dataInterface {
    word: string;
    embedding: number[][];
  }
  // Sample data with words and their embeddings
  var data: dataInterface[] = [
    { word: "apple", embedding: [] },
    { word: "banana", embedding: [] },
    { word: "cherry", embedding: [] },
    { word: "orange", embedding: [] },
    { word: "grape", embedding: [] },
  ];
  data = data.map(
    async (x) => await (x.embedding = await getEmbedding(x.word))
  );
  // Extract embeddings into a 2D array
  const embeddings = data.map((item) => item.embedding);

  // Perform K-means clustering
  const K = 2;
  const result = kmeans(embeddings, K, {});

  // Map clusters to words
  const clustersWithWords = {};
  data.forEach(({ word }, index) => {
    const cluster = result.clusters[index];
    clustersWithWords[cluster] = clustersWithWords[cluster] || [];
    clustersWithWords[cluster].push(word);
  });

  console.log(clustersWithWords);
  return <div></div>;
}
