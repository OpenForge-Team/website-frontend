import { getEmbedding } from "@/utils/ai/embed";
import React from "react";
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
  async function processData() {
    // Get embeddings for each word
    const processedData = await Promise.all(
      data.map(async (item) => ({
        ...item,
        embedding: await getEmbedding(item.word),
      }))
    );

    // Extract embeddings into a 2D array
    const embeddings = processedData.map((item) => item.embedding);

    // Perform K-means clustering
    const K = 2;
    const result = kmeans(embeddings, K, {});
    return { processedData, result };
  }

  // Use React's useEffect to handle the async operation
  React.useEffect(() => {
    processData().then(({ processedData, result }) => {
      // Map clusters to words
      const clusteredWords = {};
      processedData.forEach(({ word }, index) => {
        const cluster = result.clusters[index];
        clusteredWords[cluster] = clusteredWords[cluster] || [];
        clusteredWords[cluster].push(word);
      });
      console.log(clusteredWords);
    });
  }, []);

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
