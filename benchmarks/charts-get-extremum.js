/*
 * charts.js
 */

const inputs = [getData()]

const getValueExtremum = (direction) => (params) => {
  const { series, axis, getFilters, isDefaultAxis } = params;

  return Object.keys(series)
    .filter((seriesId) => {
      const yAxisId = series[seriesId].yAxisId ?? series[seriesId].yAxisKey;
      return yAxisId === axis.id || (isDefaultAxis && yAxisId === undefined);
    })
    .reduce(
      (acc, seriesId) => {
        const { stackedData } = series[seriesId];

        const filter = getFilters?.({
          currentAxisId: axis.id,
          isDefaultAxis,
          seriesXAxisId: series[seriesId].xAxisId ?? series[seriesId].xAxisKey,
          seriesYAxisId: series[seriesId].yAxisId ?? series[seriesId].yAxisKey,
        });

        const [seriesMin, seriesMax] = stackedData?.reduce(
          (seriesAcc, values, index) => {
            if (
              filter &&
              (!filter(createResult(values[0], direction), index) ||
                !filter(createResult(values[1], direction), index))
            ) {
              return seriesAcc;
            }

            return [Math.min(...values, seriesAcc[0]), Math.max(...values, seriesAcc[1])];
          },
          [Infinity, -Infinity],
        ) ?? [Infinity, -Infinity];

        return [Math.min(seriesMin, acc[0]), Math.max(seriesMax, acc[1])];
      },
      [Infinity, -Infinity],
    );
};

const getValueExtremumModified = (direction) => (params) => {
  const { series, axis, getFilters, isDefaultAxis } = params;

  let minimum = Infinity
  let maximum = -Infinity

  for (let seriesId in series) {
    if (series.hasOwnProperty(seriesId)) {
      const yAxisId = series[seriesId].yAxisId ?? series[seriesId].yAxisKey;
      if (yAxisId !== axis.id && !(isDefaultAxis && yAxisId === undefined)) {
        continue;
      }

      const { stackedData } = series[seriesId];

      const filter = getFilters?.({
        currentAxisId: axis.id,
        isDefaultAxis,
        seriesXAxisId: series[seriesId].xAxisId ?? series[seriesId].xAxisKey,
        seriesYAxisId: series[seriesId].yAxisId ?? series[seriesId].yAxisKey,
      });

      if (!stackedData) {
        continue
      }

      let seriesMin = Infinity
      let seriesMax = -Infinity

      for (let i = 0; i < stackedData.length; i++) {
        const values = stackedData[i];
        if (
          filter &&
          (!filter(createResult(values[0], direction), index) ||
            !filter(createResult(values[1], direction), index))
        ) {
          continue
        }

        seriesMin = Math.min(values[0], values[1], seriesMin)
        seriesMax = Math.max(values[0], values[1], seriesMax)
      }

      minimum = Math.min(seriesMin, minimum)
      maximum = Math.max(seriesMax, maximum)
    }
  }

  return [minimum, maximum]
};


export default {
  blocks: [
    {
      id: 'getValueExtremum',
      setup: () => {
        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += getValueExtremum('x')(inputs[i])[0]
          }
          return result
        }
      }
    },
    {
      id: 'getValueExtremumModified',
      setup: () => {
        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += getValueExtremumModified('x')(inputs[i])[0]
          }
          return result
        }
      }
    },
  ]
}






function getData() {
return {
  "series": {
    "auto-generated-id-0": {
      "layout": "horizontal",
        "id": "auto-generated-id-0",
          "color": "#02B2AF",
            "type": "bar",
              "dataKey": "seoul",
                "label": "Seoul rainfall",
                  "data": [
                    21,
                    28,
                    41,
                    73,
                    99,
                    144,
                    319,
                    249,
                    131,
                    55,
                    48,
                    25
                  ],
                    "stackedData": [
                      [
                        0,
                        21
                      ],
                      [
                        0,
                        28
                      ],
                      [
                        0,
                        41
                      ],
                      [
                        0,
                        73
                      ],
                      [
                        0,
                        99
                      ],
                      [
                        0,
                        144
                      ],
                      [
                        0,
                        319
                      ],
                      [
                        0,
                        249
                      ],
                      [
                        0,
                        131
                      ],
                      [
                        0,
                        55
                      ],
                      [
                        0,
                        48
                      ],
                      [
                        0,
                        25
                      ]
                    ]
    }
  },
  "axis": {
    "id": "defaultized-x-axis-0",
      "label": "rainfall (mm)"
  },
  "isDefaultAxis": true
}
}
