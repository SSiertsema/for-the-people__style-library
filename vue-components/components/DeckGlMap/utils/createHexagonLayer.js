import { H3HexagonLayer } from "@deck.gl/geo-layers";

function calculateMinMaxValues(data) {
  const counts = data.map((d) => d.count);
  return {
    min: Math.min(...counts),
    max: Math.max(...counts),
  };
}

function getNormalizedValue(value, min, max) {
  return (value - min) / (max - min);
}

export default function createNewLayer(topicData, color, config) {
  const minMax = calculateMinMaxValues(topicData);

  return new H3HexagonLayer({
    ...config,
    id: "H3HexagonLayer",
    data: topicData,
    extruded: true,
    elevationScale: 1,
    getFillColor: color,
    pickable: true,
    getHexagon: (d) => d.hex,
    getElevation: (d) => {
      const norm = getNormalizedValue(d.count, minMax.min, minMax.max);
      return norm * 1000;
    },
  });
}
