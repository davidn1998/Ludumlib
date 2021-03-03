import styles from "./RenderChart.module.scss";
import { ResponsivePie } from "@nivo/pie";
import { useGetLogsData } from "../../util/useRequest";
import { parseISO } from "date-fns";

const theme = {
  textColor: "#fff",
  tooltip: {
    container: {
      background: "#000",
    },
    color: "#fff",
  },
};

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
  let total = 0;
  dataWithArc.forEach((datum) => {
    total += datum.value;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#fff",
      }}
    >
      {total} Hours Played
    </text>
  );
};

const getWeekStart = () => {
  const date = new Date();
  const day = date.getDay();
  return new Date(date.setDate(date.getDate() - day + (day == 0 ? -6 : 1) - 7));
};
const getDate = (days) => {
  const date = getWeekStart();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const RenderLineChart = ({ user }) => {
  const dateFrom = getDate(0);
  const dateTo = getDate(6);
  const { logsData, logsError } = useGetLogsData(
    "",
    1,
    user?._id,
    "",
    "",
    dateFrom,
    dateTo
  );

  if (logsError || !logsData) {
    return (
      <div className={styles.RenderChart}>
        <h1 className={styles.chartHeader}>Games Played</h1>
        <p className={styles.chartInfo}>Feb 22 - Feb 28</p>
        <p className={styles.chartInfo}>Cannot Load Data</p>
      </div>
    );
  }

  const games = [...new Set(logsData.logs.map((log) => log.game.label))];

  const data = games.map((game) => {
    const hours = logsData.logs
      .filter((log) => log.game.label == game)
      .reduce((acc, log) => acc + log.hours, 0);
    return {
      id: game,
      value: hours,
    };
  });

  return (
    <div className={styles.RenderChart}>
      <h1 className={styles.chartHeader}>Games Played</h1>
      <p className={styles.chartInfo}>Feb 22 - Feb 28</p>
      <ResponsivePie
        data={data}
        theme={theme}
        margin={{
          top: 30,
          right: 20,
          bottom: 150,
          left: 20,
        }}
        innerRadius={0.7}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#fff"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabel="label"
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#000"
        tooltip={(obj) => {
          return (
            <div className={styles.tooltip}>
              {obj.datum?.data?.id}: {obj.datum?.data?.value} Hours
            </div>
          );
        }}
        layers={[
          "slices",
          "sliceLabels",
          // "radialLabels",
          // "legends",
          CenteredMetric,
        ]}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: "*",
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 150,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#fff",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default RenderLineChart;
