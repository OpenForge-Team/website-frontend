import { getEmbedding } from "@/utils/ai/embed";
import { kmeans } from "ml-kmeans";

export default async function IntegrationAnalyticsPage() {
  interface DataInterface {
    word: string;
    embedding: number[];
  }

  // Sample data with words
  const initialData: DataInterface[] = [
    { word: "apple", embedding: [] },
    { word: "banana", embedding: [] },
    { word: "cherry", embedding: [] },
    { word: "orange", embedding: [] },
    { word: "grape", embedding: [] },
  ];

  // Get embeddings for each word
  const processedData = await Promise.all(
    initialData.map(async (item) => ({
      ...item,
      embedding: await getEmbedding(item.word),
    }))
  );

  // Extract embeddings into a 2D array
  const embeddings = processedData.map((item) => item.embedding);

  // Perform K-means clustering
  const K = 2;
  const result = kmeans(embeddings, K, {});

  // Map clusters to words
  const clusteredWords: { [key: string]: string[] } = {};
  processedData.forEach(({ word }, index) => {
    const cluster = result.clusters[index];
    clusteredWords[cluster] = clusteredWords[cluster] || [];
    clusteredWords[cluster].push(word);
  });

  console.log(clusteredWords);

  return (
    <div>
      <h1>Clustering Results</h1>
      {Object.entries(clusteredWords).map(([cluster, words]) => (
        <div key={cluster}>
          <h2>Cluster {cluster}</h2>
          <ul>
            {words.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
